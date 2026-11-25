# Anshu Kumari — Cinematic Portfolio

A responsive, video-led personal portfolio with a midnight-black visual system, coral/champagne accents, editorial typography, AA monogram branding, two professional portraits, and two short cinematic video loops.

## Contents

- `index.html` — semantic portfolio structure and content
- `styles.css` — responsive design system, component styling, and motion
- `app.js` — mobile navigation, scroll interactions, media playback, and message form
- `assets/` — original portfolio media, AA mark, favicon, and privacy-redacted resume

## Run locally

This is a static website. For a reliable preview, serve the folder over HTTP rather than opening `index.html` directly:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deploy to Vercel

1. Upload the contents of this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Choose **Other** as the framework preset.
4. Leave the build command empty.
5. Set the output directory to `.`.
6. Deploy.

The project uses relative local asset paths, so keep the `assets` folder alongside `index.html`.

## Message form behaviour

The visitor form validates the name, email, subject and message, then prepares an email draft addressed to `ak99552534@gmail.com` through the visitor's configured email app. The visitor must review and press **Send** in that app. This static site does not store, transmit, or retain message submissions. For direct on-site delivery, connect a trusted form backend or form service and update the form handler accordingly.

## Privacy

The personal phone number has been removed from the site and the downloadable resume. The public email address remains available for enquiries.

## Accessibility and performance

- Responsive layouts for narrow phones through wide desktop screens
- Keyboard-accessible navigation and visible focus styling
- `prefers-reduced-motion` support
- Data Saver preference respected where the browser exposes it
- Video loading deferred until the relevant section is near the viewport
- Videos pause when outside the viewport or when the document is hidden
- Local WebP posters remain as visual fallbacks when video playback is unavailable
- No build step or JavaScript framework required

The external Google Fonts stylesheet is an enhancement; system font fallbacks are included for offline or blocked-font scenarios.
