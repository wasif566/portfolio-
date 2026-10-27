# CarePoint Diagnostics Website

A responsive, single-page diagnostic laboratory website starter built with **HTML5, CSS3 and vanilla JavaScript**. It includes a searchable test directory, patient information, FAQs, a branch selector, and an appointment enquiry form that creates a WhatsApp message.

> **Important:** This is a starter template, not a verified laboratory listing. Replace the sample brand/contact details and confirm all tests, branches, hours, service areas, claims and policies before publishing. The test catalogue entries are illustrative examples only.

## Project structure

```text
diagnostic_laboratory_website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── laboratory-hero.svg
    │   ├── home-collection.svg
    │   └── lab-team.svg
    ├── icons/
    │   └── README.txt
    └── logo/
        ├── logo.svg
        └── favicon.svg
```

## Run locally

1. Extract the ZIP archive.
2. Open `index.html` in a modern browser. No build step or package manager is required.
3. For a local web server, run `python -m http.server 8000` from the project folder, then visit `http://localhost:8000`.

Google Fonts are loaded remotely when internet access is available; system font fallbacks are defined.

## Configuration guide

### 1. Laboratory name, phone and WhatsApp

Edit `LAB_CONFIG` near the top of `script.js`:

```js
const LAB_CONFIG = {
  name: "CarePoint Diagnostics",
  whatsappNumber: "923266438812", // digits only, country code included
  phoneDisplay: "+92 326 6438812",
  email: "hello@example.com",
  branches: [
    { value: "Main branch (configure address)", label: "Main branch (configure address)" }
  ]
};
```

- Use a WhatsApp number with country code and digits only, without `+`, spaces or dashes.
- Update the visible phone/email links in `index.html` to match.
- Update the default general-enquiry WhatsApp links in `index.html` too.
- The appointment form builds its message with `encodeURIComponent()` and opens `https://wa.me/…`. The visitor must review and send the message themselves.

### 2. Test catalogue and prices

Edit the `.test-row` elements in `index.html`. Each row needs:
- `data-name`: lowercase search terms for the test
- `data-category`: a category matching one of the category filter options
- Test name, verified sample type and approved preparation details

Update the `<option>` list inside `#test-category` when adding or removing categories. Do not publish prices, turnaround times, reference ranges or claims unless the laboratory has verified them. The included examples are placeholders and should be replaced or removed.

### 3. Branches and opening hours

- Update the `branches` array in `script.js`.
- Update the branch/contact cards in `index.html` with verified addresses, phone numbers, operating hours and directions/map links.
- Update the JSON-LD structured data in the `<head>` of `index.html` so it matches the actual business. Remove structured-data claims that are not accurate.

### 4. Home collection

Edit the home-collection section in `index.html` to include only verified service areas, appointment windows, fees and preparation instructions. The form asks for an area/neighbourhood only if the visitor selects home collection.

### 5. Logo and images

Replace SVGs in `assets/logo/` and `assets/images/` with your own licensed assets if desired. Keep filenames or update the corresponding `src` and Open Graph image paths in `index.html`. All included artwork is local, lightweight SVG illustration; it is not a photograph and does not claim to represent real facilities.

### 6. Email, privacy and patient information

- Replace `hello@example.com` with the official contact email.
- Add the laboratory's approved privacy notice, retention policy and contact details.
- The form is a front-end WhatsApp hand-off; it is not a secure medical portal and does not submit data to a server.
- Avoid requesting diagnoses, medication lists, national ID numbers, report files, passwords or other sensitive medical details through this form.
- WhatsApp is an external service. The visitor reviews and sends the generated message; the lab must confirm appointment availability.

## Functionality included

- Responsive navigation with keyboard Escape support
- Test search and category filtering, plus clear filters
- Test enquiry links prefill the requested test
- Branch selector populated from `LAB_CONFIG`
- Date input blocks dates before today
- Required-field validation and accessible error/status messages
- Conditional home collection area field
- WhatsApp appointment-enquiry generation with URL encoding
- FAQ accordion using native accessible `<details>` elements
- Back-to-top link and current footer year
- Reduced-motion CSS support

## Pre-launch checklist

- [ ] Replace all sample brand/contact details and verify phone/WhatsApp number.
- [ ] Replace the sample test catalogue with the actual approved service list.
- [ ] Verify all categories, preparation instructions, sample types and prices.
- [ ] Add real branch addresses, opening hours, collection areas and fees.
- [ ] Remove unsupported certifications, registration, equipment and accuracy claims.
- [ ] Add the laboratory's approved privacy notice.
- [ ] Update JSON-LD structured data to accurate information.
- [ ] Test the form and WhatsApp hand-off on mobile and desktop.
- [ ] Check keyboard navigation, contrast and image alt text.
- [ ] Confirm that external links and contact details work.

## Medical responsibility

This site provides general administrative information only. It is not a substitute for professional medical advice. Patients should follow instructions from their healthcare professional or laboratory and should not stop medication or change treatment based on generic website text.
