# FixRight Home Services — Handyman Website

A responsive, single-page home repair and handyman website built with **HTML5, CSS3, and vanilla JavaScript**. No framework, package manager, build step, or backend is required.

## Project structure

```text
handyman-home-repair-website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/   # Add approved local business photos here
    ├── icons/    # Reserved for additional icons
    └── logo/
        ├── fixright-mark.svg
        └── favicon.svg
```

## Run locally

1. Download and extract the project ZIP.
2. Open `index.html` in a current browser.
3. For a more production-like local preview, use any static file server (for example, VS Code Live Server). No build command is needed.

## Main features

- Responsive desktop and mobile layouts.
- Mobile navigation with Escape-key and outside-click closing.
- Service category filters with accessible pressed states.
- Service links that prefill the repair request form.
- Package links that add the selected package to additional notes.
- Accessible FAQ accordion using native `<details>` elements.
- Client-side required-field validation and inline error messages.
- Repair enquiry message generation using `encodeURIComponent()` and a WhatsApp `wa.me` link.
- Click-to-call and WhatsApp links.
- Smooth in-page navigation, back-to-top control, and reduced-motion support.
- SEO title, description, Open Graph tags, favicon, and basic LocalBusiness structured data.

## Configure before launch

Search and replace the sample business details in `index.html`:

- `FixRight Home Services` — replace with the real business name.
- `+92 326 6438812` / `hello@example.com` — confirm phone and email details.
- `923266438812` — the WhatsApp number is configured once near the top of `script.js` as `BUSINESS_WHATSAPP`. Update all static WhatsApp links in `index.html` as well if the number changes.
- Service areas, opening hours, business address, social links and contact details.
- Add the real business URL to Open Graph and structured data, if available.
- Update the JSON-LD `areaServed` and add a real address only if the business wants to publish it.
- Confirm each service is actually offered and that the business is qualified and equipped to do it.
- Replace illustrative gallery and hero photos with genuine, authorized company images when possible. Remote Unsplash images need an internet connection and are illustrative references, not evidence of company projects.
- Replace every sample review with a genuine customer review published with permission, or remove the review section.
- Replace sample business background and team details with verified facts. No credentials or experience claims are invented.
- Configure the real service area and travel/call-out policies. Do not publish placeholders as actual coverage.
- Confirm pricing and call-out fees before publishing; package cards intentionally say “Request a quote.”
- Replace `href="#"` social placeholders with real profiles or remove them.
- Update the page URL, Open Graph image and favicon as needed.

## WhatsApp request behaviour

The form validates the customer's name, phone, property type, service, urgency, description, location, and acknowledgement. Email is optional but validated if entered. The preferred date cannot be in the past.

On valid submission, the website builds a structured message and opens WhatsApp. The visitor must review and send that message manually. **Submitting the form does not confirm an appointment**, and there is no backend, database, email delivery or booking system.

## Image handling

The website uses remote Unsplash image URLs for illustrative reference photos. A network connection is required for these images. Before production, download only images you have permission to use into `assets/images/`, update the corresponding `src` attributes, and test each image. Images below the fold use lazy loading; the hero image loads eagerly.

## Accessibility and browser support

- Semantic landmarks and headings.
- Descriptive alt text, labelled inputs, keyboard focus indicators and skip link.
- Native FAQ controls and accessible mobile navigation state.
- Inline validation with `aria-invalid` and a live status message.
- `prefers-reduced-motion` support.

Test with current Chrome, Firefox, Safari and Edge, plus keyboard-only navigation and a mobile viewport before deployment. Because this is a static project, it does not include automated cross-browser, real-device or live network image tests.

## Deployment

Upload the complete folder to any static hosting provider that serves HTML, CSS, JavaScript and SVG files. HTTPS is recommended, especially for WhatsApp links and contact forms.
