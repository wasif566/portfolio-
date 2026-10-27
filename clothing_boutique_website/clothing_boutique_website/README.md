# Maison Edit — Clothing Boutique Website

A responsive, single-page clothing boutique website built with HTML5, CSS3, and vanilla JavaScript.

## Files
- `index.html` — page structure, SEO metadata, sections, enquiry form
- `style.css` — responsive editorial design
- `script.js` — editable business configuration, product catalogue, category filters, form validation, WhatsApp enquiry flow
- `assets/README.txt` — notes about image assets

## Before publishing
1. Open `script.js` and edit the `CONFIG` object:
   - `brandName`
   - `whatsappNumber` (international digits only, no plus sign)
   - `address`, `email`, `hours`
   - `socials.instagram` and `socials.facebook`
2. Replace demo product names, descriptions, images, prices, sizes, and colors in `PRODUCTS` with verified information. Blank prices deliberately display as “Ask for price”.
3. Replace the example contact details and branding in `index.html` if needed.
4. Confirm you have rights to use all product photography. Current fashion images are loaded from Unsplash over the internet; a connection is required for them to appear. Replace image URLs with your own optimized local assets when available.
5. Test all WhatsApp links using the business's correct WhatsApp number and confirm the message content.

## WhatsApp order enquiry
The form validates required fields and opens WhatsApp with a URL-encoded enquiry. The customer must manually send the message in WhatsApp. This site does not process payments, check inventory, or automatically confirm orders.

## Run locally
Open `index.html` in a modern browser, or use a simple local development server. No build step or framework is required.

## Notes
- Product images and names in this starter project are illustrative examples, not a representation of actual inventory.
- The default boutique address, email, opening hours, and social profile URLs are placeholders.
- This is a front-end website; a real backend is not included.
