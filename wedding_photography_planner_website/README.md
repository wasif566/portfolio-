# Ever After Studio — Wedding Photography & Planning Website

A responsive one-page website built with HTML5, CSS3, and vanilla JavaScript.

## Project contents
- `index.html` — semantic website markup, SEO metadata, inquiry form and lightbox
- `style.css` — responsive ivory, champagne-gold, white, and charcoal design
- `script.js` — editable configuration, service cards, package cards, portfolio filters, accessible lightbox, and WhatsApp enquiry flow
- `assets/README.txt` — local asset replacement instructions

## Customize before publishing
1. Edit the `CONFIG` object in `script.js`: business name, WhatsApp number, phone display, address, email, opening hours, and social links.
2. Edit `SERVICES` and set `enabled: true` only for services actually offered. Remove or disable services that are not provided.
3. Edit `PACKAGES` to reflect actual package names, included services, duration, deliverables, and confirmed prices. The current examples are placeholders and must be reviewed.
4. Replace the `PORTFOLIO` entries with images the business owns or is authorized to display. Current portfolio imagery is illustrative stock photography and is not claimed as work by this business.
5. Replace the About copy with real business information. Do not add unverified client testimonials, awards, credentials, or claims.
6. Replace remote image URLs with licensed, optimized local files in `assets/` if offline use or guaranteed image hosting is required.
7. Verify the WhatsApp number and all contact/social links before launch.

## WhatsApp enquiry
The form validates required fields and opens WhatsApp with a URL-encoded message containing customer contact details, date, location, selected service/package, duration, preference, and notes. The visitor must manually send the message. The enquiry does not reserve the event date; the business must confirm availability and pricing.

## Run locally
Open `index.html` in a modern browser. No build step, framework, or package installation is needed. A simple local web server is recommended for realistic testing.

## Important
This is a front-end starter project. It does not include a backend, payment processing, automatic date availability, inventory, or automatic booking confirmation. External Google Fonts and Unsplash images need an internet connection.
