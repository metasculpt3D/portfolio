# Design system

**Option C: Editorial** for Zil Patel’s freelance portfolio. White ground, near-black ink, hairline rules, square corners, large display type, one orange accent used only as a non-text mark.

Related: [Components](components.md) · [Content guide](content-guide.md) · [Architecture](architecture.md) · [README](../README.md)

## Principles

- Clarity over cleverness. One message per section.
- Brand and type carry the first viewport. Accent is a mark, not body text.
- Work first. Live project previews stay large; frames stay quiet.
- No animation library. Motion is short CSS (and hash smooth scroll), and it turns off when the visitor asks for less motion.
- Square corners (`border-radius: 0`) everywhere.

## Colors

Tokens live on `:root` in `assets/css/base.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Page background |
| `--color-ink` | `#0a0a0a` | Headings, body, dark band fill |
| `--color-muted` | `#5c5c5c` | Secondary text |
| `--color-line` | `#d4d4d4` | Hairline borders on light |
| `--color-placeholder` | `#f0f0f0` | Empty media wells |
| `--color-accent` | `#ff3b00` | Eyebrow rule, invalid border, focus ring on light (~3.6:1 on white — not for small text) |
| `--color-dark-bg` | `#0a0a0a` | Contact band |
| `--color-dark-text` | `#ffffff` | Text on the band |
| `--color-dark-muted` | `#bdbdbd` | Secondary text on the band |
| `--color-dark-line` | `#8a8a8a` | Borders and choice boxes on the band |

Accent on white is for marks only. Error copy on the dark band stays white.

## Type

| Role | Token | Family | Notes |
| --- | --- | --- | --- |
| Display | `--text-display` | Bricolage Grotesque 700 | Hero `h1`, clamp |
| Heading 2 | `--text-h2` | Bricolage Grotesque 700 | Contact title |
| Heading 3 | `--text-h3` | Bricolage Grotesque 500 | Service and project titles |
| Body | `--text-body` | Inter 400 / 500 / 600 | `1.125rem` |
| Label / kicker | `--text-label` | JetBrains Mono 500 | Section kickers, uppercase |

Self-hosted woff2 under `assets/fonts/` with `font-display: swap`.

## Space and shell

8px scale: `--space-1` … `--space-8`. Container `--container: 72.5rem`. Gutter `--gutter: clamp(1rem, 4vw, 1.5rem)`. Header `--header-height: 5rem`.

Breakpoints (mobile-first): ~640px (about), ~860px (nav, section split, contact), ~1100px (service title/text).

## Motion

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-fast` | `150ms` |
| `--duration-base` | `250ms` |
| `--duration-slow` | `600ms` |

**Smooth scroll.** Under `prefers-reduced-motion: no-preference`, `html` uses `scroll-behavior: smooth`, and `main.js` scrolls hash targets with `scrollIntoView({ behavior: "smooth" })`. With reduced motion, scrolling jumps. Sticky header clearance uses `scroll-padding-top`.

Also gated by reduced motion: hero entrance delays, scroll-driven reveal (`animation-timeline: view()` where supported), and hover scale on work media / button press.

Do not add looping motion or scroll-jacking libraries.
