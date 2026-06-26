// Copy email to clipboard
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    const feedback = document.getElementById('copy-feedback');
    const emailEl = document.getElementById('email-address');
    const email = emailEl ? emailEl.textContent.trim() : 'ksvarun20044@gmail.com';
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            if (feedback) {
                feedback.textContent = 'Email copied!';
                feedback.classList.add('visible');
                setTimeout(() => feedback.classList.remove('visible'), 2500);
            }
            const label = copyBtn.querySelector('span');
            if (label) {
                const original = label.textContent;
                label.textContent = 'Copied!';
                setTimeout(() => { label.textContent = original; }, 2000);
            }
        } catch {
            if (feedback) {
                feedback.textContent = email;
                feedback.classList.add('visible');
            }
        }
    });
}

// Expandable education section
function initEducationToggle() {
    const toggle = document.getElementById('education-toggle');
    const panel = document.getElementById('education-full');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
        const isOpen = panel.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.classList.toggle('is-open', isOpen);
        if (isOpen) {
            setTimeout(() => {
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 150);
        }
    });
}

// Scroll to hash target on page load (cross-page anchors)
function initHashScroll() {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToTarget = () => {
        const target = document.querySelector(hash);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        }
    };

    setTimeout(scrollToTarget, 200);
}

// Smooth scrolling for same-page anchor links
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const hashIndex = href.indexOf('#');
        if (hashIndex === -1) return;

        const hash = href.substring(hashIndex);
        const isExternalPage = href.includes('/') && !href.startsWith('#');

        if (isExternalPage) return;

        const target = document.querySelector(hash);
        if (!target) return;

        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    });
});

// Scroll-triggered reveal animations
function initRevealAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Stagger children within revealed parents
function initStaggerAnimations() {
    document.querySelectorAll('.stagger-children').forEach(parent => {
        const children = parent.querySelectorAll('.reveal');
        children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.08}s`;
        });
    });
}

// Active nav highlight on scroll
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const updateActiveNav = () => {
        let current = sections[0].getAttribute('id');

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 90) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            const href = link.getAttribute('href') || '';
            link.classList.remove('active');
            if (href.endsWith(`#${current}`) || (current === 'about' && href.endsWith('index.html'))) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar-scrolled', window.pageYOffset > 20);
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initStaggerAnimations();
    initScrollSpy();
    initCopyEmail();
    initEducationToggle();
    initHashScroll();
    initNavbarScroll();
});
