/*  VELARE — js/main.js
    Funcionalidad compartida en todas las páginas  */

// ── Active nav link por página actual ──
(function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
})();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
}

// ── Mobile menu toggle ──
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    const nav = document.getElementById('navLinks');
    const ham = document.getElementById('hamburger');
    if (nav && nav.classList.contains('active') &&
        !nav.contains(e.target) && !ham.contains(e.target)) {
        nav.classList.remove('active');
        ham.classList.remove('active');
    }
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Cookie banner ──
function acceptCookies() {
    const b = document.getElementById('cookieBanner');
    if (b) b.style.display = 'none';
    document.body.classList.remove('cookie-visible');
    localStorage.setItem('velareCookiesAccepted', 'true');
}
window.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    if (localStorage.getItem('velareCookiesAccepted')) {
        banner.style.display = 'none';
    } else {
        document.body.classList.add('cookie-visible');
    }
});

// ── Privacy modal ──
function openModal() {
    const m = document.getElementById('privacyModal');
    if (m) m.style.display = 'block';
}
function closeModal() {
    const m = document.getElementById('privacyModal');
    if (m) m.style.display = 'none';
}
window.addEventListener('click', (e) => {
    const modal = document.getElementById('privacyModal');
    if (modal && e.target === modal) modal.style.display = 'none';
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        if (typeof closeLightbox === 'function') closeLightbox();
        if (typeof closeProductModal === 'function') closeProductModal();
    }
});

// ── Smooth scroll anclas ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    });
});

// ── WhatsApp flotante: sube con cookie banner ──
// Manejado via CSS body.cookie-visible
