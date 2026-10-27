(() => {
  "use strict";

  // Configure all business details here before publishing.
  const CONFIG = {
    businessName: "Northstar Moving Co.",
    whatsappNumber: "923266438812",
    phoneDisplay: "+92 326 6438812",
    email: "hello@example.com",
    // Set to a real, approved business location/service list before publishing.
    serviceAreas: [],
    defaultMessage: "Hello Northstar Moving Co., I'd like to ask about a move."
  };

  const waBase = `https://wa.me/${CONFIG.whatsappNumber}?text=`;
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const quoteForm = document.querySelector("#quote-form");
  const plannerForm = document.querySelector("#planner-form");
  const quoteStatus = document.querySelector("#quote-status");
  const plannerStatus = document.querySelector("#planner-status");
  const dateInput = document.querySelector("#moving-date");

  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  if (dateInput) dateInput.min = localDate;

  document.querySelectorAll(".current-year").forEach(el => { el.textContent = String(today.getFullYear()); });
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(today.getFullYear());

  // Mobile navigation: close after navigation and keep the expanded state accurate.
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.focus();
      }
    });
  }

  // Accessible back-to-top control.
  const backToTop = document.querySelector(".back-to-top");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

  // All static WhatsApp links are assembled from the single configurable number.
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    const text = new URL(link.href).searchParams.get("text") || CONFIG.defaultMessage;
    link.href = waBase + encodeURIComponent(text);
  });

  function fieldValue(form, name, fallback = "Not specified") {
    const field = form.elements.namedItem(name);
    if (!field) return fallback;
    if (field instanceof RadioNodeList) return field.value || fallback;
    if (field.type === "checkbox") return field.checked ? (field.value && field.value !== "on" ? field.value : "Yes") : "No";
    return (field.value || "").trim() || fallback;
  }

  function checkedValue(form, name) {
    const field = form.elements.namedItem(name);
    return field && field.checked ? "Yes" : "No";
  }

  function buildQuoteMessage(form) {
    const lines = [
      `Hello ${CONFIG.businessName}, I'd like to request a moving quote.`,
      "",
      "MOVING DETAILS",
      `Name: ${fieldValue(form, "customerName")}`,
      `Phone: ${fieldValue(form, "customerPhone")}`,
      `Email: ${fieldValue(form, "customerEmail", "Not provided")}`,
      `Preferred moving date: ${fieldValue(form, "movingDate")}`,
      `Moving from: ${fieldValue(form, "origin")}`,
      `Moving to: ${fieldValue(form, "destination")}`,
      `Property type: ${fieldValue(form, "propertyType")}`,
      `Bedrooms / rooms: ${fieldValue(form, "bedrooms")}`,
      `Floor level: ${fieldValue(form, "floorLevel")}`,
      `Lift access: ${fieldValue(form, "liftAccess")}`,
      `Approx. boxes / items: ${fieldValue(form, "boxes")}`,
      `Furniture quantity: ${fieldValue(form, "furnitureQuantity")}`,
      `Packing assistance: ${checkedValue(form, "packing")}`,
      `Loading / unloading help: ${checkedValue(form, "loading")}`,
      `Furniture assembly: ${checkedValue(form, "furnitureHelp")}`,
      `Fragile item handling: ${checkedValue(form, "fragile")}`,
      `Additional details: ${fieldValue(form, "notes", "None provided")}`,
      "",
      "I understand this is an enquiry only, not a confirmed booking or guaranteed quote."
    ];
    return lines.join("\n");
  }

  function setError(field, message) {
    if (!field) return;
    const wrapper = field.closest(".field");
    const error = document.getElementById(`error-${field.id}`);
    if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
    if (error) error.textContent = message || "";
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateQuoteForm() {
    let firstInvalid = null;
    const required = [
      ["customer-name", value => value.length >= 2, "Enter your name (at least 2 characters)."],
      ["customer-phone", value => /^[+()\d\s.-]{7,}$/.test(value) && value.replace(/\D/g, "").length >= 7, "Enter a valid phone number."],
      ["moving-date", value => Boolean(value) && value >= localDate, "Choose today or a future moving date."],
      ["origin", value => value.length >= 3, "Enter the current location."],
      ["destination", value => value.length >= 3, "Enter the destination location."],
      ["property-type", value => Boolean(value), "Select a property type."]
    ];
    required.forEach(([id, test, message]) => {
      const field = document.getElementById(id);
      const value = field ? field.value.trim() : "";
      const invalid = !test(value);
      setError(field, invalid ? message : "");
      if (invalid && !firstInvalid) firstInvalid = field;
    });

    const email = document.getElementById("customer-email");
    if (email && email.value.trim()) {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setError(email, valid ? "" : "Enter a valid email address or leave it blank.");
      if (!valid && !firstInvalid) firstInvalid = email;
    } else {
      setError(email, "");
    }
    if (firstInvalid) {
      firstInvalid.focus();
      quoteStatus.textContent = "Please review the highlighted fields.";
      return false;
    }
    quoteStatus.textContent = "";
    return true;
  }

  if (quoteForm) {
    quoteForm.querySelectorAll("input, select, textarea").forEach(field => {
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateQuoteForm();
      });
      field.addEventListener("change", () => {
        if (field.getAttribute("aria-invalid") === "true") validateQuoteForm();
      });
    });
    quoteForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!validateQuoteForm()) return;
      const message = buildQuoteMessage(quoteForm);
      const url = waBase + encodeURIComponent(message);
      quoteStatus.textContent = "Opening WhatsApp with your enquiry. Review the message and press Send in WhatsApp to contact the team.";
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) {
        quoteStatus.textContent = "Your enquiry message is ready. If WhatsApp did not open, use the WhatsApp link at the bottom of the page or enable pop-ups and try again.";
      }
    });
  }

  // Planner never displays an invented price. It transfers preferences to the full enquiry.
  if (plannerForm && quoteForm) {
    plannerForm.addEventListener("submit", event => {
      event.preventDefault();
      const property = document.getElementById("planner-property").value;
      const rooms = document.getElementById("planner-bedrooms").value;
      const boxes = document.getElementById("planner-boxes").value;
      const distance = document.getElementById("planner-distance").value;
      document.getElementById("property-type").value =
        ["House", "Apartment", "Office", "Single item", "Other"].includes(property) ? property : "";
      document.getElementById("bedrooms").value = rooms;
      document.getElementById("boxes").value =
        boxes === "Not sure" ? "Not sure" : boxes === "0–10" ? "0–10 boxes" :
        boxes === "11–25" ? "11–25 boxes" : boxes === "26–50" ? "26–50 boxes" : "51+ boxes";
      document.getElementById("notes").value =
        [document.getElementById("notes").value.trim(), `Planner distance: ${distance}`, `Packing assistance: ${document.getElementById("planner-packing").checked ? "Yes" : "No"}`, `Loading/unloading help: ${document.getElementById("planner-loading").checked ? "Yes" : "No"}`]
          .filter(Boolean).join("\n");
      const packing = quoteForm.querySelector('input[name="packing"]');
      const loading = quoteForm.querySelector('input[name="loading"]');
      if (packing) packing.checked = document.getElementById("planner-packing").checked;
      if (loading) loading.checked = document.getElementById("planner-loading").checked;
      plannerStatus.textContent = "Details added to the moving quote form below. Add your date and addresses, then review the enquiry before sending.";
      document.getElementById("quote").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      window.setTimeout(() => document.getElementById("customer-name").focus({ preventScroll: true }), 350);
    });
  }

  // Native <details> provides keyboard-accessible FAQ accordion behavior.
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  // Update generic contact links from the single source of truth.
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:+${CONFIG.whatsappNumber}`;
    if (link.textContent.includes("+92")) link.textContent = CONFIG.phoneDisplay;
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = `mailto:${CONFIG.email}`;
    if (link.textContent.includes("@example.com")) link.textContent = CONFIG.email;
  });
})();
