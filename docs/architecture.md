# Architecture

The site is one static page plus a not-found page. There is no build step, no package manifest, and no application server in this repository.

Related: [README](../README.md) · [Design system](design-system.md) · [Content guide](content-guide.md) · [Launch checklist](launch-checklist.md)

## What loads

`index.html` links `/assets/css/main.css` and `/assets/js/main.js` (`type="module"` and `defer`). It preloads `bricolage-grotesque-700.woff2` and `inter-400.woff2`, and loads Web3Forms’ client script for hCaptcha.

`main.css` imports, in order:

```css
@import "./base.css";
@import "./layout.css";
@import "./components.css";
```

`main.js`:

1. Adds class `js` on `<html>` (enables the collapsed mobile nav panel)
2. Calls `initNav()` from `nav.js`
3. Calls `initContact()` from `contact.js`
4. Installs hash-link smooth scroll (respects `prefers-reduced-motion`)

`404.html` links the same `main.css`, uses root-absolute paths, and has `noindex`. No JSON-LD, no canonical.

## Page sections

```text
index.html
├── skip link → #main
├── header.site-header
│   ├── brand → #top
│   ├── button.nav-toggle
│   └── nav#site-nav → Services, Work, About, Contact
├── main#main
│   ├── section#top.hero
│   ├── section#services (three .service-row articles)
│   ├── section#work (three .work-item articles with live iframes)
│   ├── section#about
│   └── section#contact.band (form + email / WhatsApp)
└── footer.site-footer
```

From 860px up, the header shows links in a row and hides the menu button. Below that, `.js` keeps the nav closed until `.nav-toggle` has `aria-expanded="true"`. Without JS, the nav stays in flow so links remain reachable.

## Smooth scroll

- CSS: `scroll-behavior: smooth` on `html` only when `prefers-reduced-motion: no-preference`
- JS: same-page `a[href^="#"]` clicks call `scrollIntoView`, update the hash, and focus the target
- `scroll-padding-top` keeps section titles clear of the sticky header

## Selected work previews

Each project card uses a scaled iframe inside `.work-media` (aspect-ratio 8/5, `container-type: inline-size`, iframe locked to 1280×800 and scaled with `cqw`). Frames are `pointer-events: none`, `tabindex="-1"`. The “View live site” link is the click target.

Live URLs (as of 2026-10-27):

- Unusually — branding studio
- SiteIQ — construction SaaS (`sietiq-construction.vercel.app`)
- Avsar Photography — wedding photography

## Contact form

```text
Browser
  contact.js validates, then fetch POST JSON (15s abort)
    → https://api.web3forms.com/submit
  If JavaScript does not run
    native POST of the same form (all budget optgroups visible)
```

Budget: on init, optgroups are removed into a `Map` keyed by `data-service`. Choosing a service appends that group’s options. “Not sure yet” hides the field and shows `#budget-note`.

With JS, the budget control is a custom listbox (`.budget-select`) styled like the dark choice chips. The native `<select id="budget">` stays in the form for `FormData` and no-JS.

Honeypot `botcheck`: if checked, the script pretends success and does not submit.

## SEO files

| File | Role |
| --- | --- |
| `robots.txt` | `Allow: /` and `Sitemap:` URL |
| `sitemap.xml` | Single homepage `loc` + `lastmod` |
| `site.webmanifest` | Name, icons, display browser |

Replace `https://[your-domain]/` in HTML, robots, and sitemap with the live origin (trailing slash) before launch.

## Decisions

| Decision | Reason | Trade-off |
| --- | --- | --- |
| Single page | Nav uses hash links | A project has no URL of its own |
| No framework | Plain HTML/CSS/JS | New cards are copied by hand |
| Live iframe previews | Show real sites instead of screenshots | Third-party load; some sites may block framing |
| Web3Forms + hCaptcha | Enquiry without a backend | Access key lives in HTML; only allowed third-party scripts |
| CSS + JS smooth scroll | Anchor UX without a library | Must honor reduced motion |

[decision needed] Host and custom domain.
