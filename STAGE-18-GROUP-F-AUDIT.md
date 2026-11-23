# Stage 18 — Group F Audit: Remaining Inner-Page Corner Consistency

**This stage is audit-only. No production file was modified.**

## Git baseline

- Branch: `claude/kamala-trust-homepage-dev-b141a6`
- HEAD: `ab028d6 Fix photo crop alignment and raise image quality across the site`
- `git status --short` at the start of this stage (41 entries, all pre-existing from Stages 1–17, all previously approved and uncommitted):

```
 M .claude/launch.json
 M next.config.ts
 M src/app/about/page.tsx
 D src/app/about/transparency/page.tsx
 M src/app/contact/page.tsx
 M src/app/get-involved/donate/page.tsx
 M src/app/get-involved/volunteer/page.tsx
 M src/app/globals.css
 M src/app/layout.tsx
 M src/app/our-work/page.tsx
 M src/app/page.tsx
 M src/app/sitemap.ts
 M src/components/about-intro.tsx
 M src/components/container.tsx
 M src/components/cta-section.tsx
 M src/components/event-gallery.tsx
 M src/components/fact.tsx
 M src/components/get-involved-cta.tsx
 M src/components/hero.tsx
 M src/components/human-impact.tsx
 M src/components/impact-numbers.tsx
 M src/components/inquiry-form.tsx
 M src/components/leadership-teaser.tsx
 M src/components/motion.tsx
 M src/components/newsletter-form.tsx
 M src/components/newsroom-editorial.tsx
 M src/components/page-hero.tsx
 M src/components/program-list.tsx
 M src/components/recognition-strip.tsx
 M src/components/signature-initiatives.tsx
 M src/components/site-footer.tsx
 M src/components/site-header.tsx
 M src/components/stories-magazine.tsx
 M src/components/sub-nav.tsx
 M src/components/timeline.tsx
 D src/components/transparency-teaser.tsx
 M src/components/work-chapters.tsx
 M src/content/flagship-programs.ts
 M src/content/media.ts
 M src/content/nav.ts
 M src/content/newsroom.ts
 M src/content/stats.ts
 M src/content/stories.ts
 M src/content/types.ts
?? (28 untracked checkpoint/plan .md files + 5 untracked component files:
    src/components/books-publications.tsx, human-impact-archetype.tsx,
    motion-provider.tsx, named-programmes.tsx, quote-banner.tsx)
```

No file was added to or removed from this list during this stage. This audit only ran `grep` and `Read` against the working tree.

## Search method

`grep -rn "rounded-sm" src/app src/components` — exhaustive, whole-tree search. Each hit below was then opened in context to classify it. Also checked the 5 untracked homepage-only components introduced in earlier stages (`books-publications.tsx`, `named-programmes.tsx`, `quote-banner.tsx`, `human-impact-archetype.tsx`, `motion-provider.tsx`) — none contain `rounded-sm`.

## Complete occurrence inventory

| # | File | Line | Element | Route(s) | Type |
|---|---|---|---|---|---|
| 1 | `src/app/contact/page.tsx` | 24 | "Registered office" info card | `/contact` | Card |
| 2 | `src/app/contact/page.tsx` | 28 | "Phone" info card | `/contact` | Card |
| 3 | `src/app/contact/page.tsx` | 34 | "Email" info card | `/contact` | Card |
| 4 | `src/app/get-involved/donate/page.tsx` | 33 | "Bank transfer / UPI" info card | `/get-involved/donate` | Card |
| 5 | `src/app/get-involved/donate/page.tsx` | 39 | "Tax deduction" info card | `/get-involved/donate` | Card |
| 6 | `src/app/get-involved/donate/page.tsx` | 43 | "Giving at scale" info card | `/get-involved/donate` | Card |
| 7 | `src/app/get-involved/csr-partnership/page.tsx` | 31 | "CSR-1 registration" info card | `/get-involved/csr-partnership` | Card |
| 8 | `src/app/get-involved/csr-partnership/page.tsx` | 37 | "Where CSR funding fits" info card | `/get-involved/csr-partnership` | Card |
| 9 | `src/app/about/page.tsx` | 47 | "At a glance" `<aside>` fact card | `/about` | Card |
| 10 | `src/app/about/page.tsx` | 77 | "Needs trustee confirmation" disclosure box | `/about` | Dashed disclosure box |
| 11 | `src/app/impact/page.tsx` | 36 | Per-pillar impact card (×5, one `className` in a `.map()`) | `/impact` | Card |
| 12 | `src/app/impact/page.tsx` | 46 | "Methodology & reports" card | `/impact` | Card |
| 13 | `src/app/about/leadership/page.tsx` | 30 | Lead trustee portrait-placeholder frame | `/about/leadership` | Image/photo frame |
| 14 | `src/app/about/leadership/page.tsx` | 66 | "Also on the board" trustee card (×N in a `.map()`) | `/about/leadership` | Card |
| 15 | `src/app/about/leadership/page.tsx` | 76 | "Content gap" disclosure box | `/about/leadership` | Dashed disclosure box |
| 16 | `src/components/site-header.tsx` | 75 | Logo `<Link>` wrapper (rounds the focus-ring shape only; no fill/border/background) | **All pages, including homepage** | Shared component, non-visual use |
| 17 | `src/components/get-involved-cta.tsx` | 91 | "CSR" square badge inside the homepage Get-Involved CTA | **Homepage only** | Shared component, homepage |
| 18 | `src/components/about-intro.tsx` | 14 | Image frame (`ClipReveal`) in the homepage About teaser | **Homepage only** | Shared component, homepage |

## Exclusions and reasons

- **#16 `site-header.tsx`** — excluded. It's a shared component rendered on every route including the homepage (explicitly out of scope: "Do not include... Homepage changes" and this is also a *shared* component, not a page-level file, which is a separate category from Group F's page-level scope). Functionally, `rounded-sm` here only shapes the focus-visible outline on the logo link — there's no visible fill, border, or background on the link itself, so removing it would be cosmetically almost invisible and isn't the kind of "card/form/container" treatment Group F targets.
- **#17 `get-involved-cta.tsx`** — excluded. Renders only on the homepage (`GetInvolvedCTA` is a homepage-only section, imported in `src/app/page.tsx`). Out of scope per "Do not include... Homepage changes."
- **#18 `about-intro.tsx`** — excluded. Same reason: homepage-only component (`AboutIntro`, also imported only in `src/app/page.tsx`).
- The 5 untracked homepage-only components (`books-publications.tsx`, `named-programmes.tsx`, `quote-banner.tsx`, `human-impact-archetype.tsx`, `motion-provider.tsx`) contain no `rounded-sm` at all — nothing to exclude or include there.
- No `rounded-full` location-tag pills were found in this search (that pattern lives in `program-list.tsx`, already handled and approved in Stage 15); nothing here overlaps with it.
- Nothing found here duplicates work already completed in Stages 13–17 (page-hero, program-list, cta-section, inquiry-form, volunteer page `rounded-xl`) — this search specifically targeted `rounded-sm`, which those stages did not touch except where already removed as pre-existing drift (noted in their own checkpoints).

## Confirmed candidates (12 occurrences, 6 files)

All 12 remaining occurrences (#1–15, grouped into 6 files, with #11 and #14 each covering a `.map()` that repeats the same class across multiple rendered elements) are genuine instances of the same `rounded-sm border border-line/border-dashed bg-surface/bg-soft-bg p-N` card pattern already squared off everywhere else on the site (homepage cards, `/our-work` pillar cards, and the `InquiryForm` container/inputs in Stage 16). Removing `rounded-sm` from each is a direct, low-risk application of the same pattern already proven safe in Stages 14–17 — in every case it's a one-word class removal with no effect on layout, spacing, or any sibling element's geometry (confirmed in Stages 14–17, `border` without `rounded-*` does not change a box's width/height, only its corner rendering).

The one occurrence warranting a slightly closer look is **#13, the leadership-page portrait-placeholder frame** (`about/leadership/page.tsx:30`) — it's an image/photo frame (`aspect-[4/5]` box standing in for a missing trustee portrait), not a text card. The homepage's equivalent placeholder (Nidarshana's card in `leadership-teaser.tsx`, fixed in Stage 9) was never squared either — Stage 9 only fixed its aspect ratio and added initials, and never touched corner radius because `leadership-teaser.tsx`'s card uses a plain rectangle, not `rounded-sm`, to begin with. This leadership-page frame is a different, not-yet-touched file. Squaring it is consistent with the site-wide direction (no other content frame should keep a radius once the cards around it are square), and I see no functional risk — it's a static `<div>` with centered text and an absolutely-positioned caption, neither of which depends on the parent's border-radius.

## Exclusion risk check

I considered, and ruled out, two cases where keeping `rounded-sm` might be defensible:

1. **The two dashed "content gap" / "needs confirmation" disclosure boxes** (#10, #15) — these are deliberately distinct from ordinary cards (dashed border, warning color) to visually flag honest content gaps per the `Fact`/placeholder pattern used throughout this project. I considered whether their distinctiveness should extend to keeping a different corner treatment too, but concluded no — the dashed border and warning color already carry that distinction; the corner radius is incidental, not load-bearing for the "this is a flagged gap" signal. Recommend squaring these along with the rest for full consistency, but flagging this specific judgment call for your confirmation since Stage 12's original plan description for Group F ("card-level `rounded-sm`") didn't explicitly call these out.
2. **`about/leadership/page.tsx`** as a whole was never named in Stage 12's original Group F file list (which listed only `about/page.tsx`, `impact/page.tsx`, `contact/page.tsx`, `donate/page.tsx`, `csr-partnership/page.tsx`). I'm including it here because this stage's instruction is to find "all remaining `rounded-sm` corner treatments on inner pages," which is broader than the original proposal. Flagging explicitly: implementing this file means expanding Group F's scope slightly beyond what was originally proposed.

## Proposed file-by-file implementation scope (pending your approval — nothing implemented)

### 1. `src/app/contact/page.tsx`
- **Current**: 3 info cards (`rounded-sm border border-line bg-surface p-6`) at lines 24, 28, 34.
- **Proposed**: remove `rounded-sm` from all 3.
- **Why**: matches the square-corner cards already established on the homepage, `/our-work` pillar pages, and `InquiryForm`.
- **Test**: `/contact` at 1440/768/375px (note: this page already has the Stage 14 `break-all` email fix in place — must remain untouched).

### 2. `src/app/get-involved/donate/page.tsx`
- **Current**: 3 info cards at lines 33, 39, 43.
- **Proposed**: remove `rounded-sm` from all 3.
- **Why**: same square-corner consistency.
- **Test**: `/get-involved/donate` at 1440/768/375px. Preserve the embedded `<Link>` to CSR Partnership inside the third card.

### 3. `src/app/get-involved/csr-partnership/page.tsx`
- **Current**: 2 info cards at lines 31, 37.
- **Proposed**: remove `rounded-sm` from both.
- **Why**: same square-corner consistency.
- **Test**: `/get-involved/csr-partnership` at 1440/768/375px. Preserve the embedded `<Link>` to Our Work inside the second card.

### 4. `src/app/about/page.tsx`
- **Current**: "At a glance" aside (line 47) and "Needs trustee confirmation" dashed disclosure box (line 77).
- **Proposed**: remove `rounded-sm` from both.
- **Why**: same square-corner consistency; the dashed box's distinctiveness comes from its border style and color, not its corner radius (see Exclusion risk check #1 above — flagging for your confirmation).
- **Test**: `/about` at 1440/768/375px. Preserve the `Timeline` and `EventGallery` sections below, untouched.

### 5. `src/app/impact/page.tsx`
- **Current**: 5 per-pillar cards sharing one `.map()`-rendered className (line 36) and the "Methodology & reports" card (line 46).
- **Proposed**: remove `rounded-sm` from the shared `.map()` className and from the methodology card.
- **Why**: same square-corner consistency.
- **Test**: `/impact` at 1440/768/375px, specifically checking the `sm:grid-cols-2 lg:grid-cols-3` card grid for any layout shift (none expected, since `border` alone doesn't affect box size).

### 6. `src/app/about/leadership/page.tsx` — **expanded scope, not in original Group F list**
- **Current**: lead-trustee portrait placeholder frame (line 30), "Also on the board" trustee cards (line 66, one `.map()`), "Content gap" dashed disclosure box (line 76).
- **Proposed**: remove `rounded-sm` from all three.
- **Why**: same square-corner consistency; flagged above as outside the original Group F file list, included here because the instruction asked for "all remaining" occurrences.
- **Test**: `/about/leadership` at 1440/768/375px. This page is unauthorized content-wise (its own "Content gap" box flags missing trustee data) — the corner-radius change must not touch any of that pending-content language, portrait-placeholder initials logic, or trustee bio text.

## Recommended verification plan (for the eventual implementation stage)

- **Routes**: `/contact`, `/get-involved/donate`, `/get-involved/csr-partnership`, `/about`, `/impact`, `/about/leadership` — 6 routes total.
- **Viewports**: 1440px, 768px, 375px on each route — confirm `document.body.scrollWidth === document.documentElement.scrollWidth === window.innerWidth` (no overflow introduced) and a live `getComputedStyle(...).borderRadius === "0px"` check on each edited element.
- **Keyboard**: tab through the `Link`s embedded inside the Donate and CSR Partnership cards (to Our Work / CSR Partnership respectively) — confirm they're unaffected and still carry their existing (unrelated to this change) focus treatment.
- **Content integrity**: diff each file against its pre-edit state to confirm only `className` strings changed — no copy, data binding, or structural JSX changed.
- **Build**: `tsc --noEmit`, `eslint` scoped to the 6 files, fresh `next build`, all 22 routes.
- **Screenshots**: before/after at all 3 widths for at least 2 representative routes (recommend Impact's card grid and Leadership's trustee cards, since those are the two files with `.map()`-driven repeated elements, the highest-leverage/highest-risk-of-oversight spots).

## Confirmation

No production file was changed during this audit. Only `grep` (read-only) and `Read` tool calls were used to inspect source; no `Edit` or `Write` call touched any file under `src/`. `git status --short` is unchanged from the start-of-stage baseline recorded above.

---

Waiting for your approval and scope decision (in particular: confirm whether to include `about/leadership/page.tsx`, and whether to square the two dashed disclosure boxes) before any implementation.
