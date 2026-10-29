# FreshNest Cleaning Website

A responsive, single-page cleaning-services website built with HTML5, CSS3, and vanilla JavaScript.

## Project files

- `index.html` — page structure, SEO metadata, sections, quote form, and contact links
- `style.css` — responsive styling and accessible focus states
- `script.js` — mobile navigation, service preselection, validation, and WhatsApp message generation
- `assets/images/` — folder reserved for locally hosted image assets

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser, or use a local development server such as VS Code Live Server.
3. Internet access is currently required for the remote Unsplash photos and Google Fonts.

## Configure the business

Search and update the sample business information in `index.html`:

- `FreshNest Cleaning` — replace with the actual business name and logo/brand details.
- `+92 326 6438812` — WhatsApp/phone contact. The WhatsApp destination is configured as `923266438812` in both HTML links and `script.js`.
- `hello@freshnest.example` — replace with the real business email. `.example` is a reserved placeholder domain and will not receive email.
- Service area and opening hours — replace the generic text with verified details.
- Google Maps directions — add a directions link once the actual business address is known.
- Social links — add only the real business social profiles if needed.

The website uses example brand content and sample service descriptions. Remove any service that the business does not offer and verify all business information before publishing.

## Images

The current layout uses remote Unsplash image URLs for demonstration, so the page works without downloading image files but needs an internet connection to load them. For production, download properly licensed images, put them in `assets/images/`, then replace each remote `src` with its local asset path. Use descriptive alt text and ensure you have permission to use every image.

## Quote form behaviour

The form validates required fields and opens WhatsApp with a URL-encoded message containing the submitted details. Visitors must review and send the message in WhatsApp themselves. Submitting the form does **not** send data to a server and does **not** confirm a quote or booking.

## Before publishing

- Replace all placeholder business information.
- Confirm the actual list of services, service areas, availability, and contact details.
- Use licensed local images and test their loading.
- Test mobile navigation, each service card, validation, and the WhatsApp message on desktop and mobile.
- Consider a server-side form endpoint if you need enquiries delivered by email or stored in a database.
