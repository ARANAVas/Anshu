# Anshu Kumari — Cinematic Personal Portfolio

A responsive, single-page portfolio using the supplied cinematic video references, two professional portrait photographs, the AA monogram and Anshu's resume.

## What's included
- Cinematic Hero and About video sections with poster fallbacks.
- Two professional portrait photographs.
- A motivational About story based on Anshu's education, internship, SBI Assistant Manager preparation, student guidance/teaching activity and long-term business ambition.
- Skills, internship highlights and a career/education timeline.
- A visitor message section with name, email, subject and message fields.
- A downloadable resume PDF with the personal phone number truly redacted.
- AA monogram branding and the requested footer: **© 2026 Anshnav. All rights reserved.**

## Message form behaviour
The message form validates required fields and prepares a message addressed to Anshu's published email address. It opens the visitor's configured email application with the visitor's name, email, subject and message prefilled. The visitor reviews the draft and presses Send in their email application.

This is a static website, so it does **not** send messages directly to a server and does **not** collect or store form submissions. Direct in-page delivery would require a server/API endpoint or a configured form service.

## Phone privacy
The personal phone number has been removed from the website markup and links. It has also been removed from the downloadable resume using PDF redaction; the redacted PDF was rendered and its extracted text checked.

## Run locally
For reliable video and asset loading, run a local server from this folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in a modern browser.

## Deploy to Vercel
1. Upload the contents of this folder to a GitHub repository.
2. Import that repository into Vercel.
3. Choose **Other** as the framework preset.
4. Leave the build command empty.
5. Set the output directory to `.` and deploy.

## Accessibility and performance
- Responsive layouts for narrow Android phones, tablets and desktop screens.
- Lazy loading for the About video and portrait images.
- Videos pause outside the viewport and while the browser tab is hidden.
- Reduced-motion preferences use still poster images instead of video motion.
- Data Saver preference suppresses video playback.
- Keyboard-accessible navigation, skip link, visible focus styles and Escape-to-close mobile menu.
- Message form uses native input semantics, required-field validation and a live status message.
- No framework build step or third-party JavaScript library is required. Google Fonts enhance typography when online; system fallbacks remain available.

## Content accuracy
Education, internship details, dates, verified skills and email contact are based on the supplied resume. SBI Assistant Manager preparation and becoming a businesswoman are stated as career goals. Student guidance and teaching are stated as a current activity, without inventing an employer, formal teaching role, student count or dates.
