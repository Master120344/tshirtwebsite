/**
 * Custom Dreamz Mobile Application Script
 *
 * This script handles all client-side interactivity for the mobile experience,
 * including preloading, navigation, animations, and sliders.
 */
document.addEventListener('DOMContentLoaded', () => {

    const App = {
        /**
         * Initializes all components of the application.
         */
        init() {
            this.handlePreloader();
            this.handleNavigation();
            this.handleHeaderScroll();
            this.initScrollAnimations();
            this.initTestimonialSlider();

            // Animate hero content on load
            setTimeout(() => {
                document.querySelector('.hero')?.classList.add('is-visible');
            }, 100);
        },

        /**
         * Hides the preloader once the window is fully loaded.
         */
        handlePreloader() {
            const preloader = document.querySelector('.preloader');
            const body = document.body;
            body.classList.add('preloader-active');

            window.addEventListener('load', () => {
                preloader.addEventListener('transitionend', () => {
                    body.classList.remove('preloader-active');
                }, { once: true });
                
                // The preloader has a CSS animation, we wait for it to finish
                // and then add a class to fade it out smoothly.
                setTimeout(() => preloader.classList.add('is-hidden'), 1500);
            });
        },

        /**
         * Manages the main navigation overlay toggle and state.
         */
        handleNavigation() {
            const menuToggle = document.querySelector('.header__menu-toggle');
            const body = document.body;
            const navLinks = document.querySelectorAll('.nav-overlay__link');

            if (!menuToggle) return;

            menuToggle.addEventListener('click', () => {
                body.classList.toggle('nav-open');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (body.classList.contains('nav-open')) {
                        body.classList.remove('nav-open');
                    }
                });
            });
        },

        /**
         * Adds a background to the header when the user scrolls down.
         */
        handleHeaderScroll() {
            const header = document.querySelector('.header');
            if (!header) return;

            const scrollObserver = new IntersectionObserver(
                ([entry]) => {
                    // Toggles class based on whether the hero top is NOT intersecting (i.e., scrolled past)
                    header.classList.toggle('is-scrolled', !entry.isIntersecting);
                },
                { rootMargin: "100px 0px 0px 0px", threshold: 0 }
            );

            // Observe the top of the hero section or main content
            const elementToObserve = document.querySelector('.hero') || document.querySelector('.main-content');
            if (elementToObserve) {
                scrollObserver.observe(elementToObserve);
            }
        },

        /**
         * Initializes the Intersection Observer for all scroll-triggered animations.
         */
        initScrollAnimations() {
            const animatedElements = document.querySelectorAll('[data-animate]');
            if (!animatedElements.length) return;

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.animationDelay;
                        if (delay) {
                            entry.target.style.transitionDelay = `${delay}s`;
                        }
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => observer.observe(element));
        },

        /**
         * Manages the testimonial slider functionality.
         */
        initTestimonialSlider() {
            const slider = document.querySelector('.testimonial-slider');
            if (!slider) return;

            const slides = slider.querySelectorAll('.testimonial-slide');
            const prevButton = slider.querySelector('.slider-btn--prev');
            const nextButton = slider.querySelector('.slider-btn--next');
            let currentIndex = 0;

            function updateSlider() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('is-active', index === currentIndex);
                });
            }

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });

            updateSlider(); // Set initial state
        }
    };

    // Run the application
    App.init();

});
