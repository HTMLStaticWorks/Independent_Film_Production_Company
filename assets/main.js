/**
 * CI-FILMS - Cinematic Portfolio Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 250); // Match CSS transition time
    }

    // 2. Sticky Navbar
    const navbar = document.querySelector('.navbar-cinema');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Form Validation (Bootstrap style)
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // 5. Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Check both .nav-link and .dropdown-item
    const allLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            
            // If it's a dropdown-item, also highlight the parent dropdown-toggle
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const toggle = parentDropdown.querySelector('.nav-link.dropdown-toggle');
                    if (toggle) {
                        toggle.classList.add('active');
                    }
                }
            }
        }
    });

    // 6. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    const directionToggle = document.getElementById('direction-toggle');
    const directionIcon = directionToggle ? directionToggle.querySelector('i') : null;
    const savedDirection = localStorage.getItem('text-direction');
    const initialDirection = savedDirection || document.documentElement.getAttribute('dir') || 'ltr';
    document.documentElement.setAttribute('dir', initialDirection);
    updateDirectionIcon(initialDirection);

    if (directionToggle) {
        directionToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', currentDir);
            localStorage.setItem('text-direction', currentDir);
            updateDirectionIcon(currentDir);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        } else {
            themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }
    }

    function updateDirectionIcon(direction) {
        if (!directionIcon) return;
        directionIcon.classList.remove('bi-text-left', 'bi-text-right');
        directionIcon.classList.add(direction === 'rtl' ? 'bi-text-left' : 'bi-text-right');
    }

    // 7. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 8. Close Offcanvas on link click
    const offcanvasLinks = document.querySelectorAll('.offcanvas .nav-link:not(.dropdown-toggle)');
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        offcanvasLinks.forEach(link => {
            link.addEventListener('click', () => {
                bsOffcanvas.hide();
            });
        });
    }

    // 9. Back to Top Button (Dynamic Injection)
    const createBackToTop = () => {
        const btn = document.createElement('button');
        btn.id = 'backToTop';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to Top');
        btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createBackToTop();
});

/**
 * Utility: Loading Indicator Toggle
 * @param {boolean} show 
 */
function toggleLoading(show) {
    let loader = document.getElementById('dynamic-loader');
    if (!loader && show) {
        loader = document.createElement('div');
        loader.id = 'dynamic-loader';
        loader.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        loader.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:9999;';
        document.body.appendChild(loader);
    }
    if (loader) {
        loader.style.display = show ? 'block' : 'none';
    }
}
