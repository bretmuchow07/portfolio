# Portfolio — Design System & Architecture Document (v2.2)

This document defines the visual identity and structural tokens for the portfolio. It synthesizes a pop art and Y2K aesthetic with 90s tactical anime UI and classic web elements, grounded by modern responsive mechanics and high-contrast accessibility.

---

## 1. Design Philosophy & Hybrid Identity

* Comic panels meet tactical anime HUDs: Content sits inside hard-outlined structural blocks (2–3px solid borders) enhanced with subtle 45-degree chamfered geometry. Layouts feel constructed and engineered rather than passively placed.
* Halftone, dither, and scanlines: Halftone Ben-Day dots and Bayer dithering serve as selective textures rather than full-bleed clutter. Scanlines are applied as subtle overlays on media surfaces, preserving legible typography.
* Monospaced system telemetry: Small diagnostic annotations (indices, system status, build notes) reference late-90s digital workflows and tactical anime computer terminals without overwhelming the primary narrative.
* Restrained high-chroma shouting: Acid-yellow remains reserved for single-instance signals (live status indicator, active route beacon). Chrome sheen overlays and high-contrast cyan/magenta provide tactile depth.
* Tactile, low-latency motion: Layout shifts, button presses, and hover states mimic mechanical switches and physical surfaces. Fluid modern CSS container queries keep the entire experience responsive across modern screens.

---

## 2. Color Palette & Design Tokens

### 2.1 Core Palette
| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| `--ink` | `#0d0d12` | Base canvas background (near-black, deep void) |
| `--paper` | `#f4f2e8` | Base text, off-white panel fill, light-mode background |
| `--magenta` | `#ff2e88` | Primary accent — active outlines, section banners, hero titles |
| `--cyan` | `#00e5ff` | Secondary accent — terminal chrome, links, focus rings |
| `--acid-yellow` | `#f5ff00` | Telemetry shout color — live beacon dot, build badges |
| `--panel-black` | `#111114` | Comic border color on dark surfaces |
| `--panel-surface` | `#16161c` | Dark panel background |
| `--panel-white` | `#ffffff` | Comic border color on light surfaces |
| `--muted-label` | `#6b6b7a` | System metadata and telemetry tags |

### 2.2 Textures & Gradient Tokens
| Gradient Name | CSS Definition | Purpose |
| :--- | :--- | :--- |
| `--chrome-sheen` | `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 35%, transparent 60%)` | Y2K glossy gel button surface |
| `--scanline-overlay` | `repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 2px)` | Subtle monitor screen scanlines on media/code frames |
| `--dither-mask` | `radial-gradient(circle, var(--panel-black) 25%, transparent 26%)` repeated at `6px 6px` | Boundary blending and vintage compressed feel |

### 2.3 Dark Mode vs. Light Mode Tokens
| Property | Dark Mode (Default) | Light Mode |
| :--- | :--- | :--- |
| Canvas Background | `#0d0d12` | `#f4f2e8` |
| Panel Background | `#16161c` | `#ffffff` |
| Panel Border | `2px solid #f4f2e8` | `2px solid #111114` |
| Primary Text | `#f4f2e8` | `#111114` |
| Secondary Text | `#a2a2b0` | `#585863` |
| Hard Offset Shadow | `4px 4px 0 #ff2e88` | `4px 4px 0 #111114` |
| Halftone Dot Tone | `rgba(244,242,232,0.08)` | `rgba(17,17,20,0.06)` |

---

## 3. Typography

* Display Face: Bungee or Monoton. Reserved strictly for large hero statements and section titles.
* Body / UI Face: Space Grotesk (weights: 400, 500, 700). Handles primary narrative, case studies, and responsive UI elements.
* Telemetry & Code Face: JetBrains Mono. Powers technical tags, code blocks, terminal logs, and system labels.
* Micro-Display Accent: Silkscreen (or 8-bit bitmap style equivalent). Used strictly for compact version chips, section numbering (e.g., `SEC_01 // 04`), and tiny 90s-era badge stamps.

### Scale Hierarchy
* Hero Headline: Bungee, `clamp(2.5rem, 5.5vw, 4.5rem)`, solid `--magenta` fill with a `2px` offset `--cyan` comic print shadow.
* Telemetry Headers: JetBrains Mono, `0.75rem`, uppercase, tracking `0.15em`, color `--muted-label`.
* Section Titles: Bungee, `clamp(1.75rem, 3vw, 2.25rem)`, solid `--paper` or `--magenta`.
* Body Paragraphs: Space Grotesk, `1rem`, line-height `1.6`, maximum line length `68ch`.
* Code / Badges: JetBrains Mono, `0.85rem`, crisp borders with uppercase lettering.

---

## 4. UI Components & Layout Patterns

### 4.1 HUD Header & Window Framing
* Layout: Fixed header anchored with a `3px solid var(--paper)` lower edge.
* Title Strip: Includes an operating-system style status label: `SYS.CORE // v2.2 [ONLINE]` alongside traditional navigation links.
* Active State Indicator: A small rotated sticker tag anchored adjacent to the current page link.

### 4.2 Chamfered Panel Architecture
* Geometry: Key panels (featured projects, terminal blocks) use angular corners:
  ```css
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  ```

- Border Emulation: Implemented using pseudo-elements to maintain the 2px hard outline along the angled boundary.

### 4.3 Technical Annotation & Sticker Badges

- Alternating Tilts: Tech tags utilize consistent, subtle rotations (`-1.5deg` and `+1.5deg`) rather than erratic angles to keep the visual line organized.

- Hover Motion: Straightens to `0deg` on hover with a `150ms ease-out` transition.

- Web 1.0 Stamp Badges: Footer and about areas feature micro-stamps (`88x31` pixel-ratio inspired) declaring system properties (e.g., `PURE_CSS // NO_BLOAT`).

### 4.4 Project Cards & UI Previews

- Window Frame Header: Cards feature a mini-window bar with 3 hard-edged action dots and a title string.

- Preview Clarity: Interface screenshots remain crisp and unfiltered by default to properly showcase software engineering and UI execution.

- Scanline Overlay: A gentle scanline filter (`--scanline-overlay`) covers the media container, clearing smoothly when hovered to reveal raw screenshots.

- Tactile Press: Offset hard shadows collapse to `0,0` with a matching `2px, 2px` element translation on click.

### 4.5 Tactical Ticker Banner

- Structure: Solid `--panel-black` background flanked by top and bottom diagonal caution striping (`repeating-linear-gradient(45deg, ...)`).

- Content: Monospaced marquee displaying active system logs, primary technical proficiencies, and repository deployment metrics.

---

## 5. Motion Catalog & Interaction Rules

| **Trigger**    | **Name**         | **Duration**     | **Implementation Behavior**                                              |
| -------------- | ---------------- | ---------------- | ------------------------------------------------------------------------ |
| Page Load      | `panel-slam`     | `380ms ease-out` | Panels scale from 1.05 to 1.0 with a crisp hard stop; staggered by 40ms. |
| Hover          | `sticker-align`  | `150ms ease-out` | Tilted badges rotate to `0deg`.                                          |
| Hover          | `scanline-clear` | `200ms linear`   | Media scanline layer drops opacity from 1.0 to 0.0.                      |
| Active / Click | `hard-press`     | `60ms linear`    | Element translates into its solid drop shadow; shadow offset zeroed out. |
| Continuous     | `beacon-pulse`   | `2s infinite`    | Singular acid-yellow pulse dot next to availability status.              |

## 6. Directory Structure

```text
portfolio/
├── index.html                 # App container and core semantic shell
├── DESIGN.md                  # This specification document
│
├── assets/
│   ├── icons/                 # Flat SVG comic/pixel marks
│   ├── images/                # Screenshots, project media, portrait
│   └── fonts/                 # Local fallbacks for display and mono fonts
│
├── css/
│   ├── tokens.css             # Colors, palettes, shadows, font imports
│   ├── base.css               # Typography scale, reset, body styling
│   ├── components.css         # Chamfered panels, sticker badges, window headers
│   └── animations.css         # Keyframes for slam, marquee, and beacon
│
└── js/
    ├── router.js              # Lightweight client-side page loader
    ├── theme.js               # Dark/light theme toggle and state persistence
    └── main.js                # Ticker controls and card interactions
```

## 7. Accessibility & Performance Guardrails

- Contrast Enforcement: High-chroma acid-yellow is restricted to status dots and isolated diagnostic counters. All primary informational text passes WCAG AAA contrast ratios against the dark canvas.

- Motion Preferences: `prefers-reduced-motion: reduce` completely bypasses `panel-slam` and the marquee loop, replacing them with instant layout loads and scrollable horizontal rows.

- Visual Clarity Guarantee: Interactive project screenshots never employ destructive halftone masking over core software UI demonstrations.

- Semantic Fallbacks: Chamfered layouts retain standard fallback rectangular boxes for older browsers lacking polygon clip-path support.

---

Would you like the corresponding starter code for tokens.css and components.css to begin building this?
