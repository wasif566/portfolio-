
/* Wasif Creative Studio — hosted website URLs */
const WHATSAPP_NUMBER = "923266438812";

const PROJECT_LINKS = {
  restaurant: "https://www.creativestudio.click/restaurant_takeaway_website/",
  textile: "https://www.creativestudio.click/textile_manufacturer_website/",
  dental: "https://www.creativestudio.click/dental_clinic_website/",
  beauty: "https://www.creativestudio.click/beauty_studio_website/",
  "real-estate": "https://www.creativestudio.click/real_estate_agency_website/",
  "wedding-halls": "https://www.creativestudio.click/wedding_halls_marquees_website/",
  "clothing-boutique": "https://www.creativestudio.click/clothing_boutique_website/",
  "private-schools": "https://www.creativestudio.click/private_school_website/",
  tuition: "https://www.creativestudio.click/tuition-academy-website/",
  taxi: "https://www.creativestudio.click/taxi-airport-transfer-website/",
  "car-rental": "https://www.creativestudio.click/car_rental_website/",
  solar: "",
  furniture: "https://www.creativestudio.click/furniture_shop_website/",
  "wedding-photo": "https://www.creativestudio.click/wedding_photography_planner_website/",
  bakery: "https://www.creativestudio.click/bakery_website/",
  "auto-repair": "https://www.creativestudio.click/auto-repair-website/",
  gym: "https://www.creativestudio.click/fitness-gym-website/",
  machinery: "https://www.creativestudio.click/machinery_supplier_website/",
  "diagnostic-lab": "https://www.creativestudio.click/diagnostic_laboratory_website/",
  "plumbers-electricians": "",
  "cleaning-services": "",
  painters: "https://www.creativestudio.click/painters-decorators-website/",
  "car-wash": "https://www.creativestudio.click/car-wash-mobile-valeting-website/",
  "event-planners": "https://www.creativestudio.click/event-planners-decorators-website/",
  landscaping: "https://www.creativestudio.click/landscaping_gardening_website/",
  handyman: "https://www.creativestudio.click/handyman-home-repair-website/",
  "carpet-cleaning": "https://www.creativestudio.click/carpet-upholstery-cleaning-website/",
  moving: "https://www.creativestudio.click/moving_removal_website/",
  roofing: "https://www.creativestudio.click/roofing_gutter_website/",
  repair: "https://www.creativestudio.click/mobile_computer_repair_website/",
  travel: "https://www.creativestudio.click/travel-agency-website/",
  "photo-video": "https://www.creativestudio.click/photography-videography-website/",
  "window-cleaning": "https://www.creativestudio.click/window-cleaning-website/",
  renovation: "https://www.creativestudio.click/bathroom-kitchen-renovation-website/",
  "hair-salon": ""
};


// const PROJECT_LINKS = {
//   restaurant: "", textile: "", dental: "", beauty: "", "real-estate": "",
//   "wedding-halls": "", "clothing-boutique": "", "private-schools": "", tuition: "",
//   taxi: "", "car-rental": "", solar: "", furniture: "", "wedding-photo": "",
//   bakery: "", "auto-repair": "", gym: "", machinery: "", "diagnostic-lab": "",
//   "plumbers-electricians": "", "cleaning-services": "", painters: "", "car-wash": "",
//   "event-planners": "", landscaping: "", handyman: "", "carpet-cleaning": "", moving: "",
//   roofing: "", repair: "", travel: "", "photo-video": "", "window-cleaning": "",
//   renovation: "", "hair-salon": ""
// };

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    nav.classList.toggle("open", !expanded);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }));
}

const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
const count = document.querySelector("#work-count");
const moreButton = document.querySelector("#show-more-projects");
const moreStatus = document.querySelector("#work-more-status");
let activeFilter = "all";
let visibleLimit = 6;
function updateProjects() {
  const matching = cards.filter(card => activeFilter === "all" || card.dataset.category === activeFilter);
  cards.forEach(card => {
    const position = matching.indexOf(card);
    card.hidden = position < 0 || position >= visibleLimit;
  });
  if (count) count.textContent = activeFilter === "all" ? `Showing ${Math.min(visibleLimit, matching.length)} of ${matching.length} websites` : `${matching.length} ${matching.length === 1 ? "website" : "websites"}`;
  if (moreStatus) moreStatus.textContent = activeFilter === "all" ? `Showing ${Math.min(visibleLimit, matching.length)} of ${matching.length} website concepts` : `Showing ${Math.min(visibleLimit, matching.length)} of ${matching.length} matching concepts`;
  if (moreButton) {
    moreButton.hidden = matching.length <= visibleLimit;
    moreButton.innerHTML = `Show ${Math.min(6, matching.length - visibleLimit)} more <b>＋</b>`;
  }
}
filters.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  visibleLimit = 6;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  updateProjects();
}));
if (moreButton) moreButton.addEventListener("click", () => { visibleLimit += 6; updateProjects(); });
updateProjects();

// Demo cards open only their configured live URL in a new tab; they never fall back to WhatsApp.
document.querySelectorAll("[data-project-link]").forEach(link => {
  const key = link.dataset.projectLink;
  const url = PROJECT_LINKS[key];
  if (url && /^https?:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#work";
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
    link.title = "Add this project's hosted URL in script.js to enable the live demo.";
    link.addEventListener("click", event => event.preventDefault());
  }
});

document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
  const select = document.querySelector("#service");
  if (!select) return;
  const option = [...select.options].find(item => item.text.toLowerCase() === link.dataset.service.toLowerCase());
  if (option) select.value = option.value;
}));

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const requiredNames = ["name", "email", "service", "details"];
function validateField(field) {
  const value = field.value.trim();
  let error = "";
  if (field.required && !value) error = "This field is required.";
  if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address.";
  field.setAttribute("aria-invalid", error ? "true" : "false");
  const errorNode = field.parentElement.querySelector(".error");
  if (errorNode) errorNode.textContent = error;
  return !error;
}
if (form) {
  requiredNames.forEach(name => {
    const field = form.elements.namedItem(name);
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") validateField(field); });
    field.addEventListener("change", () => { if (field.getAttribute("aria-invalid") === "true") validateField(field); });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const fields = requiredNames.map(name => form.elements.namedItem(name));
    if (!fields.map(validateField).every(Boolean)) {
      status.textContent = "Please check the highlighted fields and try again.";
      status.style.color = "#b6412a";
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const data = new FormData(form);
    const message = [
      "Hello Wasif! I'd like to enquire about a creative project.", "",
      `Name: ${data.get("name").trim()}`,
      `Business / brand: ${data.get("business").trim() || "Not provided"}`,
      `Email: ${data.get("email").trim()}`,
      `Selected service: ${data.get("service")}`,
      `Ideal timeline: ${data.get("timeline") || "Flexible / not specified"}`, "",
      "Project details:", data.get("details").trim()
    ].join("\n");
    status.textContent = "Your enquiry is ready. WhatsApp will open in a new tab—review the message and press Send to contact Wasif.";
    status.style.color = "#3e6b40";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

// WhatsApp promotional popup: delayed, dismissible, keyboard-accessible.
const waPopup = document.querySelector("#whatsapp-popup");
const waPopupClose = document.querySelector("#wa-popup-close");
const waPopupMain = document.querySelector("#wa-popup-main");
if (waPopup && waPopupClose && waPopupMain) {
  const waMessage = "Looking for a professional website for your business? Message me on WhatsApp to discuss your requirements.";
  waPopupMain.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Wasif, " + waMessage)}`;
  let popupTimer = window.setTimeout(() => {
    waPopup.hidden = false;
    requestAnimationFrame(() => waPopup.classList.add("is-visible"));
  }, 4000);
  waPopupClose.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    waPopup.classList.remove("is-visible");
    window.setTimeout(() => { waPopup.hidden = true; }, 220);
    window.clearTimeout(popupTimer);
  });
  waPopupMain.addEventListener("keydown", event => {
    if (event.key === "Escape") waPopupClose.click();
  });
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
 
