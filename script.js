/* SparkAisha Spa – JavaScript */

(function () {
  'use strict';

  // ── Sticky header ──────────────────────────────────────
  const header = document.getElementById('header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile nav toggle ──────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navList.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // ── Smooth active link highlighting ───────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  function highlightNav() {
    const scrollY = window.scrollY + 90;
    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Scroll-reveal animations ───────────────────────────
  const fadeEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .about__content, .about__visual, ' +
    '.gallery__item, .section__header, .contact__info, .contact__form'
  );

  fadeEls.forEach(function (el) {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });

  // ── Stagger service cards ──────────────────────────────
  document.querySelectorAll('.service-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.07) + 's';
  });

  document.querySelectorAll('.testimonial-card').forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

  // ── Booking form submission ────────────────────────────
  const form    = document.getElementById('booking-form');
  const success = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c62828';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate submission
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(function () {
        form.reset();
        submitBtn.textContent = 'Request Booking';
        submitBtn.disabled = false;
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(function () { success.hidden = true; }, 6000);
      }, 1200);
    });
  }

  // ── Set minimum date for date input ───────────────────
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    dateInput.min = yyyy + '-' + mm + '-' + dd;
  }

}());
