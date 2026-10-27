# Still & Story Studio — Photography & Videography Website

Responsive portfolio and enquiry starter website built with HTML5, CSS3 and vanilla JavaScript. No frameworks or build tools required.

## Included
- `index.html` — semantic sections, SEO/Open Graph metadata, basic JSON-LD and enquiry form
- `style.css` — black, warm grey, ivory and muted gold theme; responsive layouts; reduced-motion support
- `script.js` — mobile navigation, portfolio filtering, accessible image lightbox, form validation, conditional coverage field, WhatsApp message creation and back-to-top control
- `assets/images/` — locally stored illustrative SVG demo artwork
- `assets/videos/` — instructions for adding a supplied/licensed video
- `assets/icons/` — optional icon folder
- `assets/logo/` — favicon placeholder

## Run
Open `index.html` in a modern browser, or serve the folder using any static HTTP server. No installation step is needed.

## Customise before launch
1. Update the `CONFIG` object at the top of `script.js`. `whatsappNumber` must contain international digits only (no plus sign, spaces or punctuation).
2. Replace the sample business name, email, telephone, service area, social links, opening hours, page title, meta description, Open Graph image and JSON-LD details in `index.html`.
3. Replace every demo SVG with the studio's own work or properly licensed media. These images are explicitly labelled illustrative artwork and are not real client photography.
4. Replace the testimonial placeholder only with authentic client feedback shared with permission.
5. Confirm which services the studio actually offers and remove any irrelevant services.
6. Confirm actual package prices, coverage, image counts, video deliverables, delivery timelines, album options, travel charges and booking/cancellation policies. This template uses “Request a quote” rather than inventing business-specific promises.
7. Add a licensed video file under `assets/videos/` and replace the video placeholder in `index.html` with a real `<video controls preload="none">` player. No video was supplied, so no broken/nonfunctional player is shown.
8. Replace social links with the studio's real profile URLs or remove them.
9. Verify all contact information and structured data before publishing.

## WhatsApp enquiry behaviour
The form checks required fields, phone format, optional email and past dates. A valid submission builds a structured message using `encodeURIComponent()` and opens WhatsApp for the visitor to review and send. It does not send a message automatically, store form data, or reserve a date. The site has no backend, calendar or payment integration.

## QA checklist
- [ ] Navigation opens and closes on mobile
- [ ] Portfolio filters update the selected state and visible items
- [ ] Image lightbox supports close, previous/next, Escape, backdrop and keyboard focus
- [ ] Add a real local/licensed video before replacing the placeholder
- [ ] Required fields, email, phone and date validation behave as expected
- [ ] WhatsApp opens with all enquiry details encoded
- [ ] Service/package links preselect enquiry fields
- [ ] Test mobile, tablet and desktop widths and keyboard focus
- [ ] Confirm all links and replace every sample asset and placeholder
