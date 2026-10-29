# Wasif Creative Studio — Portfolio Website

A premium, responsive portfolio for showcasing concept websites and offering landing pages, single-page and complete websites, professional logos, custom QR codes, creative ads, digital templates, and custom creative work. Built with HTML5, CSS3, and vanilla JavaScript.

## Files
- `index.html` — page content and semantic structure
- `style.css` — responsive design and CSS-drawn website concept previews
- `script.js` — mobile menu, portfolio filters, enquiry validation, WhatsApp messaging, and copyright year
- `assets/images/README.txt` — notes for optional custom images

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Or open the folder in VS Code and run it with Live Server.

## IMPORTANT: Link your live demo websites
Open `script.js` and update `PROJECT_LINKS` with the public URL for each demo. Example:
```js
const PROJECT_LINKS = {
  restaurant: "https://yourusername.github.io/restaurant-demo/",
  dental: "https://yourusername.github.io/dental-demo/",
  "window-cleaning": "https://yourusername.github.io/window-cleaning-demo/",
  travel: "https://yourusername.github.io/travel-demo/",
  renovation: "https://yourusername.github.io/renovation-demo/",
  repair: "https://yourusername.github.io/repair-demo/",
  salon: "https://yourusername.github.io/salon-demo/",
  "real-estate": "https://yourusername.github.io/real-estate-demo/",
  boutique: "https://yourusername.github.io/boutique-demo/",
  hvac: "https://yourusername.github.io/hvac-demo/",
  education: "https://yourusername.github.io/education-demo/",
  cafe: "https://yourusername.github.io/cafe-demo/"
};
```
These are example formats, not actual links. Replace them with your real hosted demo URLs. Once a valid URL is set, the project preview and arrow link open that site in a new tab. Until then, clicking a concept asks you via WhatsApp for the demo URL instead of opening a broken link. Visitors cannot access a website that only exists on your computer; host each demo publicly first.

## Contact and brand customization
- WhatsApp is set to `923266438812` (digits only, including country code).
- Change the brand name and About copy in `index.html` if desired.
- Budget choices in the form are enquiry prompts, not a published price list; update them to your real pricing or remove them.
- No fake social links are included.

## 12 included concept previews
Restaurant & Takeaway; Dental Clinic; Window Cleaning; Travel Agency; Kitchen & Bathroom Renovation; Phone & Computer Repair; Beauty Salon; Real Estate Agency; Fashion Boutique; HVAC Services; Education & Training; Café & Coffee Shop.

Previews are CSS-made concept artwork, not claims of real client work or real live sites. Add real project descriptions and URLs before publishing.

## Before publishing
- Add your live demo URLs to `PROJECT_LINKS`.
- Confirm WhatsApp number and enquiry wording.
- Test filters, menu, form validation, and links on desktop and mobile.
- Deploy this folder using GitHub Pages, Netlify, or another static hosting provider.


## Portfolio links and contact details
- In `script.js`, add each hosted demo URL to the matching key in `PROJECT_LINKS`. Configured cards open that website in a new tab; unconfigured cards do not open WhatsApp.
- Replace `your-email@example.com` in `index.html` with your real business email address (it is intentionally a placeholder).
- The WhatsApp contact number is configured as `923266438812`.
- The portfolio shows 6 cards at first and reveals 6 more each time the visitor clicks **Show 6 more**.
- The WhatsApp promotional popup appears after 4 seconds and can be dismissed with its close button.


## Portfolio screenshot previews

The 36 project cards now display their matching real PNG screenshots from the
`website_screenshots/` folder. Keep that folder alongside `index.html`,
`style.css`, and `script.js`. The image links are relative paths, so the project
works locally and can be uploaded as a complete folder to hosting. Existing
project links, filters, and Show More behavior are preserved.
