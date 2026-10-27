# FORGE Fitness — Responsive Gym Website

A responsive one-page gym and personal-training website built with HTML5, CSS3 and vanilla JavaScript only.

## Project structure
- `index.html` — semantic page structure, SEO/Open Graph metadata and basic HealthClub structured data
- `style.css` — visual theme and responsive layouts
- `script.js` — navigation, class filtering, FAQ accordion, enquiry prefill, validation and WhatsApp redirects
- `assets/images/` — local SVG fallback illustrations; primary gym photographs are loaded from Unsplash and need internet access
- `assets/icons/` — optional local SVG icons
- `assets/logo/` — editable SVG logo mark and favicon

## Run locally
1. Download and unzip the project.
2. Open `index.html` in a modern browser. For best testing, use a simple local static server (for example VS Code Live Server or `python -m http.server`).
3. Replace demo business information before publishing.

## Configure the business
- **Name / logo:** update the brand text in `index.html` and replace `assets/logo/forge-mark.svg`.
- **WhatsApp:** change `WHATSAPP_NUMBER` once at the top of `script.js` (digits only, international format without `+`). Update the hard-coded WhatsApp links in `index.html` to match.
- **Prices and memberships:** edit the membership cards in `index.html`; all prices currently say “Contact for pricing.”
- **Classes:** edit `.class-card` entries and their `data-category` values. Update trainer, day, time and level; the visible schedule is clearly marked as sample content.
- **Trainers:** replace names, photos, bios and only verified qualifications.
- **Facilities / policies:** remove anything unavailable and confirm the FAQ answers.
- **Images:** replace SVG files in `assets/images/` with properly licensed, optimized gym images and update their file extensions in `index.html`. The HTML includes remote image fallbacks where appropriate; remote images require an internet connection.
- **Address / contact:** replace `hello@example.com`, placeholder address, opening hours, map link, and update the JSON-LD `HealthClub` data with verified details.
- **Social links:** replace the example Instagram and Facebook destinations with the business's actual profiles.

## Form behaviour
The enquiry form validates name, phone, enquiry type and email format when supplied. On valid submission it builds a URL-encoded WhatsApp message using `encodeURIComponent()` and opens `https://wa.me/923266438812`. The user reviews and sends the message. This does not confirm a membership or trial.

## Testing note
The project includes responsive CSS, keyboard-operable native controls, visible focus styles, reduced-motion handling, image fallbacks and interactive class/FAQ controls. Automated browser testing and physical-device testing have not been performed in this environment; verify these before production launch.
