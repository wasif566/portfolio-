/* FixLab Device Care website template. Update the configuration below before publishing. */
const SITE_CONFIG = {
  businessName: 'FixLab Device Care',
  whatsappNumber: '923266438812', // International digits only; no + or spaces.
  phoneDisplay: '+92 326 6438812',
  phoneHref: '+923266438812',
  email: 'hello@example.com',
  address: 'Add your shop address, Faisalabad, Pakistan',
  hours: 'Monday–Saturday: 10:00 AM–7:00 PM',
  city: 'Faisalabad',
  country: 'Pakistan'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function applySiteConfig() {
  $$('[data-config="address"]').forEach(el => { el.textContent = SITE_CONFIG.address; });
  $$('[data-config="phone"]').forEach(el => { el.textContent = SITE_CONFIG.phoneDisplay; el.href = `tel:${SITE_CONFIG.phoneHref}`; });
  $$('[data-config="email"]').forEach(el => { el.textContent = SITE_CONFIG.email; el.href = `mailto:${SITE_CONFIG.email}`; });
  $$('[data-config="hours"]').forEach(el => { el.textContent = SITE_CONFIG.hours; });
  document.title = `${SITE_CONFIG.businessName} | Phone & Computer Repairs`;
  const schema = $('#business-schema');
  if (schema) {
    const data = JSON.parse(schema.textContent);
    data.name = SITE_CONFIG.businessName;
    data.telephone = SITE_CONFIG.phoneHref;
    data.email = SITE_CONFIG.email;
    data.address.streetAddress = SITE_CONFIG.address;
    data.address.addressLocality = SITE_CONFIG.city;
    data.address.addressCountry = SITE_CONFIG.country === 'Pakistan' ? 'PK' : SITE_CONFIG.country;
    schema.textContent = JSON.stringify(data);
  }
  $$('[data-whatsapp]').forEach(link => {
    const text = link.dataset.whatsapp === 'general'
      ? `Hello ${SITE_CONFIG.businessName}, I'd like to ask about a device repair. Please let me know the next steps.`
      : link.dataset.whatsapp;
    link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  });
}

function setupNavigation() {
  const toggle = $('.menu-toggle');
  const nav = $('#main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !isOpen);
  });
  $$('a', nav).forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

function setupDeviceFilters() {
  const buttons = $$('[data-device-filter]');
  const cards = $$('.device-card[data-device]');
  const empty = $('#filter-empty');
  buttons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.deviceFilter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let shown = 0;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.device === filter;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }));
}

function setupServiceFilters() {
  const buttons = $$('[data-service-filter]');
  const cards = $$('.service-card[data-kind]');
  const search = $('#service-search');
  const empty = $('#service-empty');
  let filter = 'all';
  function update() {
    const query = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const kind = card.dataset.kind;
      const searchable = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
      const matchesFilter = filter === 'all' || kind === filter || (filter === 'mobile' && kind === 'mobile') || (filter === 'computer' && kind === 'computer');
      const matchesSearch = !query || searchable.includes(query);
      const visible = matchesFilter && matchesSearch;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.serviceFilter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    update();
  }));
  search?.addEventListener('input', update);
}

function setupFaqs() {
  $$('.faq-question').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.closest('.faq-item')?.querySelector('.faq-answer');
    button.setAttribute('aria-expanded', String(!expanded));
    if (answer) answer.hidden = expanded;
  }));
}

function setupPrefillLinks() {
  $$('[data-prefill-device]').forEach(link => link.addEventListener('click', () => {
    const select = $('#device-category');
    if (select) select.value = link.dataset.prefillDevice;
  }));
  $$('[data-prefill-service]').forEach(link => link.addEventListener('click', () => {
    const select = $('#repair-type');
    if (!select) return;
    const desired = link.dataset.prefillService;
    const option = [...select.options].find(item => item.text === desired || item.value === desired);
    if (option) select.value = option.value;
    else select.value = 'Other / not sure';
  }));
}

function setupRepairForm() {
  const form = $('#repair-form');
  if (!form) return;
  const feedback = $('#form-feedback');
  const fields = {
    name: $('#customer-name'), phone: $('#customer-phone'), email: $('#customer-email'),
    device: $('#device-category'), model: $('#device-model'), repair: $('#repair-type'),
    issue: $('#issue-description'), privacy: $('#privacy-confirm')
  };
  const errors = {
    name: $('#name-error'), phone: $('#phone-error'), email: $('#email-error'),
    device: $('#device-error'), model: $('#model-error'), repair: $('#repair-error'),
    issue: $('#issue-error'), privacy: $('#privacy-error')
  };
  const clearError = key => {
    if (errors[key]) errors[key].textContent = '';
    if (fields[key] && key !== 'privacy') fields[key].removeAttribute('aria-invalid');
  };
  Object.entries(fields).forEach(([key, field]) => {
    const eventName = key === 'privacy' ? 'change' : 'input';
    field?.addEventListener(eventName, () => clearError(key));
  });
  function setError(key, message) {
    if (errors[key]) errors[key].textContent = message;
    if (fields[key] && key !== 'privacy') fields[key].setAttribute('aria-invalid', 'true');
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    Object.keys(errors).forEach(clearError);
    if (feedback) { feedback.hidden = true; feedback.textContent = ''; }
    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim();
    const email = fields.email.value.trim();
    const device = fields.device.value;
    const brand = $('#device-brand').value.trim();
    const model = fields.model.value.trim();
    const repair = fields.repair.value;
    const issue = fields.issue.value.trim();
    const date = $('#appointment-date').value;
    const time = $('#appointment-time').value;
    const method = $('#service-method').value;
    const notes = $('#additional-notes').value.trim();
    let valid = true;
    if (name.length < 2) { setError('name', 'Please enter your name.'); valid = false; }
    if (!/^[+\d(][\d\s()+.-]{6,}$/.test(phone)) { setError('phone', 'Enter a valid phone number.'); valid = false; }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Enter a valid email address or leave it blank.'); valid = false; }
    if (!device) { setError('device', 'Choose a device category.'); valid = false; }
    if (model.length < 1) { setError('model', 'Please enter the device model.'); valid = false; }
    if (!repair) { setError('repair', 'Choose a repair type.'); valid = false; }
    if (issue.length < 8) { setError('issue', 'Please describe the issue in a little more detail.'); valid = false; }
    if (!fields.privacy.checked) { if (errors.privacy) errors.privacy.textContent = 'Please confirm before preparing your enquiry.'; valid = false; }
    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]') || fields.privacy;
      firstInvalid?.focus();
      return;
    }
    // Intentionally do not include credential-like data; warn if the issue text appears to contain it.
    const sensitivePattern = /\b(password|passcode|pin|recovery key|secret key)\s*[:=]/i;
    if (sensitivePattern.test(`${issue} ${notes}`)) {
      setError('issue', 'Please remove any password, PIN, recovery key or other sensitive credential before continuing.');
      fields.issue.focus();
      return;
    }
    const messageLines = [
      `Hello ${SITE_CONFIG.businessName}, I'd like to enquire about a repair.`, '',
      `Customer: ${name}`, `Phone: ${phone}`,
      ...(email ? [`Email: ${email}`] : []),
      `Device: ${device}`, `Brand: ${brand || 'Not specified'}`, `Model: ${model}`,
      `Repair requested: ${repair}`, `Issue: ${issue}`,
      `Preferred date: ${date || 'Not specified'}`, `Preferred time: ${time || 'No preference'}`,
      `Service preference: ${method || 'Not specified'}`,
      ...(notes ? [`Additional notes: ${notes}`] : []), '',
      'I understand this is an enquiry only; appointment, repair feasibility, price and timing need confirmation.'
    ];
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
    if (feedback) {
      feedback.hidden = false;
      feedback.innerHTML = 'Your enquiry message is ready. WhatsApp will open in a new tab; review the message and press Send there. This does not confirm an appointment or final price. ';
      const link = document.createElement('a');
      link.href = whatsappUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = 'Open WhatsApp message ↗';
      feedback.appendChild(link);
      link.focus();
    } else {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  });
}

function setupDateMinimum() {
  const date = $('#appointment-date');
  if (date) {
    const localToday = new Date();
    const offset = localToday.getTimezoneOffset();
    const localDate = new Date(localToday.getTime() - offset * 60000).toISOString().slice(0, 10);
    date.min = localDate;
  }
}

function setupBackToTop() {
  const button = $('#back-top');
  button?.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applySiteConfig();
  setupNavigation();
  setupDeviceFilters();
  setupServiceFilters();
  setupFaqs();
  setupPrefillLinks();
  setupRepairForm();
  setupDateMinimum();
  setupBackToTop();
  const year = $('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
});
