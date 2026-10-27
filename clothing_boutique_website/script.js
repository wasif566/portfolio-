/* Maison Edit boutique website
   Edit the CONFIG and PRODUCTS objects below to personalize this demo.
   Replace example product details and social links with verified business information. */
const CONFIG = {
  brandName: "Maison Edit",
  whatsappNumber: "923266438812", // digits only, international format without +
  address: "Add your boutique address",
  email: "hello@example.com",
  hours: "Please message us for current opening hours.",
  socials: {
    instagram: "",
    facebook: ""
  }
};

const PRODUCTS = [
  {id:"linen-shirt", name:"Relaxed Linen Shirt", category:"casual", audience:"women", description:"An easy layer for everyday styling.", price:"", image:"https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85", alt:"Neutral tailored shirt styling", tag:"Everyday edit", sizes:[], colors:[]},
  {id:"tailored-look", name:"Tailored Essentials", category:"formal", audience:"men", description:"Clean lines for a polished look.", price:"", image:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=85", alt:"Smart tailored menswear", tag:"Modern classic", sizes:[], colors:[]},
  {id:"occasion-edit", name:"Occasion Edit", category:"occasion", audience:"women", description:"A considered look for special moments.", price:"", image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85", alt:"Fashion model in an elegant outfit", tag:"Occasion wear", sizes:[], colors:[]},
  {id:"soft-knit", name:"Soft Knit Layer", category:"casual", audience:"women", description:"Comfort-led styling for cooler days.", price:"", image:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85", alt:"Soft neutral knitwear", tag:"New season", sizes:[], colors:[]},
  {id:"traditional-look", name:"Traditional Wear", category:"traditional", audience:"women", description:"A timeless look for gatherings and celebrations.", price:"", image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85", alt:"Traditional inspired clothing", tag:"Celebration", sizes:[], colors:[]},
  {id:"street-style", name:"Weekend Layers", category:"casual", audience:"men", description:"Relaxed pieces made for off-duty days.", price:"", image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", alt:"Contemporary casual fashion", tag:"Off-duty", sizes:[], colors:[]},
  {id:"statement-dress", name:"Statement Silhouette", category:"occasion", audience:"women", description:"An expressive piece for memorable evenings.", price:"", image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85", alt:"Statement fashion dress", tag:"Featured", sizes:[], colors:[]},
  {id:"accessory-edit", name:"Finishing Touches", category:"accessories", audience:"all", description:"Accessories to complete your look.", price:"", image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85", alt:"Fashion accessories and clothing details", tag:"Accessories", sizes:[], colors:[]}
];

const categoryNames = {
  women:"Women's Wear", men:"Men's Wear", casual:"Casual Wear", formal:"Formal Wear",
  traditional:"Traditional Clothing", occasion:"Party & Occasion", accessories:"Accessories"
};
const productGrid = document.querySelector("#product-grid");
const dialog = document.querySelector("#order-dialog");
const orderForm = document.querySelector("#order-form");
const selectedProduct = document.querySelector("#selected-product");
const toast = document.querySelector("#toast");

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function productCard(product) {
  const priceMarkup = product.price ? `<span class="product-price">${safeText(product.price)}</span>` : `<span class="product-price">Ask for price</span>`;
  return `<article class="product-card">
    <div class="product-image-wrap">
      <img class="product-image" src="${safeText(product.image)}" alt="${safeText(product.alt || product.name)}" loading="lazy">
      ${product.tag ? `<span class="product-tag">${safeText(product.tag)}</span>` : ""}
    </div>
    <div class="product-info">
      <span class="product-category">${safeText(categoryNames[product.category] || product.category)}</span>
      <h3>${safeText(product.name)}</h3><p>${safeText(product.description || "Ask us for details about this piece.")}</p>
      <div class="product-bottom">${priceMarkup}<button class="order-link" type="button" data-order="${safeText(product.id)}">Enquire ↗</button></div>
    </div>
  </article>`;
}
function renderProducts(filter = "all") {
  const filtered = PRODUCTS.filter(product => filter === "all" || product.category === filter || product.audience === filter);
  productGrid.innerHTML = filtered.map(productCard).join("");
  if (!filtered.length) productGrid.innerHTML = '<p>No items are currently listed in this category. Message us to ask what is available.</p>';
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}
function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function openGeneralWhatsApp(event) {
  event.preventDefault();
  const message = `Hello ${CONFIG.brandName}, I'd like to ask about your current collections, prices, sizes, and availability.`;
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}
function openOrderForm(productId = "") {
  selectedProduct.innerHTML = '<option value="">Choose a product</option>' + PRODUCTS.map(product =>
    `<option value="${safeText(product.id)}">${safeText(product.name)}</option>`).join("");
  if (productId) selectedProduct.value = productId;
  orderForm.reset();
  if (productId) selectedProduct.value = productId;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else showToast("Please use a modern browser to open the enquiry form.");
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderProducts(button.dataset.filter);
  });
});
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-order]");
  if (button) openOrderForm(button.dataset.order);
});
document.querySelectorAll("[data-whatsapp-general]").forEach(link => link.addEventListener("click", openGeneralWhatsApp));
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
orderForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const data = new FormData(orderForm);
  const product = PRODUCTS.find(item => item.id === data.get("product"));
  const details = [
    `Hello ${CONFIG.brandName}, I'd like to enquire about a product.`,
    `Customer name: ${data.get("customerName")}`,
    `Phone: ${data.get("phone")}`,
    `Product: ${product ? product.name : data.get("product")}`,
    `Quantity: ${data.get("quantity")}`,
    `Size: ${data.get("size") || "Not specified"}`,
    `Color: ${data.get("color") || "Not specified"}`,
    `Preference: ${data.get("fulfillment") || "Not specified"}`,
    `Delivery address: ${data.get("address") || "Not applicable / not provided"}`,
    `Additional notes: ${data.get("notes") || "None"}`,
    `Please confirm current price, availability, and delivery or pickup arrangements.`
  ];
  window.open(whatsappUrl(details.join("\n")), "_blank", "noopener,noreferrer");
  dialog.close();
  showToast("WhatsApp opened. Please send your message to submit the enquiry.");
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll("[data-config]").forEach(element => {
  const key = element.dataset.config;
  if (CONFIG[key]) {
    if (element.tagName === "A") {
      element.textContent = CONFIG[key];
      if (key === "email") element.href = `mailto:${CONFIG.email}`;
    } else element.textContent = CONFIG[key];
  }
});
const directionsLink = document.querySelector("#directions-link");
if (CONFIG.address && !CONFIG.address.startsWith("Add your")) {
  directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.address)}`;
} else {
  directionsLink.href = `https://www.google.com/maps`;
  directionsLink.addEventListener("click", event => {
    if (CONFIG.address.startsWith("Add your")) {
      event.preventDefault();
      showToast("Add your real boutique address in script.js to enable directions.");
    }
  });
}
document.querySelectorAll("[data-social]").forEach(link => {
  const url = CONFIG.socials[link.dataset.social];
  if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
  else link.addEventListener("click", event => { event.preventDefault(); showToast("Add your real social profile URL in script.js."); });
});
renderProducts();
