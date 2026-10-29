(() => {
  "use strict";

  const WHATSAPP_NUMBER = "923266438812";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const form = document.querySelector("#enquiry-form");
  const tradeSelect = document.querySelector("#trade");
  const serviceSelect = document.querySelector("#requested-service");
  const dateInput = document.querySelector("#appointment-date");
  const status = document.querySelector("#form-status");

  document.querySelector("#year").textContent = new Date().getFullYear();

  // Set the minimum date using the visitor's local calendar date.
  if (dateInput) {
    const today = new Date();
    dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  // Accessible responsive navigation.
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

  // Keep the service options grouped by the selected trade category.
  const allServiceOptions = [...serviceSelect.querySelectorAll("optgroup, option")];
  const updateServiceOptions = (preferred = "") => {
    const trade = tradeSelect.value;
    const plumbingGroup = serviceSelect.querySelector('optgroup[label="Plumbing"]');
    const electricalGroup = serviceSelect.querySelector('optgroup[label="Electrical"]');
    [plumbingGroup, electricalGroup].forEach((group) => {
      if (!group) return;
      group.hidden = trade === "Plumbing" ? group.label === "Electrical" : trade === "Electrical" ? group.label === "Plumbing" : false;
    });
    const available = [...serviceSelect.options].filter((option) => !option.disabled && option.value);
    if (preferred) {
      const match = available.find((option) => option.value === preferred || option.textContent.trim() === preferred);
      if (match && !match.closest("optgroup")?.hidden) serviceSelect.value = match.value;
    } else if (serviceSelect.selectedOptions[0]?.closest("optgroup")?.hidden) {
      serviceSelect.value = "";
    }
  };
  tradeSelect?.addEventListener("change", () => updateServiceOptions());

  // Service buttons preselect the trade and requested service.
  document.querySelectorAll(".service-button").forEach((button) => {
    button.addEventListener("click", () => {
      tradeSelect.value = button.dataset.trade;
      updateServiceOptions(button.dataset.service);
      tradeSelect.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector("#enquiry").scrollIntoView({
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
    const lines = [
      "Hello Northline Trade Services, I'd like to enquire about a job.",
      "",
      `Full name: ${data.get("name")}`,
      `Telephone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Trade category: ${data.get("trade")}`,
      `Requested service: ${data.get("service")}`,
      `Property type: ${data.get("property")}`,
      `Property address / postcode: ${data.get("address")}`,
      `Problem description: ${data.get("problem")}`,
      `Preferred appointment date: ${data.get("date") || "Flexible / not specified"}`,
      `Preferred time: ${data.get("time") || "Flexible / not specified"}`,
      `Urgency level: ${data.get("urgency")}`,
      `Additional notes: ${data.get("notes") || "None provided"}`,
      "",
      "Please confirm service availability, any call-out charges, the quotation, and appointment details. I understand this enquiry does not confirm a booking."
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    status.textContent = "WhatsApp is opening with your enquiry. Review the message and press Send in WhatsApp.";
    if (!opened) {
      status.textContent = "";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.className = "fallback-link";
      fallback.textContent = "Tap here to continue to WhatsApp with your enquiry.";
      status.appendChild(fallback);
    }
  });
})();