/*
 * SHOP CONFIGURATION — replace sample entries with verified business details.
 * Product prices, dimensions, materials and availability are intentionally left unspecified.
 */
const shopConfig = {
  name: "Oak & Form",
  phoneDisplay: "+92 300 0000000",
  phoneLink: "+923000000000",
  email: "hello@example.com",
  address: "Add your complete showroom address here",
  mapQuery: "Add your complete showroom address here",
  openingHours: "Update opening hours",
  whatsapp: "923266438812",
  socialLinks: [
    // Add verified social links, for example: { label: "Instagram", url: "https://instagram.com/yourshop" }
  ],
  categories: [
    { name: "Sofas & Living", image: "assets/sofa.svg", description: "Comfort for shared spaces" },
    { name: "Beds & Bedroom", image: "assets/bed.svg", description: "Make room to unwind" },
    { name: "Dining Furniture", image: "assets/dining.svg", description: "Gather around the table" },
    { name: "Wardrobes & Storage", image: "assets/storage.svg", description: "Bring order to your space" },
    { name: "Office Furniture", image: "assets/office.svg", description: "Make work feel considered" },
    { name: "Coffee Tables", image: "assets/coffee.svg", description: "The finishing touch" },
    { name: "Outdoor Furniture", image: "assets/outdoor.svg", description: "Furniture for open air" },
    { name: "Custom Furniture", image: "assets/custom.svg", description: "Discuss a made-for-you piece" }
  ],
  products: [
    { id: "living-sofa", name: "Living Room Sofa", category: "Sofas & Living", description: "Explore sofa styles for everyday lounging and entertaining.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=82", alt: "Contemporary sofa in a furnished living room", details: "Ask about dimensions, upholstery, and available finishes." },
    { id: "accent-chair", name: "Accent Chair", category: "Sofas & Living", description: "A considered seating option for a reading corner or lounge.", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=82", alt: "Accent chair in a calm interior", details: "Confirm materials and colour choices with the shop." },
    { id: "bedroom-bed", name: "Bedroom Bed", category: "Beds & Bedroom", description: "Explore bed styles to complement your bedroom.", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=82", alt: "Bedroom with a bed and neutral linens", details: "Ask about size options, construction, and finishes." },
    { id: "dining-table", name: "Dining Table", category: "Dining Furniture", description: "A central piece for meals, conversations, and gatherings.", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=82", alt: "Dining table in a modern dining space", details: "Confirm dimensions, materials, and seating options." },
    { id: "wardrobe", name: "Wardrobe & Storage", category: "Wardrobes & Storage", description: "Discuss storage layouts suited to your room.", image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=900&q=82", alt: "Modern bedroom storage and furniture", details: "Custom sizing and internal layouts require confirmation." },
    { id: "office-desk", name: "Office Desk", category: "Office Furniture", description: "A practical starting point for a home or office workspace.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82", alt: "Desk and furniture in a modern workspace", details: "Ask about desk dimensions, storage, and finish choices." },
    { id: "coffee-table", name: "Coffee Table", category: "Coffee Tables", description: "Complete your seating area with a coordinating table.", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=82", alt: "Coffee table in a styled interior", details: "Confirm product specifications and finish options." },
    { id: "outdoor-set", name: "Outdoor Furniture", category: "Outdoor Furniture", description: "Ask about furniture options for patios and outdoor areas.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82", alt: "Styled home interior used as outdoor furniture category inspiration", details: "Image is illustrative; confirm the actual product and outdoor suitability." },
    { id: "custom-piece", name: "Custom Furniture Enquiry", category: "Custom Furniture", description: "Tell us about the piece you want to discuss making to your requirements.", image: "assets/custom.svg", alt: "Simple illustration representing custom furniture design", details: "Feasibility, materials, pricing, and lead times must be confirmed." }
  ]
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let activeProducts = [...shopConfig.products];

function renderCategories() {
  $("#category-grid").innerHTML = shopConfig.categories.map(category => `
    <button class="category-card" type="button" data-category="${escapeHTML(category.name)}">
      <img src="${escapeHTML(category.image)}" alt="" loading="lazy">
      <span><strong>${escapeHTML(category.name)}</strong><small>${escapeHTML(category.description)}</small></span>
    </button>`).join("");
  const filter = $("#category-filter");
  filter.insertAdjacentHTML("beforeend", shopConfig.categories.map(c => `<option value="${escapeHTML(c.name)}">${escapeHTML(c.name)}</option>`).join(""));
  $$(".category-card").forEach(button => button.addEventListener("click", () => {
    filter.value = button.dataset.category;
    applyFilters();
    $("#shop").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  }));
}

function productCard(product) {
  const hasPrice = product.price !== undefined && product.price !== null && String(product.price).trim() !== "";
  const price = hasPrice ? `<div class="product-price">${escapeHTML(product.price)}</div>` : `<div class="product-price unsupplied">Price on enquiry</div>`;
  const meta = [product.dimensions, product.materials, product.availability].filter(Boolean).join(" · ");
  const image = product.image || "assets/custom.svg";
  return `<article class="product-card">
    <div class="product-photo"><img src="${escapeHTML(image)}" alt="${escapeHTML(product.alt || product.name)}" loading="lazy" data-fallback="assets/custom.svg"><span class="product-category">${escapeHTML(product.category)}</span></div>
    <div class="product-info"><h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.description)}</p>
    ${meta ? `<div class="product-meta">${escapeHTML(meta)}</div>` : ""}
    ${price}<div class="product-actions"><button type="button" class="details-button" data-id="${escapeHTML(product.id)}">View Details</button><button type="button" class="enquire-button" data-id="${escapeHTML(product.id)}">Enquire ↗</button></div></div>
  </article>`;
}

function renderProducts(products) {
  activeProducts = products;
  const grid = $("#product-grid");
  grid.innerHTML = products.length ? products.map(productCard).join("") : '<div class="empty-state">No furniture matched your search. Try a different term or category.</div>';
  $("#result-count").textContent = `${products.length} item${products.length === 1 ? "" : "s"}`;
  $$("img[data-fallback]", grid).forEach(img => img.addEventListener("error", () => {
    if (img.dataset.didFallback) return;
    img.dataset.didFallback = "true";
    img.src = img.dataset.fallback;
    img.classList.add("fallback");
  }));
  $$(".enquire-button", grid).forEach(button => button.addEventListener("click", () => selectProduct(button.dataset.id)));
  $$(".details-button", grid).forEach(button => button.addEventListener("click", () => showProductDetails(button.dataset.id)));
}

function applyFilters() {
  const query = $("#product-search").value.trim().toLowerCase();
  const category = $("#category-filter").value;
  const filtered = shopConfig.products.filter(product => {
    const matchesCategory = category === "all" || product.category === category;
    const searchable = [product.name, product.category, product.description, product.details, product.materials, product.dimensions].filter(Boolean).join(" ").toLowerCase();
    return matchesCategory && searchable.includes(query);
  });
  renderProducts(filtered);
}

function showProductDetails(id) {
  const product = shopConfig.products.find(p => p.id === id);
  if (!product) return;
  const details = [
    product.name,
    product.description,
    product.details || "",
    product.dimensions ? `Dimensions: ${product.dimensions}` : "",
    product.materials ? `Materials: ${product.materials}` : "",
    product.colors ? `Colours / finishes: ${product.colors}` : "",
    product.price ? `Price: ${product.price}` : "Price: please enquire",
    product.availability ? `Availability: ${product.availability}` : "Availability: to be confirmed"
  ].filter(Boolean).join("\n");
  window.alert(details);
}

function selectProduct(id) {
  const product = shopConfig.products.find(p => p.id === id);
  if (!product) return;
  $("#inquiry-product").value = product.id;
  $("#inquiry").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  $("#inquiry-product").focus({ preventScroll: true });
}

function renderProductSelect() {
  const select = $("#inquiry-product");
  select.insertAdjacentHTML("beforeend", shopConfig.products.map(p => `<option value="${escapeHTML(p.id)}">${escapeHTML(p.name)}</option>`).join(""));
}

function configureBusiness() {
  $$("[data-shop-name]").forEach(el => el.textContent = shopConfig.name);
  $("[data-phone]").textContent = shopConfig.phoneDisplay;
  $("#phone-link").href = `tel:${shopConfig.phoneLink}`;
  $("[data-email]").textContent = shopConfig.email;
  $("#email-link").href = `mailto:${shopConfig.email}`;
  $("[data-address]").textContent = shopConfig.address;
  $("[data-hours]").textContent = shopConfig.openingHours;
  $("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopConfig.mapQuery)}`;
  $("#year").textContent = new Date().getFullYear();
  const social = $("#social-links");
  social.innerHTML = shopConfig.socialLinks.filter(link => link.url && link.url.startsWith("https://")).map(link => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)}</a>`).join("");
  if (!social.children.length) social.hidden = true;
  $("#floating-whatsapp").href = `https://wa.me/${shopConfig.whatsapp}`;
}

function setupNavigation() {
  const toggle = $(".menu-toggle"), nav = $("#nav");
  function close() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $$("#nav a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function setupInquiry() {
  const form = $("#inquiry-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const error = $("#form-error");
    error.hidden = true;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const selectedId = data.get("product");
    const product = shopConfig.products.find(p => p.id === selectedId);
    const lines = [
      `Hello ${shopConfig.name}, I'd like to enquire about furniture.`,
      "",
      `Customer name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Selected product: ${product ? product.name : "General / custom enquiry"}`,
      `Quantity: ${data.get("quantity")}`,
      `Preferred material / finish: ${data.get("finish") || "Not specified"}`,
      `Custom dimensions: ${data.get("dimensions") || "Not specified"}`,
      `Delivery location: ${data.get("location")}`,
      `Additional requirements: ${data.get("requirements") || "None provided"}`,
      "",
      "Please confirm product availability, specifications, price, and delivery details. I understand I need to send this message manually."
    ];
    const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      error.hidden = false;
      error.textContent = "Your browser blocked the WhatsApp window. Use the link below to continue.";
      const link = document.createElement("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.textContent = "Open WhatsApp with your enquiry"; link.className = "under-link";
      error.append(document.createElement("br"), link);
    }
  });
}

function setupGallery() {
  const items = $$(".gallery-item"), lightbox = $("#lightbox"), image = $("#lightbox-img"), caption = $("#lightbox-caption");
  let index = 0, lastFocus = null;
  function show(next) {
    index = (next + items.length) % items.length;
    image.src = items[index].dataset.src;
    image.alt = items[index].dataset.alt;
    caption.textContent = items[index].dataset.alt;
  }
  function open(i) {
    lastFocus = document.activeElement; show(i); lightbox.hidden = false;
    $(".lightbox-close").focus(); document.body.style.overflow = "hidden";
  }
  function close() {
    lightbox.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  items.forEach((item, i) => item.addEventListener("click", () => open(i)));
  $(".lightbox-close").addEventListener("click", close);
  $(".lightbox-prev").addEventListener("click", () => show(index - 1));
  $(".lightbox-next").addEventListener("click", () => show(index + 1));
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
}
function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

configureBusiness();
renderCategories();
renderProductSelect();
renderProducts(shopConfig.products);
$("#product-search").addEventListener("input", applyFilters);
$("#category-filter").addEventListener("change", applyFilters);
setupNavigation();
setupInquiry();
setupGallery();
