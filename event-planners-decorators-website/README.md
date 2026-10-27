# Maison Events — Event Planning & Decor Website

An elegant responsive event planning website built with HTML5, CSS3, and vanilla JavaScript. No build tools, frameworks, or backend are required.

## Project contents

- `index.html` — site sections, SEO metadata, structured data, portfolio, FAQs, and event enquiry form
- `style.css` — champagne gold, ivory, and charcoal design system; responsive layouts; reduced-motion support
- `script.js` — mobile navigation, portfolio filters, accessible lightbox, form validation, dynamic venue details, and WhatsApp message generation
- `assets/logo/favicon.svg` — editable placeholder favicon
- `assets/images/` and `assets/icons/` — organized folders for local licensed photography and icons

## Run the website

1. Download and extract the project ZIP.
2. Open `index.html` in a modern browser. A local static server (for example, VS Code Live Server) is recommended for testing.
3. Test the site on desktop, tablet, and mobile sizes.
4. Submit the enquiry form using test data. It validates required fields and opens a prefilled WhatsApp message for review and sending.

## Customize before publishing

- Change the sample brand name **Maison Events** throughout `index.html` and the structured data.
- Update the `BUSINESS` object at the top of `script.js`. WhatsApp is set to `923266438812` (digits only, international format).
- Replace `hello@example.com`, address, opening hours, service areas, social links, and any sample wording.
- Confirm which services and packages your company actually offers. Remove unsupported claims and replace all example package inclusions with accurate scope.
- The package cards use “Request a quote” rather than fixed prices. Final costs should be based on the actual event date, location, guest count, requested services, rentals, and scope.
- Replace stock photos with licensed assets or authentic company photos approved for publication. All current gallery photos are illustrative references, not claims of completed projects. Images are remote Unsplash URLs and require internet access; image fallbacks are included.
- Replace testimonial placeholders with genuine, approved client feedback.
- Update JSON-LD `areaServed`, URL, and other details with verified business data.
- Add your actual payment, cancellation, privacy, and booking policies before launch.

## Functional features

- Responsive mobile navigation
- Portfolio category filters with accessible button states
- Keyboard-friendly gallery lightbox with previous/next navigation and Escape-to-close support from the native dialog
- Event enquiry form validation with inline messages
- Conditional venue detail field based on venue status
- WhatsApp message built with `encodeURIComponent()`
- FAQ accordion using native `<details>` elements
- Smooth scrolling and back-to-top control
- Descriptive image alt text, lazy loading, SEO and Open Graph metadata
- Reduced-motion preference support

## Important limitations

- This is a static front-end website. It does not manage calendars, check venue availability, take payments, or automatically confirm bookings.
- Form details are placed in a WhatsApp message only after the visitor submits and chooses to send it.
- Before launch, verify all links, phone numbers, email addresses, images, business policies, and responsive behavior in your target browsers.
