(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const form = document.querySelector("#appointment-form");
  const serviceSelect = document.querySelector("#service-select");
  const dateInput = document.querySelector("#appointment-date");
  const status = document.querySelector("#form-status");
  const WHATSAPP_NUMBER = "923266438812";

  // Set the current year and prevent choosing a date in the past.
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  const localToday = new Date();
  localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
  dateInput.min = localToday.toISOString().slice(0, 10);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.querySelectorAll(".select-service").forEach((button) => {
    button.addEventListener("click", () => {
      serviceSelect.value = button.dataset.service;
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      document.querySelector("#appointment").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      serviceSelect.focus({ preventScroll: true });
      status.textContent = `${button.dataset.service} selected. Complete the form to send your enquiry.`;
    });
  });

  function setError(field, message) {
    const label = field.closest("label");
    const error = label ? label.querySelector(".error-message") : null;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message || "";
  }

  function validateField(field) {
    const value = field.value.trim();
    let message = "";
    if (field.required && field.type === "checkbox" && !field.checked) {
      message = "Please confirm you understand this is an enquiry, not a confirmed booking.";
    } else if (field.required && !value) {
      message = "Please complete this field.";
    } else if (field.name === "name" && value.length < 2) {
      message = "Please enter your name (at least 2 characters).";
    } else if (field.name === "phone" && value.replace(/\D/g, "").length < 7) {
      message = "Please enter a valid phone number.";
    } else if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = "Please enter a valid email address.";
    } else if (field.name === "date" && value && value < dateInput.min) {
      message = "Please choose today or a future date.";
    }
    setError(field, message);
    return !message;
  }

  const fields = Array.from(form.querySelectorAll("input, select, textarea"));
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("change", () => {
      validateField(field);
      status.textContent = "";
    });
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
      status.textContent = "";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    let valid = true;
    let firstInvalid = null;
    fields.forEach((field) => {
      if (!validateField(field)) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!valid) {
      status.textContent = "Please check the highlighted fields and try again.";
      firstInvalid?.focus();
      return;
    }

    const data = new FormData(form);
    const value = (name) => String(data.get(name) || "").trim();
    const messageLines = [
      "Hello, I'd like to request a salon/barbershop appointment.",
      "",
      `Full name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email") || "Not provided"}`,
      `Service: ${value("service")}`,
      `Preferred date: ${value("date")}`,
      `Preferred time: ${value("time")}`,
      `Preferred stylist/barber: ${value("stylist") || "No preference specified"}`,
      `Additional notes: ${value("notes") || "None"}`,
      "",
      "Please confirm appointment availability, final pricing, and service details. I understand this is a request only and is not booked until confirmed by the business."
    ];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (openedWindow) openedWindow.opener = null;
    status.textContent = "Your enquiry message is ready in WhatsApp. Please review and send it; the business must confirm the appointment.";
  });
})();
