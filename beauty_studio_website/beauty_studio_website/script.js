(() => {
  "use strict";
  const WHATSAPP_NUMBER = "923266438812";
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const bookingForm = document.getElementById("bookingForm");
  const serviceSelect = document.getElementById("service");
  const dateInput = document.getElementById("date");
  const formStatus = document.getElementById("formStatus");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  let previousFocus = null;

  document.getElementById("year").textContent = new Date().getFullYear();
  // Prevent selecting a date in the past, using the visitor's local date.
  const today = new Date();
  dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelectorAll(".book-service").forEach(button => {
    button.addEventListener("click", () => {
      const requested = button.dataset.service;
      const match = [...serviceSelect.options].find(option => option.value === requested || option.textContent.trim() === requested);
      if (match) serviceSelect.value = match.value;
      document.getElementById("booking").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 350);
    });
  });

  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    formStatus.textContent = "";
    if (!bookingForm.reportValidity()) return;
    const data = new FormData(bookingForm);
    const values = {
      name: String(data.get("customerName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      date: String(data.get("date") || "").trim(),
      time: String(data.get("time") || "").trim(),
      staff: String(data.get("staff") || "").trim(),
      notes: String(data.get("notes") || "").trim()
    };
    const message = [
      "Hello Blush & Bloom Beauty Studio! I'd like to request an appointment.",
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Service: ${values.service}`,
      `Preferred date: ${values.date}`,
      `Preferred time: ${values.time}`,
      values.staff ? `Staff preference: ${values.staff}` : "",
      values.notes ? `Notes: ${values.notes}` : "",
      "",
      "I understand this is a request and is not confirmed until the studio replies."
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      formStatus.textContent = "Your browser blocked the new tab. Use the WhatsApp link above, or allow pop-ups and submit again.";
    } else {
      formStatus.textContent = "WhatsApp opened with your appointment request. Send the message there, then wait for the studio to confirm.";
    }
  });

  function openLightbox(button) {
    const image = button.querySelector("img");
    if (!image) return;
    previousFocus = document.activeElement;
    lightboxImage.src = button.dataset.full || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = button.querySelector("span")?.textContent.replace("↗", "").trim() || image.alt;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
    if (previousFocus) previousFocus.focus();
  }
  document.querySelectorAll(".gallery-item").forEach(button => button.addEventListener("click", () => openLightbox(button)));
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();