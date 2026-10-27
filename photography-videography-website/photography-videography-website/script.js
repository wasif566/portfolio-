/* Client settings: keep the WhatsApp number in one place. */
const CONFIG = { businessName: "Still & Story Studio", whatsappNumber: "923266438812", phoneDisplay: "+92 326 6438812", email: "hello@example.com" };
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#nav"), menu = document.querySelector(".menu");
  menu.addEventListener("click", () => { const open = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation"); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded","false"); }));
  const filters = [...document.querySelectorAll("[data-filter]")], tiles = [...document.querySelectorAll(".tile")];
  filters.forEach(btn => btn.addEventListener("click", () => { filters.forEach(b => { b.classList.toggle("active",b===btn); b.setAttribute("aria-pressed",String(b===btn)); }); tiles.forEach(tile => tile.hidden = btn.dataset.filter !== "all" && tile.dataset.category !== btn.dataset.filter); }));
  const box = document.querySelector("#lightbox"), image = document.querySelector("#lightbox-img"), caption = document.querySelector("#lightbox-caption");
  const close = box.querySelector(".close"), prev = box.querySelector(".prev"), next = box.querySelector(".next");
  let shown = [], index = 0, lastFocus = null;
  function visibleImages(){return tiles.filter(t=>!t.hidden&&t.dataset.image);}
  function render(){const t=shown[index];if(!t)return;image.src=t.dataset.image;image.alt=t.querySelector("img")?.alt||t.dataset.title||"Portfolio image";caption.textContent=t.dataset.title||"Portfolio";}
  function open(tile){lastFocus=tile;if(!tile.dataset.image){shown=[];image.removeAttribute("src");image.alt="Video placeholder information";caption.textContent="Video sample placeholder. Add a real licensed video file and player before publishing.";prev.hidden=next.hidden=true;}else{shown=visibleImages();index=shown.indexOf(tile);render();prev.hidden=next.hidden=shown.length<2;}box.hidden=false;document.body.classList.add("no-scroll");close.focus();}
  function shut(){box.hidden=true;document.body.classList.remove("no-scroll");image.removeAttribute("src");lastFocus?.focus();}
  tiles.forEach(t=>t.addEventListener("click",()=>open(t)));
  close.addEventListener("click",shut);box.addEventListener("click",e=>{if(e.target===box)shut();});
  prev.addEventListener("click",()=>{if(shown.length){index=(index-1+shown.length)%shown.length;render();}});
  next.addEventListener("click",()=>{if(shown.length){index=(index+1)%shown.length;render();}});
  document.addEventListener("keydown",e=>{if(box.hidden)return;if(e.key==="Escape")shut();if(e.key==="ArrowLeft"&&shown.length)prev.click();if(e.key==="ArrowRight"&&shown.length)next.click();if(e.key==="Tab"){const list=[close,...(prev.hidden?[]:[prev]),...(next.hidden?[]:[next])];if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0].focus();}}});
  document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",()=>{const s=document.querySelector("#service");const opt=[...s.options].find(o=>o.value===a.dataset.service||o.text===a.dataset.service);if(opt)s.value=opt.value;}));
  document.querySelectorAll("[data-package]").forEach(a=>a.addEventListener("click",()=>{const s=document.querySelector("#package");const opt=[...s.options].find(o=>o.value===a.dataset.package||o.text===a.dataset.package);if(opt)s.value=opt.value;}));
  const date=document.querySelector("#date"), today=new Date();date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const project=document.querySelector("#project"), duration=document.querySelector(".duration-field");
  function condition(){duration.hidden=!/wedding|engagement|birthday|event|session/i.test(project.value);}
  project.addEventListener("change",condition);condition();
  const form=document.querySelector("#enquiry-form"), status=document.querySelector("#status"), required=["name","phone","service","project","date","location"];
  function errorFor(control,msg){const wrap=control.closest(".field");if(!wrap)return;wrap.querySelector(".error").textContent=msg;control.setAttribute("aria-invalid",msg?"true":"false");}
  form.querySelectorAll("input,select,textarea").forEach(c=>{c.addEventListener("input",()=>errorFor(c,""));c.addEventListener("change",()=>errorFor(c,""));});
  function validPhone(v){return /^[+()\d.\-\s]{7,25}$/.test(v)&&v.replace(/\D/g,"").length>=7;}
  form.addEventListener("submit",e=>{e.preventDefault();status.textContent="";let valid=true;const data=Object.fromEntries(new FormData(form).entries());
    required.forEach(name=>{const c=form.elements[name];let msg="";if(!String(data[name]||"").trim())msg="Please complete this field.";else if(name==="phone"&&!validPhone(data[name]))msg="Enter a valid phone number.";else if(name==="date"&&data.date<date.min)msg="Choose today or a future date.";errorFor(c,msg);if(msg)valid=false;});
    const email=form.elements.email;const emailVal=String(data.email||"").trim();const emailError=emailVal&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)?"Enter a valid email address or leave it blank.":"";errorFor(email,emailError);if(emailError)valid=false;
    if(!valid){status.textContent="Please check the highlighted fields and try again.";form.querySelector('[aria-invalid="true"]')?.focus();return;}
    const lines=[`Hello ${CONFIG.businessName}, I'd like to enquire about a photography/videography project.`,"",`Name: ${data.name.trim()}`,`Phone / WhatsApp: ${data.phone.trim()}`,`Email: ${emailVal||"Not provided"}`,`Service requested: ${data.service}`,`Event / project type: ${data.project}`,`Preferred date: ${data.date}`,`Location: ${data.location.trim()}`,`Coverage duration: ${data.duration||"Not specified"}`,`Estimated budget: ${data.budget||"Prefer to discuss"}`,`Package preference: ${data.package||"Help me choose"}`,`Media preference: ${data.media||"Not specified"}`,`Additional requirements: ${String(data.requirements||"").trim()||"None added"}`,"","This is an enquiry only and does not reserve or confirm the date."];
    const url=`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;status.textContent="Your enquiry is ready. WhatsApp will open so you can review and send it.";const win=window.open(url,"_blank","noopener,noreferrer");if(!win)window.location.href=url;
  });
  const top=document.querySelector("#to-top");function scrollState(){top.classList.toggle("visible",window.scrollY>500);}window.addEventListener("scroll",scrollState,{passive:true});top.addEventListener("click",()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
  document.querySelector("#year").textContent=new Date().getFullYear();
  document.querySelector("#whatsapp").href=`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello ${CONFIG.businessName}, I'd like to ask about your photography and videography services.`)}`;
});