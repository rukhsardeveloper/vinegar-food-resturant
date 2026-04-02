/* =============================================
   VINEGAR FOOD RESTAURANT - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR ─────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    const btt = document.getElementById('backToTop');
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 400);
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav?.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      mobileNav?.classList.remove('open');
    });
  });

  // ── HERO SLIDER ─────────────────────────────────
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startSlider() {
    stopSlider();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  document.getElementById('sliderNext')?.addEventListener('click', () => { nextSlide(); startSlider(); });
  document.getElementById('sliderPrev')?.addEventListener('click', () => { prevSlide(); startSlider(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startSlider(); });
  });

  if (slides.length > 0) startSlider();

  // ── ROTATING TEXT ────────────────────────────────
  const rotatingItems = document.querySelectorAll('.rotating-text-item');
  let rotIdx = 0;

  function rotateText() {
    rotatingItems.forEach(r => r.classList.remove('active'));
    rotIdx = (rotIdx + 1) % rotatingItems.length;
    rotatingItems[rotIdx]?.classList.add('active');
  }

  if (rotatingItems.length > 0) {
    rotatingItems[0].classList.add('active');
    setInterval(rotateText, 2500);
  }

  // ── MENU TABS ────────────────────────────────────
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(tab.dataset.panel);
      panel?.classList.add('active');
    });
  });

  // ── SCROLL REVEAL ────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION ────────────────────────────
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || '');
      }
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.target), 2000);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ── BACK TO TOP ──────────────────────────────────
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── FORM SUBMISSION ──────────────────────────────
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✅ Success! Your message has been sent. We\'ll get back to you soon!');
      form.reset();
    });
  });

  // ── TOAST ────────────────────────────────────────
  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = `
        position:fixed; bottom:32px; left:50%; transform:translateX(-50%) translateY(80px);
        background:var(--dark); color:var(--white); padding:16px 28px; border-radius:50px;
        font-family:'Inter',sans-serif; font-size:0.92rem; font-weight:500;
        border:1px solid rgba(255,255,255,0.1); box-shadow:0 16px 48px rgba(0,0,0,0.4);
        z-index:9999; transition:transform 0.4s ease, opacity 0.4s ease; opacity:0;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    }, 10);
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(80px)';
      toast.style.opacity = '0';
    }, 4000);
  }

  // ── ACTIVE NAV LINK ──────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── GALLERY LIGHTBOX (simple) ────────────────────
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999;
        display:flex; align-items:center; justify-content:center; cursor:pointer;
        animation: fadeIn 0.3s ease;
      `;
      const enlarged = document.createElement('img');
      enlarged.src = img.src;
      enlarged.style.cssText = `
        max-width:90vw; max-height:88vh; border-radius:12px;
        box-shadow:0 32px 96px rgba(0,0,0,0.6);
        animation: zoomIn 0.3s ease;
      `;
      overlay.appendChild(enlarged);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

});
