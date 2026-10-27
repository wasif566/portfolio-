# Evergreen Outdoor Co. — Landscaping & Gardening Website

Responsive one-page website built with HTML5, CSS3 and vanilla JavaScript. No frameworks or build tools are required.

## Files
- `index.html` — page structure, metadata, content, forms and structured data
- `style.css` — responsive styling and customizable CSS variables
- `script.js` — mobile menu, service enquiry shortcuts, gallery filters/lightbox, FAQ accordion, form validation and WhatsApp messages
- `assets/images/garden-placeholder.svg` — local image fallback
- `assets/logo/` — logo and favicon SVGs
- `assets/icons/` — reserved for optional local icons

## Run
Extract the ZIP and open `index.html` in a modern browser. Remote photos and Google Fonts require an internet connection; the logo and fallback image are local.

## Before publishing
Replace the demo brand, email, service area, hours, address, social links and all placeholder text. Confirm that WhatsApp number `923266438812` is correct. Only list services you actually offer. Replace sample gallery imagery with properly licensed, genuine project photos and replace the placeholder testimonial with an authentic review used with permission. Update JSON-LD URL and details to accurate business information. Do not invent pricing, service availability, qualifications or coverage.

## Business and WhatsApp settings
Edit the `COMPANY` object near the top of `script.js`:
```js
const COMPANY = {
  name: "Your Garden Company",
  whatsapp: "923000000000",
  phone: "+92 300 0000000",
  email: "hello@yourcompany.com"
};
```
WhatsApp format is international digits only: no plus sign, spaces or hyphens. The `WHATSAPP_NUMBER` variable is derived from this setting. Also update visible contact details in `index.html` and the JSON-LD schema.

## Customize services and maintenance plans
Edit service cards in `index.html` and the `data-service` values. Make sure the service names correspond to options in the quote form's service selector. Maintenance plan names, tasks and quote wording are also in `index.html`. Package content is illustrative and quote-based; confirm actual scope and availability before publishing.

## Gallery and photos
Gallery buttons use `data-category`, `data-full`, and `data-caption`. Gallery filter values must match the `data-category` values. Replace thumbnails and full-size URLs together. For local licensed images, put files in `assets/images/` and use a relative path such as `assets/images/my-garden.webp`. Update alt text to accurately describe the image. The hero image is configured in `style.css`; other image URLs are in `index.html`.

## Form behaviour
The quote form checks required fields, optional email format, and preferred date. It compiles form details into a WhatsApp message using `encodeURIComponent()`. The visitor must review and send the message. The static website does not store enquiries, set appointments, or confirm pricing or bookings.

## Features and checks
Includes responsive navigation, service buttons that preselect the quote form, gallery category filters, keyboard-operable lightbox, FAQ accordion, validated quote form, WhatsApp message generation, back-to-top button, focus states and reduced-motion support.
Basic syntax and HTML parsing checks were run. Perform a manual browser pass on desktop and mobile before launch; this package has not undergone exhaustive real-device testing.
