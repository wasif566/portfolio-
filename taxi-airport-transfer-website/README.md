# Northstar Transfers — Website Template

A responsive single-page taxi and airport transfer website using HTML5, CSS3 and vanilla JavaScript.

## Files
- `index.html` — website content and form
- `style.css` — responsive styling
- `script.js` — mobile navigation, service selection, validation and WhatsApp message creation
- `assets/` — local SVG illustrations

## Before publishing
1. Replace Northstar Transfers with the real business name and logo.
2. Replace the placeholder email, address, about copy and service list with verified business information.
3. Replace demo vehicle imagery with the operator's actual vehicle photographs and confirmed details.
4. Confirm the business phone/WhatsApp number. The WhatsApp destination is currently `923266438812`.
5. Update SEO title/description and Google Maps address.
6. Test on real devices and browsers. The hero and fleet photos use remote Unsplash URLs, so a network connection is required for those photographs; local SVG fallbacks are included for the fleet image.

## Booking behaviour
Submitting the form validates required fields and opens WhatsApp with URL-encoded trip details. This is a request only, not a confirmed booking. Availability, fare and pickup arrangements must be confirmed by the business.
