# ForgeWorks Industrial — Machinery Supplier Website

A responsive, single-page machinery supplier website built with **HTML5, CSS3, and vanilla JavaScript**. No framework, backend, build process, or package installation is required.

## Project structure

```text
machinery_supplier_website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   └── equipment-placeholder.svg
    ├── icons/
    │   └── (reserved for optional local icons)
    ├── logo/
    │   ├── forgeworks-logo.svg
    │   └── favicon.svg
    └── documents/
        └── (place verified product datasheets here)
```

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. For local development, you may also use a simple static server, but it is not required for the basic page.

The photos and Google Fonts are loaded from external services, so those items need an internet connection. Local SVG logo and fallback image are included.

## Before publishing — important checklist

- Replace the demo company name **ForgeWorks Industrial** with the real registered or trading name.
- Replace `sales@example.com`, the address, business hours, social links, and all contact details with verified information.
- Verify that `923266438812` is the correct business WhatsApp number.
- Replace sample products, models, descriptions, specifications, category list, warranty details and service claims with genuine information.
- Replace the brand placeholders with logos for brands genuinely supplied. Do not claim authorized-dealer status without permission.
- Confirm actual delivery areas, rental availability, installation services and after-sales support.
- Replace `https://example.com` in the JSON-LD structured data with the real public website URL.
- Add genuine company-specific privacy information if you later connect this form to an external service.
- Test the site on real mobile and desktop browsers before going live.

## Change business details and WhatsApp

Open `script.js` and edit the `COMPANY` object near the top:

```js
const COMPANY = {
  name: "Your Company Name",
  email: "sales@yourcompany.com",
  phoneDisplay: "+92 300 0000000",
  whatsapp: "923000000000"
};
```

Use WhatsApp's international format with digits only: no `+`, spaces, or hyphens. `WHATSAPP_NUMBER` is derived from this object, so the WhatsApp number is maintained in one place.

Update the visible phone/email/address placeholders in `index.html` too so the page content matches the configuration.

## Manage products

Edit the `PRODUCTS` array in `script.js`. Each product object contains:

- `id`: unique identifier used by the details button
- `name`, `model`, `category`, `description`
- `image` and `alt`
- `specs`: short specification chips shown on cards
- `details`: key/value pairs displayed in the detail modal
- `price`: sample field for future display use; this template uses “Request quotation” by default
- `status`: use only verified stock or sample status information

The provided entries are **illustrative sample content**. They do not represent verified stock, prices, specifications, manufacturers, or product availability. Replace them before launch. Do not publish “in stock”, price, certification, warranty or manufacturer claims unless confirmed.

## Manage categories

Edit the `CATEGORIES` array in `script.js`. Categories are used to populate both the catalogue filter and the quote form. Make sure every product's `category` exactly matches one of the category strings.

## Change images

The demo catalogue uses remote Unsplash images for visual layout only; they are not photos of the listed products. Replace each product's `image` with a path to an approved image, for example:

```js
image: "assets/images/actual-model-photo.webp",
alt: "Verified manufacturer model photographed in the warehouse"
```

Recommended workflow:
1. Use company-owned, manufacturer-approved, or properly licensed images.
2. Prefer compressed WebP or AVIF images sized appropriately for the card (around 900px wide is generally ample for this layout).
3. Add the image file under `assets/images/`.
4. Update `image` and descriptive `alt` text in `script.js`.
5. Open the page and confirm the image loads. If it fails, the local `equipment-placeholder.svg` is used.

The hero and about images are set in `style.css` and `index.html`, respectively. Update those separately if you want a fully local image bundle.

## Add specification sheets

Place verified PDF files in `assets/documents/`. Replace the “Specification sheet: Placeholder” note in the product detail modal in `script.js` with a link to the relevant PDF only after you confirm that the file matches the product model and revision.

## Update colours and typography

At the top of `style.css`, edit the CSS custom properties in `:root`, including `--navy`, `--charcoal`, `--steel`, `--paper`, and `--orange`.

## WhatsApp quotation workflow

- Product quote buttons prefill the selected product name, model and category.
- The main quote form validates required fields and builds a structured WhatsApp message.
- The visitor must review and press **Send** inside WhatsApp.
- This static website does **not** connect to a database, check inventory, calculate final prices, submit an order, or confirm availability.
- If pop-ups are blocked by the browser, allow pop-ups for the site or use the visible product WhatsApp link.

## Functionality included

- Responsive mobile navigation
- Product text search
- Category filter and clear-filter button
- Product details dialog with technical detail table
- Per-product WhatsApp quote links
- Validated general quotation form and WhatsApp message generation
- FAQ accordion
- Back-to-top button
- Accessible labels, keyboard focus indicators, semantic landmarks, alt text and reduced-motion preference

## Testing performed

The source is intended for modern evergreen browsers. Basic static checks should include JavaScript syntax validation, HTML structure parsing, and manual browser checks for:
- Search and category filtering
- Product details open/close
- Required field and email validation
- WhatsApp message prefill and destination
- Mobile navigation
- FAQ accordion
- Responsive layouts and image fallbacks

This deliverable has not been fully browser-automated across all devices. Complete a manual QA pass with your real content before publishing.
