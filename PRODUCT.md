# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences, both served on the same page, with **clients for projects first** (owner's preference, confirmed 2026-10-12: he is more interested in project work than in a permanent job):

- **Clients** (primary) looking for someone to build an application end to end, or to help a team adopt AI agents in its development work. Their job: judge whether he can deliver and get in touch about a project.
- **Recruiters and hiring teams** (secondary) looking for a fullstack developer (B2B or full-time). Their job: decide quickly whether Damian is worth contacting, based on what he has actually shipped.

Both arrive mostly cold (LinkedIn, GitHub, a shared link) and scan rather than read.

## Product Purpose
Personal portfolio of Damian Ułaś, a fullstack developer from Zamość. It exists to turn a visit into contact (email, LinkedIn, GitHub, CV). Success means a recruiter or client writes to him after seeing the work.

## Positioning
**Shipped products are the differentiator.** Working projects delivered end to end (PlaceMates first) are the proof. AI agents (Claude Code, Claudius) are how he works, not the headline claim: the products carry the argument and the AI process explains how they got built.

## Operating Context
- Visitors evaluate the work through project write-ups, screenshots, live links (placemates.pl) and public repositories.
- Contact happens by email (mailto plus copy-address button), LinkedIn, GitHub, or the CV page.
- Content is maintained by Damian himself in TS data files (`src/data/*.ts`) and a Markdown blog collection (`src/content/blog`). The README documents this.

## Capabilities and Constraints
- Static Astro site, no backend, deployed to GitHub Pages from `main` (`damianocode.github.io`; a custom domain is possible via `public/CNAME`).
- Sections: Hero, Projects, AI work ("Agenci AI"), Skills (skill-by-project matrix), latest blog posts (hidden while empty), "Po godzinach" (interests), Contact. Separate `/cv` page and blog.
- Polish only today. **An English version is planned**: future work should keep copy out of markup where practical and leave room for a second locale and a language switch.
- Undecided: whether and when the blog gets real posts, and when the full CV (PDF and experience entries) is published.

## Brand Commitments
- Name: Damian Ułaś. Wordmark: "damianocode" next to the keyboard mark. Hero statement (confirmed by the owner 2026-10-29): "Buduję aplikacje. Ogarniam agentów." The structured role stays "Fullstack developer" (SEO, schema, footer).
- Voice: Polish, first person, direct and unpretentious.
- **No headshot.** The site deliberately has no photo of his face; do not add one or a placeholder for one. An illustrated avatar (manga line art, red headphones) exists for social profiles only (owner, 2026-10-29); it may appear on the site only as a deliberate, owner-approved moment, never as a hero portrait. Approved placement (2026-10-29): the Contact sign-off.

## Evidence on Hand
- Projects (`src/data/projects.ts`): PlaceMates (lead; Next.js 16, Supabase, PostGIS; live at placemates.pl), Asystent korepetytora (private repo, in progress), Widżet Claude Code (C#/.NET 10/WPF, installer), Claudius (Claude Code plugin), Panel sklepu internetowego (2023–2026; Next.js 14, Clerk, Prisma), plus an archive of six repositories from 2021–2022.
- Screenshots in `src/assets/projects/` (PlaceMates and tutor app desktop and mobile; widget states).
- AI process description in `src/data/ai.ts`.
- **Absent, do not fabricate:** testimonials, client or employer logos, metrics or user numbers, a headshot, a CV PDF or experience history, published blog posts, analytics.

## Product Principles
1. **Proof before claims.** Every claim leans on a shipped project, a link or a repository; nothing is asserted that the work does not show.
2. **Two readers, one page, projects first.** The client path leads; the recruiter path stays present and easy to find, never buried.
3. **AI as method, not slogan.** Show how agents are used to deliver, in service of the products, never as the headline.
4. **Contact is always close.** A visitor who is convinced can reach out in one step from anywhere.
5. **Ready for a second language.** Structure and copy choices should not make the planned English version harder.

## Accessibility & Inclusion
The existing site carries `lang="pl"`, a skip link, labelled sections, `aria-live` feedback and `prefers-reduced-motion` handling; future work must keep these. No further product-specific standard has been set.
