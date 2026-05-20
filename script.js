// ── NAV SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ──
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
hamburger.addEventListener('click',    () => mobileMenu.classList.add('open'));
closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobileMenu() { mobileMenu.classList.remove('open'); }

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Gesendet ✓';
  btn.style.background = '#3A7A50';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Anfrage senden';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// ── BEFORE / AFTER SLIDER ──
(function () {
  const wrap    = document.querySelector('.slider-wrap');
  if (!wrap) return;
  const after   = document.getElementById('sliderAfter');
  const divider = document.getElementById('sliderDivider');
  let dragging  = false;

  // Play hint animation on load, then settle at 50%
  after.classList.add('slider-hint');
  after.addEventListener('animationend', () => {
    after.classList.remove('slider-hint');
    setPosition(50);
  }, { once: true });

  function setPosition(pct) {
    pct = Math.min(Math.max(pct, 2), 98);
    after.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
    divider.style.left    = pct + '%';
  }

  function getPercent(e) {
    const rect    = wrap.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  wrap.addEventListener('mousedown',  (e) => { dragging = true; setPosition(getPercent(e)); });
  wrap.addEventListener('touchstart', (e) => { dragging = true; setPosition(getPercent(e)); }, { passive: true });

  window.addEventListener('mousemove',  (e) => { if (dragging) setPosition(getPercent(e)); });
  window.addEventListener('touchmove',  (e) => { if (dragging) setPosition(getPercent(e)); }, { passive: true });

  window.addEventListener('mouseup',  () => { dragging = false; });
  window.addEventListener('touchend', () => { dragging = false; });
})();