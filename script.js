// Modern Kişisel Portföy Sitesi JS
// Loader, custom cursor, scroll, modal, slider, form, animasyonlar

document.addEventListener('DOMContentLoaded', function () {
    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 400);
        }, 900);
    }

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
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
    }

    // Scroll To Top
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
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
    }

    // Modern Navbar Functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks && mobileMenuBtn) {
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    if (navbar && navLinks && mobileMenuBtn) {
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Active link highlighting
    if (navLinks && navLinksItems.length > 0) {
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinksItems.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Smooth scroll for navigation links
        navLinksItems.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');

                // Check if it's a cross-page link (contains .html)
                if (href.includes('.html')) {
                    // Navigate to the page with the anchor
                    window.location.href = href;
                } else {
                    // Same page navigation
                    const targetId = href.split('#')[1];
                    const target = document.getElementById(targetId);
                    if (target) {
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

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
    if (contactForm) {
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
    }

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
    if (certModal) {
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
    }

    // Simple Image Modal Functionality
    console.log('Setting up image modal...'); // Debug log

    // Get modal elements
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');

    console.log('Modal elements:', { imageModal, modalImage, modalCaption, closeModal }); // Debug log

    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image');
    console.log('Found gallery images:', galleryImages.length); // Debug log

    // Add click event to each gallery image
    galleryImages.forEach((img, index) => {
        console.log(`Adding click listener to image ${index}:`, img); // Debug log

        img.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Image ${index} clicked!`); // Debug log

            // Get image data
            const src = img.getAttribute('data-src') || img.src;
            const caption = img.getAttribute('data-caption') || img.alt;
            const alt = img.alt;

            console.log('Image data:', { src, caption, alt }); // Debug log

            // Set modal content
            if (modalImage) modalImage.src = src;
            if (modalImage) modalImage.alt = alt;
            if (modalCaption) modalCaption.textContent = caption;

            // Show modal
            if (imageModal) {
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Modal should be visible now'); // Debug log
            }
        };
    });

    // Close modal functionality
    if (closeModal) {
        closeModal.onclick = function () {
            console.log('Close button clicked'); // Debug log
            if (imageModal) {
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
                if (modalImage) modalImage.src = '';
                if (modalCaption) modalCaption.textContent = '';
            }
        };
    }

    // Close modal when clicking outside
    if (imageModal) {
        imageModal.onclick = function (e) {
            if (e.target === imageModal) {
                console.log('Clicked outside modal'); // Debug log
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
                if (modalImage) modalImage.src = '';
                if (modalCaption) modalCaption.textContent = '';
            }
        };
    }

    // Keyboard support
    document.addEventListener('keydown', function (e) {
        if (imageModal && imageModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                console.log('Escape key pressed'); // Debug log
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
                if (modalImage) modalImage.src = '';
                if (modalCaption) modalCaption.textContent = '';
            }
        }
    });
}); 