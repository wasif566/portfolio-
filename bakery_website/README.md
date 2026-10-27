# Sweet Crumb Bakery Website

A single-page, responsive bakery website template made with HTML5, CSS3, and vanilla JavaScript.

## Included
- `index.html` — semantic page structure, menu, custom cake information, gallery, contact details, and order inquiry form.
- `style.css` — responsive styling for mobile, tablet, and desktop.
- `script.js` — editable product data, category filters, product preselection, local date validation, conditional delivery address, form validation, and WhatsApp message generation.
- `assets/` — locally stored SVG bakery illustrations, plus a fallback illustration.

## Run locally
Unzip the project and open `index.html` in a modern browser. No build step or server is required for the main website. WhatsApp order inquiries require a browser/device with WhatsApp access.

## Configure before publishing
1. Replace `Sweet Crumb Bakery` and the sample logo/branding with the real business identity.
2. In `script.js`, edit the `products` array. Add only verified products, descriptions, prices, and availability. Blank `price` values display “Price on inquiry.”
3. Replace the placeholder email, address, and opening hours in `index.html`. Update the Google Maps directions URL to use the verified address.
4. Replace sample SVG illustrations with the bakery's actual photos if available. Keep the asset paths and descriptive alt text accurate.
5. Confirm the WhatsApp number `923266438812` before publishing.
6. Verify whether custom cakes, delivery, listed products, and any options are actually offered.

## Important behaviour
- Menu filter buttons filter the product cards.
- “Order this item” preselects the corresponding product in the form.
- The requested date cannot be in the past; delivery requires an address.
- Submitting the form opens WhatsApp with a URL-encoded inquiry draft. The customer must review and send it.
- This project does not upload files, process payments, confirm orders, or transmit information to a backend.
- The default contact details and product content are placeholders and must be verified before launch.

Google Fonts is loaded over the internet when available; system fallback fonts are provided.
