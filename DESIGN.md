---
name: Damian Ułaś — portfolio
description: Paper, soot and crimson; a stack of sheets set in a heavy, narrow typeface, signed with a keyboard.
colors:
  paper: "#e9e5de"
  paper-deep: "#ded8ce"
  ink: "#17171a"
  ink-soft: "#5a564f"
  rule: "#c4bdb1"
  crimson: "#be2337"
  crimson-deep: "#9e1c2e"
  crimson-soft: "#f7e4e6"
  night-paper: "#141416"
  night-paper-deep: "#1f1f23"
  night-ink: "#e9e5de"
  night-ink-soft: "#a8a39a"
  night-rule: "#36353b"
  night-crimson: "#ef5b6b"
  status-green: "#1e6b47"
  placemates-ember: "#e8834a"
  tutor-brick: "#d4533d"
  widget-amber: "#e3a21a"
  shop-slate: "#7d8aa5"
  stack-backdrop: "#0b0b0d"
typography:
  display:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(4rem, 16vw, 11rem)"
    fontWeight: 850
    lineHeight: 0.9
    fontVariation: "'wdth' 58"
  title:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.5rem, 10vw, 7rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 58"
  subhead:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.8rem)"
    fontWeight: 850
    lineHeight: 1
    fontVariation: "'wdth' 74"
  body:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "clamp(1.2rem, 1rem + 1vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.38
  body-small:
    fontFamily: "'Literata Variable', Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label-small:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "'wdth' 90"
  label-large:
    fontFamily: "'Anybody Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  control: "0.375rem"
  swatch: "0.2rem"
  bar: "0.4rem"
  screen: "0.75rem"
  tile: "1.25rem"
  sheet: "1.5rem"
  sheet-wide: "2rem"
spacing:
  sheet-gap: "clamp(0.5rem, 1.2vw, 1rem)"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  tile-pad: "clamp(1.25rem, 3vw, 2.25rem)"
  card-pad: "clamp(1.25rem, 4.5vw, 4.5rem)"
  block: "clamp(3rem, 9vh, 6.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.paper}"
    typography: "{typography.label-large}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.crimson-deep}"
  button-on-crimson:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.crimson}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.6rem 1.15rem"
  button-on-crimson-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-outline-on-sheet:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.5rem 1.1rem"
    height: "2.75rem"
  chip:
    textColor: "{colors.ink}"
    typography: "{typography.label-small}"
    rounded: "{rounded.control}"
    padding: "0.2rem 0.7rem"
  sheet-hero:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
  sheet-crimson:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
  tile:
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  case-card:
    rounded: "{rounded.sheet-wide}"
    padding: "{spacing.card-pad}"
  dock-button:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.paper}"
    typography: "{typography.label-large}"
    rounded: "{rounded.control}"
    padding: "0.6rem 1.25rem"
    height: "3rem"
  dock-button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Damian Ułaś — portfolio

## Overview

**Creative North Star: "Printed in Soot and Crimson"**

The site is a stack of printed sheets: mineral paper, soot-black ink and one crimson, the same three colors as the keyboard mark, the favicon, the share image and the avatar on his profiles. The hero is the first sheet, a pale paper sheet held in a narrow soot frame and carrying the site header; on desktop it stays pinned, shrinks and dims as the next sheet slides over it, on phones it simply scrolls away and shrinks a little. The page closes on a crimson Contact sheet, and subpages open on a crimson masthead. Every product keeps a sheet in its own colors, taken from its screenshots.

The voice is the typeface pushed to one end of its range: Anybody at width 58 and weight 850 for every name and title, a heavy, narrow, poster-like cut. Literata, an optical-size serif, carries the reading text so the display never has to explain anything. Width is still the motion axis: section titles fill with ink as they enter, the hero name breathes under a lens.

The identity carries a hand-inked manga layer: agents with terminal heads waiting with blank tickets by an empty chair with red headphones, in black ink and screentone on paper, red used only on the headphones. It appears three times: in the hero, as a waiting room on the 404 page, and as a night scene (one agent on a parapet above the city, "Człowiek w pętli.") in the share image. The drawings contain no text at all; speech bubble, note, captions and numbers are HTML or composed in the share-image template, so they can be translated and read aloud.

**Key Characteristics:**
- Paper, soot and crimson, everywhere the brand appears, in both themes on brand surfaces.
- A heavy, narrow display (Anybody 58 / 850) for names and titles; a serif for reading.
- Rounded sheets stacked in scroll order; the hero is a paper sheet in a soot frame, Contact and subpage mastheads are crimson.
- One sheet, one palette: products keep their own colors; crimson belongs to the site and to Claudius, his own tool.
- Buttons and chips are softly squared (`--radius-control`), one token away from pills.
- Real screenshots in device frames, never illustrations of products.

## Colors

Warm mineral paper and soot ink with one saturated accent, Crimson, plus a palette borrowed product by product.

### Primary
- **Crimson** (`--brand-crimson`, #be2337): the site's own color. Links and focus rings on paper, the active nav underline, the primary button, the Contact sheet, the subpage masthead, the Claudius card, its process tile in the AI section and the dock. Crimson on paper is 4.8:1, paper on crimson 4.8:1.
- **Crimson Deep** (#9e1c2e): hover and pressed state of crimson buttons.
- **Crimson Soft** (#f7e4e6): secondary text on crimson sheets (4.9:1).
- **Night Crimson** (#ef5b6b): the theme accent (`--accent`) in dark mode, because brand crimson on soot is only 3:1. Crimson sheets stay brand crimson.

### Neutral
- **Paper** (#e9e5de, `--brand-paper`): page background in light mode, the hero sheet in both themes, text on crimson and soot surfaces. **Paper Deep** (#ded8ce): secondary surface (Collaboration sheet).
- **Ink** (#17171a, `--brand-ink`, "sadza"): body text and headings; the hero frame and the inverted AI sheet. **Ink Soft** (#5a564f): intros, metadata, secondary text (5.8:1 on paper).
- **Rule** (#c4bdb1): hairlines and table rules.
- **Night Paper**, **Night Paper Deep**, **Night Ink Soft**, **Night Rule**: the dark theme counterparts; ink becomes Paper.
- **Status Green** (#1e6b47): only the pulsing availability dot in the hero.

### Tertiary (product palette)
- **PlaceMates Ember**, **Tutor Brick**, **Widget Amber**, **Shop Slate**: each product's accent, sampled from its screenshots. They tint that product's card and reappear as the column color in the skills matrix and as its edge in the closing stack. Claudius, Damian's own plugin, uses Crimson. Each card carries its full local set (`--bg`, `--glow`, `--ink`, `--soft`, `--accent`, `--line`, `--shadow`) in the Projects component; accents live in `src/data/tones.ts`.
- The widget card and tiles reuse the widget's own screenshot palette (near-black #0c0c0c, light gray text, Widget Amber).
- "Po godzinach" tiles keep subject palettes: forest green for cycling, deep brick for games, near-black with green and red for markets, off-white with navy for anime and manga, rosso corsa with Giallo Modena for Ferrari. Rosso corsa sits near Crimson on purpose: it is the subject's own red, inside its own tile.

### Named Rules
**The Three Inks Rule.** Brand surfaces (mark, favicon, share image, hero, Contact, masthead, dock) use only paper, soot and crimson. A fourth color on a brand surface needs a reason; the green status dot is the only one.

**The Borrowed Palette Rule.** A product sheet is painted in that product's colors. Crimson never tints another product's card, and a product color never leaves its card except as a marker: its matrix column and its stack edge.

**The AA Floor Rule.** Secondary text on a colored sheet stays at 4.5:1 or better, and dimmed large text never drops below 3:1 (the resting Claudius track steps are paper at 76% on crimson, about 3.2:1). Darken the sheet before washing out its text.

**The Fixed Sheet Rule.** Colored sheets (hero paper, crimson Contact and masthead, product cards, interest tiles) keep the same colors in light and dark mode. Only the page paper, ink and rules flip with the theme. The hero is paper in both themes: its frame is soot, so in dark mode it reads as a lit sheet on a dark desk.

## Typography

**Display Font:** Anybody Variable (with Anybody Fallback, Arial Narrow, sans-serif)
**Body Font:** Literata Variable, optical sizing on (with Literata Fallback, Georgia, serif)

The fallbacks are local Arial and Georgia with `size-adjust` (108% and 105%), so the swap barely moves a line. Code uses the system monospace.

**Character:** a heavy, narrow grotesque that reads like a printed poster, paired with a warm bookish serif. The display does the talking, the serif does the explaining. No third family: labels and metadata use Anybody at a narrower width instead of a monospace.

### Tokens
- `--tight` (58%) and `--heavy` (850): the display voice. Hero name, section titles, subpage titles, product names, the Collaboration question, the Contact email.
- `--tight-sub` (74%): subheads, one notch wider for legibility at 1.5–2.8rem (bento tiles, contact questions, matrix row names, CV and blog headings).

### Hierarchy
- **Hero name**: two lines, left-aligned, sized by script to the sheet (`--type-height`), at rest width 58 / weight 850; under the lens 50–115 width and 640–900 weight.
- **Hero statement**: the same voice in Crimson, two lines ("Buduję aplikacje. / Ogarniam agentów."), clamp(1.75rem, min(3.6vw, 6svh), 3.4rem); on short laptops (≤50rem tall) the hero tightens its spacing so the name stays at least 2.5× the statement; below 40rem the statement opens to width 68% at 2rem (`--step-2`), because the narrowest cut closes its counters at small sizes.
- **Kinetic section title** (850, up to 9rem, 5.5rem below 40rem, fitted to the column, width 58%): grows from width 50% / weight 200 to the display voice as it enters, like ink filling in; the start state is narrower than the end, so it never overflows. Size is `100cqi / (--fit × 1.05)` against the `.wrap` column (a size container), so titles inside sheets respect the sheet's own inset. The phone cap keeps all titles within 76–88px instead of swinging with word length. `--fit` is the width in em at the end state.
- **Title** (product names): 850 at width 58%, clamp(2.75rem, 12.5vw, 7rem), min(7.5rem, 6.6vw) from 64rem; about half the section title on phones, so the product never reads as a caption.
- **Subhead** (850, width 74%).
- **Body** (Literata 400, 1.125rem, line-height 1.6, max 33em). **Small** (`--step-small`, 1rem). **Lead** (`--lead`, clamp(1.2rem, 1rem + 1vw, 1.5rem)).
- **Label**, Anybody only: `--label-s` 0.85rem (chips, footer, matrix group headers in capitals), `--label` 0.95rem at width 85–95% (metadata, hero rail), `--label-l` 1.05rem weight 600 (actions, navigation, dock).

### Named Rules
**The One Voice Rule.** Every name and title is the same heavy, narrow cut, opening a little (width 68–74%) only where it is set small; hierarchy comes from size and color (ink or crimson), not from switching widths. Extended widths appear only in motion (lens, interest-tile hover, the active Claudius step).

**The Fitted Line Rule.** Hero name, kinetic titles, the contact email and interest words are sized to fill their container and never wrap; their measured `--fit` (em) drives the size. Changing the word or the axes means re-measuring.

**The Serif Reads Rule.** Literata is only for reading text. Labels, actions, numbers and names are always Anybody.

## Layout

Content sits in a centered column (`.wrap`, max 88rem, gutter clamp(1rem, 4vw, 3.5rem)). Sheets break out to almost the full window (a sheet gap from the edges, capped at 90rem so their content lines up with section titles). The hero fills the first viewport inside its soot frame: header on top, then the name, the crimson statement, a short intro, the two actions and a bottom rail (hairline, "Zamość · zdalnie" on the left, availability on the right). On a 375×667 phone the primary action stays in the first screen. From 64rem the hero is a 5fr/7fr grid: name, statement, intro and actions on the left, the 3:2 illustration on the right resting on the rail's hairline, its width capped at (100svh − 13rem) × 1.5 so the hero still fits the first screen. Below 64rem a separate low 3:1 composition sits between the actions and the rail, with a strip above it for the bubble and note; below 48rem it bleeds almost to the sheet edge. The body is a full-height column, so the footer sits at the bottom of short subpages.

Sections are generous (block padding clamp(3rem, 9vh, 6.5rem)). Product cards stack: from 64rem wide and 44rem tall they stick to the top with a growing offset, a denser variant between 44rem and 50rem of height; on phones and short windows they keep their natural height and slide over each other. Bentos use 7fr/5fr or a 12-column grid from 60rem. Key breakpoints: 30rem, 40rem, 48rem, 52rem, 60rem, 64rem.

**The Content Line Rule.** Whatever breaks out to the edges, its text starts on the same line as the section titles.

## Elevation & Depth

Depth is physical: sheets lie on top of each other. Shadows are soft and cast upward onto the sheet beneath. The pinned hero recedes (scale 0.92) and dims under a soot veil while a near-black backdrop (#0b0b0d) fades in behind it, so the incoming sheet's corners stay visible in both themes.

### Shadow Vocabulary
- **Sheet over sheet** (`0 -1.25rem 3rem -1.5rem rgb(0 0 0 / 0.45)`): the sheet that slides over the hero.
- **Card lift** (`0 -0.5rem 2.5rem -0.75rem var(--shadow)`): product cards in the sticky stack.
- **Edge lift** (`0 -0.3rem 0.7rem -0.4rem rgb(0 0 0 / 0.3)`): the closing stack edges.
- **Screen float** (`0 0 0 1px var(--line), 0 2rem 3.5rem -1.25rem var(--shadow)`): screenshots in cards.

**The Shadow Points Up Rule.** A shadow means "this sheet is on top", never "this button is clickable".

## Shapes

Soft rectangles, scaled by size: sheets and cards 1.5rem (2rem from 64rem), bento tiles 1.25rem, screenshots 0.75rem, matrix bars 0.4rem, swatches 0.2rem. Everything small and interactive (buttons, chips, the dock, the copy button) uses `--radius-control` (0.375rem), the softly squared key of the mark. Setting that token to 999px brings back pills site-wide. Phones are drawn as real devices with a thick near-black bezel. Interest-tile drawings use a 0.9 stroke with round caps.

## Components

### Buttons
- **Primary on paper:** crimson fill, paper label, `--radius-control`, Anybody 600; the hero version carries a drawn arrow that nudges right on hover. Hover deepens to Crimson Deep; active nudges down 1px.
- **Primary on crimson** (Contact paths): paper fill, crimson label; hover turns soot with a paper label.
- **Primary in product cards:** card ink fill with the card background as label; hover takes the card accent.
- **Secondary:** a text link in the label face with a 2px crimson (or local accent) underline.
- **Outline** ("Kopiuj adres"): transparent with a 2px ink ring, filling with ink on hover; both labels share one grid cell so the width never changes.
- Every link and button is at least 44px tall. Focus is a 3px outline in the local accent, offset 3px.

### Chips
Hairline border in the local line color, `--radius-control`, Anybody 0.85rem at width 92%, no fill. Used for tech stacks.

### Cards / Containers
- **Product case card:** full-bleed sheet in the product's palette, header with a hairline rule, device-framed screenshots, chips, links; the name rises from under its rule and the stage slides up on view timelines. Cards clip with `overflow: clip`, not `hidden`, so `view()` entrances measure against the window. The product glow sits where the stage leaves room (under the phone, near the bottom corner, mirrored on flipped cards) with a fainter pool under the text column. In dark mode every card gets a 1px ring in 24% of its own ink plus a faint top highlight, because dark cards (PlaceMates, widget) and the night page are almost the same lightness. PlaceMates carries the app's own wavy contour lines at 5.5% as its background texture.
- **Bento tile:** radius 1.25rem, solid themed background, no shadow; a tile on its own sheet color is separated by a 1px rule. Offer tiles carry an outcome line in the display face followed by a smaller proof line.
- **Inverted sheet:** the AI section swaps paper and ink (soot sheet in light mode, paper sheet in dark mode).

### Navigation
One `SiteHeader` everywhere: the keyboard mark and the wordmark "damianocode" (Anybody 850 at width 62%, 1.6rem) on the left, links on the right in Anybody at width 90% (78% under 30rem), 44px targets, a 2px crimson underline on hover and for the current page. Blog and CV appear only once they have content (Polish only). After the menu sits the language switch ("EN" on Polish pages, "PL" on English ones), Anybody 700 with a hairline separator; below 48rem it moves to the first row next to the mark and the section menu takes the full second row.

### Brand mark (signature)
A keyboard: a soot body with ten key cut-outs and a space bar, two of them crimson keys carrying a paper "d" and "c". Geometry lives in `public/brand/znak-klawiatura.svg` and is copied into `src/data/brand.ts`; `BrandMark` recolors it only through `--mark-body`, `--mark-key`, `--mark-letter` (on crimson: paper body, soot keys). On load someone types the signature once: the d key presses, then the c (0.32s each); no motion under reduced motion. The favicon is a simplified six-key version on a soot square (`public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`). The illustrated avatar signs off the Contact sheet; everywhere else it lives on social profiles.

### Illustrations (signature)
- **Files:** `public/illustrations/` (hero and 404, desktop 3:2 and mobile 3:1, 768/1536 and 720/1440 WebP) with true alpha; they always sit on a paper surface (the hero sheet, the 404 sheet), never directly on soot. `<picture>` picks one crop, so only the visible one downloads; the hero image loads with high priority, width and height reserve its box.
- **Hero overlays** (`HeroArt.astro`): a speech bubble "Czekamy na człowieka." (paper, 1.5px ink border, 1.25rem radius, a drawn tail toward the agents, Anybody 600 at width 90) centred at 37% / 31% of the desktop art, and a "brb" note (lighter paper, display voice, rotated 6°, translucent soot tape, small soft shadow) above the empty chair at 88% / 22%; its spoken text is "Zaraz wracam.". On the low crop both sit in the strip above the drawing. After the mark types its signature the bubble pops in (0.5s at 1s) and the note settles (0.9s at 1.35s); no motion under reduced motion.
- **404:** the crimson masthead keeps the slipping zero; below it a fixed paper sheet holds "Ta strona odeszła do lepszego brancha." in the display voice, a short hint, a crimson "Wróć do projektów" button and the waiting room (one agent, three empty seats; decorative, `alt=""`).
- **One crimson:** the drawings and the avatar were made in a warmer, purer red (hue about 26° in OKLCH) than the site crimson (20.8°), which showed as two reds next to each other in Contact. `scripts/recolor-crimson.mjs` moves only the red pixels of the site copies (headphones in the hero crops, the avatar) to crimson's hue and chroma, keeping their light and shade; it recolors at full resolution and resizes afterwards, so every srcset variant matches. Originals and the avatar on profiles stay as drawn. Re-run it on any new drawing that carries red.
- **Share image:** `scripts/og.html` lays the wordmark, the name and "Człowiek w pętli." over the night scene's empty sky (`scripts/assets/noc.webp`), rendered to `public/og.jpg` by `npm run images`.

### Subpage masthead
Blog, CV and 404 open with a crimson sheet holding the site header and the page title; content follows on paper. The top part is the page's `<header>` (banner landmark), the title part opens `<main>`.

### Floating dock
After the visitor scrolls past the hero, two crimson controls with a 2px paper ring sit in the bottom-right thumb zone: a 48px "back to top" key with a drawn arrow and a "Napisz do mnie" button that jumps to Contact and disappears while Contact is on screen. The contact button stays available while scrolling in either direction and carries a drawn envelope; only the back-to-top key hides on scroll down and returns on scroll up. Below 48rem, while scrolling down (reading), the contact button collapses to a 48px envelope key so it never covers card text; its label stays in the accessible name and returns on scroll up. Hover turns soot. It fades and rises in 0.3s, without motion under reduced motion, and stays hidden without script.

### Contact paths
Right under the intro the crimson Contact sheet splits into two paths, project first, each a subhead question, one line of Crimson Soft text and a paper button with a prefilled subject; side by side they share subgrid rows. The big email follows in the display voice with "Kopiuj adres" under it. Below a hairline the sheet signs off: the illustrated avatar (4.5rem circle, 2px paper ring) beside the name and "Odpisuję sam. Agenci czekają w kolejce.", with LinkedIn, GitHub and CV on the right. It is the payoff of the hero's empty chair: the human is back where people write to him. On the home page the footer drops its duplicate links, so the page ends on Contact. Mail subjects are shared site-wide (`subjects` in `profile.ts`).

### Closing stack (signature)
Above Contact the edges of every product sheet peek out in card order, stepped narrower with depth, each in the product's accent (Claudius in Crimson). A view timeline fans them out as Contact rides in; without scroll timelines and under reduced motion the stack is simply open.

### Collaboration sheet
Right after Projects, a Paper Deep sheet: a large display question "Masz pomysł na aplikację?", a lead line with PlaceMates as proof, a crimson button and a link; recruiters follow in a narrower column (8fr/4fr from 60rem) behind a 1px rule.

### Typographic lens (signature)
The hero name, every letter absolutely positioned and moved by transform, reacts to the cursor (or sweeps once on touch): near letters go wider and heavier, far ones narrower and lighter, quantised to 100 pre-measured levels so nothing shifts layout. The rest state is the display voice (58 / 850).

### Claudius track (signature)
A vertical rail of process steps on the crimson Claudius card; the active step's rail fills while its name crossfades from width 70% / weight 400 to width 135% / weight 800 using two pre-set cuts (scaleX 2.6 and 0.385), so only opacity and transform animate. A mouse hover pins a step; touch never does.

### Small sheet moments
- **Copy address:** a light bar sweeps across the email like a photocopier lamp, and the outline button shows a drawn tick with "Skopiowano" for 2.5s; reduced motion keeps the label swap and the `aria-live` message.
- **404:** the middle zero slips out of the "404" like a sheet missing from the stack, above the waiting room.
- **Selection:** crimson on paper, inverted on crimson sheets (`--select-bg`, `--select-ink`).
- **Console:** one crimson-labelled line points developers to the public repository.

### Anchor scroll
In-page links (menu, dock, CTAs) glide: duration grows with distance (about 0.5s per screen, capped at 1.1s), ease in-out cubic, and a trip longer than four screens is shortened to its last four. Any wheel, touch or key stops it. Targets are measured in normal document flow so earlier sticky cards are revealed correctly; direct hashes and history navigation get the same correction. Reduced motion jumps to the corrected position; the skip link keeps its native jump.

### Interest tile (signature)
A themed tile with a fitted condensed word (width 75%) that widens to 150% on hover (or at mid-screen on touch) and a thin line drawing that draws itself on entry and moves its subject on hover.

## Do's and Don'ts

### Do:
- **Do** keep brand surfaces in paper, soot and crimson, and give every new product its own sheet colored from its screenshots (plus its accent in `tones.ts`).
- **Do** set names and titles in the display voice (`--tight`, `--heavy`) and subheads in `--tight-sub`; re-measure `--fit` when a fitted word or the axes change.
- **Do** use `--radius-control` for anything small and pressable.
- **Do** drive motion with scroll timelines, animate only transform and opacity on heavy paths, and give every effect a reduced-motion fallback and a readable no-script state.
- **Do** show real screenshots in device frames.
- **Do** take the mark from `public/brand/znak-klawiatura.svg` / `src/data/brand.ts` and recolor it only through the `--mark-*` variables.
- **Do** route in-page links through `src/scripts/anchor-scroll.ts`.

### Don't:
- **Don't** add a headshot; the illustrated avatar appears on the site only as the Contact sign-off, never as a hero portrait.
- **Don't** use crimson inside another product's card, or a product color outside its card, matrix column and stack edge.
- **Don't** bring back extended widths for static headings; extended widths live only in motion.
- **Don't** add a third type family; narrow Anybody covers labels and metadata.
- **Don't** use shadows as button affordances or on flat bento tiles.
- **Don't** let fitted display lines wrap.
- **Don't** react to touch the way you react to hover.
- **Don't** put loaded symbols or emblems in the manga layer; agents, chairs, headphones and the city are enough.
