document.addEventListener('DOMContentLoaded', function() {

    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    const toggleMobileNav = () => {
        hamburgerBtn.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
        document.body.style.overflow = mobileNav.classList.contains('is-active') ? 'hidden' : 'auto';
    };

    const handleMobileNavClick = (e) => {
        if (e.target.tagName === 'A') {
            toggleMobileNav();
        }
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => {
        intersectionObserver.observe(el);
    });

    window.addEventListener('scroll', handleHeaderScroll);
    hamburgerBtn.addEventListener('click', toggleMobileNav);
    mobileNav.addEventListener('click', handleMobileNavClick);

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            if (input.value && input.checkValidity()) {
                alert(`Thank you for subscribing, ${input.value}!`);
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    const logo = document.querySelector('.logo-title');
    if(logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
