# Launch checklist

Check these against the deployed site, on a phone and on a desktop browser. Include Firefox.

Related: [README](../README.md) · [Design system](design-system.md) · [Content guide](content-guide.md) · [Architecture](architecture.md)

## Content

- [ ] `[your-domain]` replaced in `index.html`, `robots.txt`, and `sitemap.xml` (same origin, trailing slash)
- [ ] Proof figures and project outcomes are facts you can stand behind
- [ ] Profile photo and `og-image.jpg` exist at the paths in `index.html`
- [ ] Resume link opens a real file under `assets/docs/`
- [ ] Favicon and manifest icons load

## Technical

- [ ] HTML validator passes for `index.html` and `404.html`
- [ ] Under 860px: menu opens, Escape closes and returns focus, a nav link closes the panel
- [ ] Hash links smooth-scroll when reduced motion is off; they jump when reduced motion is on
- [ ] `contact.js` validates and posts JSON to Web3Forms; without JS the form still posts with all budget groups visible
- [ ] Budget custom listbox matches the dark editorial UI; options stay readable
- [ ] `sitemap.xml` is valid and lists the live URL (`lastmod` currently 2026-10-27)
- [ ] `robots.txt` allows `/` and points at the live sitemap
- [ ] `site.webmanifest` is valid JSON
- [ ] Asset paths starting with `/` load from the host root

## Performance

- [ ] Lighthouse on mobile scores 90 or higher in Performance, Accessibility, Best Practices, and SEO

## Accessibility

- [ ] Keyboard walkthrough: skip link, header, hero, project links, about, form, email, WhatsApp, footer
- [ ] Focus is not hidden under the sticky header (`scroll-padding-top`)
- [ ] Reduced motion: hero visible immediately, no scroll reveal, no hover lift, hash links jump
- [ ] Focus rings: accent on light, white on `.band`
- [ ] Headings `h1` → `h2` → `h3` with no skipped level
- [ ] Form fields have visible labels

## SEO

- [ ] Open Graph preview shows title, description, and `og-image.jpg`
- [ ] Sitemap submitted in Google Search Console
- [ ] `robots.txt` reachable
- [ ] Canonical matches `og:url`, `twitter:url`, and JSON-LD `url`
- [ ] Unknown URL returns `404.html` with `noindex`

## Contact form

- [ ] Live submit arrives with service, budget, name, email, business, phone, message
- [ ] Each service shows the matching budget list; “Not sure yet” shows the note
- [ ] Empty / invalid fields show all relevant errors; first invalid field is focused
- [ ] Offline / failed submit points at the email link
- [ ] Mailto and WhatsApp use `zil212002@gmail.com` and `918460525467`

## Hosting and domain

- [ ] [decision needed] Host: Cloudflare Pages, Netlify, or GitHub Pages
- [ ] [decision needed] Custom domain connected; HTTPS on; `www` redirects to apex
- [ ] Site served from host root so `/assets/...` resolves

## After launch

- [ ] After each finished project, update the work section (preview URL + outcome)
- [ ] Every six months, review staying dependency-free

## Real devices

- [ ] Phone and desktop browser
- [ ] Include Firefox (scroll reveal may be off; content should still be visible)
