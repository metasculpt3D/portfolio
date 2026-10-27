# Content guide

Copy and placeholders for the live editorial portfolio. Write the way the finished sentences on the page already sound.

Related: [README](../README.md) · [Design system](design-system.md) · [Launch checklist](launch-checklist.md) · [Architecture](architecture.md)

## Filled from your resume (current)

These are already set in `index.html` / related files:

| Item | Value |
| --- | --- |
| Name | Zil Patel |
| City | Vadodara |
| Email | zil212002@gmail.com |
| WhatsApp | 918460525467 (`+918460525467` in JSON-LD) |
| LinkedIn | https://linkedin.com/in/zil-patel-765272367 |
| Proof line | 6+ sites launched · Based in Vadodara · Available remotely |
| Work | Unusually, SiteIQ, Avsar Photography (live previews) |
| Manifest short name | Zil Patel |

## Remaining placeholders

| Placeholder | File | What to put there | Done |
| --- | --- | --- | --- |
| `[your-domain]` | `index.html` canonical, `og:url`, `twitter:url`, JSON-LD `url` / image URLs | Live origin as `https://example.com/` (trailing slash) | [ ] |
| `[your-domain]` | `robots.txt` `Sitemap:` | Same origin + `sitemap.xml` | [ ] |
| `[your-domain]` | `sitemap.xml` `<loc>` | Same origin | [ ] |

`404.html` has no bracketed placeholders.

## Writing

Plain-spoken. Short sentences. Everyday words. Match the hero: “Good websites, plainly made.” Skip jargon, stacked adjectives, and claims you cannot show.

**Project outcome.** One sentence under the project title. Say what the site does for the client, without inventing metrics.

**Services.** New websites, Redesigns, and Web apps (Next.js) are already written.

## Images and media

| Asset | Path | Notes |
| --- | --- | --- |
| Work previews | Live iframes in `#work` | Not WebP screenshots |
| Profile | `/assets/images/profile/profile.webp` | 480×600; add if missing |
| Social | `/assets/images/og-image.jpg` | 1200×630; add if missing |
| Resume | Link in About → file under `assets/docs/` | Keep the `href` in sync with the real filename |
| Icons | `/assets/images/icons/` + favicons | Present |

**Alt text.** Profile and any future static images need a real description. Live iframes use a `title` on the frame instead.

## Fonts

woff2 under `assets/fonts/`: Bricolage Grotesque 500/700, Inter 400/500/600, JetBrains Mono 500. Named in `base.css` `@font-face` rules.
