# Zil Patel — Portfolio

A single-page freelance site for web design and development in Vadodara. Plain HTML, CSS, and JavaScript only — no framework, build step, or package file.

The page introduces the work, lists three services, shows three live project previews, and takes enquiries through Web3Forms + hCaptcha.

Live site: https://zilpatel021.pages.dev/

## Structure

```text
.
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── main.css
│   ├── docs/
│   ├── fonts/
│   ├── images/
│   │   ├── icons/
│   │   ├── profile/
│   │   └── projects/
│   └── js/
│       ├── main.js
│       ├── nav.js
│       └── contact.js
├── docs/
├── 404.html
├── _headers
├── favicon.ico
├── favicon.svg
├── index.html
├── README.md
├── robots.txt
├── site.webmanifest
└── sitemap.xml
```

## Run locally

From this folder:

```bash
python -m http.server 4173
```

Or:

```bash
npx serve
```

Then open the URL it prints. Styles, fonts, and images use root paths such as `/assets/css/main.css`, so opening `index.html` as a file does not load them.

## Design

**Option C: Editorial** — white ground, near-black ink, hairline rules, square corners (`border-radius: 0`), large display type, and one accent `#FF3B00` used only for non-text marks (eyebrow rule, invalid borders, focus ring on light). The contact band is `#0A0A0A` with white text.

Fonts are self-hosted woff2 files: Bricolage Grotesque, Inter, JetBrains Mono.

## Motion and smooth scroll

- Hash links (nav, hero, footer, skip link) scroll smoothly when the visitor has not asked for reduced motion.
- CSS: `scroll-behavior: smooth` on `html` under `prefers-reduced-motion: no-preference`.
- JS: `main.js` uses `scrollIntoView` the same way, then moves focus to the target section.
- Sticky header clearance uses `scroll-padding-top`.
- Hero entrance, scroll reveal, and hover scale only run under `prefers-reduced-motion: no-preference`.

## Selected work

Three projects use scaled live iframe previews (not static screenshots):

| Project | Live URL |
| --- | --- |
| Unusually | https://unusually-branding-studio.vercel.app/ |
| SiteIQ | https://sietiq-construction.vercel.app/ |
| Avsar Photography | https://avsar-photography-cinematics.vercel.app/ |

Previews are non-interactive (`pointer-events: none`). Use **View live site** to open the real page.

## Contact form

- Posts JSON to `https://api.web3forms.com/submit`
- Loads `https://web3forms.com/client/script.js` for hCaptcha
- Budget options are filtered by the chosen service; “Not sure yet” shows a note instead
- Budget range uses a custom dark listbox that matches the editorial UI (native `<select>` remains for submit and no-JS)

## Replace before launch

The live origin is `https://zilpatel021.pages.dev/` in canonical, `og:url`, `twitter:url`, JSON-LD `url`, `Sitemap:` in `robots.txt`, and `<loc>` in `sitemap.xml`. The form access key is already set — rotate it if this repo is public.

Also add if missing:

- `assets/images/profile/profile.webp` (480×600)
- `assets/images/og-image.jpg` (1200×630)

## Deploy

Publish this folder as it is. Leave the build command empty. The site must be served from the host root, because asset URLs start with `/`.

### Cloudflare Pages

1. Push the folder to a Git host Cloudflare can read.
2. Create a Pages project from that repository.
3. Leave the build command empty and set the build output directory to the repository root.
4. Deploy. Unknown URLs use `404.html`. `_headers` is applied.

### Netlify

1. Add a new site from Git.
2. Leave the build command empty and set the publish directory to the repository root.
3. Deploy. Unknown URLs use `404.html`. `_headers` is applied.

### GitHub Pages

1. In the repository settings, open Pages.
2. Deploy from the branch that holds this folder, using the root folder.
3. Use a user or organization site, or a custom domain, so the site is served from the host root.
4. Unknown URLs use `404.html`. GitHub Pages ignores `_headers`.

## Custom domain

1. Add the hostname on the host you chose.
2. At the DNS host, add the records that host shows.
3. Turn on HTTPS and wait until the certificate is active.
4. Redirect `www` to the main hostname.
5. Replace `https://zilpatel021.pages.dev/` in the HTML, `robots.txt`, and `sitemap.xml` with that origin (trailing slash).

## Before launch

- [x] Live origin `https://zilpatel021.pages.dev/` set in HTML, `robots.txt`, and `sitemap.xml`
- [ ] Add profile and OG images if still missing
- [ ] Confirm resume link path matches a file under `assets/docs/`
- [ ] Submit a test enquiry on the live domain (captcha included)
- [ ] Open an unknown URL and confirm the 404 page
- [ ] Check 320px, 768px, and 1280px, keyboard, and reduced motion
- [ ] Add a Content-Security-Policy only after listing every host Web3Forms and hCaptcha use

## Docs

| File | What it covers |
| --- | --- |
| [docs/design-system.md](docs/design-system.md) | Editorial tokens, type, space, motion |
| [docs/components.md](docs/components.md) | UI pieces on the page |
| [docs/architecture.md](docs/architecture.md) | How HTML, CSS, and JS fit together |
| [docs/content-guide.md](docs/content-guide.md) | Remaining placeholders and writing rules |
| [docs/launch-checklist.md](docs/launch-checklist.md) | Pre-launch checks |

## Follow-up: Content-Security-Policy

`_headers` sets `nosniff`, a strict referrer policy, a locked-down permissions policy, `X-Frame-Options: DENY`, and cache rules. It does not set a Content-Security-Policy. Add one only after a successful live form submission shows every host the form needs.
