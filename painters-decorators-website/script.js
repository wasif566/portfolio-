(() => {
  "use strict";

  // Update this single value to change the WhatsApp destination for the whole site.
  const WHATSAPP_NUMBER = "923266438812";

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    nav.classList.toggle("open", !expanded);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  }));

  // Gallery category filters.
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      galleryItems.forEach(item => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  // Accessible image lightbox with keyboard and previous/next controls.
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("figcaption");
  const visibleGalleryItems = () => galleryItems.filter(item => !item.hidden);
  let currentImageIndex = 0;
  let previousFocus = null;

  function showLightboxImage(index) {
    const items = visibleGalleryItems();
    if (!items.length) return;
    currentImageIndex = (index + items.length) % items.length;
    const item = items[currentImageIndex];
    lightboxImg.src = item.dataset.full || item.querySelector("img").src;
    lightboxImg.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.title || item.querySelector("img").alt;
  }
  function openLightbox(item) {
    previousFocus = document.activeElement;
    currentImageIndex = visibleGalleryItems().indexOf(item);
    showLightboxImage(currentImageIndex);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (previousFocus) previousFocus.focus();
  }
  galleryItems.forEach(item => item.addEventListener("click", () => openLightbox(item)));
  lightbox?.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox?.querySelector(".lightbox-prev").addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
  lightbox?.querySelector(".lightbox-next").addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (lightbox?.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
    if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
  });

  // FAQ accordion.
  document.querySelectorAll(".faq-item button").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.closest(".faq-item").querySelector(".faq-answer").hidden = expanded;
    });
  });

  // Service and quote-type links preselect the matching project type.
  const projectSelect = document.getElementById("project-type");
  function selectProject(value) {
    if (!value || !projectSelect) return;
    const options = [...projectSelect.options];
    const match = options.find(option => option.text.toLowerCase() === value.toLowerCase())
      || options.find(option => option.text.toLowerCase().includes(value.toLowerCase().split(" ")[0]));
    if (match) projectSelect.value = match.value;
  }
  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
    selectProject(link.dataset.service);
  }));
  document.querySelectorAll("[data-project]").forEach(link => link.addEventListener("click", () => {
    selectProject(link.dataset.project);
  }));

  // Quote form: validate required fields, then prepare a WhatsApp message.
  const form = document.getElementById("quote-form");
  const status = document.getElementById("form-status");
  const requiredFields = ["name", "phone", "propertyType", "projectType", "workArea", "location"];
  const labels = {
    name: "Name", phone: "Phone", email: "Email", propertyType: "Property type",
    projectType: "Project type", workArea: "Work area", quantity: "Rooms / area",
    condition: "Surface condition", finish: "Preferred finish", location: "Property location",
    startDate: "Preferred start date", details: "Additional details"
  };

  function fieldValue(name) {
    const field = form.elements.namedItem(name);
    return field ? field.value.trim() : "";
  }
  function validateField(name) {
    const field = form.elements.namedItem(name);
    if (!field) return true;
    let message = "";
    if (requiredFields.includes(name) && !field.value.trim()) message = "Please complete this field.";
    else if (name === "phone" && field.value.trim() && field.value.trim().replace(/[^\d+]/g, "").length < 7) message = "Enter a valid phone number.";
    else if (name === "email" && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = "Enter a valid email address.";
    const row = field.closest(".form-row");
    if (row) {
      row.classList.toggle("invalid", Boolean(message));
      const error = row.querySelector(".field-error");
      if (error) error.textContent = message;
    }
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  }
  form?.querySelectorAll("input,select,textarea").forEach(field => {
    field.addEventListener("blur", () => validateField(field.name));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field.name);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field.name);
    });
  });

  form?.addEventListener("submit", event => {
    event.preventDefault();
    status.textContent = "";
    const valid = [...new Set([...requiredFields, "email"])].map(validateField).every(Boolean);
    if (!valid) {
      status.style.color = "#a63f36";
      status.textContent = "Please check the highlighted fields and try again.";
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const order = ["name", "phone", "email", "propertyType", "projectType", "workArea", "quantity", "condition", "finish", "location", "startDate", "details"];
    const lines = [
      "Hello Evergreen Painting Co., I'd like to enquire about a painting/decorating project.",
      "",
      ...order.filter(name => fieldValue(name)).map(name => `${labels[name]}: ${fieldValue(name)}`),
      "",
      "I understand this is an enquiry only, not a confirmed booking or final quotation."
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    status.style.color = "#456448";
    status.textContent = "Your enquiry message is ready. WhatsApp will open in a new tab; review it and press Send to contact the business.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      status.textContent = "Your message is ready, but the browser blocked the new tab. Use the WhatsApp link at the top of the page or allow pop-ups and submit again.";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Open your prepared WhatsApp message";
      fallback.className = "text-link";
      fallback.style.marginTop = "10px";
      status.appendChild(document.createElement("br"));
      status.appendChild(fallback);
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // Graceful image fallback for remote assets that cannot be reached.
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = "true";
      img.style.background = "linear-gradient(135deg,#e6e4db,#bfc6b8)";
      img.style.minHeight = "120px";
      img.alt = `${img.alt} (image unavailable; replace with a local project photo)`;
    });
  });
})();
