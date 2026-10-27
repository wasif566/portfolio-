/* Northloom Textiles — vanilla JavaScript interactions
   Customise the business identity and WhatsApp number before launch. */
(() => {
  "use strict";
  const WHATSAPP_NUMBER = "923266438812"; // international format, digits only
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const quoteForm = document.getElementById("quoteForm");
  const formError = document.getElementById("formError");

  document.getElementById("year").textContent = new Date().getFullYear();

  // Accessible responsive navigation.
  function closeMenu() {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
  menuToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

  // Product category filtering.
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const productCards = [...document.querySelectorAll(".product-card")];
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      productCards.forEach(card => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });
    });
  });

  // Product enquiry buttons select the relevant category and pre-fill the brief.
  const categorySelect = document.getElementById("category");
  const specificationsField = document.getElementById("specifications");
  const productCategoryMap = {
    "Cotton Fabric": "Cotton Fabrics",
    "Polyester Fabric": "Polyester Fabrics",
    "Blended Fabrics": "Blended Fabrics",
    "Knitted Fabrics": "Knitted Fabrics",
    "Woven Fabrics": "Woven Fabrics",
    "Yarn & Textile Materials": "Yarn & Textile Materials",
    "Home Textiles": "Home Textiles",
    "Custom Textile Solutions": "Custom Textile Solutions"
  };
  document.querySelectorAll(".product-inquire").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      const option = productCategoryMap[product];
      if (option) categorySelect.value = option;
      const existing = specificationsField.value.trim();
      const note = `Product of interest: ${product}`;
      if (!existing.toLowerCase().includes(note.toLowerCase())) {
        specificationsField.value = existing ? `${note}\n${existing}` : note;
      }
      document.getElementById("quote").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.getElementById("contactPerson").focus({ preventScroll: true }), 450);
    });
  });

  // Build a URL-encoded WhatsApp inquiry; no quote/order is automatically confirmed.
  quoteForm.addEventListener("submit", event => {
    event.preventDefault();
    formError.textContent = "";
    if (!quoteForm.checkValidity()) {
      formError.textContent = "Please complete all required fields and check your email address.";
      const firstInvalid = quoteForm.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const form = new FormData(quoteForm);
    const field = name => String(form.get(name) || "").trim();
    const lines = [
      "Hello, I would like to enquire about textile products and request a quotation.",
      "",
      `Contact person: ${field("contactPerson")}`,
      `Company name: ${field("companyName")}`,
      `Phone number: ${field("phone")}`,
      `Email address: ${field("email")}`,
      `Product category: ${field("category")}`,
      `Fabric type / intended use: ${field("fabricType") || "Not specified"}`,
      `Required quantity: ${field("quantity")}`,
      `Specifications: ${field("specifications") || "Not specified"}`,
      `Destination country: ${field("destination")}`,
      `Additional requirements: ${field("requirements") || "Not specified"}`,
      "",
      "Please review these requirements and advise on availability, feasible specifications, minimum order quantity, lead time, pricing, delivery terms, and any relevant documentation. I understand this inquiry is not a confirmed order or quotation."
    ];
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  // Use the real configured address once the owner updates the placeholder.
  const address = document.getElementById("businessAddress");
  const mapLink = document.getElementById("mapLink");
  if (address && mapLink) {
    const addressText = address.textContent.trim();
    mapLink.href = addressText === "Add your verified business address"
      ? "https://www.google.com/maps"
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
  }
})();
