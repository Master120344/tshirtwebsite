document.addEventListener('DOMContentLoaded', function() {

    // ----------------------------------------
    // APP-LIKE NAVIGATION
    // ----------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (menuToggle && navOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('is-active');
            navOverlay.classList.toggle('is-active');
            body.classList.toggle('no-scroll', isActive);
        });
    }

    // ----------------------------------------
    // ADVANCED SCROLL ANIMATIONS
    // ----------------------------------------
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-text]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.animationDelay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                entry.target.classList.add('is-visible');

                // If it's a text animation, trigger it
                if (entry.target.hasAttribute('data-animate-text')) {
                    animateText(entry.target);
                }

                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger a bit earlier
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ----------------------------------------
    // STAGGERED TEXT ANIMATION
    // ----------------------------------------
    function animateText(element) {
        const text = element.textContent;
        element.innerHTML = ''; // Clear original text
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
            span.style.transitionDelay = `${index * 0.04}s`;
            element.appendChild(span);
        });
    }
    
    // Initial hero text animation without waiting for scroll
    const heroTitle = document.querySelector('.hero-title[data-animate-text]');
    if (heroTitle) {
        animateText(heroTitle);
        // Force reflow to make animation work on load
        void heroTitle.offsetWidth; 
        heroTitle.classList.add('is-visible');
    }

    // ----------------------------------------
    // FOOTER ACCORDION
    // ----------------------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('is-active');

            // Optional: Close other accordions when one is opened
            // accordionItems.forEach(otherItem => {
            //     otherItem.classList.remove('is-active');
            //     otherItem.querySelector('.accordion-content').style.maxHeight = null;
            // });

            if (!isActive) {
                item.classList.add('is-active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                item.classList.remove('is-active');
                content.style.maxHeight = null;
            }
        });
    });

    // ----------------------------------------
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
