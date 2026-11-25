# QA Report — Anshu Kumari Cinematic Portfolio

## Automated checks completed

- Chromium responsive layout checks at **320, 360, 375, 390, 430, 600, 768, 840, 1024, 1280, 1440 and 1920 CSS pixels**: passed; no horizontal overflow detected.
- Hero content bounds at 390px: passed.
- Mobile navigation toggle, Escape close, and link navigation close: passed.
- Visitor message form invalid-field validation: passed.
- Visitor message form email-draft generation and encoded name/email/message content: passed.
- Message character counter: passed.
- Reduced-motion mode: poster stills remain visible and videos are suppressed: passed.
- JavaScript syntax (`node --check`): passed.
- CSS parsing: zero syntax errors reported.
- HTML structural scan: no duplicate IDs.
- Local HTML asset references: no missing files.
- Personal phone number: absent from HTML, CSS, JavaScript, and downloadable resume text; no telephone links.
- Both MP4 files: full decode completed; H.264, 1600 × 900, approximately 7.92 seconds each.
- ZIP archive integrity: passed after packaging.

## Scope and limitations

Chromium checks ran in the supplied runtime with local image assets embedded into the test page; MP4 files were separately full-decoded with FFmpeg. The automated test does not replace a live-host test or hands-on testing on physical Android and iOS devices. Video autoplay can still be restricted by browser, battery, user, or operating-system policy; the poster images are the intended fallback.

The contact form is a static `mailto:` handoff, not a server-side submission service. It opens a prepared email draft and relies on the visitor to press Send.
