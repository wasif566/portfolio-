/*
  VENUE CONFIGURATION
  Replace these placeholders with verified venue information before publishing.
  Only list facilities and packages the venue actually provides.
*/
const venueConfig = {
  name: "Evergreen Marquee",
  phoneDisplay: "+92 300 0000000",
  phoneLink: "+923000000000",
  whatsapp: "923266438812",
  address: "Add your complete venue address here",
  openingHours: "By appointment — please contact us",
  mapQuery: "Add your complete venue address here",
  facilities: [
    { icon: "✧", title: "Wedding Marquee", description: "Ask about available event layouts and arrangements." },
    { icon: "◇", title: "Banquet Space", description: "Discuss the space and setup suited to your occasion." },
    { icon: "❋", title: "Stage & Decoration", description: "Share your preferred theme and decoration ideas." },
    { icon: "♧", title: "Guest Seating", description: "Tell us your estimated guest count and seating needs." },
    { icon: "♨", title: "Catering Options", description: "Ask the venue about available food and catering arrangements." },
    { icon: "⌖", title: "Parking", description: "Confirm parking availability and arrangements with the team." },
    { icon: "✦", title: "Lighting & Ambience", description: "Discuss lighting and atmosphere for your event." },
    { icon: "◷", title: "Private Events", description: "Enquire about suitability for your planned celebration." }
  ],
  packages: [
    { name: "Intimate Celebration", kicker: "A PERSONAL GATHERING", description: "A starting point for discussing a smaller, more personal celebration.", features: ["Discuss your preferred date", "Review layout possibilities", "Ask about available services"], featured: false },
    { name: "Signature Wedding", kicker: "A DAY TO REMEMBER", description: "Explore options for a wedding celebration shaped around your plans.", features: ["Discuss event requirements", "Review decoration options", "Confirm inclusions with the team"], featured: true },
    { name: "Grand Occasion", kicker: "CELEBRATE TOGETHER", description: "Talk through your plans for a larger or multi-part celebration.", features: ["Discuss guest count", "Ask about event scheduling", "Request a tailored quotation"], featured: false }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function renderFacilities() {
  const grid = $("#facility-grid");
  grid.innerHTML = venueConfig.facilities.map(item => `
    <article class="facility-card">
      <span class="facility-symbol" aria-hidden="true">${item.icon}</span>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
    </article>`).join("");
}

function renderPackages() {
  const grid = $("#package-grid");
  const select = $("#package-select");
  grid.innerHTML = venueConfig.packages.map((item, index) => `
    <article class="package-card ${item.featured ? "featured" : ""}">
      ${item.featured ? '<span class="package-tag">POPULAR OPTION</span>' : ""}
      <span class="package-kicker">${escapeHTML(item.kicker)}</span>
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <ul>${item.features.map(feature => `<li>${escapeHTML(feature)}</li>`).join("")}</ul>
      <button type="button" class="btn ${item.featured ? "btn-gold" : "btn-dark-outline"} package-enquire" data-package="${escapeHTML(item.name)}">Enquire about this package <span>↗</span></button>
    </article>`).join("");
  select.insertAdjacentHTML("beforeend", venueConfig.packages.map(item => `<option value="${escapeHTML(item.name)}">${escapeHTML(item.name)}</option>`).join(""));
  $$(".package-enquire").forEach(button => button.addEventListener("click", () => {
    select.value = button.dataset.package;
    $("#inquiry").scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    select.focus({ preventScroll: true });
  }));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

function configureVenueDetails() {
  $$("[data-business-name]").forEach(el => el.textContent = venueConfig.name);
  $("[data-address]").textContent = venueConfig.address;
  $("[data-phone]").textContent = venueConfig.phoneDisplay;
  $("[data-hours]").textContent = venueConfig.openingHours;
  $("#phone-link").href = `tel:${venueConfig.phoneLink}`;
  $("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueConfig.mapQuery)}`;
  $("#year").textContent = new Date().getFullYear();
}

function setupNavigation() {
  const toggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  $$("#primary-nav a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
}

function setupInquiryForm() {
  const form = $("#inquiry-form");
  const eventDate = form.elements.eventDate;
  const visitDate = form.elements.visitDate;
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  eventDate.min = localToday;
  visitDate.min = localToday;
  eventDate.addEventListener("change", () => { visitDate.max = eventDate.value || ""; });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const error = $("#form-error");
    error.hidden = true;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      `Hello ${venueConfig.name}, I'd like to enquire about an event.`,
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Event type: ${data.get("eventType")}`,
      `Package: ${data.get("package") || "Not sure yet"}`,
      `Preferred event date: ${data.get("eventDate")}`,
      `Estimated guests: ${data.get("guests")}`,
      `Preferred visit date: ${data.get("visitDate") || "Not specified"}`,
      `Additional requirements: ${data.get("requirements") || "None provided"}`,
      "",
      "I understand this is an enquiry only and that availability and pricing need to be confirmed by the venue."
    ];
    const url = `https://wa.me/${venueConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      error.textContent = "Your browser blocked the WhatsApp window. Use the link below to continue.";
      error.hidden = false;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open WhatsApp with your enquiry";
      link.className = "text-link";
      error.appendChild(document.createElement("br"));
      error.appendChild(link);
    }
  });
}

function setupGallery() {
  const items = $$(".gallery-item");
  const lightbox = $("#lightbox");
  const image = $("#lightbox-image");
  const caption = $("#lightbox-caption");
  let activeIndex = 0;
  let lastFocus = null;
  const show = index => {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    image.src = item.dataset.gallerySrc;
    image.alt = item.dataset.galleryAlt;
    caption.textContent = item.dataset.galleryAlt;
  };
  const open = index => {
    lastFocus = document.activeElement;
    show(index);
    lightbox.hidden = false;
    $(".lightbox-close").focus();
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };
  items.forEach((item, index) => item.addEventListener("click", () => open(index)));
  $(".lightbox-close").addEventListener("click", close);
  $(".lightbox-prev").addEventListener("click", () => show(activeIndex - 1));
  $(".lightbox-next").addEventListener("click", () => show(activeIndex + 1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
  document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(activeIndex - 1);
    if (event.key === "ArrowRight") show(activeIndex + 1);
  });
}

configureVenueDetails();
renderFacilities();
renderPackages();
setupNavigation();
setupInquiryForm();
setupGallery();
