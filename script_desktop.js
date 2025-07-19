document.addEventListener('DOMContentLoaded', function() {

    // ----------------------------------------
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ----------------------------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // ----------------------------------------
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ----------------------------------------
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // You can add more JavaScript functionality here as you build out the site.
    // For example:
    // - A more complex mobile menu toggle
    // - Shopping cart logic
    // - Dynamic filtering for products

});
