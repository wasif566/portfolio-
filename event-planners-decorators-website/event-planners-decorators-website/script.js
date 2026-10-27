/* Maison Events — update this one object to configure the business contact. */
const BUSINESS = {
  name: "Maison Events",
  whatsapp: "923266438812",
  phoneDisplay: "+92 326 6438812"
};

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }));

  document.getElementById("year").textContent = new Date().getFullYear();

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".portfolio-filters .filter");
  const portfolioItems = [...document.querySelectorAll(".portfolio-item")];
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const filter = button.dataset.filter;
    portfolioItems.forEach(item => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  }));

  // Quote links prefill the event form when possible.
  document.querySelectorAll(".service-enquiry").forEach(link => link.addEventListener("click", () => {
    const service = link.dataset.service;
    const type = document.querySelector('[name="eventType"]');
    if (!service || !type) return;
    if (/wedding/i.test(service)) type.value = "Wedding";
    else if (/corporate/i.test(service)) type.value = "Corporate event";
    else if (/private|celebration/i.test(service)) type.value = "Private party";
  }));
  document.querySelectorAll(".package-enquiry").forEach(link => link.addEventListener("click", () => {
    const field = document.querySelector('[name="details"]');
    if (field && link.dataset.package) field.value = `I'm interested in the ${link.dataset.package} package.`;
  }));

  // Dynamic venue details field.
  const venueStatus = document.getElementById("venue-status");
  const venueDetails = document.getElementById("venue-details");
  venueStatus?.addEventListener("change", () => {
    const show = venueStatus.value === "Venue booked" || venueStatus.value === "Shortlisting venues";
    venueDetails.hidden = !show;
    if (!show) venueDetails.querySelector("input").value = "";
  });

  // Accessible lightbox with keyboard support and filtered item navigation.
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");
  const lightboxCategory = document.getElementById("lightbox-category");
  let activeItemIndex = 0;
  const visibleItems = () => portfolioItems.filter(item => !item.hidden);
  const showItem = item => {
    if (!item) return;
    const image = item.querySelector("img");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = item.dataset.title || image.alt;
    lightboxDescription.textContent = item.dataset.description || "";
    lightboxCategory.textContent = (item.dataset.category || "INSPIRATION").toUpperCase();
    activeItemIndex = visibleItems().indexOf(item);
  };
  portfolioItems.forEach(item => item.addEventListener("click", () => {
    showItem(item);
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
  }));
  const stepLightbox = direction => {
    const items = visibleItems();
    if (!items.length) return;
    activeItemIndex = (activeItemIndex + direction + items.length) % items.length;
    showItem(items[activeItemIndex]);
  };
  document.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  document.querySelector(".lightbox-prev")?.addEventListener("click", () => stepLightbox(-1));
  document.querySelector(".lightbox-next")?.addEventListener("click", () => stepLightbox(1));
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });
  lightbox?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });

  // Event enquiry form validation and WhatsApp message.
  const form = document.getElementById("event-form");
  const status = document.getElementById("form-status");
  const requiredNames = ["name", "phone", "eventType", "date", "location"];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const setError = (field, message) => {
    const error = field.parentElement.querySelector(".error");
    if (error) error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  };
  form?.querySelectorAll("input,select,textarea").forEach(field => {
    field.addEventListener("input", () => setError(field, ""));
    field.addEventListener("change", () => setError(field, ""));
  });
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    let valid = true;
    let firstInvalid = null;
    requiredNames.forEach(name => {
      const field = form.elements.namedItem(name);
      let message = "";
      if (!String(data.get(name) || "").trim()) message = "This field is required.";
      if (name === "phone" && String(data.get(name) || "").replace(/\D/g, "").length < 7) message = "Enter a valid phone number.";
      if (name === "date" && data.get(name) && data.get(name) < new Date().toISOString().slice(0, 10)) message = "Choose today or a future date.";
      if (message) { valid = false; firstInvalid ||= field; }
      setError(field, message);
    });
    const email = form.elements.namedItem("email");
    if (email.value.trim() && !emailPattern.test(email.value.trim())) {
      setError(email, "Enter a valid email address."); valid = false; firstInvalid ||= email;
    } else setError(email, "");
    if (!valid) {
      status.textContent = "Please check the highlighted fields and try again.";
      firstInvalid?.focus();
      return;
    }
    const value = name => String(data.get(name) || "").trim() || "Not provided";
    const services = data.getAll("services");
    const message = [
      `Hello ${BUSINESS.name}, I'd like to enquire about planning an event.`,
      "",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Event type: ${value("eventType")}`,
      `Event date: ${value("date")}`,
      `Event location: ${value("location")}`,
      `Estimated guest count: ${value("guests")}`,
      `Estimated budget: ${value("budget")}`,
      `Required services: ${services.length ? services.join(", ") : "Not selected"}`,
      `Preferred theme / style: ${value("theme")}`,
      `Venue status: ${value("venueStatus")}`,
      `Venue details: ${value("venueDetails")}`,
      `Additional details: ${value("details")}`,
      "",
      "Please let me know the possible options and next steps. I understand this is an enquiry, not a confirmed booking."
    ].join("\n");
    const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
    status.textContent = "Opening WhatsApp with your prepared enquiry. Review the details and send the message to contact the business.";
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      status.textContent = "Your browser blocked the new tab. Use this link to open your prepared enquiry:";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.className = "text-link";
      fallback.textContent = "Open WhatsApp enquiry ↗";
      fallback.style.marginTop = "10px";
      fallback.style.display = "inline-flex";
      status.append(document.createElement("br"), fallback);
    }
  });

  // Back-to-top button
  const backTop = document.querySelector(".back-top");
  const updateBackTop = () => backTop?.classList.toggle("visible", window.scrollY > 500);
  window.addEventListener("scroll", updateBackTop, { passive: true });
  updateBackTop();
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

  // Neutral background fallback for images that fail to load.
  document.querySelectorAll("img").forEach(img => img.addEventListener("error", () => {
    img.style.minHeight = "160px";
    img.style.background = "linear-gradient(135deg, #eee5d7, #d9c8ab)";
    img.alt = `${img.alt} (image unavailable)`;
    img.removeAttribute("src");
  }, { once: true }));
});