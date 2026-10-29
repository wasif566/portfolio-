(() => {
  "use strict";

  const WHATSAPP_NUMBER = "923266438812";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const form = document.querySelector("#quote-form");
  const serviceSelect = document.querySelector("#service");
  const status = document.querySelector("#form-status");
  const dateInput = document.querySelector("#preferred-date");

  document.querySelector("#current-year").textContent = new Date().getFullYear();

  // Prevent selecting a date in the past.
  if (dateInput) {
    const localToday = new Date();
    const yyyy = localToday.getFullYear();
    const mm = String(localToday.getMonth() + 1).padStart(2, "0");
    const dd = String(localToday.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Accessible mobile navigation.
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("is-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Service cards choose the matching service and move the visitor to the form.
  document.querySelectorAll(".service-select").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.service;
      const option = [...serviceSelect.options].find((item) => item.value === selected || item.textContent.trim() === selected);
      if (option) {
        serviceSelect.value = option.value || option.textContent.trim();
      } else if (selected === "Move-In / Move-Out Cleaning") {
        serviceSelect.value = "Move-In / Move-Out Cleaning";
      } else {
        serviceSelect.value = "Other / Not sure yet";
      }
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector("#quote").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 350);
    });
  });

  const fieldError = (field, message) => {
    const label = field.closest("label");
    const error = label?.querySelector(".error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message || "";
  };

  const validate = (field) => {
    const value = field.value.trim();
    if (field.required && !value) {
      fieldError(field, "Please complete this field.");
      return false;
    }
    if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      fieldError(field, "Enter a valid email address.");
      return false;
    }
    if (field.name === "phone" && value && value.replace(/\D/g, "").length < 7) {
      fieldError(field, "Enter a valid phone number.");
      return false;
    }
    if (field.name === "date" && value) {
      const selected = new Date(`${value}T00:00:00`);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (selected < today) {
        fieldError(field, "Choose today or a future date.");
        return false;
      }
    }
    fieldError(field, "");
    return true;
  };

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    const requiredFields = [...form.querySelectorAll("[required]")];
    const allFields = [...form.querySelectorAll("input, select, textarea")];
    const valid = allFields.reduce((result, field) => validate(field) && result, true);
    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      status.textContent = "Please check the highlighted fields and try again.";
      return;
    }

    const data = new FormData(form);
    const details = [
      "Hello FreshNest Cleaning, I'd like to request a cleaning quotation.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Cleaning service: ${data.get("service")}`,
      `Property type: ${data.get("property")}`,
      `Address / postcode: ${data.get("address")}`,
      `Preferred date: ${data.get("date") || "Flexible / not specified"}`,
      `Preferred time: ${data.get("time") || "Flexible / not specified"}`,
      `Property size / rooms: ${data.get("size") || "Not provided"}`,
      `Cleaning frequency: ${data.get("frequency") || "Not specified"}`,
      `Additional requirements: ${data.get("details") || "None provided"}`,
      "",
      "Please confirm availability, price, and service details. I understand this request does not confirm a booking."
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details.join("\n"))}`;
    status.textContent = "Opening WhatsApp with your details. Please review the message and press Send in WhatsApp.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      // A fallback link remains available if the browser blocks the new tab.
      status.innerHTML = "";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Tap here to continue to WhatsApp with your quote request.";
      fallback.className = "text-link";
      status.appendChild(fallback);
    }
  });
})();