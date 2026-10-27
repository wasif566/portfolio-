# GlossWorks — Car Wash & Mobile Valeting Website

A responsive, single-page automotive service website built with HTML5, CSS3 and vanilla JavaScript.

## Files

- `index.html` — page structure, SEO metadata and sample structured data
- `style.css` — responsive visual design, animation and accessibility styling
- `script.js` — navigation, package selection, gallery, lightbox, dynamic booking fields and WhatsApp request builder
- `assets/icons/favicon.svg` — editable favicon placeholder
- `assets/logo/` — reserved for a business logo
- `assets/images/` — reserved for optimized local business images

## Run locally

Open `index.html` in a browser, or serve the folder using a local static server. No build step or framework is required.

## Important: customize before publishing

This is a polished starter website. **GlossWorks, package inclusions, service descriptions and business policies are sample content.** Update them to reflect the real business.

1. Edit `BUSINESS` at the top of `script.js`. The WhatsApp number is currently `923266438812` in international digits-only format.
2. Replace the sample business name, phone, contact details, hours, service area, social links and structured data in `index.html`.
3. Confirm every package inclusion and remove anything the business does not offer. Add real prices only after they are confirmed.
4. Replace remote Unsplash images with genuine, appropriately licensed business photography where possible. The gallery currently labels images as illustrative stock photography.
5. Update SEO title, meta description, Open Graph image and canonical/site URL when a real domain is available.
6. Add a real favicon/logo to the relevant asset folders.
7. Test WhatsApp on the target phone/browser, mobile navigation, booking fields, gallery filters/lightbox, and responsive layouts before launch.

## Booking behavior

The form validates required fields, displays the mobile location field only when mobile valeting is selected, and composes a WhatsApp message with the submitted details. It opens WhatsApp for the customer to send the request manually. **It does not submit to a server and does not confirm a booking.**

The date field blocks past dates in the browser. Availability, pricing, mobile coverage, travel charges, utility requirements and appointment policies must be confirmed by the business.

## Images

Images are loaded from Unsplash URLs, so the site needs an internet connection to display them. Lazy loading is enabled for below-the-fold images. If a remote image fails, the JavaScript applies a neutral fallback background. For production, download and optimize licensed images into `assets/images/`, then update the URLs in the HTML and CSS.

## Accessibility notes

- Semantic landmarks and headings
- Skip link and visible focus treatment
- Mobile navigation exposes `aria-expanded`
- Gallery filters expose `aria-pressed`
- Lightbox supports Escape and arrow keys
- Booking errors are announced through an alert region
- Reduced-motion preferences are respected

## No framework

Uses only HTML, CSS and vanilla JavaScript. No React, Vue, Angular, Bootstrap, Tailwind, jQuery or backend framework.
