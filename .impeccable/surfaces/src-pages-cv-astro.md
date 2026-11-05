---
version: 1
slug: "src-pages-cv-astro"
primary_target: "src/pages/cv.astro"
related_targets: ["src/pages/en/cv.astro","src/components/CvPage.astro"]
---

# CV — /cv and /en/cv

Mode: Read. Audience: recruiters, prospective employers and clients. Job: understand Damian's experience and obtain a CV without login. Source: original Polish and English PDFs dated 2026-10-29; project summaries stay shared with the portfolio.

## Direction contract

THESIS: A readable career document with immediate access to its portable PDF. Keep substantive history on the page rather than making the route a download-only dead end.

OWN-WORLD: Inherit the portfolio's paper, soot, crimson, Anybody and Literata, existing masthead, timeline rules and control radius. No new visual identity or imagery.

STORY: Name and role, obtain the PDF or switch language, read experience, skills, selected work and education, then contact Damian.

FIRST VIEWPORT: Desktop identity and summary on the left, document controls on the right. Mobile identity, document controls, then summary. Primary action: download; secondary actions: open PDF and alternate language.

FORM: Extend the existing CV timeline; no concept roll for this scoped extension. Static HTML and same-origin PDF links work without JavaScript. Responsive single column and print stylesheet.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Validation: PL/EN, desktop/tablet/mobile including 320px, light/dark, native download, no JavaScript, print, keyboard focus. Basic PDF format and localized content validation fail the build. Original PDFs include their contact details; no Drive credentials or private working documents ship.
