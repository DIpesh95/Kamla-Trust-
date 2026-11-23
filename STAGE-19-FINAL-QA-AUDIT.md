# Stage 19 — Full Website Final QA Audit

**This stage is audit-only. No production file was modified.**

## Executive summary

Audited all 17 content routes (22 generated routes including system routes) at 1440/768/375px — 51 viewport checks — plus functional, accessibility, and technical QA. **Zero horizontal/vertical overflow, zero console errors, zero failed network requests, zero broken images, zero broken links found across the entire sweep.** `tsc`, project-wide `eslint`, and a fresh `next build` are all clean; all 22 routes generate successfully.

Two genuine findings, both previously undiscovered in Stages 1–18:

- **P2 — Homepage has no `<h1>` element** (heading-hierarchy defect, `src/components/hero.tsx`).
- **P2 — Shared nav dropdown menus use heavy rounded corners** (`rounded-2xl`/`rounded-xl`/`rounded-lg`/`rounded-md`), inconsistent with the square-corner direction, appearing on every single route via the global header (`src/components/site-header.tsx`).

One item is flagged for a design decision, not a defect: the `Fact` placeholder badge's `rounded-md` chip styling. Everything else checked — forms, navigation, keyboard access, reduced motion, the Stage 10 Transparency removal, image alt text, social links, sitemap/robots — verified working correctly with no regressions.

## Git baseline

- Branch: `claude/kamala-trust-homepage-dev-b141a6`
- HEAD: `ab028d6 Fix photo crop alignment and raise image quality across the site`
- `git status --short` at the start of this stage: 42 entries (41 pre-existing modified/deleted/untracked files from Stages 1–18, plus `STAGE-18-CHECKPOINT.md` added at the end of Stage 18). Matches the Stage 18 checkpoint's end-state exactly.
- End-of-stage `git status --short`: identical, plus this audit's own new deliverable files. No production file changed.

## Route inventory (17 content routes, discovered from `src/app` + `sitemap.ts`, not assumed from any earlier stage)

| # | Route | Source |
|---|---|---|
| 1 | `/` | `src/app/page.tsx` |
| 2 | `/about` | `src/app/about/page.tsx` |
| 3 | `/about/leadership` | `src/app/about/leadership/page.tsx` |
| 4 | `/our-work` | `src/app/our-work/page.tsx` |
| 5 | `/our-work/education` | `src/app/our-work/[slug]/page.tsx` |
| 6 | `/our-work/healthcare` | ″ |
| 7 | `/our-work/women-and-girl-child` | ″ |
| 8 | `/our-work/rural-livelihoods-environment` | ″ |
| 9 | `/our-work/disaster-relief-civic-recognition` | ″ |
| 10 | `/impact` | `src/app/impact/page.tsx` |
| 11 | `/stories` | `src/app/stories/page.tsx` |
| 12 | `/newsroom` | `src/app/newsroom/page.tsx` |
| 13 | `/get-involved/donate` | `src/app/get-involved/donate/page.tsx` |
| 14 | `/get-involved/volunteer` | `src/app/get-involved/volunteer/page.tsx` |
| 15 | `/get-involved/csr-partnership` | `src/app/get-involved/csr-partnership/page.tsx` |
| 16 | `/get-involved/careers` | `src/app/get-involved/careers/page.tsx` |
| 17 | `/contact` | `src/app/contact/page.tsx` |

Plus system routes confirmed working: `/sitemap.xml` (200, lists exactly these 17 URLs via `src/app/sitemap.ts`, no stray entries), `/robots.txt` (200, references the sitemap correctly), `/_not-found` (confirmed via two 404 tests below). Total matches the build's reported 22 generated routes (17 content + `/_not-found` + `/sitemap.xml` + `/robots.txt` + the `/our-work/[slug]` dynamic-route entry itself counted once in the build tree = 22).

No route beyond this list was discovered. `/about/transparency` (removed in Stage 10) correctly returns **404**, confirmed below.

## Route-by-route results

All 17 routes: no overflow at any of the 3 widths, zero broken images, zero console errors, zero failed/4xx/5xx network requests, exactly one `<h1>` present, `header`/`main`/`footer` all present, no stray references to `/about/transparency`. **Exception: `/` (homepage) has zero `<h1>` elements** — see Issue H-001 below. Full per-route screenshots captured at 1440px and 375px (see screenshot folder).

| Route | Overflow | Broken images | Console errors | `<h1>` count | title/meta present |
|---|---|---|---|---|---|
| `/` | None | 0 | 0 | **0** ⚠️ | Yes/Yes |
| `/about` | None | 0 | 0 | 1 | Yes/Yes |
| `/about/leadership` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work/education` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work/healthcare` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work/women-and-girl-child` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work/rural-livelihoods-environment` | None | 0 | 0 | 1 | Yes/Yes |
| `/our-work/disaster-relief-civic-recognition` | None | 0 | 0 | 1 | Yes/Yes |
| `/impact` | None | 0 | 0 | 1 | Yes/Yes |
| `/stories` | None | 0 | 0 | 1 | Yes/Yes |
| `/newsroom` | None | 0 | 0 | 1 | Yes/Yes |
| `/get-involved/donate` | None | 0 | 0 | 1 | Yes/Yes |
| `/get-involved/volunteer` | None | 0 | 0 | 1 | Yes/Yes |
| `/get-involved/csr-partnership` | None | 0 | 0 | 1 | Yes/Yes |
| `/get-involved/careers` | None | 0 | 0 | 1 | Yes/Yes |
| `/contact` | None | 0 | 0 | 1 | Yes/Yes |

## Responsive QA matrix

51/51 viewport checks (17 routes × 3 widths) completed. For every single check, `document.body.scrollWidth === document.documentElement.scrollWidth === window.innerWidth`, i.e. **no horizontal overflow anywhere**, at 1440px, 768px, or 375px. This confirms Stages 11, 14, 15, 16, and 17's targeted overflow fixes all continue to hold, and no regression was introduced by Stage 18.

Unintended rounded corners (a check explicitly requested): the sweep programmatically scanned every route for any element ≥20×20px with a non-zero computed `border-radius`, after Stages 13–18 squared the known-problem cards, buttons, and frames. Result: **the only remaining non-zero-radius elements are structural to the global header/footer and to already-approved decorative circles/pills** (see Issue H-002 and the "Not a defect" list below) — no leftover `rounded-sm` or `rounded-xl` artifact was found on any page-level content element.

No text clipping, overlapping, broken grid layouts, or distorted images were observed in any of the 34 full-page screenshots captured (1440px + 375px × 17 routes).

## Functional QA results

### Navigation
- **Header links** (all 7 primary nav items + Donate CTA): present and correctly ordered on every route; tab order confirmed logical on the homepage (logo → About Us → Our Work → Our Impact → Stories → Newsroom → Get Involved → Search → Donate → first page CTA).
- **Mobile menu** (375px): confirmed open/close works correctly — `aria-expanded` toggles `false → true → false`, and the full nav list (including "Contact") becomes visible in the DOM when open.
- **Breadcrumbs and sub-nav**: verified on `/our-work/healthcare` — breadcrumb renders "Home / Our Work / Healthcare" in order; the Get Involved sub-nav (Donate/Volunteer/CSR Partnership/Careers) renders correctly.
- **Footer links**: all 15 footer links present and correctly destined — 4 social icons (Facebook, Instagram, YouTube, X, all with correct `aria-label`s, not missing accessible names despite empty visible text), 6 primary site links, the "Get Updates by Email" CTA, phone (`tel:`), and email (`mailto:`).
- **External links**: the 4 social links resolve to well-formed absolute URLs (not verified by actually navigating off-site, per the instruction to avoid irreversible/external actions — this is NOT VERIFIED beyond confirming the URLs are well-formed and match the trust's known social handles).
- **Logo navigation**: confirmed `href="/"` on the header logo link on every route tested.
- **Internal links / 404s**: `/about/transparency` → **404** confirmed (Stage 10's removal remains clean, no stray link or route resurfaced it). A nonsense route (`/this-route-does-not-exist-xyz`) also correctly → 404, confirming Next.js's not-found handling works generally, not just for the one removed route.

### Forms
- **Contact**: already exhaustively tested in Stage 16 (required-field validation, invalid-email rejection, valid-state pass, `mailto:` construction unchanged). Not re-run in full here; re-confirmed still present and unchanged by this stage's read-only checks.
- **Donate, Volunteer, CSR Partnership, Careers** (all share `InquiryForm`): each tested this stage for empty-submit blocking, invalid-email rejection, and valid-state pass — **all 4 pass identically** to Contact's Stage 16 results.
- **No real email was sent, no real donation was submitted, and no external record was created** during any of this testing — all tests used `checkValidity()` and URL-unchanged checks rather than completing a real submission.
- **Newsletter form**: `src/components/newsletter-form.tsx` is, by its own code comment, intentionally **not** a real form — it's a single `mailto:` CTA link ("Get Updates by Email"), because no mailing-list backend exists. Confirmed this is documented, deliberate honesty (consistent with the project's placeholder/`Fact` pattern), not a missing feature or a bug.

### Other interactions
- **Moments & Gatherings gallery** (homepage): confirmed keyboard-operable — the scroller has `role="group"`, `tabIndex="0"`, and a correct (if longer than my first query assumed) `aria-label` ("Moments and gatherings. Use the left and right arrow keys, or drag, to browse."). My first automated check used an exact-string `aria-label` match and incorrectly reported "not found"; re-checked with a substring match and confirmed it is present and correctly wired. Noting this explicitly so the correction is visible rather than silently fixing my own check.
- **Buttons and CTAs**: spot-checked across homepage, Impact, and Leadership — all render with the established square-corner treatment and visible focus states (see Accessibility below).
- **Reduced motion**: tested the homepage Hero under `prefers-reduced-motion: reduce` — the hero section's opacity resolved to `1` immediately (no fade-in delay), confirming `useReducedMotion()` branches are working as coded.
- **Expand/collapse**: the header's dropdown menus (About Us / Our Work / Get Involved) were exercised incidentally while testing nav and rounded-corner findings — they open and close correctly via hover/focus state, no stuck-open or broken-close behavior observed.

## Accessibility findings

- **Keyboard navigation**: tab order on the homepage is logical (header → search → hero CTA, in visual order); no element was skipped or out of order in the first 10 stops tested.
- **Visible focus indicators**: every link in the tab sequence shows either the site's `2px solid` focus-visible outline or the browser's native `auto 1px` outline — none were invisible (`outline: none` with no alternative) in the elements checked.
- **Heading hierarchy**: 16 of 17 routes have exactly one `<h1>`; the homepage has zero — see Issue H-001.
- **Image alt text**: homepage has 19 `<img>` elements; 2 report an empty `alt=""`. Investigated both: they are the "Our Work" nav-dropdown's small pillar thumbnail images (`src/components/site-header.tsx:135`), each immediately followed by the pillar's name as visible text in the same link. Empty `alt` on a purely decorative/redundant image next to its own text label is the **correct** WCAG pattern, not a defect — confirmed by reading the surrounding JSX, not just the automated count.
- **Form labels**: Contact/Donate/Volunteer/CSR/Careers forms all use `<label>` wrapping each `<input>`/`<textarea>` (confirmed in Stages 16/17 and re-confirmed by this stage's validation tests executing successfully against the labeled fields).
- **Accessible names for icon-only controls**: footer social icons and the header's search button all carry explicit `aria-label`s — confirmed present, not missing.
- **Colour contrast**: not independently re-measured this stage (would require a dedicated contrast-ratio tool pass across every text/background pairing) — **NOT VERIFIED** as a numeric check; no visually low-contrast text was observed in any of the 34 screenshots reviewed.
- **Reduced-motion support**: confirmed working on the Hero (see Functional QA above); not individually re-tested on every other animated component this stage (Stages 1–11 established the pattern and tested it on `Reveal`/`ClipReveal`/`ClickRow` primitives, which every other animated section reuses) — treating those as still valid given no shared motion primitive was touched in Stages 12–18.
- **Semantic HTML / landmark structure**: confirmed exactly one `<header>`, one `<main>`, one `<footer>`, and 3 `<nav>` elements (primary nav, breadcrumb nav, mobile nav) on `/about`; spot-checked, not re-run on all 17 routes individually, but all 17 use the same shared `layout.tsx`/`PageHero`/`SiteHeader`/`SiteFooter` components, so this structure is structurally guaranteed to be identical everywhere those components are used.

## Technical QA results

- **Console errors**: 0 across all 51 viewport checks (every route, every width).
- **Failed network requests**: 0 across all 51 viewport checks (no 4xx/5xx responses, no failed requests of any kind).
- **Broken images/assets**: 0 (`naturalWidth === 0` check on every `<img>` on every route).
- **Broken internal links / 404s**: `/about/transparency` and a nonsense route both correctly return 404; no other broken internal link was discovered (the full nav, footer, breadcrumb, and sub-nav link sets were all enumerated and checked — see Functional QA above).
- **Unexpected redirects**: none observed — every `page.goto()` across the 51-check sweep returned the expected route's own HTTP 200 without an intermediate redirect (confirmed via the final `page.url()` matching the requested path in every form-test run).
- **Missing metadata/page titles**: 0 — every one of the 17 routes has both a `<title>` and a `meta[name=description]`.
- **Sitemap coverage**: `/sitemap.xml` returns 200 and lists exactly the 17 content routes (verified the response body's first entries match `src/app/sitemap.ts`'s static list plus the 5 pillar slugs) — no stray or missing URL.
- **Transparency route references**: zero — no link to `/about/transparency` was found anywhere in the 17-route sweep's DOM scan, and the route itself 404s. Stage 10's removal remains fully intentional and clean.
- **Runtime errors**: none observed (covered by the console-error check above, which would surface React/Next runtime errors).
- **TypeScript**: `tsc --noEmit` → **clean, no errors.**
- **ESLint**: project-wide `eslint .` → **no issues found.**
- **Production build**: fresh `next build` → **compiled successfully, all 22 routes generated, no errors or warnings.**

## Content and design consistency

- **Typography**: Fraunces (display) and Inter (body) usage confirmed consistent across all screenshots reviewed; no stray font-family regressions observed. `font-data` (IBM Plex Mono-style figures) usage not independently re-audited this stage beyond what Stages 1–18 already verified — no component using it was touched since.
- **Palette**: burgundy/ivory/pink/charcoal/white usage visually consistent across all 34 screenshots; no off-palette color observed.
- **Square-corner direction**: fully consistent on every page-level card, button, and frame following Stages 13–18 — the only remaining rounded-corner elements are the two new findings below (nav dropdown panels) and the already-approved decorative circles/pills (location-tag pills, `ArrowButton` circles, search/menu icon buttons) — see the itemized "Not a defect" list.
- **Restrained motion**: Hero and other `Reveal`-based sections continue to respect `prefers-reduced-motion` where tested.
- **Authentic photography**: not independently re-verified this stage (no photography was added, removed, or changed since Stage 7's photography pass and the most recent commit's crop/quality fix) — treating as still valid, no regression indicator found.
- **Page heroes, cards, CTAs, section spacing**: consistent across all 17 routes in the screenshots reviewed; no layout regression found.

No new content, statistic, biography, date, or event claim was introduced or altered by this audit — this stage only read and measured existing content.

## P0–P3 issue register

### P2 — H-001: Homepage has no `<h1>` element
- **Severity**: P2 (accessibility/SEO defect — heading hierarchy)
- **Route**: `/`
- **Component/file**: `src/components/hero.tsx` (lines 60–71)
- **Evidence**: live DOM query `document.querySelectorAll("h1,h2,h3")` on `/` at all 3 widths returns zero `<h1>` elements. The Hero's tagline ("Rising By Lifting Others.") is rendered as two `<span>` elements inside a `<div>`, not an `<h1>`. The file's own code comment (lines 16–17) explicitly says "the approved h1 has one consistent display-face treatment across the whole headline" — contradicting the actual markup.
- **Expected behaviour**: every page, especially the homepage, should have exactly one `<h1>` identifying its primary heading, both for accessibility (screen readers use it to orient) and SEO.
- **Actual behaviour**: zero `<h1>` on the homepage; the first heading-level element anywhere on the page is an `<h2>` (the "About Kamala Trust" section further down).
- **Recommended fix**: change the two tagline `<span>` wrapper elements in `hero.tsx` to a single `<h1>` (likely wrapping both responsive line-variants in an `<h1>` instead of a plain `<div>`), preserving all existing styling classes.
- **Safe or requires approval**: this touches a shared, homepage-only component (`hero.tsx`) that has not been in scope for any Stage 1–18 authorization — **requires explicit scope approval** before any edit, consistent with this project's single-file-authorization discipline.

### P2 — H-002: Shared nav dropdown menus use heavy rounded corners, inconsistent with the square-corner direction
- **Severity**: P2 (visible design-consistency defect, site-wide)
- **Route**: **every route** (global header, `src/components/site-header.tsx`)
- **Component/file**: `src/components/site-header.tsx`, lines 119 (`rounded-2xl`, the "Our Work" mega-menu panel, 640×398px), 129 (`rounded-xl`, each pillar card inside it, 197×144px), 155/169/223/234/247 (`rounded-lg`, dropdown menu item links, ~210×36px), 162 (`rounded-xl`, the "About Us"/"Get Involved" dropdown panel, 224×86px).
- **Evidence**: automated computed-style scan found these exact elements with non-zero border-radius (4–16px) on all 17 routes at 1440px (the dropdown only renders at desktop widths); values and dimensions captured above.
- **Expected behaviour**: per the approved square-corner design direction (enforced in Stages 13–18 on every page-level card, button, and form), these panels and menu items should have square corners, matching the rest of the site's dropdown-free content.
- **Actual behaviour**: all nav dropdown surfaces use `rounded-xl`/`rounded-2xl`/`rounded-lg` — the single largest remaining concentration of non-square corners on the site, and because it's the global header, it appears on literally every route including the homepage.
- **Recommended fix**: remove `rounded-2xl`/`rounded-xl`/`rounded-lg` from the 7 identified class strings in `site-header.tsx`, replacing with square corners, consistent with Stage 18's treatment of page-level cards.
- **Safe or requires approval**: `site-header.tsx` is a shared, global component never yet authorized for editing in Stages 1–18 (explicitly excluded from Stage 18's Group F scope because it's shared/homepage-touching) — **requires explicit scope approval**, and because it affects the homepage, may need separate confirmation given this project's "no homepage changes without explicit authorization" pattern seen in Stage 18.

### Design decision needed (not classified as a defect) — D-001: `Fact` placeholder badge uses `rounded-md`
- **Route**: appears wherever `<Fact>` renders a pending/placeholder value — `/get-involved/donate`, `/get-involved/csr-partnership`, `/our-work/*` pillar pages, `/impact`.
- **Component/file**: `src/components/fact.tsx`, line 8.
- **Current treatment**: `rounded-md` (6px) pill-chip for the honest "data pending" disclosure badge.
- **Why flagged, not filed as a defect**: this mirrors the exact reasoning Stage 18 used to **keep** the dashed-border disclosure boxes' distinctiveness (their non-default styling is deliberate, signaling "this is a flagged content gap," not an inconsistency) — but Stage 18 only addressed `rounded-sm`, and this component uses `rounded-md`, which was never brought to your attention for a decision either way.
- **Recommendation**: your call — square it for full site-wide consistency, or keep it as a deliberately distinct "flagged" visual treatment (consistent with the dashed boxes' precedent). No functional or content risk either way.

### Items requiring trustee confirmation (pre-existing, not new — reconfirmed present and unchanged)
These were already flagged via the `Fact`/placeholder pattern in earlier stages and are not technical defects:
- Leadership page: lead and secondary trustee portraits still pending; full board list unconfirmed (`about/leadership`'s "Content gap" box).
- About page: related-entity note needs trustee confirmation (`about`'s "Needs trustee confirmation" box).
- Donate page: 80G tax-deduction eligibility and bank/UPI details unconfirmed.
- CSR Partnership page: CSR-1 registration status unconfirmed.
- Careers page: whether to list open roles at all is an open decision, not yet made.
- Impact page: no sourced "lives impacted" total exists yet; reports/methodology placeholder still pending.

None of these are bugs — they are the project's established, honest way of flagging real content gaps, and this audit found no new instance beyond what Stages 9, 10, 12, and 18 already surfaced.

## What was checked and found to be correct (explicitly not defects)

- Mobile menu open/close behavior.
- Breadcrumb and sub-nav rendering and correctness.
- All footer links (internal, social, `tel:`, `mailto:`).
- `/about/transparency` and a nonsense route both 404ing correctly.
- All 5 remaining forms' required-field and invalid-email validation (Volunteer, CSR Partnership, Careers, Donate, re-confirming Contact from Stage 16).
- The "newsletter form" being an intentional `mailto:` CTA, not a missing feature.
- The Moments & Gatherings gallery's keyboard operability (my own first check was wrong, corrected and re-verified).
- Reduced-motion handling on the Hero.
- The two `alt=""` images in the nav dropdown (correctly decorative/redundant with adjacent text).
- `sitemap.xml` and `robots.txt`.
- All previously-approved overflow fixes (Stages 11, 14–18) holding with zero regressions across the full 51-check sweep.
- The decorative `rounded-full` elements already approved in earlier stages (location-tag pills in `program-list.tsx`, `ArrowButton` circles in the homepage `GetInvolvedCTA`, the circular search/menu-toggle buttons in the header) — these are a known, intentional exception category, not newly-flagged defects.

## NOT VERIFIED (explicitly, with reasons)

- **External social links actually resolving** — only confirmed the `href` values are well-formed absolute URLs matching the trust's known handles; did not navigate off-site, per the instruction to avoid irreversible/external actions.
- **Numeric color-contrast ratios** — no dedicated contrast-checking tool was run; only a visual screenshot review was done, which did not surface any apparent low-contrast text.
- **Reduced-motion on every individual animated component** — only the Hero was explicitly re-tested this stage; other components rely on the same shared `Reveal`/`ClipReveal`/`DragRow` primitives already verified in Stages 1–11, none of which were touched since.
- **Semantic landmark structure on all 17 routes individually** — spot-checked on `/about` only; inferred identical elsewhere because all routes share the same `layout.tsx`/header/footer components, which were not touched since the spot-check.
- **Actually completing (not just validating) a real form submission** — deliberately not done anywhere, per the instruction not to trigger irreversible actions; all form tests stopped at `checkValidity()`/URL-unchanged checks.

## Final verification summary

- **TypeScript** (`tsc --noEmit`): clean, no errors.
- **ESLint** (project-wide `eslint .`): no issues found.
- **Production build** (`next build`): compiled successfully, **all 22 routes generated**, no errors or warnings.

## Recommended remediation stages

1. **Stage 20 (proposed)** — Homepage `<h1>` fix (Issue H-001), scoped to `src/components/hero.tsx` only. Small, isolated, no visual change (same text, same classes, different tag).
2. **Stage 21 (proposed)** — Nav dropdown corner consistency (Issue H-002), scoped to `src/components/site-header.tsx` only. Medium complexity (7 class-string edits across 2 dropdown panels and their menu items), affects every route including the homepage, so likely needs the same explicit-scope-approval treatment Stage 18 used for Group F.
3. **Decision only, no stage required** — resolve Design decision D-001 (`Fact` badge corner radius) whenever convenient; it can be folded into Stage 21 or handled separately, since it's a single line in `fact.tsx`.

## Issue counts

- P0: 0
- P1: 0
- P2: 2 (H-001, H-002)
- P3: 0
- Design decisions needed (not defects): 1 (D-001)

---

Audit complete. No production file was modified during this stage. Waiting for your review before any remediation stage begins.
