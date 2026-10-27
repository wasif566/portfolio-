/*
  BrightCare Dental Clinic starter website
  BEFORE PUBLISHING:
  1) Update CLINIC_CONFIG with verified clinic details.
  2) Remove treatments not offered by the clinic.
  3) Replace team placeholders with real names/photos/verified credentials.
  4) Confirm opening hours, email, address, and FAQ answers.
*/
const CLINIC_CONFIG = {
  name: "BrightCare Dental",
  phoneDisplay: "+92 326 6438812",
  phoneDigits: "923266438812",
  email: "hello@example.com",
  address: "Add your clinic's full street address",
  openingHours: "Add verified opening hours",
  mapsQuery: "dental clinic"
};

document.addEventListener("DOMContentLoaded", () => {
  // Populate shared clinic details from one configuration object.
  document.querySelectorAll('[data-clinic="name"]').forEach(el => el.textContent = CLINIC_CONFIG.name);
  document.querySelectorAll('[data-clinic="address"]').forEach(el => el.textContent = CLINIC_CONFIG.address);
  document.querySelectorAll('[data-clinic="hours"]').forEach(el => el.textContent = CLINIC_CONFIG.openingHours);
  document.querySelectorAll('[data-clinic-link="phone"]').forEach(el => {
    el.textContent = CLINIC_CONFIG.phoneDisplay;
    el.href = `tel:+${CLINIC_CONFIG.phoneDigits}`;
  });
  document.querySelectorAll('[data-clinic-link="email"]').forEach(el => {
    el.textContent = CLINIC_CONFIG.email;
    el.href = `mailto:${CLINIC_CONFIG.email}`;
  });
  const mapsLink = document.getElementById("mapsLink");
  if (mapsLink) mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_CONFIG.mapsQuery || CLINIC_CONFIG.address)}`;

  document.getElementById("year").textContent = new Date().getFullYear();

  // Accessible responsive navigation.
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const closeMenu = () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", event => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Prevent selecting a date in the past.
  const dateInput = document.getElementById("date");
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;

  // Service cards can preselect the service in the appointment form.
  const serviceSelect = document.getElementById("service");
  document.querySelectorAll(".enquire-service").forEach(button => {
    button.addEventListener("click", () => {
      const wantedService = button.dataset.service;
      const availableOption = [...serviceSelect.options].find(option => option.value === wantedService || option.textContent === wantedService);
      if (availableOption) serviceSelect.value = availableOption.value;
      document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.getElementById("patientName").focus({ preventScroll: true }), 450);
    });
  });

  const form = document.getElementById("appointmentForm");
  const formError = document.getElementById("formError");
  form.addEventListener("submit", event => {
    event.preventDefault();
    formError.textContent = "";

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const patientName = String(data.get("patientName") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const time = String(data.get("time") || "").trim();
    const patientType = String(data.get("patientType") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    if (!patientName || !phone || !service || !date || !time) {
      formError.textContent = "Please complete all required fields.";
      return;
    }
    if (date < localToday) {
      formError.textContent = "Please choose today or a future date.";
      dateInput.focus();
      return;
    }

    // Keep the request concise and avoid asking for sensitive medical information.
    const messageLines = [
      `Appointment request — ${CLINIC_CONFIG.name}`,
      `Patient name: ${patientName}`,
      `Contact number: ${phone}`,
      `Dental service: ${service}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      email ? `Email: ${email}` : "",
      patientType ? `Patient type: ${patientType}` : "",
      notes ? `Additional notes: ${notes}` : "",
      "",
      "I understand this is a request only and is not confirmed until the clinic responds."
    ].filter(line => line !== "");

    const whatsappUrl = `https://wa.me/${CLINIC_CONFIG.phoneDigits}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      // Fallback for browsers that block new tabs.
      window.location.href = whatsappUrl;
    }
  });
});
