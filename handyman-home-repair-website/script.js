/* FixRight Home Services — configuration and interactions */
(() => {
  "use strict";

  // Configure the business contact number here. Use country code only, no + or spaces.
  const BUSINESS_WHATSAPP = "923266438812";
  const BUSINESS_NAME = "FixRight Home Services";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Service category filtering
  const filterButtons = document.querySelectorAll(".filter-chip");
  const serviceCards = document.querySelectorAll(".service-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      serviceCards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  // Clicking a service/package prefills the relevant form field.
  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
      const serviceSelect = document.querySelector("#service-type");
      if (serviceSelect) {
        const wanted = link.dataset.service;
        const matchingOption = [...serviceSelect.options].find(option => option.value === wanted || option.textContent.trim() === wanted);
        if (matchingOption) serviceSelect.value = matchingOption.value || matchingOption.textContent.trim();
      }
    });
  });
  document.querySelectorAll("[data-package]").forEach(link => {
    link.addEventListener("click", () => {
      const notes = document.querySelector("#additional-notes");
      if (notes) {
        const packageText = `Interested in: ${link.dataset.package}.`;
        notes.value = notes.value ? `${notes.value}\n${packageText}` : packageText;
      }
    });
  });

  // Native details elements provide accessible keyboard-operable FAQ accordions.
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  // Date picker: prevent choosing a date in the past.
  const dateInput = document.querySelector("#preferred-date");
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }

  const form = document.querySelector("#repair-form");
  const formMessage = document.querySelector("#form-message");

  const validators = {
    name: value => value.trim().length >= 2 ? "" : "Please enter your name.",
    phone: value => /^[+]?[\d\s().-]{7,20}$/.test(value.trim()) ? "" : "Please enter a valid phone number.",
    email: value => !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.",
    propertyType: value => value ? "" : "Please choose a property type.",
    service: value => value ? "" : "Please choose a service.",
    urgency: value => value ? "" : "Please choose an urgency level.",
    description: value => value.trim().length >= 8 ? "" : "Please describe the repair in a little more detail.",
    location: value => value.trim().length >= 2 ? "" : "Please enter the property area or location."
  };

  function fieldFor(name) {
    return form ? form.elements.namedItem(name) : null;
  }

  function showFieldError(name, message) {
    const field = fieldFor(name);
    const error = document.querySelector(`#${name}-error`);
    if (field && field.type !== "checkbox") {
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (!message) field.removeAttribute("aria-invalid");
    }
    if (error) error.textContent = message;
  }

  function validateField(name) {
    const field = fieldFor(name);
    if (!field || !validators[name]) return true;
    const error = validators[name](field.value);
    showFieldError(name, error);
    return !error;
  }

  if (form) {
    Object.keys(validators).forEach(name => {
      const field = fieldFor(name);
      if (field) {
        field.addEventListener("blur", () => validateField(name));
        field.addEventListener("input", () => {
          if (field.hasAttribute("aria-invalid")) validateField(name);
        });
        field.addEventListener("change", () => {
          if (field.hasAttribute("aria-invalid")) validateField(name);
        });
      }
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (formMessage) {
        formMessage.className = "form-message";
        formMessage.textContent = "";
      }

      let valid = true;
      Object.keys(validators).forEach(name => {
        if (!validateField(name)) valid = false;
      });

      const consent = document.querySelector("#consent");
      const consentError = document.querySelector("#consent-error");
      if (consent && !consent.checked) {
        valid = false;
        if (consentError) consentError.textContent = "Please confirm you understand this is a request, not a confirmed booking.";
        consent.setAttribute("aria-invalid", "true");
      } else {
        if (consentError) consentError.textContent = "";
        if (consent) consent.removeAttribute("aria-invalid");
      }

      if (!valid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (formMessage) {
          formMessage.textContent = "Please check the highlighted fields and try again.";
          formMessage.classList.add("show", "error-message");
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const get = name => {
        const field = fieldFor(name);
        return field ? field.value.trim() : "";
      };
      const date = get("date") || "Not specified";
      const time = get("time") || "Flexible / not specified";
      const email = get("email") || "Not provided";
      const materials = get("materials") || "Not specified";
      const notes = get("notes") || "None";

      const message = [
        `Hello ${BUSINESS_NAME}, I'd like to request a quote for a home repair.`,
        "",
        "CUSTOMER DETAILS",
        `Name: ${get("name")}`,
        `Phone: ${get("phone")}`,
        `Email: ${email}`,
        "",
        "REPAIR REQUEST",
        `Property type: ${get("propertyType")}`,
        `Service: ${get("service")}`,
        `Description: ${get("description")}`,
        `Location / area: ${get("location")}`,
        `Urgency: ${get("urgency")}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Materials / parts: ${materials}`,
        `Additional notes: ${notes}`,
        "",
        "Please let me know availability, the estimated cost, and any call-out or materials charges. I understand this is not a confirmed appointment until we agree the details."
      ].join("\n");

      const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
      if (formMessage) {
        formMessage.textContent = "Your request is ready. WhatsApp will open so you can review the message and press Send.";
        formMessage.classList.add("show");
      }
      const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        // If the browser blocks a new tab, navigate in the current tab instead.
        window.location.href = whatsappUrl;
      }
    });
  }

  // Back-to-top visibility
  const backToTop = document.querySelector(".back-to-top");
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }

  // Keep in-page navigation smooth while respecting reduced motion.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", targetId);
    });
  });

  // Keep the footer year current.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
