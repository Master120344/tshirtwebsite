document.addEventListener('DOMContentLoaded', () => {

    const App = {
        init() {
            this.handlePreloader();
            this.handleNavigation();
            this.handleHeaderScroll();
            this.initScrollAnimations();

            setTimeout(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.classList.add('is-visible');
                }
            }, 100);
        },

        handlePreloader() {
            const preloader = document.querySelector('.preloader');
            const body = document.body;

            if (preloader) {
                body.classList.add('preloader-active');
                window.addEventListener('load', () => {
                    setTimeout(() => {
                         preloader.addEventListener('animationend', () => {
                            body.classList.remove('preloader-active');
                        }, { once: true });
                        preloader.classList.add('is-hidden');
                    }, 1500);
                });
            }
        },

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

        handleHeaderScroll() {
            const header = document.querySelector('.header');
            if (!header) return;

            let lastScrollY = window.scrollY;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('is-scrolled');
                } else {
                    header.classList.remove('is-scrolled');
                }
                lastScrollY = window.scrollY;
            });
        },

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
        }
    };

    App.init();

});
