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
            }, 200);
        },

        handlePreloader() {
            const preloader = document.querySelector('.preloader');
            const body = document.body;
            body.classList.add('preloader-active');

            window.addEventListener('load', () => {
                setTimeout(() => {
                    if (preloader) {
                        preloader.addEventListener('animationend', () => {
                           body.classList.remove('preloader-active');
                        });
                    }
                }, 1800);
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
            let lastScrollY = window.scrollY;

            const scrollObserver = new IntersectionObserver(
                ([entry]) => {
                    header.classList.toggle('is-scrolled', !entry.isIntersecting && window.scrollY > 0);
                }, {
                    rootMargin: "0px",
                    threshold: 1.0
                }
            );
            
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                 scrollObserver.observe(heroSection);
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
                rootMargin: '0px 0px -80px 0px'
            });

            animatedElements.forEach(element => observer.observe(element));
        },

        initTestimonialSlider() {
            const slider = document.querySelector('.testimonial-slider');
            if (!slider) return;

            const wrapper = slider.querySelector('.testimonial-slider__wrapper');
            const slides = slider.querySelectorAll('.testimonial-slide');
            const prevButton = slider.querySelector('.slider-btn--prev');
            const nextButton = slider.querySelector('.slider-btn--next');
            let currentIndex = 0;

            function updateSlider() {
                const activeSlide = slides[currentIndex];
                wrapper.style.height = `${activeSlide.offsetHeight}px`;
                
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

            window.addEventListener('resize', updateSlider);
            updateSlider();
        }
    };

    App.init();

});
