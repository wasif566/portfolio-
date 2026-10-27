# Oak & Form — Furniture Shop Website

Responsive single-page furniture shop / showroom website using HTML5, CSS3, and vanilla JavaScript only.

## Project files
- `index.html` — accessible page structure, product catalogue, gallery, and inquiry form
- `style.css` — responsive layouts, typography, mobile navigation, reduced-motion support
- `script.js` — editable shop configuration, search, category filters, product selection, gallery, and WhatsApp inquiry message
- `assets/` — local SVG fallback illustrations for furniture categories and custom furniture

## Preview
Open `index.html` in a modern browser. No build process or framework is required.

## Important: configure before publishing
Edit the `shopConfig` object at the top of `script.js`:
1. Replace shop name, phone, email, address, map query, and opening hours with verified details.
2. Verify `whatsapp` is set to `923266438812` or replace it with your business's WhatsApp number (country code, digits only).
3. Replace sample product entries with actual products. Prices, dimensions, materials, colours, and availability are omitted unless supplied in the configuration.
4. Add verified social profile URLs to `socialLinks`.
5. Review the category/product images. Remote Unsplash photos are illustrative references and require an internet connection; replace them with images of the actual products where possible. The local SVGs in `assets/` provide simple fallbacks, not product photography.
6. Confirm all descriptions and claims before presenting this as a real shop.

## Features
- Responsive sticky header and mobile hamburger navigation
- Search across product names, categories, and descriptions
- Working category filters and category shortcut cards
- Product details popup and automatic product selection in inquiry form
- Form validation and URL-encoded WhatsApp message
- Gallery lightbox with previous/next controls, keyboard navigation, and Escape close
- Accessible focus states, skip link, labels, descriptive alt text, and reduced-motion support
- Floating WhatsApp link, configurable contact links, and current-year footer

## WhatsApp behavior
Submitting the form opens a prefilled WhatsApp message addressed to the configured number. The visitor must press **Send** in WhatsApp. The form does not send data to a server, confirm stock, quote a price, or place an order.

## Image note
The project uses remote image URLs for illustrative room and product photography, with local SVG category/fallback images in `assets/`. For offline use, privacy, performance, and accurate product representation, download properly licensed images of your actual inventory into `assets/` and update the image paths in `script.js` and `index.html`.
