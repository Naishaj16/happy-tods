document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            // Check if display is flex AND position is absolute (active mobile state)
            const isActive = navMenu.classList.contains('mobile-active');

            if (isActive) {
                navMenu.classList.remove('mobile-active');
                navMenu.style.display = 'none';
            } else {
                navMenu.classList.add('mobile-active');
                navMenu.style.display = 'flex';
                // Inline styles for mobile layout
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '90px'; // Match nav height
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = '#F3F3F1'; // Match body bg
                navMenu.style.padding = '30px';
                navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navMenu.style.gap = '20px';

                // Ensure inner items stack
                const navLinks = navMenu.querySelector('.nav-links');
                if (navLinks) navLinks.style.flexDirection = 'column';
            }
        });
    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .about-decoration, .section-title, .hero-container');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Multicolor Text Helper
    const multicolorElements = document.querySelectorAll('.multicolor-text');
    multicolorElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        [...text].forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            el.appendChild(span);
        });
    });

    // Funky Title Generator
    const funkyTitle = document.getElementById('funky-title');
    if (funkyTitle) {
        const brands = "HAPPYTODS";
        [...brands].forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            span.classList.add('funky-letter');
            funkyTitle.appendChild(span);
        });
    }
});
