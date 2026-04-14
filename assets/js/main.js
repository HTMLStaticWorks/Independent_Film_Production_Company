/**
 * LUMINA CINEMA - CUSTOM JAVASCRIPT
 * Version: 1.0.0
 * Author: Antigravity AI
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader
    const preloader = document.querySelector("#preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 500);
            }, 800);
        });
    }

    // 2. Sticky Navbar & Active Link
    const nav = document.querySelector(".navbar");
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                nav.classList.add("navbar-scrolled");
            } else {
                nav.classList.remove("navbar-scrolled");
            }
        });

        // Dynamic Active Link Highlighting
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll(".nav-link, .dropdown-item, .navbar .btn-primary-cinema");
        
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath || (currentPath === "" && href === "index.html")) {
                link.classList.add("active");
                // If it's a dropdown item, also highlight the parent dropdown toggle
                const dropdownToggle = link.closest(".dropdown")?.querySelector(".dropdown-toggle");
                if (dropdownToggle) dropdownToggle.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    });

    // 5. Lazy Loading Images
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach((img) => {
            imageObserver.observe(img);
        });
    }

    // 6. Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                } else {
                    themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
                }
            }
        });
    }

    // 7. RTL Toggle Logic
    const rtlToggle = document.getElementById('rtlToggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
        });
    }

    // Check for saved direction
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
    }

    // 8. Initialize Bootstrap Tooltips & Popovers
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});
