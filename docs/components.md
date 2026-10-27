# Components

Notes for the pieces in `index.html` and `assets/css/components.css`. Tokens and motion live in the [design system](design-system.md).

Related: [README](../README.md) · [Design system](design-system.md) · [Content guide](content-guide.md)

## Buttons

| Class | Use |
| --- | --- |
| `.btn.btn-solid` | Primary: Start a project, Contact, submit |
| `.btn.btn-line` | Secondary on light: See my work |

Square corners, min-height 52px. On the dark band, solid stays light fill / dark text so it remains visible. Hover lift and press scale only under `(hover: hover) and (prefers-reduced-motion: no-preference)`.

## Header and nav

Sticky header with brand, hamburger (`.nav-toggle`), and `#site-nav`. With class `js` on `html`, the panel is collapsed until `aria-expanded="true"`. Desktop ≥860px hides the toggle and shows the row of links. Escape closes the panel and returns focus to the toggle.

Nav underline uses `scaleX` on `::after`.

## Hero

Eyebrow with accent rule, one `h1`, hairline rule, lead + CTAs, proof list. Entrance animation only when reduced motion is off.

## Services

`.service-row` list under kicker “(01) Services”. From 1100px, title and text sit in two columns.

## Work

`.work-item` with:

- `.work-media` — 8/5 frame, live `.work-preview` iframe (scaled) or a static image fallback
- `.work-heading` — title + `.work-meta`
- One-line `.work-outcome`
- “View live site” link (`target="_blank"` `rel="noopener noreferrer"`)

Iframes are non-interactive. Prefer live previews for shipped sites.

## About

Portrait + short copy + resume link. Side-by-side from 640px.

## Contact band

`.band` dark section. Choice chips (`.choice`) are square bordered boxes, min-height 48px; checked state inverts to white fill / black text.

Underline fields (inputs, textarea, native select). Budget uses a custom `.budget-select` listbox (trigger + options styled like choices) while the native `#budget` select stays in the form.

Form status: plain success text, or error text plus a mailto link built with DOM methods (no `innerHTML`).

## Smooth scroll targets

In-page links use `#top`, `#services`, `#work`, `#about`, `#contact`, `#main`. Smooth behaviour is documented in [architecture](architecture.md#smooth-scroll) and [design-system](design-system.md#motion).

## 404

`.not-found` layout on `404.html`: code, heading, short line, solid button home.
