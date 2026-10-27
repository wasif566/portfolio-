# Ember & Crumb — Restaurant & Takeaway Website

A responsive, single-page restaurant website built with HTML5, CSS3, and vanilla JavaScript.

## Files
- `index.html` — page content and editable business information
- `style.css` — responsive layout, theme, and visual styling
- `script.js` — navigation, category filters, menu-to-order actions, delivery address validation, and WhatsApp message generation
- `assets/` — reserved for your own downloaded/local images and brand assets

## Run locally
Open `index.html` in a browser. No build tools or frameworks are required. An internet connection is needed for the hosted Unsplash photography and Google Fonts currently referenced in CSS/HTML.

## Important customisation before publishing
1. Change the sample brand name **Ember & Crumb** to your actual restaurant name.
2. Replace sample menu names, descriptions, and PKR prices with verified items and prices.
3. Replace placeholder address and opening hours in the Contact section.
4. Confirm the WhatsApp number in `script.js` and all WhatsApp/telephone links in `index.html`. Current configured number: `+92 326 6438812`.
5. Replace sample social profile links with the restaurant's real profiles.
6. Replace remote Unsplash image URLs in `style.css` with optimised, licensed local files if you want the website to work fully offline. Place those files in `assets/`.
7. Test pickup and delivery forms, mobile navigation, links, and the WhatsApp message on a phone before launch.

## Ordering behaviour
The form validates required fields and opens WhatsApp with a URL-encoded message. The website does **not** process payments, send orders to a server, or confirm orders automatically. The customer must send the message in WhatsApp and wait for the restaurant to confirm.

## Hosting
Upload `index.html`, `style.css`, `script.js`, and the `assets/` folder to the root directory of your static hosting service (for example, `public_html` on shared hosting or a GitHub Pages repository).
