/* =============================================
   LITTLE WINS — script.js
   FAQ accordion, nav, hamburger, WhatsApp form,
   scroll reveal, button press effects
   ============================================= */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });
 
  /* ── Nav shadow on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 2px 20px rgba(0,0,0,0.08)'
      : 'none';
  });
 
  /* ── Hamburger mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
 
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
 
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
 
  /* ── WhatsApp contact form ── */
  document.getElementById('wa-submit').addEventListener('click', () => {
    const name  = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const age   = document.getElementById('f-age').value;
    const msg   = document.getElementById('f-msg').value.trim();
 
    let text = 'Hello! I found you through your website and would like to enquire about your services.\n\n';
    if (name)  text += `*Name:* ${name}\n`;
    if (email) text += `*Email:* ${email}\n`;
    if (age)   text += `*Child\'s age:* ${age}\n`;
    if (msg)   text += `\n*Message:* ${msg}`;
 
    const url = 'https://wa.me/919920215029?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  });
 
  /* ── Scroll reveal (IntersectionObserver) ── */
 
  // Make sure every direct child of a stagger-children grid has a reveal class
  document.querySelectorAll('.stagger-children').forEach(grid => {
    Array.from(grid.children).forEach(child => {
      const hasReveal = ['reveal','reveal-left','reveal-right','reveal-pop']
        .some(cls => child.classList.contains(cls));
      if (!hasReveal) child.classList.add('reveal');
    });
  });
 
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
 
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-pop')
    .forEach(el => revealObserver.observe(el));
 
  /* ── Bouncy button press effect ── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .form-submit').forEach(btn => {
    btn.addEventListener('mousedown',  () => { btn.style.transform = 'scale(0.96)'; });
    btn.addEventListener('mouseup',    () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
 
});
 
  /* ── Team Slider ── */
  const slider = document.getElementById('teamSlider');
  const dots   = document.querySelectorAll('.team-dot');
  const prevBtn = document.getElementById('teamPrev');
  const nextBtn = document.getElementById('teamNext');
  let current = 0;
  const total = document.querySelectorAll('.team-card').length;
 
  function goTo(idx) {
    current = (idx + total) % total;
    slider.style.transform = `translateX(-${current * 100}%)`;
    slider.style.transition = 'transform 0.45s cubic-bezier(0.34,1.1,0.64,1)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
 
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));
 
  // Swipe support for mobile
  let touchStartX = 0;
  if (slider) {
    slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });
  }
 
