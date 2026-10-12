---
name: Damian Ułaś — portfolio
description: A stack of colored sheets, one per product, set in a typeface that breathes.
colors:
  blueprint-cobalt: "#2f45e0"
  blueprint-cobalt-night: "#8d9cff"
  morning-haze-paper: "#dce2e8"
  morning-haze-paper-deep: "#c9d1db"
  deep-harbour-ink: "#16223a"
  deep-harbour-ink-soft: "#4e5b72"
  survey-rule: "#b3bdca"
  night-paper: "#131c2e"
  night-paper-deep: "#1f2a40"
  night-ink-soft: "#97a3b7"
  night-rule: "#33405a"
  sheet-ink: "#f4f6ff"
  sheet-ink-soft: "#d3d9ff"
  signal-green: "#5fe3a1"
  placemates-ember: "#e8834a"
  tutor-brick: "#d4533d"
  widget-amber: "#e3a21a"
  shop-slate: "#7d8aa5"
  hero-veil: "#0b1233"
  stack-backdrop: "#060915"
typography:
  display:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(4rem, 16vw, 11rem)"
    fontWeight: 300
    lineHeight: 0.9
    fontVariation: "'wdth' 150"
  headline:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 3.55rem)"
    fontWeight: 300
    lineHeight: 1.02
    fontVariation: "'wdth' 140"
  title:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  subhead:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.05
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.38
  label:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "'wdth' 90"
rounded:
  hairline: "2px"
  swatch: "0.2rem"
  chip-square: "0.4rem"
  screen: "0.75rem"
  tile: "1.25rem"
  sheet: "1.5rem"
  sheet-wide: "2rem"
  pill: "999px"
spacing:
  sheet-gap: "clamp(0.5rem, 1.2vw, 1rem)"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  tile-pad: "clamp(1.25rem, 3vw, 2.25rem)"
  card-pad: "clamp(1.25rem, 4.5vw, 4.5rem)"
  block: "clamp(3rem, 9vh, 6.5rem)"
components:
  button-pill-on-sheet:
    backgroundColor: "{colors.sheet-ink}"
    textColor: "{colors.blueprint-cobalt}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  button-pill-on-sheet-hover:
    backgroundColor: "#ffffff"
  chip:
    textColor: "{colors.deep-harbour-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.2rem 0.7rem"
  sheet:
    backgroundColor: "{colors.blueprint-cobalt}"
    textColor: "{colors.sheet-ink}"
    rounded: "{rounded.sheet}"
  tile:
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  case-card:
    rounded: "{rounded.sheet-wide}"
    padding: "{spacing.card-pad}"
---

# Design System: Damian Ułaś — portfolio

## Overview

**Creative North Star: "The Sheet Stack"**

The page is a stack of sheets. The hero is the first one, a full-bleed cobalt sheet that stays pinned, shrinks and dims as the next sheet slides over it with rounded top corners and a soft shadow. Every product gets a sheet in its own colors, taken straight from its screenshots, and on wide, tall screens those cards stack sticky on top of each other as you scroll. Between the sheets lies cool, slightly blue paper and dark navy ink: a drafting table the products are laid on.

The second voice is the typeface. Anybody is a variable face with a width axis from 50% to 150%, and the system uses that axis as motion: the hero name swells under a typographic lens that follows the cursor (or the scroll on touch), section titles grow from narrow and light to wide and heavy as they enter, interest tiles widen their word on hover. Literata, an optical-size serif, carries the reading text so the expressive display never has to.

Components are tactile and confident: solid pill buttons, big rounded sheets, clear states, real device frames around real screenshots. Density is low; each section earns a full screen. Motion is scroll-driven CSS wherever possible, only transform and opacity animate in the heavy paths, and everything collapses gracefully under `prefers-reduced-motion`.

**Key Characteristics:**
- Rounded sheets stacked in scroll order; the hero is the first sheet.
- One sheet, one palette: products keep their own colors; cobalt belongs to the site.
- Width axis of Anybody used as a motion and hierarchy tool.
- Cool paper and navy ink in light mode, inverted navy night in dark mode; sheets keep fixed colors in both.
- Real screenshots in device frames, never illustrations of products.
- Thin-stroke line drawings and technical-grid plates for diagrams.

## Colors

A cool drafting-table neutral set (haze paper, harbour ink) with one saturated site accent, Blueprint Cobalt, plus a palette borrowed product by product.

### Primary
- **Blueprint Cobalt**: the site's own color. Links, focus rings, nav underline, the hero sheet, the Contact sheet, the Claudius card and the Claudius process tile. In dark mode links and focus shift to **Blueprint Cobalt Night**, while cobalt sheets stay cobalt.

### Secondary
- **Sheet Ink** and **Sheet Ink Soft**: text on cobalt sheets (hero, Contact, Claudius). Fixed in both themes. Sheet Ink is also the fill of pill buttons on cobalt, with the label in cobalt.
- **Signal Green**: only the pulsing "Otwarty na nowe projekty" status dot in the hero.

### Tertiary (product palette)
- **PlaceMates Ember**, **Tutor Brick**, **Widget Amber**, **Shop Slate**: each product's accent, sampled from its screenshots. They tint that product's card (background, glow, accent, link underline) and reappear as the column color in the skills matrix, so a column reads as a strip of its project card. Each card carries its own full local set (`--bg`, `--glow`, `--ink`, `--soft`, `--accent`, `--line`, `--shadow`) defined in the Projects component.
- The widget tiles reuse the widget's own screenshot palette: near-black ground (#0c0c0c), light gray text (#efefef, secondary #b4b4b4) and Widget Amber underlines.
- The "Po godzinach" tiles follow the same idea with subject palettes: forest green for cycling, deep brick (#a93c25) for games, near-black with green and red for markets, off-white with navy ink for anime and manga.

### Neutral
- **Morning Haze Paper**: page background in light mode. **Morning Haze Paper Deep**: secondary surface.
- **Deep Harbour Ink**: body text and headings; also the background of the inverted AI sheet. **Deep Harbour Ink Soft**: intros, metadata, secondary text.
- **Survey Rule**: hairline dividers and table group rules.
- **Night Paper**, **Night Paper Deep**, **Night Ink Soft**, **Night Rule**: the dark theme counterparts; ink becomes Morning Haze Paper.

### Named Rules
**The Borrowed Palette Rule.** A product sheet is painted in that product's colors, sampled from its own screenshots. Cobalt never tints another product's card, and a product color never leaks outside its card except as its marker in the skills matrix.

**The AA Floor Rule.** Secondary text on a colored sheet stays at 4.5:1 or better, and dimmed states never drop large text below 3:1. Darken the sheet a step before you wash out its text.

**The Fixed Sheet Rule.** Colored sheets (hero, Contact, product cards, interest tiles) keep the same colors in light and dark mode. Only the paper, ink and rule between them flip with the theme.

## Typography

**Display Font:** Anybody Variable (with Arial Narrow, sans-serif)
**Body Font:** Literata Variable, optical sizing on (with Georgia, serif)

**Character:** A wide-ranging, slightly mechanical grotesque that can go from condensed whisper to extended shout, paired with a warm bookish serif that keeps long text calm. The display does the talking, the serif does the explaining.

### Hierarchy
- **Display** (300, clamp(4rem, 16vw, 11rem), line-height 0.9, width 150%): subpage titles (Blog, CV). The hero name is its own fitted case: two lines sized by script to fill the sheet, weight 640 at width 100 at rest, ranging 280–860 weight and 50–150 width under the lens.
- **Kinetic section title** (700, up to 9rem, fitted to the column, width 150%): section headings that animate from width 55% / weight 250 to width 150% / weight 700 as they enter; never wrap.
- **Headline** (300, clamp(2.6rem, 7vw, 3.55rem), width 105% on mobile, 140% from 48rem): static block titles.
- **Subhead** (700, clamp(1.5rem, 3.2vw, 2.4rem), width 112–115%): bento tile titles, Claudius track step names, the hero role line; 2.4rem is its ceiling everywhere.
- **Title** (800, up to 6rem, width 112%, letter-spacing −0.01em): product names on case cards; the hero role line uses 700 at width 112%.
- **Body** (400, 1.125rem, line-height 1.6, max 36em): all reading text, Literata. **Lead** (1.5rem, line-height 1.38) for card summaries and the AI section lead.
- **Label** (600, 0.85–1.05rem, width 85–95%): nav, chips, metadata, buttons, table headers, all in Anybody.

Type scale is a perfect fourth (1.333) from 18 px: 0.8125, 1.125, 1.5, 2, ~2.67, ~3.55rem.

### Named Rules
**The Width Is Voice Rule.** Hierarchy and emphasis come from the width axis as much as from size or weight: narrow for quiet metadata (85–95%), extended for headlines (110–150%). Animate width only where motion means something (lens, entry, hover, active step).

**The Fitted Line Rule.** Hero name, kinetic titles, the contact email and interest words are sized to fill their container and never wrap; their measured `--fit` width in em drives the size. Changing the word means re-measuring.

**The Serif Reads Rule.** Literata is only for reading text. Labels, actions, numbers and names are always Anybody.

## Layout

Content sits in a centered column (`.wrap`, max 88rem, gutter clamp(1rem, 4vw, 3.5rem)). Sheets break out of it to almost the full window: a margin of the sheet gap (clamp(0.5rem, 1.2vw, 1rem)) from the edges, capped at 90rem so a sheet's inner content lines up with section titles on wide screens. The hero sheet alone ignores the cap and fills the first viewport (100svh minus the sheet gaps), with the site header laid on top of it.

Sections are generous (block padding clamp(3rem, 9vh, 6.5rem)); each tends to own a screen. Product cards stack in a column with a sheet-gap gap; from 64rem wide and 37.5rem tall they become sticky (top offset grows 0.85rem per card) at near-viewport height with 14vh between them. Below 50rem of height the cards switch to a denser variant (smaller name, tighter padding, the long detail paragraph hidden) so the text always fits inside the card. At 64rem cards switch to a header over a 5fr/7fr text/stage split that alternates sides. Bentos (AI work, interests) use 7fr/5fr or a 12-column grid with mirrored rows from 60rem. Key breakpoints: 30rem, 40rem, 48rem, 52rem, 60rem, 64rem.

**The Content Line Rule.** Whatever breaks out to the edges, its text starts on the same line as the section titles.

## Elevation & Depth

Depth is physical: sheets lie on top of each other. Shadows are soft and directional (cast upward from a sheet onto the one beneath), used to sell the stack, not to lift UI. The pinned hero recedes (scale 0.92) and dims under a navy veil while a near-black backdrop fades in behind it, so the incoming sheet's corners stay visible in dark mode too. Inside cards, screenshots float with a hairline ring and a deep shadow tinted in the product's shadow color. Elsewhere surfaces are flat and separated by color, not shadow. The veil is **Hero Veil** and the backdrop **Stack Backdrop**; both appear only in this stack transition.

### Shadow Vocabulary
- **Sheet over sheet** (`box-shadow: 0 -1.25rem 3rem -1.5rem rgb(0 0 0 / 0.45)`): the sheet that slides over the hero.
- **Card lift** (`box-shadow: 0 -0.5rem 2.5rem -0.75rem var(--shadow)`): product cards in the sticky stack.
- **Screen float** (`box-shadow: 0 0 0 1px var(--line), 0 2rem 3.5rem -1.25rem var(--shadow)`): screenshots in cards.

### Named Rules
**The Shadow Points Up Rule.** Stack shadows are cast upward onto the sheet below. A shadow means "this sheet is on top", never "this button is clickable".

## Shapes

One family of soft rectangles, scaled by size: sheets and cards 1.5rem (2rem from 64rem), bento tiles 1.25rem, screenshots 0.75rem, matrix bars 0.4rem, tiny legend swatches 0.2rem, and everything interactive and small (buttons, chips, hero metadata) a full pill. Phones are drawn as real devices with a thick near-black bezel. Line drawings in interest tiles use a 0.9 stroke with round caps and sit under the text; most bleed off the tile edge as a fragment, but the gamepad is drawn whole (grips, d-pad, sticks, buttons), tilted slightly in the bottom-right corner beside the text, because a cropped pad stops reading as a pad. Diagrams sit on a "plate": a faint 0.75rem technical grid with a hairline border, all derived from `currentColor`.

**The Pill Means Press Rule.** Full pill shape is reserved for small interactive or metadata elements; large surfaces never go pill, and buttons never go square.

## Components

### Buttons
Tactile and confident: a solid pill paired with a plain underlined link.
- **Shape:** full pill (999px).
- **Primary:** on a colored sheet the pill is filled with the sheet's ink and labelled in the sheet's background color (cobalt on Sheet Ink in hero and Contact; card ink on card bg in product cards). Anybody 600, padding 0.6rem 1.1rem.
- **Hover / Active:** hover brightens to white (or the card's accent), and the cobalt dock inverts to white with a cobalt label; active nudges down 1px. Every link and button is at least 44px tall. Focus is a 3px outline in the local ink or accent, offset 3px.
- **Secondary:** a text link in the same label face with a 2px underline, colored by the local accent.

### Chips
- **Style:** hairline border in the local line color, pill, Anybody 0.85rem at width 92%, no fill. Used for tech stacks.
- **Metadata variant:** the hero rail pairs a soft key (`dt`, width 90%) with a bold value in one bordered pill.

### Cards / Containers
- **Product case card:** full-bleed sheet in the product's palette, radius 1.5rem / 2rem, padding clamp(1.25rem, 4.5vw, 4.5rem), radial product-colored glow behind the stage, header with a hairline rule, device-framed screenshots, traffic-light state list, chips, links.
- **Bento tile:** radius 1.25rem, padding clamp(1.25rem, 3vw, 2.25rem), solid themed background, no shadow. A tile on its own sheet color is separated by a 1px rule instead of a fill. Offer tiles carry an "outcome" line in the display face (what stays with the team) followed by a smaller "proof" line naming the tool or habit that backs the offer.
- **Inverted sheet:** the AI section swaps paper and ink so it stands apart in both themes.

### Navigation
Anybody 1rem at width 90% (78% under 30rem), ink-colored links with a 44px tall touch target and a 2px cobalt underline drawn just under the label on hover and for the current page. The name on the left in Anybody 800 at width 115%. Blog and CV appear only once they have content. On the home page the header sits on the hero sheet in Sheet Ink and fades up as you scroll.

### Floating dock
After the visitor scrolls past the hero, two cobalt controls with a 2px Sheet Ink ring sit fixed in the bottom-right thumb zone: a round 48px "back to top" button with a drawn arrow, and a "Napisz do mnie" pill that jumps to Contact and disappears while Contact is on screen (the arrow stays to the very end). The dock hides while scrolling down and returns on scroll up, so it never sits over text being read. Hover inverts to Sheet Ink with a cobalt glyph. It fades and rises in 0.3s, without motion under reduced motion, and stays hidden without script.

### Contact paths
Right under the intro, before the big email, the Contact sheet splits into two paths: "Rekrutujesz?" and "Masz projekt albo zespół do wdrożenia agentów?", each a subhead question, one line of soft text and a filled pill mail link with a prefilled subject. The decision comes first; the email, an outlined "Kopiuj adres" pill and the secondary links follow. Mail subjects are shared site-wide (`subjects` in `profile.ts`), so the same intent always arrives with the same subject.

### Collaboration sheet
Right after Projects, a sheet in Morning Haze Paper Deep (it stands apart from the page like every sheet, without competing with the cobalt hero and Contact that bracket the page). Clients lead: a large display question "Masz pomysł na aplikację?" (step-4, 800, width 115%), a lead-size line on what gets built with PlaceMates as proof, a cobalt pill and an underlined link. Recruiters follow in a narrower column (8fr/4fr from 60rem) behind a 1px rule: a subhead question, one soft line, two underlined links. It sits one sheet gap above the next sheet.

### Typographic lens (signature)
The hero name, every letter absolutely positioned and moved by transform, reacts to the cursor or scroll: letters near the focus go wide and heavy, far ones narrow and light, quantised to 100 pre-measured levels so nothing shifts layout. The axis values are shown live in a hero chip.

### Claudius track (signature)
A vertical rail of process steps; the active step's rail fills over time while its name goes from width 70% / weight 400 to width 135% / weight 800. Without script every step is plainly readable.

### Interest tile (signature)
A themed tile with a fitted condensed word (width 75%) that widens to 150% on hover (or at mid-screen on touch) and a thin line drawing that draws itself on entry and moves its subject on hover (wheels turn, buttons press, panels pop).

## Do's and Don'ts

### Do:
- **Do** give every new product its own sheet colored from its own screenshots, and add its accent to the skills matrix tone map.
- **Do** put large surfaces on rounded sheets (1.5rem, 2rem from 64rem) that reach to the sheet gap from the window edge while their content stays on the title line.
- **Do** use Anybody's width axis for hierarchy and meaningful motion; keep Literata for reading text at 1.125rem / 1.6, max 36em.
- **Do** drive motion with scroll timelines in CSS, animate only transform and opacity on heavy paths, and give every effect a `prefers-reduced-motion` fallback and a readable no-script state.
- **Do** show real screenshots in device frames.
- **Do** keep colored sheets identical in light and dark mode.

### Don't:
- **Don't** add a headshot or a placeholder portrait.
- **Don't** use cobalt inside another product's card, or a product color outside its card and its matrix column.
- **Don't** use shadows as button affordances or on flat bento tiles.
- **Don't** let fitted display lines wrap; re-measure `--fit` when the text changes.
- **Don't** set labels, buttons, numbers or names in Literata.
- **Don't** introduce square buttons or pill-shaped large surfaces.
