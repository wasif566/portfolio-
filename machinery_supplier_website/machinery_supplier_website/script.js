/* ForgeWorks Industrial website interactions.
   Update COMPANY, PRODUCTS, CATEGORIES and WHATSAPP_NUMBER before launch.
   Catalogue data is illustrative sample content, not a verified stock list. */
"use strict";

const COMPANY = {
  name: "ForgeWorks Industrial",
  email: "sales@example.com",
  phoneDisplay: "+92 326 6438812",
  whatsapp: "923266438812"
};

const WHATSAPP_NUMBER = COMPANY.whatsapp;

const CATEGORIES = [
  "Industrial machinery",
  "Construction equipment",
  "Agricultural machinery",
  "Workshop equipment",
  "Manufacturing equipment",
  "Generators & power equipment",
  "Pumps & compressors",
  "Welding equipment",
  "Cutting & fabrication",
  "Packaging machinery",
  "Spare parts & accessories",
  "Tools & maintenance"
];

/* Replace sample entries with genuine products and verified technical details. */
const PRODUCTS = [
  {
    id: "sample-001", name: "Industrial Air Compressor", model: "SAMPLE-AC-01",
    category: "Pumps & compressors", description: "Illustrative compressor listing for workshop and general industrial air applications.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    alt: "Industrial equipment in a workshop environment", specs: ["Specification to verify", "Capacity to confirm", "Power to confirm"],
    details: { "Model": "SAMPLE-AC-01", "Capacity": "Confirm with supplier", "Power requirements": "Confirm with supplier", "Dimensions": "Confirm with supplier", "Warranty": "Terms to be confirmed", "Accessories": "Ask supplier" },
    price: "Request quotation", status: "Sample listing"
  },
  {
    id: "sample-002", name: "Workshop Welding Machine", model: "SAMPLE-WM-02",
    category: "Welding equipment", description: "Sample welding equipment card. Confirm duty cycle, input supply and process compatibility.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
    alt: "Metal fabrication and welding work in a workshop", specs: ["Duty cycle: verify", "Supply: verify", "Process: verify"],
    details: { "Model": "SAMPLE-WM-02", "Welding process": "Confirm with supplier", "Input supply": "Confirm with supplier", "Duty cycle": "Confirm with supplier", "Warranty": "Terms to be confirmed", "Accessories": "Ask supplier" },
    price: "Request quotation", status: "Sample listing"
  },
  {
    id: "sample-003", name: "Portable Generator", model: "SAMPLE-PG-03",
    category: "Generators & power equipment", description: "Illustrative power equipment listing. Output, fuel type and operating limits need confirmation.",
    image: "https://images.unsplash.com/photo-1473341304170-971adc7b3c0a?auto=format&fit=crop&w=900&q=80",
    alt: "Industrial electrical equipment", specs: ["Output: verify", "Fuel type: verify", "Runtime: verify"],
    details: { "Model": "SAMPLE-PG-03", "Rated output": "Confirm with supplier", "Fuel type": "Confirm with supplier", "Runtime": "Confirm with supplier", "Dimensions": "Confirm with supplier", "Warranty": "Terms to be confirmed" },
    price: "Request quotation", status: "Sample listing"
  },
  {
    id: "sample-004", name: "Metal Cutting Equipment", model: "SAMPLE-MC-04",
    category: "Cutting & fabrication", description: "Sample fabrication equipment listing for demonstration. Check material range and tolerances.",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",
    alt: "Metal fabrication equipment in an industrial workshop", specs: ["Material range: verify", "Capacity: verify", "Power: verify"],
    details: { "Model": "SAMPLE-MC-04", "Cutting method": "Confirm with supplier", "Material range": "Confirm with supplier", "Working capacity": "Confirm with supplier", "Power requirements": "Confirm with supplier", "Warranty": "Terms to be confirmed" },
    price: "Request quotation", status: "Sample listing"
  },
  {
    id: "sample-005", name: "Industrial Water Pump", model: "SAMPLE-WP-05",
    category: "Pumps & compressors", description: "Illustrative pump listing. Flow rate, head, fluid compatibility and seal materials must be checked.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
    alt: "Industrial machinery and equipment", specs: ["Flow rate: verify", "Head: verify", "Fluid: verify"],
    details: { "Model": "SAMPLE-WP-05", "Flow rate": "Confirm with supplier", "Head": "Confirm with supplier", "Fluid compatibility": "Confirm with supplier", "Connection size": "Confirm with supplier", "Warranty": "Terms to be confirmed" },
    price: "Request quotation", status: "Sample listing"
  },
  {
    id: "sample-006", name: "Workshop Tool Set", model: "SAMPLE-TS-06",
    category: "Tools & maintenance", description: "Sample maintenance tool listing. Replace with the actual kit contents and manufacturer details.",
    image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8a74?auto=format&fit=crop&w=900&q=80",
    alt: "Workshop tools arranged for maintenance work", specs: ["Contents: verify", "Material: verify", "Case: verify"],
    details: { "Model": "SAMPLE-TS-06", "Kit contents": "Confirm with supplier", "Material": "Confirm with supplier", "Case / storage": "Confirm with supplier", "Compatibility": "Confirm with supplier", "Warranty": "Terms to be confirmed" },
    price: "Request quotation", status: "Sample listing"
  }
];

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("product-search");
const categoryFilter = document.getElementById("category-filter");
const clearFiltersButton = document.getElementById("clear-filters");
const resultsCount = document.getElementById("results-count");
const quoteForm = document.getElementById("quote-form");
const productCategorySelect = document.getElementById("product-category");
const productNameInput = document.getElementById("product-name");
const feedback = document.getElementById("form-feedback");
const productDialog = document.getElementById("product-dialog");
const dialogContent = document.getElementById("dialog-content");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function populateCategorySelects() {
  CATEGORIES.forEach((category) => {
    const option1 = document.createElement("option");
    option1.value = category;
    option1.textContent = category;
    categoryFilter.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = category;
    option2.textContent = category;
    productCategorySelect.appendChild(option2);
  });
}

function whatsappURL(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function generalWhatsAppMessage() {
  return `Hello ${COMPANY.name}, I would like to make a general machinery and equipment enquiry. Please let me know how you can assist.`;
}

function attachWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-general]").forEach((link) => {
    link.href = whatsappURL(generalWhatsAppMessage());
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function quoteMessageForProduct(product) {
  return [
    `Hello ${COMPANY.name}, I would like to request a quotation for the following sample catalogue item.`,
    `Product: ${product.name}`,
    `Model: ${product.model}`,
    `Category: ${product.category}`,
    "Please confirm the correct specification, availability, price, warranty and delivery options.",
    "This message is an enquiry only and is not a confirmed order."
  ].join("\n");
}

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const searchable = [product.name, product.model, product.category, product.description, ...product.specs].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(term);
  });

  resultsCount.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} sample products`;
  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state"><h3>No matching products</h3><p>Try a different keyword or clear the category filter.</p></div>';
    return;
  }

  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.alt)}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/equipment-placeholder.svg'">
        <span class="sample-tag">Sample listing</span>
      </div>
      <div class="product-body">
        <div class="product-meta"><span>${escapeHTML(product.category)}</span><span>${escapeHTML(product.status)}</span></div>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="model-line">Model: ${escapeHTML(product.model)}</p>
        <p class="product-description">${escapeHTML(product.description)}</p>
        <div class="spec-chips">${product.specs.map((spec) => `<span>${escapeHTML(spec)}</span>`).join("")}</div>
        <div class="product-foot"><div class="price-label">Request quotation<small>Price not listed</small></div>
          <div class="product-actions">
            <button class="mini-button" type="button" data-details="${escapeHTML(product.id)}">Details</button>
            <a class="mini-button primary" href="${escapeHTML(whatsappURL(quoteMessageForProduct(product)))}" target="_blank" rel="noopener noreferrer">Get quote ↗</a>
          </div>
        </div>
      </div>
    </article>`).join("");
}

function showProductDetails(product) {
  const rows = Object.entries(product.details).map(([key, value]) =>
    `<tr><th scope="row">${escapeHTML(key)}</th><td>${escapeHTML(value)}</td></tr>`
  ).join("");
  dialogContent.innerHTML = `
    <div class="dialog-product">
      <div class="dialog-product-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.alt)}" onerror="this.onerror=null;this.src='assets/images/equipment-placeholder.svg'"></div>
      <div class="dialog-product-info">
        <p class="eyebrow dark">${escapeHTML(product.category)} / SAMPLE</p>
        <h2 id="dialog-title">${escapeHTML(product.name)}</h2>
        <p>Model: ${escapeHTML(product.model)}</p>
        <p>${escapeHTML(product.description)}</p>
        <table><tbody>${rows}</tbody></table>
        <p><strong>Specification sheet:</strong> Placeholder — request the verified datasheet from the supplier.</p>
        <div class="dialog-actions">
          <a class="button button-orange" href="${escapeHTML(whatsappURL(quoteMessageForProduct(product)))}" target="_blank" rel="noopener noreferrer">Request a quote ↗</a>
          <button class="button button-light-outline" type="button" data-close-dialog>Close details</button>
        </div>
      </div>
    </div>`;
  if (typeof productDialog.showModal === "function") productDialog.showModal();
  else productDialog.setAttribute("open", "");
}

function clearInvalidStates(form) {
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => field.removeAttribute("aria-invalid"));
}

function validateForm() {
  clearInvalidStates(quoteForm);
  const requiredIds = ["company", "contact-person", "phone", "request-type", "product-category", "quantity", "delivery-location"];
  let firstInvalid = null;
  for (const id of requiredIds) {
    const field = document.getElementById(id);
    const value = field.value.trim();
    const invalid = !value || (id === "quantity" && (!Number.isInteger(Number(value)) || Number(value) < 1));
    if (invalid) {
      field.setAttribute("aria-invalid", "true");
      firstInvalid ||= field;
    }
  }
  const email = document.getElementById("email");
  if (email.value.trim() && !email.validity.valid) {
    email.setAttribute("aria-invalid", "true");
    firstInvalid ||= email;
  }
  if (firstInvalid) {
    feedback.textContent = "Please complete the required fields and check the highlighted information.";
    feedback.classList.remove("success");
    firstInvalid.focus();
    return false;
  }
  feedback.textContent = "";
  return true;
}

function submitQuote(event) {
  event.preventDefault();
  if (!validateForm()) return;
  const formData = new FormData(quoteForm);
  const fields = [
    ["Company / business", "company"],
    ["Contact person", "contactPerson"],
    ["Phone", "phone"],
    ["Email", "email"],
    ["Business / industry", "industry"],
    ["Enquiry type", "requestType"],
    ["Product category", "productCategory"],
    ["Product / model", "productName"],
    ["Quantity", "quantity"],
    ["Delivery location", "deliveryLocation"],
    ["Required delivery date", "deliveryDate"],
    ["Technical requirements", "requirements"]
  ];
  const lines = [`Quotation enquiry — ${COMPANY.name}`, ""];
  fields.forEach(([label, name]) => {
    const value = String(formData.get(name) || "").trim();
    if (value) lines.push(`${label}: ${value}`);
  });
  lines.push("", "Please confirm product specification, availability, pricing, warranty and delivery lead time. This is an enquiry only, not a confirmed order.");
  const url = whatsappURL(lines.join("\n"));
  feedback.textContent = "Your enquiry is ready. WhatsApp will open in a new tab so you can review and send the message.";
  feedback.classList.add("success");
  window.open(url, "_blank", "noopener,noreferrer");
}

function setupNavigation() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }));
}

function setupFAQs() {
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      answer.hidden = isOpen;
    });
  });
}

function setupBackToTop() {
  const button = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => button.classList.toggle("visible", window.scrollY > 500), { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupDateMinimum() {
  const date = document.getElementById("delivery-date");
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  date.min = localDate;
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-details]");
  if (!button) return;
  const product = PRODUCTS.find((item) => item.id === button.dataset.details);
  if (product) showProductDetails(product);
});

dialogContent.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-dialog]") && typeof productDialog.close === "function") productDialog.close();
});
document.getElementById("dialog-close").addEventListener("click", () => {
  if (typeof productDialog.close === "function") productDialog.close();
  else productDialog.removeAttribute("open");
});
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog && typeof productDialog.close === "function") productDialog.close();
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  renderProducts();
});
quoteForm.addEventListener("submit", submitQuote);

document.getElementById("current-year").textContent = new Date().getFullYear();
populateCategorySelects();
attachWhatsAppLinks();
renderProducts();
setupNavigation();
setupFAQs();
setupBackToTop();
setupDateMinimum();
