# Wanderwise Travel Website

A responsive travel-agency landing page built with HTML5, CSS3, and vanilla JavaScript. No framework or build process is required.

## Files

- `index.html` — semantic page structure, sample content, SEO/Open Graph metadata, and structured data.
- `style.css` — responsive layout, typography, colors, card styles, and reduced-motion support.
- `script.js` — navigation, filters, trip finder, enquiry validation, and WhatsApp message generation.
- `assets/logo/favicon.svg` — simple custom favicon.
- `assets/images/` — reserved for self-hosted/licensed image assets.
- `assets/icons/` — reserved for additional icon assets.

## Run locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or serve this folder using a local static server.
3. Internet access is used for remote Unsplash photos and Google Fonts. If you need a fully offline site, download appropriately licensed images into `assets/images/` and update the image paths in `index.html` and the hero background in `style.css`.

## Customize before publishing

Search and replace the sample business information in `index.html`:

- `Wanderwise Travel` — your actual agency name.
- `hello@wanderwise.example` — your actual email.
- `Add your office address` / `Add your office address, Faisalabad` — your verified address.
- Opening hours, social links, service offerings, destination content, sample itineraries, and package details.
- Update JSON-LD structured data to match your real business information. Remove any service you do not offer.

Update `AGENCY` near the top of `script.js` to change the WhatsApp number. The current number is `923266438812`, formatted for `https://wa.me/` without a plus sign or spaces.

## Important functionality notes

- Destination filters filter the destination cards already on the page.
- Package filters combine travel-style and budget selections.
- Trip Finder filters the configured sample package cards. It does not search live flights, hotel inventory, or booking databases.
- The enquiry form validates required fields, email format, and date order, then opens WhatsApp with a structured message. The customer must review and send the message themselves.
- Submitting the form does not create a reservation, issue tickets, process payment, or confirm availability.
- The example packages and itineraries are illustrative only. Confirm all prices, suppliers, inclusions, exclusions, entry rules, and availability before offering a real trip.
- Visa decisions are made by the relevant authorities. Customers should verify current entry requirements and travel advisories with official sources.

## Images and licensing

Images are loaded from Unsplash image URLs as illustrative editorial photography. They are not representations of specific hotels, rooms, or confirmed tours. For commercial publication, verify that your use complies with the image provider's current license and terms. Replace remote URLs with owned or properly licensed assets where needed. All below-the-fold `<img>` elements use lazy loading.

## Browser support

Designed for current evergreen browsers. The layout uses CSS Grid, Flexbox, custom properties, `details/summary`, and modern JavaScript APIs.
