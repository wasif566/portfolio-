/* Ever After Studio — wedding photography / planning website.
   Edit CONFIG, SERVICES, PACKAGES, and PORTFOLIO below before publishing.
   Portfolio images are illustrative stock images until replaced with authorized work. */
const CONFIG = {
  businessName: "Ever After Studio",
  whatsappNumber: "923266438812", // international digits only, no plus sign
  phoneDisplay: "+92 326 6438812",
  address: "Add your studio address",
  email: "hello@example.com",
  hours: "By appointment — please enquire.",
  socials: { instagram: "", facebook: "", pinterest: "" }
};

const SERVICES = [
  {id:"wedding-photography",name:"Wedding Photography",description:"Thoughtful coverage of the meaningful moments, details, and people who make your day yours.",image:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",alt:"Wedding couple during an outdoor celebration",enabled:true},
  {id:"wedding-videography",name:"Wedding Videography",description:"Ask about cinematic motion coverage and the options available for your celebration.",image:"https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",alt:"Wedding couple with photographer at an outdoor venue",enabled:true},
  {id:"engagement-photography",name:"Engagement Photography",description:"A relaxed session to celebrate your story before the wedding day.",image:"https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=85",alt:"Couple portrait in a natural setting",enabled:true},
  {id:"pre-wedding-shoot",name:"Pre-Wedding Shoots",description:"Plan a portrait session around your shared style, location, and ideas.",image:"https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=85",alt:"Romantic couple portrait outdoors",enabled:true},
  {id:"wedding-day-coverage",name:"Wedding Day Coverage",description:"Discuss the moments and schedule you would like documented on the day.",image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",alt:"Wedding ceremony and guests",enabled:true},
  {id:"wedding-planning",name:"Wedding Planning",description:"Planning support can be tailored around your event needs and confirmed scope.",image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",alt:"Elegant wedding reception table setup",enabled:true},
  {id:"event-coordination",name:"Event Coordination",description:"Ask about coordination support, timelines, and supplier communication.",image:"https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",alt:"Wedding reception with floral decoration",enabled:true},
  {id:"reception-photography",name:"Reception Photography",description:"Capture the atmosphere, styling, speeches, and celebration with care.",image:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",alt:"Wedding reception decorations",enabled:true},
  {id:"album-design",name:"Album Design",description:"Ask about album design and print options, if offered by the studio.",image:"https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85",alt:"Wedding details and printed keepsakes",enabled:true}
];

const PACKAGES = [
  {id:"intimate",name:"Intimate Moments",label:"A smaller celebration",description:"For couples planning a more intimate day.",price:"Ask for pricing",duration:"To be confirmed",items:["Discuss your event priorities","Coverage and deliverables confirmed after consultation"],featured:false},
  {id:"signature",name:"Signature Story",label:"A tailored experience",description:"A conversation-led option for your key wedding moments.",price:"Ask for pricing",duration:"To be confirmed",items:["Discuss the moments that matter","Coverage and deliverables confirmed after consultation"],featured:true},
  {id:"celebration",name:"Full Celebration",label:"For a fuller event story",description:"Discuss photography or planning needs across your celebration.",price:"Ask for pricing",duration:"To be confirmed",items:["Review your event schedule","Scope, coverage, and deliverables confirmed"],featured:false}
];

const PORTFOLIO = [
  {id:"p1",title:"A Garden Ceremony",category:"ceremony",image:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",alt:"Couple at an outdoor wedding ceremony"},
  {id:"p2",title:"The Quiet In-Between",category:"couples",image:"https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85",alt:"Couple sharing a quiet moment outdoors"},
  {id:"p3",title:"An Evening Together",category:"reception",image:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",alt:"Elegant wedding reception details"},
  {id:"p4",title:"A Promise Made",category:"engagement",image:"https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85",alt:"Engaged couple portrait"},
  {id:"p5",title:"The Ceremony Details",category:"ceremony",image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",alt:"Wedding ceremony scene"},
  {id:"p6",title:"Just the Two of You",category:"couples",image:"https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85",alt:"Romantic couple portrait"},
  {id:"p7",title:"Tables Set for Celebration",category:"reception",image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",alt:"Wedding table arrangement with flowers"},
  {id:"p8",title:"Before the Big Day",category:"engagement",image:"https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1200&q=85",alt:"Couple celebrating together"}
];

const categoryLabels = {ceremony:"Ceremonies",couples:"Couple Portraits",reception:"Receptions",engagement:"Engagements"};
const portfolioGrid = document.querySelector("#portfolio-grid");
const servicesGrid = document.querySelector("#services-grid");
const packagesGrid = document.querySelector("#packages-grid");
const inquiryService = document.querySelector("#inquiry-service");
const inquiryPackage = document.querySelector("#inquiry-package");
const toast = document.querySelector("#toast");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
let visiblePortfolio = [];
let lightboxIndex = 0;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}
function waURL(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function generalWhatsApp(event) {
  event.preventDefault();
  window.open(waURL(`Hello ${CONFIG.businessName}, I'd like to ask about your wedding photography and event-planning services.`), "_blank", "noopener,noreferrer");
}
function renderPortfolio(filter = "all") {
  visiblePortfolio = PORTFOLIO.filter(item => filter === "all" || item.category === filter);
  portfolioGrid.innerHTML = visiblePortfolio.map((item, index) => `
    <button class="portfolio-item" type="button" data-portfolio-index="${index}" aria-label="Open image: ${escapeHTML(item.title)}">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.alt || item.title)}" loading="lazy">
      <span class="portfolio-caption"><span><small>${escapeHTML(categoryLabels[item.category] || item.category)}</small><strong>${escapeHTML(item.title)}</strong></span><span aria-hidden="true">↗</span></span>
    </button>`).join("");
}
function renderServices() {
  const enabled = SERVICES.filter(service => service.enabled);
  servicesGrid.innerHTML = enabled.map((service, index) => `
    <article class="service-card">
      <img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.alt || service.name)}" loading="lazy">
      <div class="service-content"><span class="service-number">SERVICE / ${String(index+1).padStart(2,"0")}</span><h3>${escapeHTML(service.name)}</h3><p>${escapeHTML(service.description)}</p>
      <button class="text-link" type="button" data-service="${escapeHTML(service.id)}">Enquire about this service <span>↗</span></button></div>
    </article>`).join("");
  inquiryService.innerHTML = '<option value="">Choose a service</option>' + enabled.map(s => `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)}</option>`).join("") + '<option value="other">Other / discuss options</option>';
}
function renderPackages() {
  packagesGrid.innerHTML = PACKAGES.map(pkg => `
    <article class="package-card ${pkg.featured ? "featured" : ""}">
      <span class="package-label">${escapeHTML(pkg.label)}</span><h3>${escapeHTML(pkg.name)}</h3><p class="package-description">${escapeHTML(pkg.description)}</p>
      <div class="package-price">${escapeHTML(pkg.price || "Ask for pricing")}</div>
      <ul class="package-list">${pkg.items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
      <button class="button ${pkg.featured ? "button-dark" : "button-outline-dark"}" type="button" data-package="${escapeHTML(pkg.id)}">Enquire about package <span>↗</span></button>
    </article>`).join("");
  inquiryPackage.innerHTML = '<option value="">Not sure yet</option>' + PACKAGES.map(p => `<option value="${escapeHTML(p.id)}">${escapeHTML(p.name)}</option>`).join("");
}
function showLightbox(index) {
  if (!visiblePortfolio.length) return;
  lightboxIndex = (index + visiblePortfolio.length) % visiblePortfolio.length;
  const item = visiblePortfolio[lightboxIndex];
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt || item.title;
  lightboxCaption.textContent = `${item.title} · ${categoryLabels[item.category] || item.category}`;
  if (!lightbox.open) lightbox.showModal();
}
function changeLightbox(step) { showLightbox(lightboxIndex + step); }

document.querySelectorAll(".filter-btn").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter-btn").forEach(other => {
    const active = other === button;
    other.classList.toggle("active", active);
    other.setAttribute("aria-pressed", String(active));
  });
  renderPortfolio(button.dataset.filter);
}));
portfolioGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-portfolio-index]");
  if (button) showLightbox(Number(button.dataset.portfolioIndex));
});
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-prev").addEventListener("click", () => changeLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => changeLightbox(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener("keydown", event => {
  if (!lightbox.open) return;
  if (event.key === "ArrowRight") changeLightbox(1);
  if (event.key === "ArrowLeft") changeLightbox(-1);
});
servicesGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-service]");
  if (!button) return;
  inquiryService.value = button.dataset.service;
  document.querySelector("#inquiry").scrollIntoView({behavior:"smooth"});
  showToast("Service selected. Complete the enquiry form below.");
});
packagesGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-package]");
  if (!button) return;
  inquiryPackage.value = button.dataset.package;
  document.querySelector("#inquiry").scrollIntoView({behavior:"smooth"});
  showToast("Package selected. Complete the enquiry form below.");
});
document.querySelectorAll("[data-whatsapp-general]").forEach(link => link.addEventListener("click", generalWhatsApp));

const eventDate = document.querySelector("#event-date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
eventDate.min = localToday;
document.querySelector("#inquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const service = SERVICES.find(s => s.id === data.get("service"));
  const pkg = PACKAGES.find(p => p.id === data.get("package"));
  const message = [
    `Hello ${CONFIG.businessName}, I'd like to enquire about my wedding/event.`,
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Email: ${data.get("email") || "Not provided"}`,
    `Event date: ${data.get("eventDate")}`,
    `Event location: ${data.get("location")}`,
    `Venue: ${data.get("venue") || "Not specified"}`,
    `Selected service: ${service ? service.name : (data.get("service") === "other" ? "Other / discuss options" : data.get("service"))}`,
    `Selected package: ${pkg ? pkg.name : "Not selected"}`,
    `Estimated duration: ${data.get("duration") || "Not specified"}`,
    `Preference: ${data.get("preference") || "Not specified"}`,
    `Additional requirements: ${data.get("notes") || "None"}`,
    "Please confirm your availability, pricing, service scope, and next steps. I understand this enquiry does not reserve the event date."
  ].join("\n");
  window.open(waURL(message), "_blank", "noopener,noreferrer");
  showToast("WhatsApp opened. Send the message to submit your enquiry.");
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
    element.textContent = CONFIG[key];
    if (element.tagName === "A" && key === "email") element.href = `mailto:${CONFIG.email}`;
  }
});
const directionsLink = document.querySelector("#directions-link");
if (CONFIG.address && !CONFIG.address.startsWith("Add your")) {
  directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.address)}`;
} else {
  directionsLink.href = "https://www.google.com/maps";
  directionsLink.addEventListener("click", event => {
    if (CONFIG.address.startsWith("Add your")) {
      event.preventDefault();
      showToast("Add your real studio address in script.js to enable directions.");
    }
  });
}
document.querySelectorAll("[data-social]").forEach(link => {
  const url = CONFIG.socials[link.dataset.social];
  if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
  else link.addEventListener("click", event => { event.preventDefault(); showToast("Add your real social profile URL in script.js."); });
});

renderPortfolio();
renderServices();
renderPackages();
