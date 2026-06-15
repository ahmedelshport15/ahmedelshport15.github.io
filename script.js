// ============================================
// Ahmed Elshenawy — Portfolio interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-active');
    mobileNav.classList.toggle('is-open');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
    });
  });

  // Scroll reveal animations
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger items that enter together
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, i * 70);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // Cursor glow (desktop only)
  if (window.matchMedia('(min-width: 769px)').matches) {
    const glow = document.querySelector('.cursor-glow');
    window.addEventListener('mousemove', (e) => {
      glow.style.setProperty('--x', e.clientX + 'px');
      glow.style.setProperty('--y', e.clientY + 'px');
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

});
