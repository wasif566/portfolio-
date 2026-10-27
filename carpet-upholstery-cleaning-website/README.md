# FreshNest Carpet & Upholstery Care Website

A responsive static website built with HTML5, CSS3 and vanilla JavaScript. No framework, build step or backend is required.

## Files

- `index.html` — semantic page structure, metadata and editable content
- `style.css` — responsive layout, components and theme variables
- `script.js` — navigation, gallery filters/lightbox, validation and WhatsApp message generation
- `assets/images/` — local fallback placeholder
- `assets/icons/` — icon asset folder
- `assets/logo/` — favicon and logo assets

## Run locally

1. Extract the project ZIP.
2. Open `index.html` directly, or open the folder in VS Code and run it with Live Server.
3. Check the layout at mobile, tablet and desktop widths.
4. Test the quote form and WhatsApp links on a device with WhatsApp installed or WhatsApp Web available.

There is no backend. The form validates in the browser and prepares an enquiry message in WhatsApp. It does not store submissions or confirm appointments.

## Customize before publishing

### Business identity and contact details
- Replace `FreshNest Carpet & Upholstery Care` in `index.html` and `script.js`.
- Update the sample email (`hello@example.com`), phone display, service areas, opening hours and address.
- In `script.js`, update `BUSINESS.whatsapp`. Use digits only, including country code, without `+` or spaces.
- Update the JSON-LD structured data in `index.html` with accurate business details. Remove fields you cannot verify.

### Services and packages
- Edit the service cards and package descriptions in `index.html`.
- Add only services and methods actually offered by the business.
- Replace “Request a quote” with verified prices only when rates and terms are confirmed.
- The service enquiry buttons use `data-service`; their selected name is included in the form flow.

### Gallery and images
- Replace remote Unsplash sample images with your own licensed or owned project photographs.
- Update `alt` text to describe each real image accurately.
- The gallery is explicitly labelled as inspiration; do not present stock photography as actual completed work or as before-and-after evidence.
- For local images, save them in `assets/images/` and update `src` and `data-full` paths.
- A local SVG fallback is used if remote images fail.

### Theme
Edit CSS variables at the top of `style.css`: `--teal`, `--teal-dark`, `--teal-pale`, `--navy`, `--ink`, and `--soft`.

### Reviews and trust claims
Replace placeholder reviews only with genuine, approved testimonials. Do not add unverified qualifications, insurance, certifications, staff experience, guarantees or stain-removal claims.

## WhatsApp form behavior

The form checks required fields and generates a structured WhatsApp message using `encodeURIComponent()`. The user must review and send the message in WhatsApp. No appointment is booked automatically.

## Testing checklist

- [ ] Open `index.html` at desktop and mobile widths.
- [ ] Use the mobile navigation and follow every section link.
- [ ] Try each gallery filter and open/close the image lightbox.
- [ ] Test lightbox Escape and arrow-key controls.
- [ ] Submit the form with missing required fields and verify inline errors.
- [ ] Submit valid details and confirm WhatsApp opens with the expected message.
- [ ] Click service/package enquiry buttons and verify the selected service is carried into the form.
- [ ] Test remote image loading and local fallback.
- [ ] Replace all placeholder identity, contact, service-area, pricing and testimonial content before going live.

## Important
The website is a front-end template. Remote sample photography needs internet access and should be replaced with properly licensed images. Cross-browser/device testing and verification of business details must be completed before launch.
