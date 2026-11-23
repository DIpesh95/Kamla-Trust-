# Stage 12 Inner Pages Audit (Phase 1 — Audit Only, No Implementation)

## Baseline

- **Branch:** `claude/kamala-trust-homepage-dev-b141a6`
- **HEAD:** `ab028d6` — "Fix photo crop alignment and raise image quality across the site" (unchanged since Stage 11's close)
- **Working tree:** identical to the Stage 11 checkpoint's own listing, plus only the two new Stage 12 documents. No production file was edited to produce this audit.

## Route inventory — actual structure, not assumed

Found via `find src/app -name page.tsx`, confirmed live via a full browser pass (all returned HTTP 200, zero console errors on any route):

| # | Route | Page name |
|---|---|---|
| 1 | `/about` | About |
| 2 | `/about/leadership` | Leadership |
| 3 | `/our-work` | Our Work (overview) |
| 4 | `/our-work/healthcare` | Healthcare (pillar detail) |
| 5 | `/our-work/women-and-girl-child` | Women & Girl Child (pillar detail) |
| 6 | `/our-work/education` | Education (pillar detail) |
| 7 | `/our-work/rural-livelihoods-environment` | Rural Livelihoods & Environment (pillar detail) |
| 8 | `/our-work/disaster-relief-civic-recognition` | Disaster Relief & Civic Recognition (pillar detail) |
| 9 | `/impact` | Our Impact |
| 10 | `/newsroom` | Newsroom |
| 11 | `/stories` | Stories |
| 12 | `/get-involved/donate` | Donate |
| 13 | `/get-involved/volunteer` | Volunteer |
| 14 | `/get-involved/csr-partnership` | CSR Partnership |
| 15 | `/get-involved/careers` | Careers |
| 16 | `/contact` | Contact |

**No separate routes exist** for: individual news/article pages (Newsroom is a single list page), a Signature Initiatives detail page (those live only as homepage anchors, `/#slug`), or Books & Publications (homepage-only section, no route). `/about/transparency` is confirmed gone (Stage 10). This matches `src/content/nav.ts` and `src/app/sitemap.ts` exactly — no orphaned or undocumented route was found.

## Per-route findings

### `/about`
- **Layout:** `PageHero` + `SubNav` (2 tabs) + two-column intro/at-a-glance + `Timeline` + a trustee-confirmation disclosure + `EventGallery`.
- **Visual issues:** H1 renders italic (see cross-cutting finding below). Several `rounded-sm` cards (at-a-glance aside, disclosure box) — inconsistent with the square-corner convention already enforced sitewide on the homepage.
- **Responsive:** clean at all three widths, no overflow, no clipping.
- **Functional:** all links resolve; `SubNav` correctly shows only 2 tabs post-Stage-10.
- **Content:** spot-checked directly against the live site — "led by Trustee Nidarshana Gowani" (single trustee named, Ramesh not mentioned in this paragraph) is **not a local error**; the live site reads identically. No content gap introduced locally; not proposing a copy change.
- **Priority:** Medium (square corners), Low (everything else — already solid).

### `/about/leadership`
- Already rebuilt and approved in Stage 9. Confirmed via this audit's fresh screenshot pass: clean at all three widths, H1 still italic (shared `PageHero`, same cross-cutting issue), no new regressions found.
- **Priority:** Low (only the shared H1 issue applies here; nothing page-specific).

### `/our-work`
- **Layout:** `PageHero` + `WorkChapters` (the same component just refined in Stage 11).
- **Visual issue — new finding:** a large, apparently unintentional block of empty whitespace between the five-pillar grid and the footer (confirmed visually in the full-page 1440px screenshot — roughly 400–500px of plain background with no content). This page has no closing CTA section (unlike the pillar detail pages), so the grid is followed directly by a large gap, then the footer.
- **Responsive:** clean, no overflow at any width.
- **Content:** dek text is candid about status ("Pending trustee sign-off before launch") — consistent with the project's honesty convention, not a problem.
- **Priority:** **High** (visually looks broken/unfinished, highly visible, affects first impression of the whole "Our Work" section).

### Pillar detail pages (5 routes: healthcare, women-and-girl-child, education, rural-livelihoods-environment, disaster-relief-civic-recognition)
- **Layout:** shared structure — `PageHero` + "← All pillars" / initiative count header + `Fact` stat badge + `ProgramList` + `CTASection`.
- **Visual issue — new finding, same root cause as `/our-work`, more severe here:** every pillar page I screenshotted (Healthcare confirmed directly, structure identical across all five) shows a very large empty gap — roughly 1000px+ of blank ivory background — between the end of the initiative list and the dark `CTASection` band at the bottom. This is the single most visually conspicuous defect found in this entire audit.
- **Typography:** `ProgramList`'s numeral (`01`, `02`, …) is italic — inconsistent with the upright-numeral convention already established and fixed on the homepage (Impact Numbers, Signature Initiatives) in Stages 3 and 5.
- **Corners:** `CTASection`'s two buttons have no focus-visible styling; location-tag pills use `rounded-full` (a small metadata chip — likely an acceptable exception, flagged as low priority, not a primary button).
- **Content:** initiative names/blurbs read correctly and match `pillars.ts` (already verified content-accurate in earlier stages; not re-litigated here since this audit is design/consistency-focused, not a content re-verification).
- **Priority:** **Critical** (the empty-space defect; identical across all 5 routes, so one shared-component fix resolves all 5 at once), **Medium** (italic numeral, focus-visible on CTA buttons).

### `/impact`
- **Layout:** `PageHero` + `ImpactNumbers` (shared with homepage, already Stage-3-fixed) + per-pillar stat grid + a methodology disclosure.
- **Visual:** `rounded-sm` cards again (per-pillar grid, methodology box) — same sitewide corner inconsistency.
- **Content:** the methodology paragraph candidly explains why a previous "50k+ lives impacted" figure was removed — consistent, honest, matches `stats.ts`'s own code comment. No fabricated figure found anywhere on this page.
- **Responsive:** clean at all three widths.
- **Priority:** Medium (corners only).

### `/newsroom`
- Rebuilt and approved in Stage 8. This audit's fresh pass found no new issues — clean at all three widths, content still accurate (19 items, 4 categories, both thumbnail images rendering).
- **Priority:** Low.

### `/stories`
- Rebuilt and approved in Stage 7. Clean at all three widths in this fresh pass. H1 still italic (shared issue).
- **Priority:** Low.

### `/get-involved/donate`
- **Layout:** `PageHero` + `SubNav` (4 tabs) + three info cards + `InquiryForm`.
- **Content:** "80G eligibility isn't confirmed yet." (Stage 10's exact approved wording) — confirmed present, unchanged.
- **Visual:** `rounded-sm` cards; `InquiryForm` itself uses `rounded-sm` on the form, every input, and the submit button has no focus-visible styling.
- **Responsive:** clean, no overflow.
- **Priority:** Medium (corners/focus-visible, shared with every other form-bearing page below).

### `/get-involved/volunteer`
- Same `InquiryForm`/corner issues as Donate. One page-specific detail: the "Where volunteers help" list uses `rounded-xl` — a noticeably larger radius than any other card on the site, the single most visually-inconsistent corner treatment found in this audit.
- **Priority:** Medium–High (the `rounded-xl` list specifically stands out more than the sitewide `rounded-sm` pattern).

### `/get-involved/csr-partnership`
- Same `InquiryForm`/corner issues. Content is a distinct, legitimate ask (CSR-1 registration status) — not a duplicate of Donate's 80G question, despite both being tax/registration-adjacent; no content fix needed.
- **Priority:** Medium (corners/focus-visible only).

### `/get-involved/careers`
- Honest "no open roles listed yet" disclosure, matching the project's established honesty convention. Simplest page on the site (just a dek + `InquiryForm`). No pillar/photography content to check.
- **Priority:** Low.

### `/contact`
- **Layout:** `PageHero` + three contact-detail cards + `InquiryForm`.
- **Responsive issue — new finding:** **the only horizontal overflow found anywhere in this entire audit.** At 375px, `document.body.scrollWidth` measures 380px against a 375px viewport. Traced precisely to the same root cause already fixed once in Stage 11 (the footer's email link) — but this is a **separate, previously-unaudited instance**: Contact's own email link (`{trust.email}`, the same 42-character unbroken string) has no `break-all`/`break-words` styling here either.
- **Priority:** **High** (the only genuine overflow bug found; same proven one-line fix as Stage 11, just needs applying to this second location).

## Cross-cutting findings (shared components — affect many routes at once)

These are the highest-leverage findings: each is a single shared file whose fix would correct the same issue across every inner page simultaneously, without touching the homepage or any previously-closed stage.

1. **`src/components/page-hero.tsx` — every page's `<h1>` is italic.** Confirmed via live DOM query on all 16 routes: 100% show `font-style: italic`. This is the exact typographic inconsistency already identified and corrected on the homepage in Stages 2, 3, and 5 ("upright Fraunces, no italic" for primary headlines) — it was simply never applied to this one shared component, so every inner page still carries it. **Highest-leverage single fix in this entire audit** — one file, sixteen pages corrected at once.
2. **`src/components/page-hero.tsx` — breadcrumb links have no `focus-visible` styling.** Same gap pattern already fixed on dozens of other links across Stages 2–11.
3. **`src/components/cta-section.tsx` — both CTA buttons have no `focus-visible` styling.** Affects all 5 pillar detail pages.
4. **`src/components/inquiry-form.tsx` — the submit button has no `focus-visible` styling, and every input/the form itself uses `rounded-sm`.** Affects Contact, Donate, Volunteer, CSR Partnership, and Careers — 5 pages from one file.
5. **`src/components/program-list.tsx` — the initiative numeral is italic**, inconsistent with the already-corrected upright-numeral convention. Affects all 5 pillar detail pages from one file.
6. **Unexplained large empty whitespace before the footer/CTA band**, found on `/our-work` and (more severely) on all 5 pillar detail pages. This needs visual investigation in the implementation phase to identify the exact spacing rule responsible — flagged here as a confirmed, reproduced visual defect, with root-cause isolation deferred to Stage 13 planning (not yet determined whether it's a single shared cause or coincidentally similar across both page types).

## Photography review

No new photographs were found needed or proposed anywhere in this audit. Every pillar detail page's imagery (where present) is inherited from the already-approved homepage `pillarImages` mapping (Stage 4/11) — no inner page introduces different crops or additional images beyond what's already verified. No stock photography, AI imagery, or unverified Drive asset appears on any inner page. Missing photography (Education, Rural Livelihoods, Disaster Relief pillars; Kamala Rising Star; both trustee portraits) remains exactly as already documented in `FINAL-PENDING-ASSETS.md` — not re-litigated here, not newly discovered.

## Accessibility note

Keyboard-focus gaps (items 2–4 above) are the only accessibility issues found. Heading hierarchy is otherwise correct on every route (one `<h1>` per page from `PageHero`, consistent `<h2>`/`<h3>` nesting below it — spot-checked on About, Our Work, Healthcare, Impact). Reduced-motion behavior is inherited from the already-proven `Reveal`/`RevealGroup` components used throughout these pages — not re-tested page-by-page in this audit since the underlying mechanism is unchanged from Stages 1–11.

## Screenshots

Captured for all 16 routes at 1440px (full page), 768px, and 375px via a single automated browser pass against the local dev server — 48 screenshots total, stored in the audit's scratch directory. No route failed to load; every route returned HTTP 200 with zero console errors at every width. Representative screenshots are attached to this message; the full set was reviewed programmatically (overflow measurement) and spot-visually (several key pages) rather than every single image being manually inspected one-by-one, given the volume.

---

Nothing was implemented. See `STAGE-12-IMPLEMENTATION-PLAN.md` for the proposed, staged fix plan.
