# Quality Assurance Report — Message & Privacy Update

## Content and privacy
- The personal phone number is absent from the website HTML and there are no `tel:` links.
- The downloadable resume PDF was updated using true PDF redaction. The phone number is absent from extracted PDF text and from the rendered PDF page.
- The email address remains available for professional contact.
- The footer reads: **© 2026 Anshnav. All rights reserved.**
- Student guidance and teaching are described as an ongoing activity alongside SBI Assistant Manager preparation, not as a formal teaching job.

## Message form
- Required name, email, subject and message fields are present.
- Invalid/empty submission displays validation guidance and focuses the first invalid field.
- Valid submission generates a `mailto:` draft addressed to Anshu, with sender name, sender email, subject and message included.
- The message counter updates as text is entered.
- The form clearly states that the visitor must review and send the email in their own email application. No backend or server-side message storage is claimed.

## Automated checks
- HTML parsed successfully; 23 IDs are unique.
- All local image, video, poster, favicon and resume references resolve.
- CSS parsed with zero syntax errors.
- Inline JavaScript passed `node --check`.
- Chromium responsive/layout tests at 320, 360, 375, 390, 430, 768, 840, 1024, 1440 and 1920 CSS pixels: zero horizontal overflow.
- Mobile menu open/close and Escape behaviour passed.
- Message form invalid and valid/email-draft flows passed.
- Message character counter passed.
- Reduced-motion mode leaves content visible and suppresses video motion.
- No runtime page errors were reported in the browser test.
- Both MP4 files fully decoded with FFmpeg; each is H.264, 1600 × 900, approximately 7.92 seconds.
- The ZIP archive is checked after creation.

## Scope and limitations
- The email handoff depends on the visitor having an email application configured for `mailto:` links. The visitor must press Send; the static portfolio cannot confirm email delivery.
- Automated Chromium checks use the supplied layout and form logic. Physical Android/iPhone device testing and live Vercel deployment are not included.
