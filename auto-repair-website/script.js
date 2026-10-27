(() => {
  "use strict";

  // Change this one number to configure WhatsApp for the whole website.
  const WHATSAPP_NUMBER = "923266438812";

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }));
  }

  // Service category filtering.
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const serviceCards = [...document.querySelectorAll(".service-card")];
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    serviceCards.forEach(card => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  }));

  // FAQ accordion.
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
    });
  });

  const form = document.querySelector("#booking-form");
  const modeSelect = document.querySelector("#service-mode");
  const locationField = document.querySelector("#vehicle-location");
  const locationWrap = document.querySelector("#mobile-location-field");
  const status = document.querySelector("#form-status");
  const dateInput = document.querySelector("#preferred-date");
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;

  function updateLocationRequirement() {
    const mobile = modeSelect.value === "Mobile mechanic";
    locationField.required = mobile;
    locationWrap.classList.toggle("location-required", mobile);
    const help = locationWrap.querySelector(".field-help");
    help.textContent = mobile ? "Required for a mobile visit so coverage can be checked." : "Required if you select Mobile mechanic.";
    if (!mobile) {
      locationField.removeAttribute("aria-invalid");
      const error = document.querySelector('[data-error-for="vehicle-location"]');
      if (error) error.textContent = "";
    }
  }
  modeSelect.addEventListener("change", updateLocationRequirement);
  updateLocationRequirement();

  // Buttons across the site select the relevant service/mode and move to the form.
  document.querySelectorAll(".book-service").forEach(button => button.addEventListener("click", () => {
    const service = button.dataset.service;
    const option = [...document.querySelector("#requested-service").options].find(item => item.value === service || item.textContent === service);
    if (option) document.querySelector("#requested-service").value = option.value;
    if (button.dataset.mode) modeSelect.value = button.dataset.mode;
    updateLocationRequirement();
    document.querySelector("#booking").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    window.setTimeout(() => document.querySelector("#customer-name").focus({ preventScroll: true }), 350);
  }));
  document.querySelectorAll("[data-set-mode]").forEach(button => button.addEventListener("click", () => {
    modeSelect.value = button.dataset.setMode;
    updateLocationRequirement();
  }));

  function setError(input, message) {
    const error = document.querySelector(`[data-error-for="${input.id}"]`);
    if (error) error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }
  function validateField(input) {
    const value = input.value.trim();
    let message = "";
    if (input.required && !value) message = "This field is required.";
    else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email address.";
    else if (input.type === "tel" && value && !/^[+()\d\s.-]{7,20}$/.test(value)) message = "Enter a valid phone number.";
    else if (input.id === "vehicle-year" && value && (!Number.isInteger(Number(value)) || Number(value) < 1950 || Number(value) > new Date().getFullYear() + 1)) message = "Enter a valid vehicle year.";
    else if (input.type === "date" && value && value < localToday) message = "Choose today or a future date.";
    setError(input, message);
    return !message;
  }
  const validationFields = [...form.querySelectorAll("input, select, textarea")];
  validationFields.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(input);
    });
    input.addEventListener("change", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(input);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    updateLocationRequirement();
    const valid = validationFields.map(validateField).every(Boolean);
    if (!valid) {
      status.hidden = false;
      status.className = "form-status error";
      status.textContent = "Please review the highlighted fields and correct the details before continuing.";
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const rows = [
      ["Customer name", data.get("customerName")],
      ["Phone", data.get("customerPhone")],
      ["Email", data.get("customerEmail") || "Not provided"],
      ["Vehicle make", data.get("vehicleMake")],
      ["Vehicle model", data.get("vehicleModel")],
      ["Registration", data.get("vehicleRegistration") || "Not provided"],
      ["Vehicle year", data.get("vehicleYear") || "Not provided"],
      ["Required service", data.get("requestedService")],
      ["Service method", data.get("serviceMode")],
      ["Preferred date", data.get("preferredDate")],
      ["Preferred time", data.get("preferredTime")],
      ["Vehicle location", data.get("vehicleLocation") || (data.get("serviceMode") === "Mobile mechanic" ? "Not provided" : "Not applicable")],
      ["Problem description", data.get("problemDescription")],
      ["Additional notes", data.get("additionalNotes") || "None"]
    ];
    const message = "Assalam-o-Alaikum, I would like to request an auto service booking / quote.\\n\\n" +
      rows.map(([label, value]) => `${label}: ${String(value).trim()}`).join("\\n") +
      "\\n\\nPlease confirm availability, quotation, and appointment details. I understand this is a request and not a confirmed booking.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    status.hidden = false;
    status.className = "form-status success";
    status.textContent = "Your request is ready. WhatsApp will open so you can review and send the message. The booking is not confirmed until the business responds.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open your prepared WhatsApp message";
      link.className = "text-arrow";
      status.appendChild(document.createTextNode(" If it did not open, "));
      status.appendChild(link);
    }
  });

  // Keep all direct WhatsApp links in sync with the configured number.
  document.querySelectorAll("[data-whatsapp-direct]").forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  });

  // Back-to-top control.
  const backTop = document.querySelector("#back-to-top");
  function updateBackTop() {
    backTop.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

  // Active section link indicator.
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const observedSections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    observedSections.forEach(section => navObserver.observe(section));
  }

  // Subtle reveal effects; content remains visible when reduced motion is preferred.
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js-motion");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));
  }
  document.querySelector("#current-year").textContent = new Date().getFullYear();
})();