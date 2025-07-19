document.addEventListener('DOMContentLoaded', () => {

    const App = {
        init() {
            this.handlePreloader();
            this.handleNavigation();
            this.handleHeaderScroll();
            this.initScrollAnimations();
            this.initTestimonialSlider();

            setTimeout(() => {
                document.querySelector('.hero')?.classList.add('is-visible');
            }, 100);
        },

        handlePreloader() {
            const preloader = document.querySelector('.preloader');
            const body = document.body;
            body.classList.add('preloader-active');

            window.addEventListener('load', () => {
                preloader.addEventListener('transitionend', () => {
                    body.classList.remove('preloader-active');
                }, { once: true });
                
                setTimeout(() => preloader.classList.add('is-hidden'), 1500);
            });
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

            const scrollObserver = new IntersectionObserver(
                ([entry]) => {
                    header.classList.toggle('is-scrolled', !entry.isIntersecting);
                },
                { rootMargin: "100px 0px 0px 0px", threshold: 0 }
            );

            const elementToObserve = document.querySelector('.hero') || document.querySelector('.main-content');
            if (elementToObserve) {
                scrollObserver.observe(elementToObserve);
            }
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
        },

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

            updateSlider();
        }
    };

    App.init();

});
