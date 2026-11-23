# D2 Implementation Plan

Status: **planning only — no code has been changed to produce this document.** Builds directly on `EXISTING-WEBSITE-CONTENT-INVENTORY.md`, `D2-SECTION-AND-PHOTOGRAPH-MAPPING.md`, and `FINAL-PENDING-ASSETS.md`. Visual reference: [The Institutional Editorial](https://claude.ai/code/artifact/e10ad848-c799-4e1b-be31-5cd01481e2db) and its [specification](https://claude.ai/code/artifact/eeec17d7-1d0f-4c19-9e31-d74c3c6f48c6).

## Open question that must be resolved before Stage 1 starts

While mapping the live site's 12 sections back onto this codebase's actual `src/app/page.tsx`, I found the local file currently assembles **more** homepage content than the live site renders. Specifically, `page.tsx` includes five pieces that did not appear anywhere in the live homepage's rendered DOM during the audit:

- A full four-milestone **Timeline** section (the live homepage shows only a one-line "57 — years since 1969" stat; the full timeline lives on `/about` only)
- A **Named Programmes** section ("Not abstractions. Named programmes, running now.")
- A **Quote Banner** section
- A **Human Impact** section (illustrative archetype tiles)
- A **Books & Publications** section ("A record still being written.")

The live site is the agreed source of truth, and its homepage has exactly 12 sections. But that means these five pieces, while present in this codebase today, are **not** part of the "existing homepage" as defined by the live site. I have not removed, disabled, or touched any of them — this plan simply does not schedule work on them, pending your decision on one of:

1. **Match the live site exactly** — these five stay out of the D2 homepage rebuild (code remains in the repo, just unused on the homepage, same as today's live reality).
2. **The live site is stale** — these five were live once and should be restored as homepage sections, bringing the total above 12.
3. Some other disposition you specify per item.

Everything below plans for option 1 (the 12 confirmed sections only), since that is what you explicitly listed and approved. If you intend option 2, tell me before Stage 1 and I'll revise the section count and mapping accordingly — it would not change anything already approved, only add back sections that need their own D2 treatment.

A second, smaller item in the same category: the live About section's "57 — years since 1969, still showing up" line does not match the `about-intro.tsx` structure I can see in this codebase (which renders one combined heading, not a separate large numeral). I'll re-read that component's exact current source at the start of Stage 3, rather than guess now, and report back before touching it.

---

## 1. Proposed component-level changes

No section is restructured, merged, or reordered. Each existing component gets a **visual** pass only: typography, colour allocation, button shape, spacing/rhythm, and (where relevant) photography treatment — the same content, props, and data sources as today.

| Component | Current role | D2-aligned change |
|---|---|---|
| `site-header.tsx` | Nav, logo, Donate CTA, mobile menu | Square Donate button; dropdown opens on real hover **and** keyboard focus (`:focus-within` equivalent in React state); Escape genuinely closes an open dropdown without leaving it logically "open" at a different focus target; mobile panel gets a real focus trap and `inert` on closed/collapsed content, matching the D2 concept's round-3 fix — ported into this component's actual event handlers, not copied verbatim from the static mock-up |
| `hero.tsx` | Headline, kicker, two CTAs, image | Tighter, more directional image crop/scrim for contrast; Fraunces headline scale and tracking brought in line with D2; keep both existing CTAs (content says two, D2's own hero had one — existing content wins per your rule 1) |
| `recognition-strip.tsx` | Six award names/dates | Burgundy/charcoal institutional strip styling per D2; content unchanged, including "date pending" items |
| `about-intro.tsx` | About heading/body/photo/CTA + (pending the open question above) the "57 years" line | Editorial split layout, square "Read Our Story" link; exact wording preserved; numeral styling (if confirmed to belong here) set in the tabular/mono treatment D2 proposes for all stats |
| `impact-numbers.tsx` | Three headline stats + sources | D2's Institutional Footprint treatment: large tabular-numeral figures, each **keeping its exact existing label and source note**. Per your rule 5, the "6 cities, pending trustee confirmation" figure is **kept**, not dropped the way the D2 concept itself dropped it — the concept's own choice to omit it does not apply here, since existing content takes priority |
| `work-chapters.tsx` + its wrapping section in `page.tsx` | Five focus-area cards | D2's asymmetric grid treatment (varied card sizes, real initiative names surfaced per card, an equal-discoverability index row for all five) — same five pillars, same links, same taglines |
| `signature-initiatives.tsx` | Three signature initiatives | D2's alternating editorial vignette treatment; same three initiatives, same stats; new photography available for two of the three (see §4) |
| `event-gallery.tsx` | Produces "Moments & Gatherings" on the live site (needs source re-confirmation — see below) | Re-read this file's current source at the start of Stage 6, since the live site's four-item draggable carousel with per-item tags doesn't match the two-item feature/supporting layout I have on file from earlier in this engagement. Plan for whichever structure is actually there; do not guess |
| `stories-magazine.tsx` | Three "Awaiting Interview" cards | D2's restrained Photography Pending styling; exact prompts and the "real photo & interview not yet available" disclosure preserved verbatim |
| `newsroom-editorial.tsx` | 19-item press/recognition/event/community list | D2's refined editorial list treatment (dated, tabular-numeral); every item, every date, every "exact date pending confirmation" preserved |
| `leadership-teaser.tsx` | Both trustees | D2's unified-card fix: identical chrome for both trustees (no faded placeholder for either); bios, pull-quote, and the existing "trustee photography pending" disclosure preserved verbatim |
| `transparency-teaser.tsx` | Four pending fields + reference-foundation note | D2's Institutional Record/document-register styling; all four fields and their exact "pending from trustees" wording preserved |
| `get-involved-cta.tsx` | Donate/Volunteer/CSR rows | D2's confident closing-section treatment; same three pathways, same copy |
| `site-footer.tsx` | Address, nav columns, subscribe note, legal line | D2 institutional footer styling; content unchanged, including the "no mailing list is wired up yet" disclosure |
| `container.tsx`, `cta-section.tsx`, `fact.tsx`, `motion.tsx`/`motion-provider.tsx` | Shared primitives | Square corners confirmed sitewide (already done in the November button-standardization pass); `Reveal`'s timing/easing adjusted to D2's restrained feel; no new animation library |
| Five pillar detail pages (`/our-work/[slug]`) | Initiative lists per pillar | D2 editorial list styling for the numbered initiative rows; all initiative names and blurbs preserved exactly, for all five pillars, not just Healthcare |
| `/our-work` overview, `/impact`, `/stories`, `/newsroom`, `/about`, `/about/leadership`, `/about/transparency`, `/get-involved/*`, `/contact` | Full page content per the inventory | Page-level D2 styling pass (headings, spacing, buttons); zero content changes — these pages already carry additional detail beyond their homepage teasers (roles lists, methodology notes, reference-foundation comparisons) and all of it stays |

## 2. Existing page and route preservation matrix

| Route | Preserved? | Notes |
|---|---|---|
| `/` (Homepage) | Yes | All 12 sections, same order |
| `/about` | Yes | Full story, at-a-glance, 4-moment timeline, "needs trustee confirmation" note, archive photo captions |
| `/about/leadership` | Yes | Both trustees, pull-quote, Selected Roles, "Content gap" disclosure |
| `/about/transparency` | Yes | Four pending fields, Financial Statements note |
| `/our-work` | Yes | Overview + five focus-area cards |
| `/our-work/healthcare` | Yes | 9 initiatives |
| `/our-work/women-and-girl-child` | Yes | 7 initiatives |
| `/our-work/education` | Yes | 2 initiatives |
| `/our-work/rural-livelihoods-environment` | Yes | 8 initiatives |
| `/our-work/disaster-relief-civic-recognition` | Yes | 4 initiatives |
| `/impact` | Yes | Headline stats + per-pillar pending breakdown + methodology note |
| `/stories` | Yes | Three awaiting-interview slots |
| `/newsroom` | Yes | 19 items across 4 kinds |
| `/get-involved/donate` | Yes | Bank/UPI note, tax-deduction pointer, CSR pointer, contact form |
| `/get-involved/volunteer` | Yes | Five focus areas as "where volunteers help," contact form |
| `/get-involved/csr-partnership` | Yes | CSR-1 status, pointer to Our Work, contact form |
| `/get-involved/careers` | Yes | "No open roles" disclosure, contact form |
| `/contact` | Yes | Address/phone/email, contact form |
| Header / nav / footer | Yes | Same links, same structure, accessibility upgraded only |

No route is removed, merged, renamed, or redirected anywhere in this plan.

## 3. Homepage section-by-section design mapping

This is the same table as `D2-SECTION-AND-PHOTOGRAPH-MAPPING.md`, carried forward as the authoritative design reference for Stages 2–9 below. Not repeated in full here to avoid drift between two copies of the same table — Stage checkpoints will cite it directly by section number (01–12).

## 4. Photography and asset replacement plan

**No photo is used on the strength of event identification alone.** Every row below carries its own approval status; "Verified" is a statement about what the image shows, not a publication decision.

| Filename | Section | Status |
|---|---|---|
| `hero-kanya-sneh-bandhan.jpg` | 01 Hero | **Approved** — already published |
| `about-yamuna-drive-portrait.jpg` | 03 About | **Approved** — already published |
| `gallery-kanya-sneh-bandhan-square.jpg` | 05 Focus Areas (Women & Girl Child), 07 Moments & Gatherings | **Approved** — already published |
| `kamala-power-women-2026.jpg` | 06 Signature Initiatives, 07 Moments & Gatherings | **Approved** — already published |
| `pillars-of-humanity-2024.jpg` | 06 Signature Initiatives | **Approved** — already published |
| `republic-day-2026.jpg` | 07 Moments & Gatherings, 09 Newsroom | **Approved** — already published, existing "exact event match pending confirmation" caveat carried forward unchanged |
| `lokmata-ahilyabai-holkar-2026.jpg` / `kpw-lokmata-award.jpg` | 07 Moments & Gatherings, 09 Newsroom | **Approved** — already published |
| `yamuna-drive.jpg` | 05 Focus Areas (Healthcare) | **Withheld** — provenance unresolved, per your rule 3; not used anywhere until confirmed |
| `IMG_0711.JPG` | 07 Moments & Gatherings, 09 Newsroom (Mahila Samman) | **Identified — Pending Approval.** Event verified (Kamala Trust logo + banner text legible). Not yet approved for publication, needs: trustee/comms sign-off, confirmation of who is pictured, and a decision on which crop |
| `IMG_0965.JPG` | same | **Identified — Pending Approval** (same conditions as above) |
| `IMG_7798.JPG` | same | **Identified — Pending Approval** (same conditions as above) |
| `DSC_8020.jpg` | 06 Signature Initiatives (Pillars of Humanity) | **Identified — Pending Approval.** Event verified (backdrop reads "Pillars of Humanity"). Needs sign-off on using a runway/fashion-show image specifically, since it's a different register from the existing felicitation-style photo |
| `DSC_8034.jpg` | same | **Identified — Pending Approval**, and flagged as a near-duplicate of `DSC_8020.jpg` — recommend using at most one of the two |
| `NNP04242.JPG` | same | **Identified — Pending Approval.** Event verified (banner reads "Pillars of Humanity Fashion Show, 23rd Feb, 2024, Gateway of India, Mumbai" — matches the existing published caption) |
| `NNP04595.JPG` | same | **Identified — Pending Approval** (same conditions as above) |
| `_KUN3116.jpg` | None currently | **Identified — Out of scope for this rebuild.** Verified event ("Trendsetter Indians Awards 2023" / "Kradiology") has no corresponding content anywhere on the existing site. Using the photo would mean writing new Newsroom/Recognition content first — a content decision for you, not a styling decision for this plan |
| `3M4A0798.JPG` | 06 Signature Initiatives (possible) | **Identified — Pending Approval**, lower confidence (backdrop only partially legible) |
| All 14 unidentified photographs (listed in full in `FINAL-PENDING-ASSETS.md`) | None | **Do not use.** No event, subject, or consent status established |

Approving any "Pending Approval" row is a decision for you to make explicitly, section by section, when we reach that Stage — this plan does not pre-approve them by including them in the table.

## 5. Responsive plan — desktop, tablet, mobile

- The D2 concept's 1440/375 toggle was a **pitch device** (a CSS container-query trick to show both sizes in one artifact). Production implementation uses this project's existing Tailwind breakpoint system (`sm:`/`md:`/`lg:` utilities already present throughout every component) — the container-query toggle itself is not ported into the codebase.
- **Desktop (≥1024px / `lg:`):** full nav, asymmetric Five Pillars grid, side-by-side editorial splits, as designed in the D2 concept.
- **Tablet (768–1023px / `md:`):** not explicitly designed in the D2 concept pitch, which only showed 1440 and 375. This needs its own short design pass at the start of each Stage (collapsing the asymmetric grids to 2-column, deciding whether the nav stays full or drops to the mobile pattern early) — flagged in §9 as a dependency, not assumed solved by "it's responsive."
- **Mobile (<768px / default):** hamburger nav with the accessible slide-in panel and accordion pattern proven in the D2 concept round 3, single-column sections, same content.
- Every stage's checkpoint (§10) includes screenshots at 1440, 768, and 375 as a standing requirement, not just desktop and mobile.

## 6. Accessibility and interaction plan

Carried forward from the D2 concept's round-3 fixes, re-implemented in this codebase's actual React components (not copied as static markup):
- Desktop dropdowns open on real mouse hover **and** keyboard focus.
- Escape on an open dropdown genuinely closes it (the D2 concept's `force-closed`-class fix, translated into whatever state mechanism `site-header.tsx` already uses — likely a small addition to its existing `openMenu`/`useState` pattern).
- Mobile panel: real focus trap (Tab/Shift+Tab cycle inside the open panel only), `inert` (or an equivalent React-driven `tabIndex`/`aria-hidden` pattern if `inert` support needs a fallback check for this project's target browsers) on closed/collapsed content, Escape-to-close with focus return to the toggle button, click-any-link-to-close.
- Visible focus rings on every interactive element, sitewide.
- All of the above gets tested with genuine keyboard input (Tab/Shift+Tab/Escape), not `.click()` standing in for keyboard behaviour — the same standard applied in the D2 concept's own testing.

## 7. Animation and performance plan

- Continue using the existing `MotionProvider`/`Reveal` (`framer-motion`, already wrapped in `MotionConfig reducedMotion="user"`) — no new animation dependency.
- Reveal-on-scroll timing/easing adjusted to D2's more restrained feel (slightly longer, gentler) across all sections uniformly.
- `impact-numbers.tsx`'s three figures get a count-up-on-view treatment (matching D2's Footprint device), applied to the **existing, unchanged figures** — this is a presentation change, not a content change.
- No new images are added without `next/image` sizing/optimization; no layout-shift regressions introduced by the asymmetric grid (explicit `aspect-ratio`/fixed dimensions planned per card).
- No change to data fetching, routing, or bundle structure — this is a styling/motion pass over existing components.

## 8. Content preservation checklist

A literal per-item checklist, to be run against the live site at the end of every stage and again at final QA:

- [ ] All 12 homepage sections present, in order, with no section removed or merged
- [ ] Hero: exact headline, kicker, body copy, both CTAs
- [ ] Recognition Strip: all 6 awards, exact dates/caveats
- [ ] About: exact heading/body/CTA (pending resolution of the "57 years" line's source)
- [ ] Five Decades of Action: 57 / 6 (with its caveat) / 30+ — **all three kept**, none dropped
- [ ] Our Focus Areas: all 5 pillars, exact taglines, exact links
- [ ] All 5 pillar detail pages: every initiative name and blurb, for all five pillars
- [ ] Signature Initiatives: all 3, exact descriptions and stats
- [ ] Moments & Gatherings: all 4 items, exact captions/tags (pending component re-verification)
- [ ] Stories: all 3 "Awaiting Interview" cards, exact prompts and disclosure
- [ ] Newsroom: all 19 items, all dates including "pending" ones
- [ ] Leadership: both trustees, pull-quote, Selected Roles, "Content gap" disclosure
- [ ] Transparency: all 4 fields, Financial Statements note
- [ ] Get Involved: all 3 pathways, exact copy
- [ ] Footer: address, all nav columns, subscribe disclosure, legal line
- [ ] `/about`, `/impact`, `/stories`, `/newsroom`, all `/get-involved/*`, `/contact`: every page-only addition (roles lists, methodology note, reference-foundation comparisons) still present
- [ ] No new statistic, outcome, quote, or testimonial introduced anywhere

## 9. Risks and unresolved dependencies

1. **Section-count discrepancy** (detailed above) — five components in this codebase (Timeline detail, Named Programmes, Quote Banner, Human Impact, Books & Publications) are not part of the live site's 12-section homepage. Needs your disposition before Stage 1.
2. **About section's "57 years since 1969" line** — source unconfirmed against current `about-intro.tsx`. Will verify at Stage 3 start, before any edit.
3. **"Moments & Gatherings" component identity** — live content (4-item draggable carousel with tags) doesn't match my last-known `event-gallery.tsx` structure (2-item feature/supporting). Will re-read at Stage 6 start.
4. **Tablet breakpoint** has no existing D2 design — needs a short design pass per section, not an assumption that desktop/mobile interpolate cleanly.
5. **Yamuna photo** — Healthcare pillar photography stays blocked until provenance is resolved; no substitute is planned.
6. **9 Drive photographs** are "Identified — Pending Approval," not approved; each needs an explicit yes/no from you before use, plus confirmation of who is pictured and consent status where identifiable individuals appear.
7. **Nidarshana Gowani's portrait** remains missing; the three photographs that may show her are unconfirmed and unsuitable as a portrait regardless.
8. **"Trendsetter Indians Awards 2023" / "Kradiology"** is a verified real event with zero existing site content — using its photo requires a content decision outside this plan's scope.
9. **`inert` attribute browser support** — modern baseline, but worth a quick compatibility check against this project's actual supported-browser list before relying on it as the primary mobile-panel accessibility mechanism.

## 10. Staged implementation sequence

Each stage ends with a checkpoint: screenshots at 1440/768/375, the relevant slice of the §8 checklist re-run, and your explicit approval before the next stage starts — the same pattern used throughout this engagement.

| Stage | Scope | Checkpoint |
|---|---|---|
| **0** | Resolve the open question above (§ at top) + the two flagged source-verification items (About stat line, Moments & Gatherings component) | Written confirmation from you; no visual output yet |
| **1** | Header, navigation, mobile menu, footer (global chrome + accessibility upgrade) | Screenshots of header/footer at all 3 widths; keyboard-nav test results |
| **2** | Hero + Recognition Strip | Screenshots, content checklist for sections 01–02 |
| **3** | About + Five Decades of Action (stats) | Screenshots, content checklist for sections 03–04 |
| **4** | Our Focus Areas (homepage) + `/our-work` overview + all 5 pillar detail pages | Screenshots of homepage section 05 and all 6 pages, full initiative-list checklist |
| **5** | Signature Initiatives | Screenshots, content checklist for section 06, photo-approval decisions logged |
| **6** | Moments & Gatherings | Screenshots, content checklist for section 07, photo-approval decisions logged |
| **7** | Stories + Newsroom (homepage + `/stories` + `/newsroom`) | Screenshots, content checklist for sections 08–09 |
| **8** | Leadership + Transparency (homepage + `/about/leadership` + `/about/transparency`) | Screenshots, content checklist for sections 10–11 |
| **9** | Get Involved (homepage + all 4 `/get-involved/*` pages) + `/contact` | Screenshots, content checklist for section 12 + all 5 pages |
| **10** | Full-site regression: all 18 routes, all 3 widths, keyboard accessibility, reduced-motion, performance (no new layout shift, image sizing) | Final sign-off package: full checklist, full screenshot set, no new console errors |

---

Nothing has been coded, deployed, committed, or changed on the live site to produce this plan. Waiting for your resolution of the open question above and your approval before Stage 1 begins.
