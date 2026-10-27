# Northstar Moving Co. — Moving & Removal Website

A responsive static website template for a house moving company, office relocation service, furniture removal business, or local / longer-distance moving provider. Built with HTML5, CSS3 and vanilla JavaScript.

## Files

- `index.html` — semantic page structure, SEO metadata, forms, sections and structured-data placeholder.
- `style.css` — responsive layout, visual design, states and reduced-motion support.
- `script.js` — central configuration, navigation, form validation, moving planner and WhatsApp message generation.
- `assets/images/` — original lightweight SVG illustrations used as moving imagery.
- `assets/logo/` — editable SVG logo.
- `assets/icons/` — SVG favicon.

## Run locally

Open `index.html` in a modern browser, or serve the folder using a local static server. No package installation or build step is required.

## Configure before publishing

Open `script.js` and update the `CONFIG` object:

- `businessName`
- `whatsappNumber` — international digits only, no `+`, spaces or punctuation
- `phoneDisplay`
- `email`
- `serviceAreas`

Then update the corresponding company name, address, hours, service coverage, social links, and structured data in `index.html`. The demo uses **Northstar Moving Co.** as sample branding. `hello@example.com`, placeholder office address, unconfigured service areas, and social placeholder links must be replaced with genuine business information.

### WhatsApp quote form

The quote form validates required information and opens WhatsApp with a pre-filled message using `https://wa.me/` and `encodeURIComponent()`. The customer must review and send the message themselves. It does not submit to a server, create a confirmed booking, or guarantee a price. The configured default number is `923266438812`.

### Moving planner

The planner does not show a numeric price because no verified rate card was supplied. It transfers the user's selected property type, room count, box range, packing and loading preferences into the quote form. Distance preference is included in the notes. The user should add dates and addresses and request an accurate quote.

### Customer reviews

Review cards are clearly labelled placeholders. Replace them with genuine, permissioned customer reviews or remove the section. Do not present placeholders as real testimonials.

### Images

The `assets/images/` files are original SVG illustrations included locally, so there are no third-party image URL dependencies or missing remote-image fallbacks. Replace them with licensed photographs if desired, preserve descriptive alt text, and keep lazy loading for below-the-fold images.

### SEO and structured data

Update the title, meta description, Open Graph metadata, canonical URL if used, and JSON-LD `MovingCompany` data to reflect real, verified business details. Add actual `areaServed`, `url`, address and opening hours only when confirmed. Do not publish unsupported insurance, licence, certification, capacity, experience, or service-area claims.

## Checks performed

- HTML structure and local asset references checked.
- JavaScript syntax checked.
- CSS and JavaScript are framework-free.
- Responsive breakpoints, accessible labels, inline errors, live status messages, native FAQ details, keyboard navigation, and reduced-motion styles are included.

A full cross-browser visual test and live WhatsApp send test require a browser and the business owner's real device/account. The form opens WhatsApp; it cannot send a message without the user's action.
