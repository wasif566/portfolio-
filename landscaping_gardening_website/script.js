/* Evergreen Outdoor Co. — update this configuration before launch. */
"use strict";
const COMPANY={name:"Evergreen Outdoor Co.",whatsapp:"923266438812",phone:"+92 326 6438812",email:"hello@example.com"};
const WHATSAPP_NUMBER=COMPANY.whatsapp;
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const waURL=(message)=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const generalMessage=()=>`Hello ${COMPANY.name}, I'd like to enquire about your landscaping and gardening services. Please let me know how to get started.`;
$$("[data-wa-general]").forEach(a=>{a.href=waURL(generalMessage());a.target="_blank";a.rel="noopener noreferrer";});
$("#year").textContent=new Date().getFullYear();

const menu=$("#menu"),nav=$("#nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close navigation":"Open navigation");});
$$("nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");}));
window.addEventListener("resize",()=>{if(innerWidth>850){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}});

function chooseService(service){
  const select=$("#service"),option=[...select.options].find(o=>o.value.toLowerCase()===service.toLowerCase());
  if(option)select.value=option.value;
  $("#quote").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  if(!option){$("#feedback").textContent=`You selected "${service}". Choose the closest option or describe it in your project notes.`;}
  $("#customer-name").focus({preventScroll:true});
}
$$("[data-service]").forEach(button=>button.addEventListener("click",()=>chooseService(button.dataset.service)));

const filterButtons=$$("[data-filter]"),galleryItems=$$(".gallery-item");
filterButtons.forEach(button=>button.addEventListener("click",()=>{
  const filter=button.dataset.filter;
  filterButtons.forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  galleryItems.forEach(item=>item.hidden=filter!=="all"&&item.dataset.category!==filter);
}));

const lightbox=$("#lightbox"),lbImg=$("#lb-img"),lbCaption=$("#lb-caption");
let currentIndex=0,lastTrigger=null;
function visibleGallery(){return galleryItems.filter(item=>!item.hidden);}
function showGalleryImage(index){
  const list=visibleGallery();if(!list.length)return;
  currentIndex=(index+list.length)%list.length;const item=list[currentIndex],img=$("img",item);
  lbImg.src=item.dataset.full||img.src;lbImg.alt=img.alt;
  lbCaption.textContent=(item.dataset.caption||"Garden inspiration")+" — example image, not a verified company project.";
}
galleryItems.forEach(item=>item.addEventListener("click",()=>{
  lastTrigger=item;currentIndex=visibleGallery().indexOf(item);showGalleryImage(currentIndex);
  if(typeof lightbox.showModal==="function")lightbox.showModal();else lightbox.setAttribute("open","");
  $("#lb-close").focus();
}));
$("#lb-close").addEventListener("click",()=>{if(lightbox.close)lightbox.close();else lightbox.removeAttribute("open");});
$("#lb-prev").addEventListener("click",()=>showGalleryImage(currentIndex-1));
$("#lb-next").addEventListener("click",()=>showGalleryImage(currentIndex+1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox&&lightbox.close)lightbox.close();});
lightbox.addEventListener("close",()=>lastTrigger?.focus());
lightbox.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();showGalleryImage(currentIndex+1);}if(e.key==="ArrowLeft"){e.preventDefault();showGalleryImage(currentIndex-1);}});

$$(".faq-list button").forEach(button=>button.addEventListener("click",()=>{
  const open=button.getAttribute("aria-expanded")==="true";
  button.setAttribute("aria-expanded",String(!open));
  const answer=$("#"+button.getAttribute("aria-controls"));
  answer.hidden=open;
  const symbol=$("span",button);if(symbol)symbol.textContent=open?"+":"−";
}));

const topButton=$("#totop");
window.addEventListener("scroll",()=>topButton.classList.toggle("visible",scrollY>450),{passive:true});
topButton.addEventListener("click",()=>scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));

const form=$("#quote-form"),feedback=$("#feedback"),dateField=$("#preferred-date");
const today=new Date();dateField.min=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
function validate(){
  form.querySelectorAll("[aria-invalid=true]").forEach(el=>el.removeAttribute("aria-invalid"));
  let first=null;
  ["customer-name","customer-phone","service","property-type","location","service-frequency","project-details"].forEach(id=>{
    const field=$("#"+id);if(!field.value.trim()){field.setAttribute("aria-invalid","true");first ||= field;}
  });
  const email=$("#customer-email");
  if(email.value.trim()&&!email.validity.valid){email.setAttribute("aria-invalid","true");first ||= email;}
  if(dateField.value&&dateField.value<dateField.min){dateField.setAttribute("aria-invalid","true");first ||= dateField;}
  if(first){feedback.textContent="Please check the highlighted fields and complete all required details.";feedback.classList.remove("success");first.focus();return false;}
  return true;
}
form.addEventListener("submit",event=>{
  event.preventDefault();if(!validate())return;
  const data=new FormData(form);
  const fields=[["Customer name","name"],["Phone","phone"],["Email","email"],["Required service","service"],["Property type","propertyType"],["Garden size / dimensions","gardenSize"],["Property location","location"],["Preferred service date","preferredDate"],["Service type","frequency"],["Maintenance frequency","maintenanceFrequency"],["Budget range","budget"],["Project description","details"],["Additional requirements","extras"]];
  const lines=[`Garden project enquiry — ${COMPANY.name}`,""];
  fields.forEach(([label,key])=>{const value=String(data.get(key)||"").trim();if(value)lines.push(`${label}: ${value}`);});
  lines.push("","Please confirm service availability, site visit requirements, quotation, timing and pricing. This is an enquiry only and does not confirm a booking.");
  feedback.textContent="Your enquiry is ready. WhatsApp will open in a new tab; review the message and press Send.";
  feedback.classList.add("success");
  window.open(waURL(lines.join("\n")),"_blank","noopener,noreferrer");
});
