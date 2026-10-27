# Evergreen Painting & Decorating Website

A responsive, single-page painting and decorating website built with HTML5, CSS3, and vanilla JavaScript. No framework, build process, or backend is required.

## Files and folders

- `index.html` — semantic page structure, SEO metadata, editable business content, and structured data.
- `style.css` — responsive styling, palette variables, layouts, hover states, and reduced-motion support.
- `script.js` — mobile navigation, gallery filters/lightbox, FAQ accordion, quote validation, and WhatsApp message generation.
- `assets/images/` — place optimized local photographs here.
- `assets/icons/` — place additional icons here.
- `assets/logo/` — contains a simple SVG favicon placeholder.

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a modern browser. A local development server is recommended for testing; for example, use the VS Code Live Server extension.
3. Internet access is needed for the current Unsplash-hosted sample photos. Replace them with properly licensed local images for a self-contained deployment.

## Customize the business

### Company name, contact details, service area, and hours
Edit the text in `index.html`. Search for `Evergreen`, `hello@example.com`, `Add your town`, and `Add confirmed hours`. Replace all demo details with verified business information.

### WhatsApp number
At the top of `script.js`, edit:

```js
const WHATSAPP_NUMBER = "923266438812";
```

Use the international number format with country code and digits only, without `+`, spaces, or punctuation. Also update the static WhatsApp links in `index.html` (search for `923266438812`) so the floating and quick-contact links match the configured number.

### Services
Edit the service cards inside the `#services` section in `index.html`. The service enquiry links use `data-service` to preselect a related option in the quote form. Keep those values aligned with the options in the `project-type` select.

### Prices and quotations
The pricing section intentionally uses “Request a quote” instead of made-up prices. If you add price ranges, confirm that they are accurate, explain what they include, and make clear what can affect the final quote.

### Portfolio gallery
The gallery currently contains sample inspiration photography, not verified completed jobs. Replace the remote `src` and `data-full` URLs in each `.gallery-item` with your own licensed images. Add the local images under `assets/images/`, e.g. `assets/images/living-room-after.jpg`, then reference them with `src="assets/images/living-room-after.jpg"` and `data-full="assets/images/living-room-after.jpg"`. Update each image's `alt`, `data-title`, and `data-category` (`living`, `kitchen`, `exterior`, or `details`) as appropriate. Keep the visible sample-image disclaimer until all sample images have been replaced.

### Logo and colours
The inline logo is an editable SVG inside `index.html`; the browser tab icon is `assets/logo/favicon.svg`. CSS custom properties are at the top of `style.css` under `:root`, including `--forest`, `--gold`, `--paper`, and `--ink`.

### About, team, reviews, and credentials
Replace the demo company story and review placeholder with truthful company information. Do not add unverified qualifications, insurance, years of experience, customer reviews, or guarantees. Add team profiles only when real details and approved photos are available.

### SEO and structured data
Update the `<title>`, meta description, Open Graph tags, and JSON-LD block in `index.html`. Add the real website URL and accurate service area only when known. Keep the structured data aligned with visible business information.

## Quote form behavior

The form validates required fields and optional email formatting. On submit, it creates a formatted message using `encodeURIComponent()` and opens WhatsApp. It does not store form submissions, send them to a server, confirm a booking, or calculate a final quote. The customer must review and send the WhatsApp message themselves.

## Accessibility and testing checklist

- Keyboard-test navigation, form fields, gallery lightbox (Escape / arrow keys), and FAQ controls.
- Check mobile and desktop breakpoints and test reduced-motion settings.
- Test form validation with empty required fields and malformed email addresses.
- Verify WhatsApp links and the prefilled message on a device/browser with WhatsApp available.
- Check all local image paths and replace sample photography with licensed assets.
- Confirm phone, email, opening hours, service areas, business schema, and social links before going live.

## Deployment

Upload the project files and folders to any static hosting provider that serves HTML, CSS, JavaScript, and image assets. No build command is required.
