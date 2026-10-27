# BrightCare Dental Clinic Website

A responsive, single-page dental clinic website built with HTML5, CSS3, and vanilla JavaScript.

## Project structure

```text
dental_clinic_website/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── clinic-hero.svg
    ├── clinic-interior.svg
    ├── service-checkup.svg
    ├── service-cleaning.svg
    ├── service-general.svg
    ├── service-whitening.svg
    ├── service-filling.svg
    ├── service-consult.svg
    └── dentist-placeholder.svg
```

## Run locally

Open `index.html` in a modern browser. No build tools, package installation, or backend are required.

## Important: configure before publishing

Edit `CLINIC_CONFIG` near the top of `script.js`:

- `name`: actual clinic name
- `phoneDisplay` and `phoneDigits`: verified contact number and WhatsApp number
- `email`: real clinic email
- `address`: complete verified address
- `openingHours`: actual opening hours
- `mapsQuery`: exact address or place name used for Google Maps directions

The WhatsApp destination is currently configured as `923266438812` per the project brief.

## Content review checklist

- Remove any service the clinic does not actually offer, and update the service options in the form to match.
- Replace all dentist/team placeholders with real supplied names, photographs, and verified qualifications.
- Confirm the FAQs and all clinic descriptions before publishing.
- Replace the example clinic details and sample email.
- Check that the map query points to the correct clinic location.

## Appointment form

The form validates required fields, rejects past dates, includes the selected service in the WhatsApp message, and URL-encodes the full request. It opens WhatsApp so the patient can review and send the message. The website does not submit to a server or store patient data. Appointment requests are not confirmed until the clinic replies.

## Images

All illustrations are local SVG files in `assets/`, so the project does not depend on remote image URLs. They are illustrative placeholders, not photographs of an actual clinic or real dentists.
