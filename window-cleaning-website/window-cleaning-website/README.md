# ClearView Window Cleaning Website

A responsive, single-page window cleaning website built with plain HTML5, CSS3, and vanilla JavaScript. No build step or framework is required.

## Run locally

1. Extract the ZIP archive.
2. Open `index.html` in a modern browser, or serve the folder with a local web server for best results.
3. Test the navigation, gallery lightbox, service quote buttons, and quote form.

## Important before publishing

This is a branded starter template. **ClearView** is a sample business name, and the included illustrations are sample artwork rather than photographs of real jobs. Replace the sample identity, confirm the services you actually provide, and add genuine business photography before publishing. Do not add unverified claims about insurance, certifications, guarantees, or experience.

## Edit business details

### Name and logo
- In `index.html`, search for `ClearView` and replace it with the real business name.
- The logo is an inline SVG mark in the header and footer. Replace the SVG with your logo or an image if desired.

### Phone and WhatsApp
The WhatsApp number requested for this template is configured as `923266438812` (international digits only, no plus sign) in `script.js` and the WhatsApp links in `index.html`.
- Search for `923266438812` to update every occurrence.
- The displayed phone number is `+92 326 6438812`; update that text if the business uses a different number.
- Form submission opens WhatsApp with a prefilled message. The visitor must review and manually send it. The form does not submit to a backend and does not confirm an appointment.

### Email, address, hours, and service areas
The template intentionally avoids inventing an email, office address, opening hours, or service-area list. Update the top bar and contact section with verified details. If there is no public office, use the real covered locations instead of adding a fictional address. Add a Google Maps directions link only after a valid address is supplied.

### Services
Edit the service cards in `index.html`. The `data-service` value on each `.quote-service` button should match an option in the `#cleaning-service` select element so it can be automatically selected when clicked. Remove any service that is not offered.

### Images
All sample artwork is stored locally in `assets/images/`:
- `hero-window.svg`
- `residential.svg`
- `commercial.svg`
- `shopfront.svg`
- `interior.svg`
- `conservatory.svg`
- `maintenance.svg`
- `about-glass.svg`

Replace these files or update the corresponding `src` attributes in `index.html`. Use genuine photos of completed jobs for any portfolio/gallery that represents the business's work. Keep descriptive `alt` text, use appropriate image dimensions, and optimize photographs for the web.

## Features

- Responsive layout for desktop, tablet, and mobile
- Sticky header and collapsible mobile navigation
- Service cards that preselect the service in the quote form
- Quote form validation and WhatsApp message encoding
- Floating WhatsApp contact button
- Accessible gallery lightbox with Escape-to-close
- Local-date minimum for the preferred date field
- Current-year footer copyright
- Reduced-motion preference support
- SEO title, description, semantic sections, and accessible labels

## Customization notes

- Main brand colors are CSS variables at the top of `style.css`.
- Fonts use Google Fonts when online; system sans-serif fallbacks are included.
- No external image downloads or backend services are required by the starter template.
