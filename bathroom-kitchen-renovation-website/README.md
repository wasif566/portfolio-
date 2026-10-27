# Form & Finish — Kitchen & Bathroom Renovation Website

Responsive single-page website using HTML5, CSS3 and vanilla JavaScript. No framework, package manager, or build process is required.

## Run
Open `index.html` in a modern browser. A static local server (such as VS Code Live Server) is also suitable.

## Customize before publishing
Edit the `SITE_CONFIG` object at the top of `script.js`:
- `companyName`: your real company name
- `phoneDisplay` and `phoneLink`: business phone
- `email`: actual enquiry email
- `address`: actual business address
- `serviceAreas`: areas genuinely served
- `openingHours`: current business hours
- `whatsappNumber`: international digits only, no plus or spaces. Configured as `923266438812`.

The sample brand name and placeholder business information must be replaced. No credentials, warranties, customer reviews, years in business, or project statistics are claimed. No free quote promise is made.

## Services
Edit the service cards in `index.html` and keep their `data-service` values aligned with the options in `#service`. Only list services the business actually provides. If specialist subcontractors are involved, describe that arrangement accurately.

## Images
The portfolio gallery is explicitly labelled as illustrative inspiration, not completed company projects. The page uses online Unsplash photography and local SVG fallback artwork in `assets/images/`. Online photos require an internet connection.
To use your own images, copy optimized WebP/JPEG files to `assets/images/`, then replace relevant Unsplash URLs in `style.css` with paths such as `url("assets/images/my-kitchen.webp")`. Update gallery `data-full` URLs in `index.html`, captions, accessible labels and the gallery disclaimer to match the real image. Do not describe an image as a company project unless it genuinely is.
Image mapping in CSS: `.hero-bg`, `.bath`, `.kitchen`, `.cabinets`, `.shower`, `.tiles`, `.finishing`, `.feature-photo`, `.p1`–`.p5`, `.about-photo`.

## WhatsApp enquiry
The form validates required fields in the browser, then opens WhatsApp with a URL-encoded draft containing the entered details. The visitor must review and manually send the message. It does not submit to a server, save enquiries, book work, or confirm a quotation. Test on a device/browser with WhatsApp or WhatsApp Web available.

## Contact and map
A Google Maps link is not included because no real business address was supplied. Add a directions link only after setting the actual address. Social links are omitted until real URLs are supplied.

## Technical notes
- `index.html`: page content, metadata, forms and gallery.
- `style.css`: theme, responsive layout, image URLs and reduced-motion support.
- `script.js`: company settings, responsive navigation, gallery filtering/lightbox, form validation and WhatsApp message.
- Static front-end only; no backend, CMS, database, or online payment.
- Includes semantic sections, skip link, form labels/errors, keyboard-accessible gallery dialog, responsive breakpoints and `prefers-reduced-motion` handling.

Review the site in desktop and mobile browsers before publishing. Verify all business information, services, imagery and the WhatsApp number.
