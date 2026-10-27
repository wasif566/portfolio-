/* FreshNest website interactions. Update BUSINESS.whatsapp before publishing. */
const BUSINESS = {
  whatsapp: "923266438812",
  name: "FreshNest Carpet & Upholstery Care"
};

const waUrl = (message) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = link.dataset.message || `Hello! I'd like to enquire about cleaning services from ${BUSINESS.name}.`;
  link.href = waUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
}));

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    const select = document.querySelector("#service-type");
    if (select) {
      const matchingOption = [...select.options].find((option) =>
        option.value.toLowerCase() === service.toLowerCase() ||
        option.text.toLowerCase() === service.toLowerCase()
      );
      if (matchingOption) select.value = matchingOption.value;
      else {
        const other = [...select.options].find((option) => /other|not sure/i.test(option.text));
        if (other) select.value = other.value;
      }
    }
    const message = `Hello! I'd like to enquire about: ${service}. Please let me know the options and quote.`;
    const form = document.querySelector("#booking-form");
    if (form && select) {
      document.querySelector("#booking").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
      select.focus({preventScroll:true});
      // Store chosen package/service so the WhatsApp message includes the exact name.
      form.dataset.selectedService = service;
    } else {
      window.open(waUrl(message), "_blank", "noopener,noreferrer");
    }
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const galleryItems = [...document.querySelectorAll(".gallery-item")];
filterButtons.forEach((button) => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  galleryItems.forEach((item) => {
    item.hidden = filter !== "all" && item.dataset.category !== filter;
  });
}));

const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
let currentGalleryIndex = 0;
const visibleGalleryItems = () => galleryItems.filter((item) => !item.hidden);
function showLightbox(index) {
  const visible = visibleGalleryItems();
  if (!visible.length || !lightbox) return;
  currentGalleryIndex = (index + visible.length) % visible.length;
  const item = visible[currentGalleryIndex];
  const image = item.querySelector("img");
  lightboxImg.src = item.dataset.full || image.src;
  lightboxImg.alt = image.alt;
  lightboxCaption.textContent = item.querySelector(".gallery-caption")?.innerText.replace(/\n/g, " — ") || image.alt;
  lightbox.hidden = false;
  document.body.classList.add("no-scroll");
  lightbox.querySelector(".lightbox-close").focus();
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove("no-scroll");
}
galleryItems.forEach((item) => item.addEventListener("click", () => showLightbox(visibleGalleryItems().indexOf(item))));
lightbox?.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox?.querySelector(".lightbox-prev").addEventListener("click", () => showLightbox(currentGalleryIndex - 1));
lightbox?.querySelector(".lightbox-next").addEventListener("click", () => showLightbox(currentGalleryIndex + 1));
lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightbox(currentGalleryIndex - 1);
  if (event.key === "ArrowRight") showLightbox(currentGalleryIndex + 1);
});

const form = document.querySelector("#booking-form");
const dateInput = document.querySelector("#preferred-date");
if (dateInput) {
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
}
const validators = {
  name: (value) => value.trim().length >= 2 ? "" : "Please enter your name.",
  phone: (value) => value.trim().length >= 7 ? "" : "Please enter a valid phone number.",
  property: (value) => value ? "" : "Please choose a property type.",
  service: (value) => value ? "" : "Please select a service.",
  count: (value) => value.trim() ? "" : "Please tell us how many rooms or items.",
  location: (value) => value.trim() ? "" : "Please enter your location or postcode.",
  date: (value) => value ? "" : "Please choose a preferred date.",
  time: (value) => value ? "" : "Please choose a preferred time."
};
function setError(field, message) {
  const input = form?.elements[field];
  if (!input) return;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  const error = input.closest(".form-field")?.querySelector(".error-message");
  if (error) error.textContent = message;
}
Object.keys(validators).forEach((field) => {
  const input = form?.elements[field];
  input?.addEventListener("blur", () => setError(field, validators[field](input.value)));
  input?.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") setError(field, validators[field](input.value));
  });
  input?.addEventListener("change", () => setError(field, validators[field](input.value)));
});
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#form-status");
  let valid = true;
  Object.entries(validators).forEach(([field, validate]) => {
    const input = form.elements[field];
    const error = validate(input.value);
    setError(field, error);
    if (error) valid = false;
  });
  const email = form.elements.email;
  if (email.value.trim() && !email.validity.valid) {
    email.setAttribute("aria-invalid", "true");
    const error = email.closest(".form-field")?.querySelector(".error-message");
    if (error) error.textContent = "Please enter a valid email address.";
    valid = false;
  } else {
    email.setAttribute("aria-invalid", "false");
    const error = email.closest(".form-field")?.querySelector(".error-message");
    if (error) error.textContent = "";
  }
  const consent = document.querySelector("#whatsapp-consent");
  if (!consent.checked) {
    status.textContent = "Please confirm that you understand this is an enquiry, not a confirmed booking.";
    consent.focus();
    valid = false;
  } else {
    status.textContent = "";
  }
  if (!valid) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  const data = new FormData(form);
  const selectedService = form.dataset.selectedService || data.get("service");
  const message = [
    `Hello ${BUSINESS.name}, I'd like to request a cleaning quote / appointment.`,
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email") || "Not provided"}`,
    `Property type: ${data.get("property")}`,
    `Service: ${selectedService}`,
    `Rooms / items / seats: ${data.get("count")}`,
    `Approximate size: ${data.get("size") || "Not provided"}`,
    `Stain / odour concerns: ${data.get("concerns") || "Not provided"}`,
    `Location / postcode: ${data.get("location")}`,
    `Preferred date: ${data.get("date")}`,
    `Preferred time: ${data.get("time")}`,
    `Additional notes: ${data.get("notes") || "None"}`,
    "",
    "I understand this is an enquiry only, not a confirmed appointment or final quotation."
  ].join("\n");
  window.open(waUrl(message), "_blank", "noopener,noreferrer");
  status.textContent = "WhatsApp opened with your enquiry. Review the message and press Send in WhatsApp to contact the business.";
});

const backToTop = document.querySelector("#back-to-top");
window.addEventListener("scroll", () => backToTop?.classList.toggle("visible", window.scrollY > 500), {passive:true});
backToTop?.addEventListener("click", () => window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}));
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Graceful image fallback: keep the layout intact if a remote image fails.
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.dataset.failed) return;
    img.dataset.failed = "true";
    img.src = "assets/images/image-placeholder.svg";
  });
});
