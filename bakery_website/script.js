(() => {
  // Edit this data to match the real menu. Leave price blank until confirmed.
  const products = [
    {id:'birthday-cake', name:'Birthday Cake', category:'cakes', categoryLabel:'Cakes', description:'A celebration centrepiece. Ask about available designs and sizes.', price:'', image:'assets/hero-bakery.svg', alt:'Illustrated celebration cake'},
    {id:'wedding-cake', name:'Wedding Cake', category:'cakes', categoryLabel:'Cakes', description:'Discuss your event, design, servings, and lead time with us.', price:'', image:'assets/custom-cake.svg', alt:'Illustrated decorated cake'},
    {id:'custom-cake', name:'Custom Cake', category:'cakes', categoryLabel:'Cakes', description:'Share a theme or reference image and ask about possibilities.', price:'', image:'assets/custom-cake.svg', alt:'Illustrated custom celebration cake'},
    {id:'cupcakes', name:'Cupcakes', category:'cupcakes', categoryLabel:'Cupcakes', description:'A small sweet treat for parties, gifts, or everyday moments.', price:'', image:'assets/cupcakes.svg', alt:'Illustrated cupcakes'},
    {id:'pastries', name:'Pastry Selection', category:'pastries', categoryLabel:'Pastries', description:'Ask which pastries are available today and confirm ingredients.', price:'', image:'assets/pastry.svg', alt:'Illustrated pastry selection'},
    {id:'bread-rolls', name:'Bread & Rolls', category:'bread', categoryLabel:'Bread & rolls', description:'Ask about available breads, rolls, sizes, and collection times.', price:'', image:'assets/bread.svg', alt:'Illustrated bread and rolls'},
    {id:'cookies', name:'Cookies & Biscuits', category:'cookies', categoryLabel:'Cookies', description:'Ask about the current cookie selection and pack sizes.', price:'', image:'assets/cookies.svg', alt:'Illustrated cookies and biscuits'},
    {id:'desserts', name:'Dessert Treats', category:'desserts', categoryLabel:'Desserts', description:'Ask about dessert options for your table or gathering.', price:'', image:'assets/pastry.svg', alt:'Illustrated dessert treats'}
  ];
  const grid = document.querySelector('#product-grid');
  const productSelect = document.querySelector('#product');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const orderForm = document.querySelector('#order-form');
  const error = document.querySelector('#form-error');
  const dateInput = document.querySelector('#date');
  const fulfilment = document.querySelector('#fulfilment');
  const addressField = document.querySelector('#address-field');
  const addressInput = document.querySelector('#address');

  // Set minimum date to the visitor's local date.
  if (dateInput) {
    const now = new Date();
    const localDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    dateInput.min = localDate;
  }

  function renderProducts(filter = 'all') {
    if (!grid) return;
    const visible = products.filter(product => filter === 'all' || product.category === filter);
    grid.innerHTML = visible.map(product => `
      <article class="product-card">
        <div class="product-image"><img src="${product.image}" alt="${product.alt}" loading="lazy" onerror="this.onerror=null;this.src='assets/fallback.svg';"></div>
        <div class="product-body"><span class="product-meta">${product.categoryLabel}</span><h3>${product.name}</h3><p>${product.description}</p>
          <div class="product-bottom"><span class="product-price">${product.price ? product.price : 'Price on inquiry'}</span><button type="button" class="order-item-btn" data-product="${product.id}">Order this item ↗</button></div>
        </div>
      </article>`).join('');
  }
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
  renderProducts();

  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderProducts(button.dataset.filter);
  }));

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-product]');
    if (!button) return;
    productSelect.value = button.dataset.product;
    document.querySelector('#order').scrollIntoView({behavior:'smooth'});
    productSelect.focus({preventScroll:true});
  });

  document.querySelectorAll('[data-custom-start]').forEach(link => link.addEventListener('click', () => {
    productSelect.value = 'custom-cake';
    const notes = document.querySelector('#notes');
    if (notes && !notes.value) notes.value = 'Custom cake inquiry — please contact me about design options.';
  }));

  if (fulfilment) {
    const updateAddress = () => {
      const delivery = fulfilment.value.startsWith('Delivery');
      addressField.hidden = !delivery;
      addressInput.required = delivery;
    };
    fulfilment.addEventListener('change', updateAddress);
    updateAddress();
  }

  if (orderForm) {
    orderForm.addEventListener('submit', event => {
      event.preventDefault();
      error.textContent = '';
      if (!orderForm.checkValidity()) {
        error.textContent = 'Please complete the required fields and check your details.';
        const invalid = orderForm.querySelector(':invalid');
        if (invalid) invalid.focus();
        orderForm.reportValidity();
        return;
      }
      const data = new FormData(orderForm);
      const requestedDate = data.get('date');
      const date = new Date(`${requestedDate}T00:00:00`);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (Number.isNaN(date.getTime()) || date < today) {
        error.textContent = 'Please choose today or a future date.';
        dateInput.focus();
        return;
      }
      const selectedProduct = products.find(product => product.id === data.get('product'));
      const lines = [
        'Sweet Crumb Bakery — Order Inquiry',
        '',
        `Customer name: ${data.get('customer')}`,
        `Contact telephone: ${data.get('phone')}`,
        `Email: ${data.get('email') || 'Not provided'}`,
        `Product: ${selectedProduct ? selectedProduct.name : data.get('product')}`,
        `Quantity: ${data.get('quantity')}`,
        `Flavour / size: ${data.get('flavour') || 'Please advise'}`,
        `Occasion: ${data.get('occasion') || 'Not specified'}`,
        `Collection or delivery: ${data.get('fulfilment')}`,
        `Delivery address: ${data.get('address') || 'Not applicable / not provided'}`,
        `Required date: ${requestedDate}`,
        `Preferred time: ${data.get('time') || 'Flexible / please advise'}`,
        `Customisation / notes: ${data.get('notes') || 'None'}`,
        '',
        'Please confirm availability, final pricing, customisation, and collection or delivery arrangements. I understand this is an inquiry and not a confirmed or paid order.'
      ];
      const url = 'https://wa.me/923266438812?text=' + encodeURIComponent(lines.join('\\n'));
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

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
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();