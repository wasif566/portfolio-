(() => {
  "use strict";
  const WHATSAPP_NUMBER = "923266438812";
  const form = document.querySelector("#quote-form");
  const serviceSelect = document.querySelector("#cleaning-service");
  const feedback = document.querySelector("#form-feedback");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  // Keep the footer year current.
  document.querySelector("#current-year").textContent = new Date().getFullYear();

  // Mobile navigation: close after a link is selected or Escape is pressed.
  menuToggle?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      closeLightbox();
    }
  });

  // Quote buttons on service cards preselect the matching service.
  document.querySelectorAll(".quote-service").forEach(button => {
    button.addEventListener("click", () => {
      serviceSelect.value = button.dataset.service || "";
      document.querySelector("#quote").scrollIntoView({ behavior: "smooth", block: "start" });
      serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 450);
    });
  });

  // Set the earliest date to today using the visitor's local date.
  const dateInput = document.querySelector("#preferred-date");
  if (dateInput) {
    const now = new Date();
    const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    dateInput.min = localDate;
  }

  function setError(input, message) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.toggle("invalid", Boolean(message));
    const error = field.querySelector(".error-message");
    if (error) error.textContent = message || "";
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function validateForm() {
    let valid = true;
    const requiredFields = [
      [form.elements.name, "Please enter your name."],
      [form.elements.phone, "Please enter a phone number."],
      [form.elements.address, "Please enter the property address or postcode."],
      [form.elements.propertyType, "Please select a property type."],
      [form.elements.service, "Please select a cleaning service."]
    ];
    requiredFields.forEach(([input, message]) => {
      const invalid = !String(input.value || "").trim();
      setError(input, invalid ? message : "");
      if (invalid) valid = false;
    });
    const email = form.elements.email;
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      valid = false;
    } else setError(email, "");
    const count = form.elements.windowCount;
    if (count.value && (!Number.isFinite(Number(count.value)) || Number(count.value) < 1)) {
      setError(count, "Enter a number of windows greater than zero.");
      valid = false;
    } else setError(count, "");
    if (!valid) {
      feedback.textContent = "Please check the highlighted fields and try again.";
      const firstInvalid = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
      firstInvalid?.focus();
    }
    return valid;
  }

  // Clear field-level errors as visitors edit.
  form?.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => {
      if (input.closest(".field")?.classList.contains("invalid")) setError(input, "");
      feedback.textContent = "";
    });
    input.addEventListener("change", () => {
      if (input.closest(".field")?.classList.contains("invalid")) setError(input, "");
      feedback.textContent = "";
    });
  });

  form?.addEventListener("submit", event => {
    event.preventDefault();
    feedback.textContent = "";
    if (!validateForm()) return;

    const data = new FormData(form);
    const optional = (key, fallback = "Not provided") => String(data.get(key) || "").trim() || fallback;
    const message = [
      "Hello, I would like a window cleaning quote.",
      "",
      `Customer name: ${optional("name")}`,
      `Phone: ${optional("phone")}`,
      `Email: ${optional("email")}`,
      `Property address/postcode: ${optional("address")}`,
      `Property type: ${optional("propertyType")}`,
      `Cleaning service: ${optional("service")}`,
      `Number of windows: ${optional("windowCount")}`,
      `Preferred date: ${optional("date")}`,
      `Service frequency: ${optional("frequency")}`,
      `Additional notes: ${optional("notes")}`,
      "",
      "Please contact me to discuss availability and pricing."
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    feedback.textContent = "WhatsApp is opening with your message. Review it there and press Send when ready.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  });

  // Accessible gallery lightbox.
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("p");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  let previousFocus = null;
  function openLightbox(button) {
    if (!lightbox || !lightboxImage) return;
    previousFocus = document.activeElement;
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector("img")?.alt || button.dataset.caption || "Gallery image";
    lightboxCaption.textContent = button.dataset.caption || "";
    lightbox.hidden = false;
    closeButton?.focus();
  }
  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage?.removeAttribute("src");
    previousFocus?.focus?.();
  }
  document.querySelectorAll(".gallery-item").forEach(button => button.addEventListener("click", () => openLightbox(button)));
  closeButton?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
})();
