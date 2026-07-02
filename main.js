/* ================================================================
   Numéro WhatsApp de l'entreprise pour la réception des devis.
   ================================================================ */
var WHATSAPP_NUMBER = "22996863058";
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

  // Quote form submission → opens WhatsApp with a pre-filled message
  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (document.getElementById('from_name') || {}).value || '';
      var phone = (document.getElementById('from_phone') || {}).value || '';
      var email = (document.getElementById('from_email') || {}).value || '';
      var projectType = (document.getElementById('project_type') || {}).value || '';
      var location = (document.getElementById('location') || {}).value || '';
      var budget = (document.getElementById('budget') || {}).value || '';
      var message = (document.getElementById('message') || {}).value || '';

      var lines = [
        'Bonjour ANAGKAZO INTLE, je souhaite une demande de devis :',
        '',
        'Nom : ' + name,
        'Téléphone : ' + phone
      ];
      if (email) lines.push('Email : ' + email);
      lines.push('Type de projet : ' + projectType);
      if (location) lines.push('Localisation : ' + location);
      if (budget) lines.push('Budget approximatif : ' + budget);
      lines.push('', 'Message :', message);

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

      window.open(url, '_blank');
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
