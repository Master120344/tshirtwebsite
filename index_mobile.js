/* index_mobile.js */

document.addEventListener('DOMContentLoaded', () => {

    const App = {
        // Cache DOM elements
        nodes: {
            body: document.body,
            preloader: document.querySelector('.preloader'),
            header: document.querySelector('.header'),
            menuToggle: document.querySelector('.header__menu-toggle'),
            navLinks: document.querySelectorAll('.nav-overlay__link'),
            animatedElements: document.querySelectorAll('[data-animate]'),
            hero: document.querySelector('.hero'),
        },

        // Initialize all functionalities
        init() {
            this.handlePreloader();
            this.handleNavigation();
            this.handleHeaderScroll();
            this.initScrollAnimations();
            this.triggerHeroAnimation();
        },

        // Handles the preloader fade out effect
        handlePreloader() {
            if (!this.nodes.preloader) return;

            this.nodes.body.classList.add('preloader-active');
            window.addEventListener('load', () => {
                // This timeout matches the CSS transition delay for a smooth fade-out.
                setTimeout(() => {
                    this.nodes.preloader.classList.add('is-hidden');
                    this.nodes.body.classList.remove('preloader-active');
                }, 200); // A small delay to ensure rendering before fading
            });
        },

        // Sets up the mobile navigation toggle and link clicks
        handleNavigation() {
            if (!this.nodes.menuToggle) return;

            this.nodes.menuToggle.addEventListener('click', () => {
                this.nodes.body.classList.toggle('nav-open');
            });

            this.nodes.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (this.nodes.body.classList.contains('nav-open')) {
                        this.nodes.body.classList.remove('nav-open');
                    }
                });
            });
        },

        // Adds a class to the header on scroll for styling
        handleHeaderScroll() {
            if (!this.nodes.header) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.nodes.header.classList.add('is-scrolled');
                } else {
                    this.nodes.header.classList.remove('is-scrolled');
                }
            }, { passive: true }); // Improves scroll performance
        },

        // Triggers the initial hero text animation
        triggerHeroAnimation() {
            if (!this.nodes.hero) return;
            // Delay slightly to ensure styles are loaded and preloader is gone
            setTimeout(() => {
                this.nodes.hero.classList.add('is-visible');
            }, 500); // Increased delay to happen after preloader
        },

        // Initializes Intersection Observer for scroll-triggered animations
        initScrollAnimations() {
            if (!this.nodes.animatedElements.length) return;

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

            this.nodes.animatedElements.forEach(element => observer.observe(element));
        }
    };

    // Run the app
    App.init();

});
