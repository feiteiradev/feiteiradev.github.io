---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: ["src/app/[locale]/[page]/PageBody.tsx","src/app/[locale]/apps"]
---

# Surface brief: whole site (home as primary)

Scope: every route (home, /trabalho, /servicos, /curriculo, /apps and app pages, /contacto, /privacidade, concept demo frame). Mode: Persuade on home and services; Read on app support/privacy and résumé; the app pages wear each app's brand inside the site shell.

Audience and action: recruiter reaches résumé or work in one click; client reaches services or contact in one click; app user reaches a person. Proof is the work itself (Crudo, Feit-Y, Aircall, EngineAI) in the first viewport. Must not look like a template or feel cold.

## Direction contract

THESIS: The site is one Swiss poster set on a strict 12-column grid: the work is a numbered index, one accent does all the signalling. It refuses the dev-portfolio default of big-name-over-gradient plus a card grid of projects.

OWN-WORLD: Cool paper ground (#F2F3F0; dark #101113), ink #0E0F0D, one ultramarine accent (#2B47F5; dark #8392FF) used only for index numerals, links and the active state. Schibsted Grotesk for everything, tabular figures for numbers and dates, no mono. Hairline rules, square corners, no shadows, no pills. Every page hangs from one vertical axis rule; section labels hang left of it, content right. Each work item carries a provenance line (client, years, role, stack) and one dated status mark. The living mesh + dot field recoloured in accent tints, drifting, parting slightly toward the cursor, still under reduced motion.

STORY: In one viewport the visitor sees who (Pedro Feiteira, software engineer), proof (four numbered shipped things with status), and two numbered doors. They believe it because the work is named and dated, and they act by taking their door.

FIRST VIEWPORT (portrait-led split, Pedro's choice 2026-09-18): 12 columns. Columns 1–3, left of the axis: a tall colour portrait cropped hard to the grid, stretching the full height of the right column, no rounding or frame. Columns 4–12, hung from the axis: the name at poster scale, the role and place as one line under it, a single short statement (one line of promise, not the long paragraph), then the two doors 05 "Está a recrutar?" and 06 "Precisa de algo construído?" as ruled cells. Below, spanning all 12 columns: the work as a four-cell strip, 01 Crudo, 02 Feit-Y, 03 Aircall, 04 EngineAI, three columns each, accent numerals at display size over name, provenance and a dated status mark. Phones: name, portrait, statement, doors, then the work cells stacked.

FORM: International Typographic Style grid, position 4 of 7 on the ordered list, seed fbfa5041. Raises carried: dated status marks (passport), provenance seams (quilt), scale courage (tropicália), one living surface (ebru), one axis (Versailles). Signature interaction: hovering or focusing an index row, door, service row or document link draws its top rule in the accent from the axis side, nudges its numeral or arrow, and tints the row; the numeral does not slide onto the axis rule, because the index sits five columns right of the axis and a numeral crossing the statement to reach it would collide with the copy. Motion is one orchestrated staggered set of first-viewport modules on load (CSS, so nothing waits on JavaScript), nothing else animates.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
