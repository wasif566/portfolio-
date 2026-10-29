
(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  // Mobile navigation menu
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  // Automatic copyright year
  const yearElement = document.querySelector('#year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Prevent selecting a date in the past
  const dateInput = document.querySelector('input[name="date"]');

  if (dateInput) {
    const now = new Date();
    const localToday = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);

    dateInput.min = localToday;
  }

  // Automatically select the service the customer clicked
  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const serviceSelect = document.querySelector(
        'select[name="service"]'
      );

      if (serviceSelect) {
        serviceSelect.value = link.dataset.service;
      }
    });
  });

  // Booking form and WhatsApp integration
  const form = document.querySelector('#booking-form');
  const status = document.querySelector('#form-status');

  if (!form) return;

  let isSubmitting = false;

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Prevent duplicate submissions from repeated clicks
    if (isSubmitting) return;

    // Validate required fields
    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const fields = [
      ['Full name', data.get('name')],
      ['Contact telephone', data.get('phone')],
      ['Email', data.get('email')],
      ['Service type', data.get('service')],
      ['Pickup location', data.get('pickup')],
      ['Destination', data.get('destination')],
      ['Journey date', data.get('date')],
      ['Preferred pickup time', data.get('time')],
      ['Passengers', data.get('passengers')],
      ['Additional notes', data.get('notes')]
    ];

    // Include each supplied field only once
    const details = fields
      .filter(([, value]) => String(value ?? '').trim() !== '')
      .map(([label, value]) => `${label}: ${String(value).trim()}`)
      .join('\n');

    // Build one WhatsApp message
    const message =
      `Hello Imran's Taxi Service, I would like to request a taxi booking.\n\n` +
      `${details}\n\n` +
      `Please confirm availability and fare. ` +
      `I understand this is a request and not a confirmed booking.`;

    const whatsappUrl =
      `https://wa.me/353892336267?text=${encodeURIComponent(message)}`;

    // Lock the form to prevent accidental duplicate redirects
    isSubmitting = true;

    const submitButton = form.querySelector('[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Opening WhatsApp...';
    }

    if (status) {
      status.textContent =
        'Opening WhatsApp. Review your booking details and send the message to submit your request.';
    }

    // Redirect only once: do not combine window.open() with a fallback redirect
    window.location.assign(whatsappUrl);
  });
})();
