/* Wanderwise Travel website interactions.
   Update the agency details and WhatsApp number in this file before publishing. */
const AGENCY = {
  name: "Wanderwise Travel",
  whatsapp: "923266438812",
  phoneDisplay: "+92 326 6438812",
  email: "hello@wanderwise.example"
};

const makeWhatsAppUrl = (message) =>
  `https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent(message)}`;

function openWhatsApp(message) {
  window.open(makeWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

// Current year and a convenient minimum departure date.
const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();
const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
if (departureDate) departureDate.min = localToday;
if (returnDate) returnDate.min = localToday;

if (departureDate && returnDate) {
  departureDate.addEventListener("change", () => {
    returnDate.min = departureDate.value || localToday;
    if (returnDate.value && departureDate.value && returnDate.value < departureDate.value) {
      returnDate.value = "";
    }
  });
  returnDate.addEventListener("change", () => {
    if (departureDate.value && returnDate.value && returnDate.value < departureDate.value) {
      returnDate.setCustomValidity("Return date cannot be earlier than departure date.");
    } else {
      returnDate.setCustomValidity("");
    }
  });
}

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }));
}

// Destination category filters.
document.querySelectorAll("[data-destination-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-destination-filter]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.destinationFilter;
    document.querySelectorAll(".destination-card").forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

// Package filtering. A card is shown only when it matches both selected filters.
const packageStyle = document.getElementById("packageStyle");
const packageBudget = document.getElementById("packageBudget");
const packageCount = document.getElementById("packageCount");
function filterPackages(destination = "all", style = null, budget = null) {
  const chosenStyle = style ?? (packageStyle?.value || "all");
  const chosenBudget = budget ?? (packageBudget?.value || "all");
  let visible = 0;
  document.querySelectorAll(".package-card").forEach(card => {
    const matchesDestination = destination === "all" || card.dataset.destination.toLowerCase().includes(destination.toLowerCase());
    const matchesStyle = chosenStyle === "all" || card.dataset.style === chosenStyle;
    const matchesBudget = chosenBudget === "all" || card.dataset.budget === chosenBudget;
    const show = matchesDestination && matchesStyle && matchesBudget;
    card.hidden = !show;
    if (show) visible++;
  });
  if (packageCount) packageCount.textContent = `${visible} ${visible === 1 ? "sample idea" : "sample ideas"}`;
  return visible;
}
[packageStyle, packageBudget].forEach(control => control?.addEventListener("change", () => filterPackages()));
filterPackages();

// Trip finder applies its preferences to the sample package cards, then shows the results.
const tripFinder = document.getElementById("tripFinder");
if (tripFinder) {
  tripFinder.addEventListener("submit", event => {
    event.preventDefault();
    const destination = document.getElementById("finderDestination").value;
    const style = document.getElementById("finderStyle").value;
    const budget = document.getElementById("finderBudget").value;
    const visible = filterPackages(destination, style, budget);
    document.getElementById("packageStyle").value = style;
    document.getElementById("packageBudget").value = budget;
    const packageSection = document.getElementById("packages");
    packageSection.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    if (visible === 0) {
      if (packageCount) packageCount.textContent = "No exact matches — try changing a preference";
    }
  });
}

// Package and destination quick-enquiry buttons prefill the contact form.
function prefillEnquiry(destination, packageName = "") {
  const destinationInput = document.getElementById("destination");
  const requests = document.getElementById("requests");
  if (destinationInput) destinationInput.value = destination || "";
  if (requests && packageName) requests.value = `I'm interested in the sample package: ${packageName}. Please share a tailored quote and confirm inclusions.`;
  document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  window.setTimeout(() => document.getElementById("customerName")?.focus({ preventScroll: true }), 350);
}
document.querySelectorAll(".select-package").forEach(button => {
  button.addEventListener("click", () => prefillEnquiry(button.dataset.destination, button.dataset.name));
});
document.querySelectorAll(".enquire-destination").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    prefillEnquiry(button.dataset.name);
  });
});

// Validate and prepare a structured WhatsApp travel enquiry.
const enquiryForm = document.getElementById("enquiryForm");
const formError = document.getElementById("formError");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    if (formError) formError.textContent = "";
    const formData = new FormData(enquiryForm);
    const requiredIds = ["customerName", "customerPhone", "destination", "departureCity", "departureDate", "budget", "tripType"];
    for (const id of requiredIds) {
      const field = document.getElementById(id);
      if (!field || !field.value.trim()) {
        if (formError) formError.textContent = "Please complete all required fields marked with *.";
        field?.focus();
        return;
      }
    }
    const start = formData.get("departureDate");
    const end = formData.get("returnDate");
    if (end && start && end < start) {
      if (formError) formError.textContent = "Return date cannot be earlier than departure date.";
      returnDate?.focus();
      return;
    }
    const email = String(formData.get("customerEmail") || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (formError) formError.textContent = "Please enter a valid email address, or leave it blank.";
      document.getElementById("customerEmail")?.focus();
      return;
    }
    const services = formData.getAll("services");
    const lines = [
      `Hello ${AGENCY.name}, I'd like to enquire about a trip.`,
      "",
      `Name: ${formData.get("customerName")}`,
      `Phone / WhatsApp: ${formData.get("customerPhone")}`,
      `Email: ${email || "Not provided"}`,
      `Destination: ${formData.get("destination")}`,
      `Departure city: ${formData.get("departureCity")}`,
      `Departure date: ${start}`,
      `Return date: ${end || "Flexible / not specified"}`,
      `Adults: ${formData.get("adults")}`,
      `Children: ${formData.get("children") || "0"}`,
      `Budget: ${formData.get("budget")}`,
      `Trip type: ${formData.get("tripType")}`,
      `Accommodation: ${formData.get("accommodation") || "Open to suggestions"}`,
      `Services requested: ${services.length ? services.join(", ") : "Not specified"}`,
      `Additional requests: ${String(formData.get("requests") || "").trim() || "None provided"}`,
      "",
      "I understand this is an enquiry only, not a confirmed reservation or ticket booking."
    ];
    openWhatsApp(lines.join("\n"));
  });
}

// Floating WhatsApp button and FAQ details use semantic links/details by default.
const floatingWhatsApp = document.getElementById("floatingWhatsApp");
if (floatingWhatsApp) {
  floatingWhatsApp.href = makeWhatsAppUrl(`Hello ${AGENCY.name}, I'd like help planning a trip.`);
}

// Back-to-top control.
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 550);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  }));
}
