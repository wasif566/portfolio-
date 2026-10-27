# FixLab Device Care — Phone & Computer Repair Website

A responsive single-page repair-business website built with HTML5, CSS3 and vanilla JavaScript. No framework or build process is required.

## Files

- `index.html` — semantic page structure, SEO/Open Graph metadata and editable example LocalBusiness structured data.
- `style.css` — responsive layout, colours, components, accessibility focus states and reduced-motion handling.
- `script.js` — central business configuration, responsive navigation, device/service filters, FAQ accordion, repair form validation and WhatsApp message creation.
- `assets/images/` — local SVG fallbacks and notes for adding licensed images.
- `assets/icons/` — notes for optional local icons.
- `assets/logo/` — favicon placeholder.

## Run locally

Open `index.html` in a modern browser. For best local testing, use a simple static server (for example, VS Code Live Server). No build/install step is needed.

## Configure before publishing

Edit the `SITE_CONFIG` object at the top of `script.js`:

- `businessName`
- `whatsappNumber` (international digits only; current example: `923266438812`)
- `phoneDisplay`, `phoneHref`, `email`
- `address`, `hours`, `city`, `country`

Also replace the example business story, opening hours, social placeholders, map search, and contact information in `index.html`. Update the JSON-LD details so they accurately describe the real business. Remove any services that are not actually offered. Do not publish unsupported claims about qualifications, manufacturer authorization, warranties, prices, parts, or turnaround times.

## WhatsApp enquiry behaviour

The form validates required fields and builds a structured message with `encodeURIComponent()`. It creates a link to `https://wa.me/923266438812?text=...`; it does **not** send a message automatically. The customer reviews and sends the message in WhatsApp. A submitted form is not a confirmed appointment or final quote. Do not ask for or share passwords, PINs, recovery keys or account credentials. The page does not store or transmit form data to a server.

## Images

The design currently uses remote Unsplash images for illustration. Network access is needed to load them. Image elements include alt text, and below-the-fold images use lazy loading. Local SVG fallbacks are in `assets/images/`. Before commercial deployment, replace remote images with assets you own or have permission to use, optimize them, and verify every image path. Do not use manufacturer logos or imply official authorization without permission.

## Features

- Responsive mobile navigation
- Device category filters
- Repair-service filters and search
- Repair enquiry form with inline validation
- WhatsApp message generation
- FAQ accordion
- Prefilled device/service links
- Click-to-call and email links
- Smooth anchors, back-to-top action and reduced-motion support
- SEO title/description, Open Graph metadata and editable JSON-LD

## Limitations and launch checklist

- This is a front-end template, not a repair management system. It has no backend, customer accounts, live tracking, payments, or automatic booking confirmation.
- Example business information and the business story must be replaced before launch.
- Verify contact details, shop location, actual hours, services, fees, warranty terms, and parts availability.
- Test WhatsApp on a device/browser where WhatsApp is available, and verify phone links on mobile.
- Test keyboard navigation, validation messages, filters, FAQ controls and layouts at mobile/tablet/desktop widths.
- Configure an accurate privacy notice for the actual business and hosting environment.
