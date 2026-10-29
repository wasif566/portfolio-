# FORM & FADE — Hair Salon & Barbershop Website

A responsive single-page salon/barbershop website built with HTML5, CSS3, and vanilla JavaScript.

## Project files

- `index.html` — semantic page structure, SEO metadata, services, gallery, contact details, and appointment enquiry form.
- `style.css` — responsive layout, theme, interaction states, and reduced-motion support.
- `script.js` — responsive navigation, service selection, form validation, current-year footer, and WhatsApp message generation.
- `assets/images/README.txt` — notes about local image assets.

## Run locally

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or use a local static server such as VS Code Live Server.
3. Internet access is currently needed for the remote Unsplash photography and Google Fonts referenced in the demo.

## Important customisation before publishing

This is a demo template, not a verified real salon listing. Replace all sample identity/contact details with verified business information:

- Business name and logo/brand mark
- Real business address and map directions
- Real telephone, email, opening hours, social links
- Service menu: remove any services the business does not offer
- Real business story and supplied staff details (the template intentionally uses an “Our Approach” section rather than invented staff profiles)
- Supplied promotions, prices, durations, and real gallery images if available

The phone/WhatsApp number is configured to `+923266438812` as requested. The phone number shown in the contact section is a sample contact link and should be changed if it is not the business phone. The email `hello@formandfade.example` is a reserved example address and will not deliver email.

## Images

The demo uses remote Unsplash image URLs so the site can show illustrative photography without bundling unlicensed third-party files. These are not local image assets and are not representations of actual customer results or this business's work. Replace the remote URLs in `index.html` and `style.css` with images you own or have permission to use. For local images, put files in `assets/images/` and update each URL to a path such as `assets/images/salon-interior.jpg`. Descriptive alt text is included for gallery images.

## Appointment enquiry behaviour

- Required fields are validated in the browser.
- Past appointment dates are disallowed.
- Selecting a service card preselects that service in the enquiry form.
- On submit, the site assembles all form values and opens WhatsApp with a URL-encoded message to `923266438812`.
- The visitor must review and send the WhatsApp message. The site does **not** create or confirm a booking and does not check live availability.
- There is no backend, database, payment processing, email delivery, or real-time scheduling integration.

## Testing notes

The layout includes desktop, tablet, and small-mobile responsive breakpoints, keyboard focus states, and reduced-motion support. This generated project has not been independently tested on physical Android/iPhone devices or every browser. Before launch, test the site on target devices, confirm external image URLs load, check all contact details, and test the WhatsApp flow on a device with WhatsApp or WhatsApp Web available.
