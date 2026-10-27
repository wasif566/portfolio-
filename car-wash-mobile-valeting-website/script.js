/* GlossWorks starter site. Edit BUSINESS below before publishing. */
const BUSINESS = {
  name: "GlossWorks",
  whatsapp: "923266438812", // digits only, country code included
  phoneDisplay: "+92 326 6438812"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const waUrl = (message = `Hi ${BUSINESS.name}, I'd like to ask about your car wash and valeting services.`) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

$$("[data-whatsapp-link]").forEach(link => {
  link.href = waUrl();
  link.addEventListener("click", () => { /* Standard external WhatsApp link */ });
});

// Responsive navigation
const navToggle = $(".nav-toggle");
const nav = $("#primary-nav");
navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
$$('#primary-nav a').forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
}));

// Set a safe minimum date for booking requests.
const dateInput = $("#preferred-date");
if (dateInput) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localDate;
}

// Package links preselect the matching booking package.
function selectPackage(packageName) {
  const select = $("#package-select");
  if (!select) return;
  const option = [...select.options].find(o => o.value === packageName || o.textContent.trim() === packageName);
  if (option) select.value = option.value;
}
$$("[data-package]").forEach(el => el.addEventListener("click", event => {
  const packageName = el.dataset.package;
  selectPackage(packageName);
  // Buttons inside package cards and service cards navigate to the form.
  if (el.matches("button")) {
    event.preventDefault();
    $("#booking")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => $("#package-select")?.focus({ preventScroll: true }), 250);
  }
}));

// Mobile valeting reveals a required location field.
const locationField = $("#location-field");
const locationInput = $("#vehicle-location");
function updateServiceFields() {
  const selected = $('input[name="serviceType"]:checked')?.value;
  const isMobile = selected === "Mobile valeting";
  locationField?.classList.toggle("is-visible", isMobile);
  if (locationInput) {
    locationInput.required = isMobile;
    if (!isMobile) locationInput.value = "";
  }
}
$$('input[name="serviceType"]').forEach(input => input.addEventListener("change", updateServiceFields));
updateServiceFields();

// Booking form validation and WhatsApp message builder.
const form = $("#booking-form");
const errorBox = $("#form-error");
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (errorBox) errorBox.textContent = "";
  const data = new FormData(form);
  const requiredNames = ["name", "phone", "make", "model", "vehicleType", "package", "date", "time", "serviceType"];
  const missing = requiredNames.filter(name => !String(data.get(name) || "").trim());
  if (data.get("serviceType") === "Mobile valeting" && !String(data.get("location") || "").trim()) missing.push("location");
  const email = String(data.get("email") || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorBox.textContent = "Please enter a valid email address, or leave it blank.";
    form.elements.email.focus();
    return;
  }
  if (missing.length) {
    errorBox.textContent = "Please complete the required fields marked with * before continuing.";
    const first = form.querySelector(`[name="${missing[0]}"]`);
    first?.focus();
    return;
  }
  const extras = data.getAll("extras");
  const message = [
    `Hi ${BUSINESS.name}, I'd like to request a car care booking. Please confirm availability and the final quote.`,
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${email || "Not provided"}`,
    `Vehicle: ${data.get("make")} ${data.get("model")}`,
    `Vehicle type: ${data.get("vehicleType")}`,
    `Registration: ${data.get("registration") || "Not provided"}`,
    `Package: ${data.get("package")}`,
    `Additional services: ${extras.length ? extras.join(", ") : "None selected"}`,
    `Service type: ${data.get("serviceType")}`,
    `Vehicle location: ${data.get("serviceType") === "Mobile valeting" ? data.get("location") : "Fixed location / to be confirmed"}`,
    `Preferred date: ${data.get("date")}`,
    `Preferred time: ${data.get("time")}`,
    `Vehicle condition / requirements: ${data.get("condition") || "Not provided"}`,
    `Additional notes: ${data.get("notes") || "None"}`,
    "",
    "I understand this is a request and the appointment is not confirmed until you reply."
  ].join("\n");
  const url = waUrl(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
});

// Gallery filters
const galleryItems = $$(".gallery-item");
$$(".filter-button").forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  $$(".filter-button").forEach(b => {
    const active = b === button;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });
  galleryItems.forEach(item => {
    item.hidden = filter !== "all" && item.dataset.category !== filter;
  });
}));

// Accessible gallery lightbox with previous / next controls.
const lightbox = $("#lightbox");
const lightboxImage = $("img", lightbox);
const lightboxCaption = $(".lightbox-caption", lightbox);
let activeGalleryIndex = 0;
let visibleGalleryItems = [];
let lastFocusedElement = null;
function openLightbox(item) {
  visibleGalleryItems = galleryItems.filter(i => !i.hidden);
  activeGalleryIndex = visibleGalleryItems.indexOf(item);
  if (activeGalleryIndex < 0) activeGalleryIndex = 0;
  lastFocusedElement = document.activeElement;
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $(".lightbox-close", lightbox).focus();
}
function renderLightbox() {
  const item = visibleGalleryItems[activeGalleryIndex];
  if (!item) return;
  lightboxImage.src = item.dataset.full || $("img", item).src;
  lightboxImage.alt = $("img", item).alt;
  lightboxCaption.textContent = item.querySelector("span")?.textContent || "Gallery image";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
  lastFocusedElement?.focus();
}
function moveLightbox(direction) {
  if (!visibleGalleryItems.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + visibleGalleryItems.length) % visibleGalleryItems.length;
  renderLightbox();
}
galleryItems.forEach(item => item.addEventListener("click", () => openLightbox(item)));
$(".lightbox-close")?.addEventListener("click", closeLightbox);
$(".lightbox-prev")?.addEventListener("click", () => moveLightbox(-1));
$(".lightbox-next")?.addEventListener("click", () => moveLightbox(1));
lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox?.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

// Back-to-top control and footer year.
const backTop = $("#back-to-top");
window.addEventListener("scroll", () => backTop?.classList.toggle("visible", window.scrollY > 500), { passive: true });
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
$("#year").textContent = new Date().getFullYear();

// Remote image fallback: avoid broken-image icons if a source is unavailable.
$$("img").forEach(img => img.addEventListener("error", () => {
  img.style.background = "linear-gradient(135deg,#202b35,#596775)";
  img.alt = img.alt || "Automotive image unavailable";
}, { once: true }));
