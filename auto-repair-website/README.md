# Torque Auto Care — Auto Repair Website

A responsive single-page automotive service website built with HTML5, CSS3, and vanilla JavaScript. It includes local SVG illustrations, service filtering, FAQ accordion, mobile navigation, a vehicle booking form, and WhatsApp message generation.

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a current browser.
3. No build step, package installation, or backend is required.

The design uses local SVG illustrations and does not depend on remote stock-image URLs. Google Fonts are optional enhancements; system fallbacks are included.

## Project structure
- `index.html` — website sections, SEO metadata, booking form, contact details
- `style.css` — responsive styling, theme variables, accessibility and reduced-motion behavior
- `script.js` — navigation, filters, FAQ accordion, validation, WhatsApp message creation, scroll controls
- `assets/images/` — original SVG automotive illustrations
- `assets/icons/` — reserved folder for optional custom icons
- `assets/logo/favicon.svg` — editable favicon
- `README.md` — setup and customization instructions

## Before publishing — important
This is a complete functional starter website, but the sample business name and details must be reviewed and replaced with verified information.

1. **Business name:** Replace “Torque Auto Care” in `index.html` and Open Graph metadata.
2. **WhatsApp number:** Change `WHATSAPP_NUMBER` near the top of `script.js`. Use international digits only, without `+`, spaces, or punctuation. The supplied default is `923266438812`.
3. **Phone and email:** Replace `tel:+923266438812`, displayed phone text, `hello@example.com`, and `mailto:hello@example.com` in `index.html`.
4. **Address and hours:** Replace the contact placeholders with the real address, confirmed hours, and coverage areas. Do not publish a map until the actual location is known.
5. **Services:** Remove any service the business does not offer. The current service cards focus on maintenance, diagnostics, brakes, battery, engine repair enquiries, mobile visits, suspension, and inspections. Additional work is listed as enquiry-only in the copy.
6. **Pricing:** Edit package names and inclusions in `index.html`. Prices currently say “Request a quote” to avoid inventing amounts.
7. **Reviews:** Replace the clearly marked review placeholder only with genuine customer feedback used with permission.
8. **Policies:** Confirm payment methods, warranties, emergency assistance, supported vehicle makes, mobile call-out charges, and booking terms before adding definitive claims.
9. **Images:** Replace SVG files under `assets/images/` with owned/licensed images if desired. Keep filenames or update the matching `src` attributes. Use descriptive alt text and optimize photos as WebP/AVIF where practical.
10. **Colors:** Edit CSS variables at the top of `style.css`, including `--charcoal`, `--orange`, `--text`, and `--light`.

## Booking and WhatsApp behavior
The booking form validates required fields, a reasonable phone format, optional email, date, and vehicle year. Mobile mechanic mode requires a vehicle location. A valid submission creates a URL-encoded message using `encodeURIComponent()` and opens WhatsApp at `https://wa.me/<configured-number>?text=...`.

The visitor must review and send the message inside WhatsApp. This site does not send messages or confirm appointments automatically. The business must confirm availability, any quote, and the appointment.

## Testing notes
The JavaScript and asset paths were reviewed for consistency and local SVG assets are included in the project. Automated cross-browser/device testing has not been performed. Test the form and WhatsApp handoff on devices/browsers you intend to support before publishing.
