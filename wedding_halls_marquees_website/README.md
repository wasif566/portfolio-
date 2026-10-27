# Wedding Venue Website

Responsive single-page wedding hall / marquee website built with HTML5, CSS3, and vanilla JavaScript.

## Files
- `index.html` — page structure, metadata, accessible forms and gallery
- `style.css` — responsive styling, layouts, motion preferences and focus states
- `script.js` — venue configuration, facility/package rendering, navigation, gallery and WhatsApp enquiry flow
- `assets/` — reserved for local assets if you later add your own logo or images

## Before publishing
1. Open `script.js` and update `venueConfig` with the real venue name, telephone number, address, opening hours, facilities and actual package details.
2. Verify the WhatsApp number in `venueConfig.whatsapp`. It currently uses `923266438812` from the supplied brief.
3. Replace the illustrative remote Unsplash images in `index.html` with images you own or have permission to use, ideally stored in `assets/`.
4. Confirm the wording and all facilities/prices/capacities with the venue. No package prices or guest capacities are claimed by this template.
5. Test the enquiry form on a device with WhatsApp installed or WhatsApp Web access. It opens a prefilled message; the visitor must press Send in WhatsApp.

## Run locally
Open `index.html` in a modern browser. No build step or framework is required.

## Notes
- The form does not send data to a server and does not confirm a booking.
- Images are currently loaded from Unsplash via image URLs, so an internet connection is required for those images.
- This is a functional front-end template. Venue information and imagery must be verified before it is represented as a real business website.
