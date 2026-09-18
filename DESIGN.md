---
name: Pedro Feiteira
description: One Swiss poster on a strict 12-column grid. Cool paper, ink, and one ultramarine accent that does all the signalling.
colors:
  ultramarine: "#2b47f5"
  on-ultramarine: "#ffffff"
  cool-paper: "#f2f3f0"
  sheet-paper: "#f7f8f5"
  ink: "#0e0f0d"
  stone-wash: "#e4e6e0"
  graphite: "#565b53"
  hairline-grey: "#d3d6cf"
  field-edge: "#bfc3ba"
  signal-red: "#c2361f"
  mesh-periwinkle: "#7f93ff"
  mesh-mist: "#b9c3cf"
  night-ultramarine: "#8392ff"
  on-night-ultramarine: "#0b0c12"
  night-paper: "#101113"
  night-sheet: "#16171a"
  night-ink: "#ecede9"
  night-stone: "#1e2024"
  night-graphite: "#9da297"
  night-hairline: "#2a2d31"
  night-field-edge: "#3a3d42"
  night-signal-red: "#e5664f"
  crudo-terracotta: "#9e5328"
  crudo-mark: "#c9713d"
  crudo-cream: "#f3ece1"
  crudo-sheet: "#fbf7f0"
  crudo-ink: "#2b2723"
  crudo-taupe: "#6e665d"
  crudo-hairline: "#dccfbe"
  feity-moss: "#4a6b2a"
  feity-sage-paper: "#edefe7"
  feity-ink: "#141810"
  feity-lichen: "#4c5547"
  feity-hairline: "#cdd3c4"
  feity-lime: "#bcd292"
  feity-night: "#0f130d"
  feity-night-sheet: "#1b211a"
  feity-night-ink: "#f1f4ec"
  feity-night-lichen: "#a7afa0"
typography:
  display:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 1rem + 7.6vw, 9.5rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  numeral:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "clamp(3rem, 1.25rem + 3vw, 5rem)"
    fontWeight: 500
    lineHeight: 0.8
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  item:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "kern, liga"
  meta:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  status:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  crudo-display:
    fontFamily: "General Sans, Schibsted Grotesk, sans-serif"
    fontSize: "6rem"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  feity-display:
    fontFamily: "Outfit, Schibsted Grotesk, sans-serif"
    fontSize: "6rem"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  feity-figures:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  none: "0px"
  app-icon: "22%"
spacing:
  frame-sm: "16px"
  frame-md: "24px"
  frame-lg: "40px"
  gutter: "16px"
  gutter-lg: "24px"
  axis-inset: "32px"
  row-tight: "16px"
  row: "24px"
  row-loose: "32px"
  block: "64px"
  block-lg: "96px"
  frame-max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.ultramarine}"
    textColor: "{colors.on-ultramarine}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
    typography: "{typography.meta}"
  cta-primary:
    backgroundColor: "{colors.ultramarine}"
    textColor: "{colors.on-ultramarine}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
    typography: "{typography.lead}"
  button-outline:
    backgroundColor: "{colors.cool-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  index-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 0"
    typography: "{typography.item}"
  index-row-numeral:
    textColor: "{colors.ultramarine}"
    typography: "{typography.numeral}"
  door:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px 0"
    typography: "{typography.title}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 12px"
    height: "44px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.ultramarine}"
  status-mark:
    size: "8px"
    rounded: "{rounded.none}"
---

# Design System: Pedro Feiteira

## Overview

**Creative North Star: "The Numbered Poster"**

The site is one International Typographic Style poster, set on a strict 12-column grid and hung from a single vertical axis. The home opens as a portrait-led split: a tall colour portrait cropped to the three columns left of the axis, the name at poster scale and one line of promise right of it, the two ways in as numbered ruled cells, and the work as a four-cell numbered strip across the bottom of the first viewport. Everything is ruled, square, and flat: hairlines do the structural work that cards and shadows do elsewhere.

Colour is almost absent on purpose. Cool paper and ink carry the page; one ultramarine does all the signalling, so a visitor's eye goes to numerals, links, the active state and the primary action and nowhere else. Behind every page runs one living surface that answers the visitor: three accent-tinted mesh fields drift under an interactive dot grid; the dots part around the pointer, swell and turn ultramarine, a tap or click sends a ripple through the grid, and a slow wave keeps it breathing when nobody is pointing. Under reduced motion it is the same grid, still. It keeps the poster from feeling cold without covering the work.

Inside the site's frame, each iOS app wears its own brand. The Crudo and Feit-Y bands re-point the same tokens to the app's palette and face, so the grid, axis, rules and interaction stay the site's while colour and type become the app's.

**Key Characteristics:**
- One vertical axis at the left edge of column 4 (lg and up); headings hang left of it, content sits right of it.
- Numbered, ruled index rows instead of cards.
- A single accent, used for signal only.
- Square corners and no shadows anywhere in the site's own world.
- One grotesk for everything, with tabular figures wherever numbers line up.
- One living background, one load choreography, one hover signature; nothing else moves.

## Colors

Cool paper, ink, and one ultramarine; every other colour is a neutral or belongs to an app band.

### Primary
- **Ultramarine** (`ultramarine`; dark: `night-ultramarine`): index numerals, door numbers, links, the active nav item, the hairline that draws on hover, the 4% row tint on hover, the primary filled action, the focus ring, text selection and the caret. White text (`on-ultramarine`) sits on it in light mode; near-black (`on-night-ultramarine`) in dark.

### Neutral
- **Cool Paper** (`cool-paper`; dark: `night-paper`): the page ground under the mesh.
- **Sheet Paper** (`sheet-paper`; dark: `night-sheet`): the one raised surface, the résumé sheet and popovers.
- **Ink** (`ink`; dark: `night-ink`): all text and the rule colour. Hairlines are ink at 15% opacity; the door rules are ink at full strength, 2px.
- **Graphite** (`graphite`; dark: `night-graphite`): secondary copy, provenance lines, captions, dates.
- **Stone Wash** (`stone-wash`; dark: `night-stone`): the muted/secondary fill behind hover states in shadcn primitives.
- **Hairline Grey** and **Field Edge** (`hairline-grey`, `field-edge`; dark: `night-hairline`, `night-field-edge`): default borders and form-field strokes.
- **Signal Red** (`signal-red`; dark: `night-signal-red`): form errors only.
- **Mesh Periwinkle** and **Mesh Mist** (`mesh-periwinkle`, `mesh-mist`): the background's second and third fields; the first is ultramarine itself. Dark mode swaps them for dimmed slate-blues (#4a5690, #5b6386, #2a2d35). Fields render at 7-25% opacity under a 110px blur and never appear as solid colour.

### App band: Crudo (light-only)
- **Crudo Terracotta** (`crudo-terracotta`): the band's accent (links, active rail item, primary action), with white text on it.
- **Crudo Mark** (`crudo-mark`): the status-mark stroke and focus ring; brighter than the terracotta, so it never carries text.
- **Crudo Cream / Sheet / Ink / Taupe / Hairline** (`crudo-cream`, `crudo-sheet`, `crudo-ink`, `crudo-taupe`, `crudo-hairline`): ground, raised surface, text and rule, secondary copy, borders. The band sets `color-scheme: light` and ignores the site's dark mode.

### App band: Feit-Y (light and dark)
- **Feit-Y Moss** (`feity-moss`; dark: `feity-lime`): the band's accent, mark and focus ring. Light text (#f1f4ec) on moss; near-black (#12160f) on lime.
- **Sage Paper / Ink / Lichen / Hairline** (`feity-sage-paper`, `feity-ink`, `feity-lichen`, `feity-hairline`): ground, text and rule, secondary copy, borders. The raised surface is pure white.
- **Feit-Y Night / Night Sheet / Night Ink / Night Lichen** (`feity-night`, `feity-night-sheet`, `feity-night-ink`, `feity-night-lichen`): the dark band, following the visitor's theme as the app does.

### Named Rules
**The One Signal Rule.** Ultramarine means "this is a number, a way in, or where you are". It never fills a section, a background or a decorative shape; the mesh and the dots the visitor lights up are the only places it appears in the background.

**The Band Re-point Rule.** An app band changes colour and face by re-pointing the site's own tokens on the band element (`--background`, `--foreground`, `--primary`, `--rule`, `--border`, `--ring`, `--brand-mark`). It never introduces new layout, radii or shadows; grid, axis, rules and hover stay the site's.

## Typography

**Display Font:** Schibsted Grotesk (with sans-serif)
**Body Font:** Schibsted Grotesk (with sans-serif)
**Label/Mono Font:** none in the site's world. Geist Mono is loaded only for the three concept demos, which carry their own brands.

**Character:** One grotesk carries the whole site, from a 9.5rem name to 13px status lines. Hierarchy comes from size, weight and tight negative tracking, never from a second family.

### Hierarchy
- **Display** (`display`): the name only, in two lines, each line revealed through its own box on load.
- **Numeral** (`numeral`): the home index numbers 01-04, in ultramarine, co-focal with the name.
- **Headline** (`headline`, 2.25rem below 1024px): the closing line on home and the services subtitle; measure 20-26ch.
- **Statement** (`statement`, 1.875rem below 1024px): the lead sentence of document pages (privacy, app support/privacy); measure 24ch.
- **Title** (`title`): block headings on the left of the axis, rail titles, door titles (up to 1.875rem at lg).
- **Item** (`item`): index row names, service row titles, document section headings.
- **Lead** (`lead`): intros and the hero statement; 46-60ch.
- **Body** (`body`): running text; long reading capped at 65ch.
- **Meta** (`meta`): provenance lines, captions, dates, footer, nav (15px in the header).
- **Status** (`status`): the dated status line beside an 8px square mark.

### App band faces
- **Crudo**: General Sans (self-hosted variable, 200-700) for everything in the band (`crudo-display`, 3.75rem below 1024px).
- **Feit-Y**: Outfit for everything (`feity-display`, 3.75rem below 1024px), with IBM Plex Mono for tabular figures such as the "last updated" date (`feity-figures`).

### Named Rules
**The Tabular Figures Rule.** Any number that sits in a column or a date line (index numerals, door numbers, periods, "updated" dates, the footer year) is set with tabular figures.

**The No Label Rule.** Sections are named by a sentence-case heading left of the axis, never by a small uppercase, letter-spaced label above the content.

## Layout

A centred frame (max 1440px) with side padding of 16px, 24px from 640px, and 40px from 1024px. Inside it, a grid of 4 columns (gutter 16px), 8 from 768px, and 12 from 1024px (gutter 24px).

At 1024px and up, the axis is the left edge of column 4. A faint ink rule (15%) is drawn there once, fixed behind the whole page; opaque app bands redraw it on their content column. Every block puts its heading in columns 1-3 (sticky at 96px from the top) and its content in columns 4-12, inset 32px from the axis. The header's nav starts on the axis too. Below 1024px the heading stacks above the content and the axis disappears.

Blocks are separated by a 15% top hairline and 64px vertical padding (96px at lg). Rows inside them are 16-32px tall in padding, separated only by hairlines. The home hero is a portrait-led split at lg: the portrait spans columns 1-3 and stretches to the height of the column beside it (name, role line, one-line statement, doors in columns 4-12); the work strip spans all 12 columns below, four cells of three columns each, numeral beside name. It fits the first viewport at 1280x800 and up. On phones the order is name, portrait (4:3), statement, doors, then the work cells.

**The One Axis Rule.** Nothing crosses the axis at lg: a heading is either left of it or the content is right of it. A row that needs to span starts on the axis, not before it.

## Elevation & Depth

The site's own world is flat. There is no shadow vocabulary: depth comes from hairlines, from the one slightly lighter sheet surface (the résumé), and from the translucent sticky header (paper at 80% with a medium backdrop blur) and footer (60%, small blur) through which the living background shows. The mesh and dot field sit at the very back and are the only atmospheric depth.

**The Rules Not Shadows Rule.** Structure is a 1px ink hairline at 15%, or a 2px full-ink rule for the primary doors. If a surface seems to need a shadow, it needs a rule.

## Shapes

Every corner in the site's world is square: the whole radius scale collapses to 0, so shadcn primitives render square without edits. Status marks are 8px squares (filled for live, outlined for pending, 70% ink for done). The portrait is a 3:4 crop filling its grid module, square-cornered, in colour.

Round forms come only from outside the site's grammar and are kept: app icons wear the iOS superellipse approximation (22% radius) because that is the icon's own shape, and the background's blurred mesh fields are soft discs that never read as shapes.

## Components

### Buttons
Few and blunt: a square block of accent with a short verb and an arrow.
- **Shape:** square (0px).
- **Primary:** ultramarine fill, white text, 44px tall with 20px sides (`button-primary`); the large call to action on services and app support is 16px by 24px at 18px text (`cta-primary`), with a 20px north-east arrow at 1.5 stroke.
- **Hover / Focus:** opacity to 90% over the default transition; focus shows the global 2px ring-coloured outline offset 3px (shadcn primitives add a 3px ring at 50%).
- **Outline:** 1px border (field edge, or ink at 40% on app pages) on paper; hover shifts border and text to the accent.

### Index rows (signature)
The site's unit of content: home index, app list, service list, contact routes, app document links.
- **Structure:** a ruled row (15% ink top hairline) with a numeral or icon column, a name, a provenance line in meta, and a dated status line; an arrow sits at the end when the row leaves the page.
- **Hover / Focus:** the hairline draws in ultramarine from the axis side (scaleX 0 to 1, 600ms, cubic-bezier(0.16, 1, 0.3, 1)), the row tints ultramarine at 4%, and the numeral nudges 4px right or the arrow lifts 2px up-right and turns ultramarine.

### Doors
The two primary ways in from home, numbered 05 and 06 as the index continues. A 2px full-ink top rule that draws 2px thick in ultramarine on hover, a small ultramarine number, a title-size question, a graphite line, and a 24px arrow.

### Inputs / Fields
- **Style:** 1px field-edge stroke, transparent fill (input at 30% in dark), square, 44px tall, 12px sides; the select matches with a 16px chevron.
- **Focus:** border to the ring colour plus a 3px ring at 30-50%.
- **Error:** border and ring to signal red, with a red meta-size message below.

### Navigation
Header: 64px sticky bar, name at left in semibold 15px, links at 15px starting on the axis with 28px gaps; hover and current page turn ultramarine (no underline, no pill). Locale switcher and theme toggle sit at the far right as bare 16px icons at 1.5 stroke. On phones a menu button opens a full-width panel of 24px semibold links. App rails list the app's three pages as ruled rows with the current one in semibold ultramarine.

### Living background
Fixed behind every page: three accent-tinted fields (70, 60 and 55vw) drifting on 38-52s loops under a 110px blur with a spring lean of at most 24px toward the pointer, and over them the interactive dot grid (`DotField`, canvas 2D): 24px pitch, 1.2px ink dots at 13% plus a slow diagonal wave; within 240px of the pointer dots are pushed up to 22px outward, grow to about 4.5px and switch to ultramarine above 34% energy; a pointerdown sends a 90px-wide ripple outward at 0.8px/ms that fades over 1.8s. Under reduced motion the grid is drawn once and no listeners are attached.

### Load choreography
The only authored motion. First-viewport modules rise 14px and fade in over 900ms with cubic-bezier(0.16, 1, 0.3, 1), staggered 80-600ms; the name's two lines are revealed through their own boxes over 1100ms, 90ms apart. It is CSS, so nothing waits on JavaScript.

## Do's and Don'ts

### Do:
- **Do** hang every block from the axis: heading in columns 1-3, content from column 4 inset 32px.
- **Do** present lists of work, services, routes and documents as numbered or ruled index rows with provenance and a dated status mark.
- **Do** use ultramarine only for numerals, links, the active state, the primary action and focus.
- **Do** give interactive rows the hairline-draw hover: accent rule drawn from the axis side, 4% accent tint, and a small nudge on the numeral or arrow.
- **Do** set numbers that line up with tabular figures.
- **Do** keep app pages inside a brand band that re-points tokens only, with Crudo locked to light.

### Don't:
- **Don't** round corners or add shadows to anything in the site's own world; app icons keep their own superellipse.
- **Don't** add a second typeface to the site's world; app bands and concept demos bring their own.
- **Don't** put small uppercase letter-spaced labels or kickers above headings.
- **Don't** replace index rows with a card grid of projects.
- **Don't** animate anything beyond the background, the first-viewport rise and the hairline-draw hover.
- **Don't** lay type across the axis at lg.
