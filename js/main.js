/* ================================================================
   CONFIGURATION EMAILJS — à remplir une seule fois.
   Va sur emailjs.com, crée ton compte avec anagkazointle@gmail.com,
   puis remplace les 3 valeurs ci-dessous par les tiennes :
   ================================================================ */
var EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // Account > General
var EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // Email Services
var EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Email Templates
/* ================================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Side navigation panel (drawer)
  var burger = document.getElementById('burger');
  var nav = document.getElementById('main-nav');
  var overlay = document.getElementById('nav-overlay');
  var navClose = document.getElementById('nav-close');

  function openNav() {
    nav.classList.add('open');
    overlay.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && nav && overlay) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });
    if (navClose) navClose.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // "Services" toggles its submenu instead of navigating away
    var dropdown = nav.querySelector('.nav-dropdown');
    if (dropdown) {
      var trigger = dropdown.querySelector('a');
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      });
    }
  }

  // Gallery marquee: duplicate items so the loop is seamless
  var track = document.getElementById('marquee-track');
  if (track) {
    var originalItems = Array.from(track.children);
    originalItems.forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  // Stats: slide up + fade in when scrolled into view
  var stats = document.querySelectorAll('.stat');
  if (stats.length && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    stats.forEach(function (stat) { statsObserver.observe(stat); });
  } else {
    // Fallback: if IntersectionObserver isn't supported, just show them
    stats.forEach(function (stat) { stat.classList.add('in-view'); });
  }

  // Quote form submission (EmailJS)
  var quoteForm = document.getElementById('quote-form');
  if (quoteForm && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = document.getElementById('submit-btn');
      var status = document.getElementById('form-status');

      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVOI EN COURS...';
      status.textContent = '';
      status.className = 'form-status';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, quoteForm)
        .then(function () {
          status.textContent = 'Votre demande a bien été envoyée. Nous vous répondons rapidement.';
          status.className = 'form-status success';
          quoteForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'DEMANDER';
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          status.textContent = "L'envoi a échoué. Merci de nous contacter directement par téléphone ou email.";
          status.className = 'form-status error';
          submitBtn.disabled = false;
          submitBtn.textContent = 'DEMANDER';
        });
    });
  }

  // Interactive map tooltip
  var mapVisual = document.getElementById('map-visual');
  var tooltip = document.getElementById('map-tooltip');
  if (mapVisual && tooltip) {
    var points = mapVisual.querySelectorAll('.commune-point');
    points.forEach(function (point) {
      point.addEventListener('mouseenter', function (e) {
        var label = point.getAttribute('data-label');
        tooltip.textContent = label;
        tooltip.classList.add('visible');
      });
      point.addEventListener('mousemove', function (e) {
        var rect = mapVisual.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left) + 'px';
        tooltip.style.top = (e.clientY - rect.top) + 'px';
      });
      point.addEventListener('mouseleave', function () {
        tooltip.classList.remove('visible');
      });
    });
  }
});
     
