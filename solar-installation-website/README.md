# Sunwise Solar Website

A responsive, single-page solar installation website template built with HTML5, CSS3, and vanilla JavaScript.

## Project files

- `index.html` — sections, solution cards, component explanations, contact details, and quote form
- `style.css` — responsive design, typography, layout, colors, and accessibility focus states
- `script.js` — mobile navigation, service preselection, form validation, and WhatsApp message generation
- `assets/images/` — folder reserved for local, licensed image assets

## Run locally

1. Extract the ZIP file.
2. Open the project folder in a code editor.
3. Open `index.html` in a modern browser or run it through VS Code Live Server.
4. Internet access is needed for the remote Unsplash photographs and Google Fonts currently used.

## Business configuration before publishing

The website uses sample branding and placeholder contact details. Replace and verify:

- `Sunwise Solar` and its logo/branding.
- Phone / WhatsApp number if different. The WhatsApp destination is set to `923266438812` in the HTML and JavaScript.
- `hello@sunwise.example` with the actual business email. `.example` is a reserved placeholder domain and cannot receive email.
- Business address, consultation hours, service areas, and social media links.
- Actual services: remove any solution or service that the business does not offer.
- Component and system descriptions to match the actual products and capabilities offered.
- Add Google Maps directions only after the actual business address is known.

Do not add unsupported claims about savings, system output, efficiency, warranties, certifications, completed projects, installation capacity, customer testimonials, grants, or approvals.

## Images

The template uses remote Unsplash image URLs for demonstration. For production, source appropriately licensed images relevant to the actual company and services, place them in `assets/images/`, and update the image `src` attributes in `index.html`. Keep descriptive alt text and verify image rights and loading.

## Quote form behaviour

The quote form validates required fields, email format, telephone length, and the preferred consultation date. It prepares a URL-encoded WhatsApp message with all entered details and opens WhatsApp for the customer to review and send.

The form does not send data to a server and does not confirm a consultation, quote, site assessment, or installation. System suitability, final pricing, expected output, savings, availability, and installation dates require assessment and confirmation by the company.

## Pre-launch checklist

- Replace all placeholder business details and confirm the WhatsApp number.
- Confirm the real service list and remove unsupported services.
- Add actual service areas and the verified address.
- Replace demo photos with licensed local images.
- Test the menu, service selection, validation, and WhatsApp message on desktop and mobile.
- Verify keyboard navigation and reduced-motion behaviour.
