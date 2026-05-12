/* === SPÄTi am Delft – JavaScript === */

// ── Mobile Navigation ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Scroll-based fade-in ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for cards in the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Contact Form ──
const form        = document.getElementById('contactForm');
const successMsg  = document.getElementById('formSuccess');
const errorMsg    = document.getElementById('formError');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name').value.trim();
  const message = form.querySelector('#message').value.trim();

  // Hide previous messages
  successMsg.style.display = 'none';
  errorMsg.style.display   = 'none';

  if (!name || !message) {
    errorMsg.style.display = 'block';
    return;
  }

  // Simulate send (replace with real backend / Formspree / Netlify Forms)
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Abschicken 🚀';
    btn.disabled = false;
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  }, 800);
});

// ── Hero blocks tilt on mouse move (desktop) ──
const blocks = document.querySelectorAll('.block');
document.querySelector('#hero')?.addEventListener('mousemove', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dx   = (e.clientX - cx) / rect.width;
  const dy   = (e.clientY - cy) / rect.height;

  blocks.forEach((block, i) => {
    const base = [-4, 2, -5, 3, -2][i] ?? 0;
    block.style.transform = `rotate(${base + dx * 4}deg) translateY(${dy * -6}px)`;
  });
});

document.querySelector('#hero')?.addEventListener('mouseleave', () => {
  const baseRotations = [-4, 2, -5, 3, -2];
  blocks.forEach((block, i) => {
    block.style.transform = `rotate(${baseRotations[i] ?? 0}deg)`;
  });
});
