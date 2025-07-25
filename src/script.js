// Modern Kişisel Portföy Sitesi JS
// Loader, custom cursor, scroll, modal, slider, form, animasyonlar

document.addEventListener('DOMContentLoaded', function () {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 400);
    }, 900);

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    let cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', e => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursor.style.transform = `translate3d(${cursorX - 16}px, ${cursorY - 16}px, 0)`;
    });
    // Cursor büyütme hover
    const hoverables = document.querySelectorAll('button, a, .about-photo-wrapper, .project-card, .tech-card, .education-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // Scroll To Top
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Navbar Smooth Scroll
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Hero scroll-down tıklama ve scroll
    const heroSection = document.getElementById('hero');
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const about = document.getElementById('about');
            if (about) {
                about.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Section ve Kart Animasyonları (fade/slide + scale + shadow)
    const animatedEls = [
        ...document.querySelectorAll('.section'),
        ...document.querySelectorAll('.education-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.achievement-card'),
        ...document.querySelectorAll('.tech-card')
    ];
    const revealAnimated = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const animatedObserver = new IntersectionObserver(revealAnimated, {
        threshold: 0.18
    });
    animatedEls.forEach(el => {
        animatedObserver.observe(el);
    });

    // İletişim Formu
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();
        if (name && email && message) {
            formMessage.textContent = 'Mesajınız gönderildi!';
            formMessage.style.color = '#facc15';
            contactForm.reset();
            setTimeout(() => formMessage.textContent = '', 3000);
        } else {
            formMessage.textContent = 'Lütfen tüm alanları doldurun.';
            formMessage.style.color = '#f87171';
        }
    });

    // Placeholder animasyonu
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentNode.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            if (!this.value) this.parentNode.classList.remove('focused');
        });
    });

    // Donut Chart Animasyonu (Teknolojiler)
    document.querySelectorAll('.donut-chart').forEach(chart => {
        const percent = parseInt(chart.getAttribute('data-percent'), 10) || 0;
        const circle = chart.querySelector('.donut-bar');
        const radius = 32; // Yeni SVG yarıçapı
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        setTimeout(() => {
            const offset = circumference * (1 - percent / 100);
            circle.style.strokeDashoffset = offset;
        }, 400);
    });

    // Sertifika Tam Ekran Modalı
    const certModal = document.getElementById('certificate-modal');
    const certModalImg = document.querySelector('.certificate-modal-img');
    const certModalClose = document.querySelector('.certificate-modal-close');
    document.querySelectorAll('.achievement-img').forEach(img => {
        img.addEventListener('click', function () {
            certModalImg.src = this.src;
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    certModalClose.addEventListener('click', function () {
        certModal.classList.remove('active');
        certModalImg.src = '';
        document.body.style.overflow = '';
    });
    certModal.addEventListener('click', function (e) {
        if (e.target === certModal) {
            certModal.classList.remove('active');
            certModalImg.src = '';
            document.body.style.overflow = '';
        }
    });
}); 