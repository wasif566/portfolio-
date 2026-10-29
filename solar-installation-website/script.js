(() => {
  "use strict";

  const WHATSAPP_NUMBER = "923266438812";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const form = document.querySelector("#quote-form");
  const serviceSelect = document.querySelector("#solar-service");
  const dateInput = document.querySelector("#consultation-date");
  const status = document.querySelector("#form-status");

  document.querySelector("#current-year").textContent = new Date().getFullYear();

  // Prevent a consultation date in the past, using the visitor's local date.
  if (dateInput) {
    const today = new Date();
    dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  // Accessible mobile navigation.
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("is-open", !open);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }));

  // Service cards preselect the matching quote-form service.
  document.querySelectorAll(".solution-button").forEach((button) => {
    button.addEventListener("click", () => {
      const requested = button.dataset.service;
      const matchingOption = [...serviceSelect.options].find((option) => option.value === requested || option.textContent.trim() === requested);
      if (matchingOption) serviceSelect.value = matchingOption.value || matchingOption.textContent.trim();
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector("#quote").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
      window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 350);
    });
  });

  const setError = (field, message) => {
    const error = field.closest("label")?.querySelector(".error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message || "";
  };

  const validateField = (field) => {
    const value = field.value.trim();
    if (field.required && !value) {
      setError(field, "Please complete this field.");
      return false;
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(field, "Please enter a valid email address.");
      return false;
    }
    if (field.name === "phone" && value && value.replace(/\D/g, "").length < 7) {
      setError(field, "Please enter a valid telephone number.");
      return false;
    }
    if (field.name === "date" && value) {
      const selected = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setError(field, "Choose today or a future date.");
        return false;
      }
    }
    setError(field, "");
    return true;
  };

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    const fields = [...form.querySelectorAll("input, select, textarea")];
    const valid = fields.reduce((result, field) => validateField(field) && result, true);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      status.textContent = "Please review the highlighted fields before continuing.";
      return;
    }

    const data = new FormData(form);
    const messageLines = [
      "Hello Sunwise Solar, I'd like to request a solar consultation / quotation.",
      "",
      `Full name: ${data.get("name")}`,
      `Telephone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Property postcode / address: ${data.get("address")}`,
      `Property type: ${data.get("property")}`,
      `Requested solar solution: ${data.get("service")}`,
      `Average electricity usage / bill: ${data.get("usage") || "Not provided"}`,
      `Existing solar installation: ${data.get("existing")}`,
      `Interested in battery storage: ${data.get("battery")}`,
      `Preferred consultation date: ${data.get("date") || "Flexible / not specified"}`,
      `Additional requirements: ${data.get("details") || "None provided"}`,
      "",
      "Please confirm system suitability, pricing, expected output, potential savings, availability, and installation timing after assessment. I understand this enquiry does not confirm an appointment or installation."
    ];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    status.textContent = "WhatsApp is opening with your enquiry. Please review the message and press Send in WhatsApp.";
    if (!opened) {
      status.textContent = "";
      const fallback = document.createElement("a");
      fallback.href = whatsappUrl;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.className = "fallback-link";
      fallback.textContent = "Tap here to continue to WhatsApp with your solar enquiry.";
      status.appendChild(fallback);
    }
  });
})();