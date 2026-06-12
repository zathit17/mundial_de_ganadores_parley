document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Fireworks around trophy card
    const fwContainer = document.getElementById('fw-canvas');
    if (fwContainer && typeof Fireworks !== 'undefined') {
        const fw = new Fireworks.Fireworks(fwContainer, {
            autoresize: true,
            opacity: 0.6,
            acceleration: 1.02,
            friction: 0.97,
            gravity: 1.2,
            particles: 80,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 6,
            intensity: 18,
            flickering: 40,
            lineStyle: 'round',
            hue: { min: 30, max: 60 },
            delay: { min: 20, max: 35 },
            rocketsPoint: { min: 30, max: 70 },
            lineWidth: { explosion: { min: 1, max: 2.5 }, trace: { min: 0.5, max: 1 } },
            brightness: { min: 60, max: 90 },
            decay: { min: 0.01, max: 0.02 },
            mouse: { click: false, move: false, max: 1 },
        });
        fw.start();
    }


    // Benefit cards: staggered reveal
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Other reveal elements
    const revealEls = document.querySelectorAll(
        '.app-feature, .bono-card, .registro-content, .section-header'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                // Clear delay after entry animation so hover is instant
                entry.target.addEventListener('transitionend', () => {
                    entry.target.style.transitionDelay = '0s';
                }, { once: true });
            }
        });
    }, { threshold: 0.08 });

    benefitCards.forEach(el => observer.observe(el));
    revealEls.forEach(el => observer.observe(el));

    // Trophy card 3D tilt
    const trophyCard = document.querySelector('.trophy-card');
    if (trophyCard) {
        trophyCard.addEventListener('mousemove', (e) => {
            const rect = trophyCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            trophyCard.style.transform = `perspective(800px) rotateX(${y * -14}deg) rotateY(${x * 14}deg) translateY(-12px)`;
        });

        trophyCard.addEventListener('mouseleave', () => {
            trophyCard.style.transform = '';
            trophyCard.style.transition = 'transform 0.6s ease';
        });

        trophyCard.addEventListener('mouseenter', () => {
            trophyCard.style.transition = 'none';
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
