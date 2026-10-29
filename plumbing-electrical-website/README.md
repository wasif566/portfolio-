# Northline Trade Services Website

A responsive single-page plumbing and electrical services website built with HTML5, CSS3, and vanilla JavaScript.

## Files

- `index.html` — page content, service cards, contact links, and enquiry form
- `style.css` — responsive design, layout, colors, and focus states
- `script.js` — mobile navigation, trade-aware service selection, form validation, and WhatsApp message generation
- `assets/images/` — directory for local image assets

## Run locally

1. Download and extract the ZIP.
2. Open the project folder in a code editor.
3. Open `index.html` in a modern browser or use a local server such as VS Code Live Server.
4. Internet access is needed for the current remote Unsplash images and Google Fonts.

## Business configuration before publishing

This is a template with example brand details. Replace and verify:

- `Northline Trade Services` with the real business name and logo.
- Phone and WhatsApp number. The WhatsApp target is configured as `923266438812` in HTML and JavaScript.
- `contact@northline.example` with the real email address. `.example` is a reserved placeholder domain and cannot receive email.
- Actual address, opening hours, service areas, and any social profiles.
- Service cards and form options: remove every service the company does not actually offer or is not qualified/equipped to undertake.
- The generic service-area content with the actual supported towns, cities, and postcodes.
- Add a Google Maps directions link only after the actual business address is confirmed.

Do not add claims about licences, qualifications, registrations, insurance, emergency availability, ratings, warranties, or years of experience unless the business verifies them.

## Images

The template currently uses remote Unsplash image URLs for visual demonstration. For a production website, use properly licensed images that match the services offered, save them in `assets/images/`, and update the image `src` values in `index.html`. Keep descriptive alt text and verify that each image is licensed for the intended use.

## Enquiry form behaviour

The form validates required fields, email format, telephone length, and the selected date. It then opens a URL-encoded WhatsApp message with all submitted enquiry details, including trade, service, property details, problem description, preferred date/time, urgency, and notes.

The visitor must review and send the message in WhatsApp. The form does not submit to a server and does not confirm a booking. The business must confirm service availability, call-out charges, price, and appointment details.

## Pre-launch checklist

- Verify all contact details and replace placeholders.
- Confirm actual services and trade eligibility.
- Add only supported service areas and the real address.
- Replace demo images with licensed local assets.
- Test the mobile menu, all service preselection buttons, required-field validation, and WhatsApp message on desktop and mobile.
- Check keyboard navigation and reduced-motion settings.
