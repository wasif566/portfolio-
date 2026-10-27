/* Update the settings below before publishing. */
const SITE_CONFIG = {
  companyName: "FORM & FINISH",
  phoneDisplay: "+92 326 643 8812",
  phoneLink: "+923266438812",
  email: "hello@example.com",
  address: "Add your business address",
  serviceAreas: "Add your service areas",
  openingHours: "Add your opening hours",
  whatsappNumber: "923266438812"
};
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  $$("[data-company]").forEach(e=>e.textContent=SITE_CONFIG.companyName);
  $$("[data-phone]").forEach(e=>e.textContent=SITE_CONFIG.phoneDisplay);
  $$("[data-phone-link]").forEach(e=>e.href=`tel:${SITE_CONFIG.phoneLink}`);
  $$("[data-email]").forEach(e=>e.textContent=SITE_CONFIG.email);
  $$("[data-email-link]").forEach(e=>e.href=`mailto:${SITE_CONFIG.email}`);
  $$("[data-address]").forEach(e=>e.textContent=SITE_CONFIG.address);
  $$("[data-areas]").forEach(e=>e.textContent=`Service areas: ${SITE_CONFIG.serviceAreas}`);
  $$("[data-hours]").forEach(e=>e.textContent=`Opening hours: ${SITE_CONFIG.openingHours}`);
  $$("[data-whatsapp]").forEach(e=>e.href=`https://wa.me/${SITE_CONFIG.whatsappNumber}`);
  $("#year").textContent=new Date().getFullYear();
  document.title=`${SITE_CONFIG.companyName} | Kitchen & Bathroom Renovations`;

  const toggle=$(".menu-toggle"), nav=$("#nav");
  function closeMenu(){nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu");}
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu");});
  $$("nav a").forEach(a=>a.addEventListener("click",closeMenu));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});

  const serviceSelect=$("#service");
  $$("[data-service]").forEach(btn=>btn.addEventListener("click",()=>{
    const text=btn.dataset.service.toLowerCase();
    const exact=[...serviceSelect.options].find(o=>o.text.toLowerCase()===text);
    if(exact)serviceSelect.value=exact.value;
    else if(text.includes("cabinet"))serviceSelect.value="Kitchen cabinet and worktop installation";
    else if(text.includes("plumbing"))serviceSelect.value="Lighting, plumbing fixtures and finishing";
    $("#quote").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    serviceSelect.focus({preventScroll:true});
  }));

  const filters=$$(".filters button"), cards=$$(".project");
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    filters.forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
    cards.forEach(card=>card.hidden=btn.dataset.filter!=="all"&&card.dataset.category!==btn.dataset.filter);
  }));
  const dialog=$("#lightbox"), img=$("img",dialog), caption=$("p",dialog);
  cards.forEach(card=>card.addEventListener("click",()=>{
    img.src=card.dataset.full;img.alt=card.dataset.caption||"Renovation inspiration";
    caption.textContent=card.dataset.caption||"Illustrative design inspiration";
    img.onerror=()=>{img.removeAttribute("src");caption.textContent="This image could not be loaded. Please try again while connected to the internet.";};
    if(dialog.showModal)dialog.showModal();else window.open(card.dataset.full,"_blank","noopener");
  }));
  $(".close-lightbox").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});

  const form=$("#quote-form"), status=$("#form-status");
  const required=["name","phone","address","projectType","service","propertyType","scope"];
  const errors={name:"Please enter your name.",phone:"Please enter a contact phone number.",address:"Please enter the project address or postcode.",projectType:"Please choose a project type.",service:"Please select a service.",propertyType:"Please choose a property type.",scope:"Please describe the work you have in mind."};
  function setError(name,msg){const input=form.elements[name],wrap=input.closest(".field");wrap.classList.toggle("invalid",!!msg);const err=$(".error",wrap);if(err)err.textContent=msg||"";input.setAttribute("aria-invalid",String(!!msg));}
  required.forEach(name=>["input","change"].forEach(ev=>form.elements[name].addEventListener(ev,()=>{if(form.elements[name].value.trim())setError(name,"");})));
  form.elements.email.addEventListener("input",()=>{const el=form.elements.email;setError("email",el.value.trim()&&!el.validity.valid?"Please enter a valid email address.":"");});
  form.addEventListener("submit",e=>{
    e.preventDefault();status.textContent="";let valid=true,first=null;
    required.forEach(name=>{const el=form.elements[name];let msg=el.value.trim()?"":errors[name];if(name==="phone"&&el.value.trim()&&el.value.trim().replace(/[\s()+.-]/g,"").length<7)msg="Please enter a valid phone number.";setError(name,msg);if(msg){valid=false;first ||= el;}});
    const email=form.elements.email;if(email.value.trim()&&!email.validity.valid){setError("email","Please enter a valid email address.");valid=false;first ||= email;}else setError("email","");
    if(!valid){status.textContent="Please check the highlighted fields and try again.";first?.focus();return;}
    const val=name=>form.elements[name].value.trim();
    const optional=(name)=>val(name)||"Not provided";
    const message=[
      "Hello, I would like to discuss a renovation project.","",
      `Customer name: ${val("name")}`,`Phone: ${val("phone")}`,`Email: ${optional("email")}`,
      `Project address/postcode: ${val("address")}`,`Project type: ${val("projectType")}`,
      `Requested service: ${val("service")}`,`Property type: ${val("propertyType")}`,
      `Project scope: ${val("scope")}`,`Estimated budget: ${optional("budget")}`,
      `Preferred start date: ${optional("startDate")}`,`Additional requirements: ${optional("notes")}`,"",
      "Please contact me to discuss the project, availability, and quotation."
    ].join("\n");
    const url=`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    status.textContent="Your enquiry is ready. WhatsApp will open so you can review and send it.";
    window.open(url,"_blank","noopener,noreferrer");
  });
  const date=$("#startDate"), now=new Date(), local=new Date(now.getTime()-now.getTimezoneOffset()*60000);
  date.min=local.toISOString().slice(0,10);
});