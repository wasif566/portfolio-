# Northloom Textiles — Corporate Textile Website

A responsive single-page website for a textile manufacturer, fabric supplier, or exporter. Built with HTML5, CSS3, and vanilla JavaScript only.

## Project structure
- `index.html` — page sections, metadata, product cards, company details, and inquiry form
- `style.css` — responsive corporate design, colours, typography, layouts, and mobile styles
- `script.js` — mobile navigation, category filters, product inquiry prefill, validation, and WhatsApp message generation
- `assets/` — local SVG image assets and brand mark

## Run locally
Open `index.html` in a browser. The supplied SVG images are local and will load without a network connection. Google Fonts are optional and require internet access; fallback fonts are provided.

## Before publishing
1. Replace **Northloom Textiles** and the sample brand mark with the real company name and logo.
2. Replace the placeholder business address, email, phone details, social links (if added), and export markets.
3. Confirm the WhatsApp number in `script.js` and the `wa.me` / `tel:` links in `index.html`. Current number: `+92 326 6438812`.
4. Replace all sample descriptions with the company's actual product range and manufacturing capabilities.
5. Update technical specifications, composition, widths, GSM, lead times, minimum quantities, certifications, production capacity, and export claims only when verified.
6. Add the actual served countries and verified certificates only when applicable.
7. Test the inquiry form, mobile navigation, filters, and WhatsApp draft on a phone before launch.

## WhatsApp inquiry behaviour
The form validates required fields and opens WhatsApp with a URL-encoded draft that includes every field, including optional fields. The visitor must send the message manually. This site has no backend and does not automatically create quotes, confirm orders, or verify product availability.

## Hosting
Upload `index.html`, `style.css`, `script.js`, and the complete `assets/` folder to the root of your static hosting service (for example, `public_html` on shared hosting or a GitHub Pages repository).
