(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll('.choose-level').forEach(button => {
    button.addEventListener('click', () => {
      const level = document.querySelector('#level');
      if (level) {
        const wanted = button.dataset.level;
        const option = Array.from(level.options).find(item => item.value === wanted || item.textContent === wanted);
        if (option) level.value = option.value;
        else if (wanted.includes('Middle')) level.value = 'Middle School';
        document.querySelector('#inquiry').scrollIntoView({ behavior: 'smooth' });
        level.focus({ preventScroll: true });
      }
    });
  });

  const form = document.querySelector('#admission-form');
  const error = document.querySelector('#form-error');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      error.textContent = '';
      if (!form.checkValidity()) {
        error.textContent = 'Please complete the required fields and check the email address if provided.';
        const invalid = form.querySelector(':invalid');
        if (invalid) invalid.focus();
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const lines = [
        'Private School Admission Inquiry',
        '',
        `Parent / guardian: ${data.get('guardian')}`,
        `Contact telephone: ${data.get('phone')}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Student first name: ${data.get('student') || 'Not provided'}`,
        `Academic level: ${data.get('level')}`,
        `Academic year / session: ${data.get('session')}`,
        `Preferred campus: ${data.get('campus') || 'Not specified'}`,
        `Additional inquiry: ${data.get('message') || 'None'}`,
        '',
        'I understand this inquiry is not an admission confirmation and will await verified information from the school.'
      ];
      const url = 'https://wa.me/923266438812?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();