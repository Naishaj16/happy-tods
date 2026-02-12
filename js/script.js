document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');

            // Basic mobile menu behavior - can be further styled in CSS if needed
            if (navMenu.classList.contains('mobile-active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#fff';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('mobile-active')) {
                    navMenu.classList.remove('mobile-active');
                    navMenu.style.display = '';
                }
            }
        });
    });

    // Simple Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.card, .prog-card, .section-title, .hero-content, .hero-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Helper class for animation
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleTag);
});
