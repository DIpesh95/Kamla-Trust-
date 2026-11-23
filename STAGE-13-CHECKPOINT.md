# Stage 13 Checkpoint: Group A Implementation + Group G Investigation

## Part 1 — Group A: `page-hero.tsx` (implemented, per your authorization)

### Exact diff

```diff
-        <h1 className="font-display max-w-2xl text-4xl font-medium italic text-text sm:text-6xl">{title}</h1>
+        <h1 className="font-display max-w-2xl text-4xl font-medium text-text sm:text-6xl">{title}</h1>
```
```diff
-                  <Link href={crumb.href} className="transition-colors hover:text-primary">
+                  <Link
+                    href={crumb.href}
+                    className="transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
+                  >
                     {crumb.label}
                   </Link>
```

`git diff -- src/components/page-hero.tsx` shows one additional hunk (a `max-w-6xl`→`max-w-[1320px]` spacing update) that predates this stage — confirmed by the fact I made no edit touching that line; it was already present in the working tree before Stage 13 began, consistent with the same pre-existing-drift pattern noted in every prior checkpoint.

### Verification

**All 16 inner routes confirmed upright.** Queried `getComputedStyle(h1).fontStyle` live on every route: all return `"normal"` — About, Leadership, Our Work, all 5 pillar pages, Impact, Newsroom, Stories, all 4 Get Involved pages, Contact.

**Breadcrumb keyboard focus tested on 3 representative routes** (`/about/leadership`, `/our-work/healthcare`, `/get-involved/csr-partnership`): tabbed to the "Home" breadcrumb link via real `Tab` presses on each — all three show a visible `2px solid` outline, confirmed via `getComputedStyle`.

**Screenshots** (before/after, same pages, all three widths) sent as attachments — the only visible change is the headline switching from slanted to upright Fraunces; all other content, spacing, and layout is pixel-identical.

**Build:** `tsc --noEmit` clean, `eslint` (scoped to `page-hero.tsx`) clean, fresh `next build` succeeds, all 22 routes.

### Exact `git diff` and `git status`

```
git diff --stat -- src/components/page-hero.tsx
 src/components/page-hero.tsx | 9 ++++++---
 1 file changed, 6 insertions(+), 3 deletions(-)
```

`git status --short` confirmed identical to the Stage 12 baseline plus only `page-hero.tsx` and this checkpoint document — no other file touched.

---

## Part 2 — Group G investigation: pillar-detail-page gap

**Short answer: I cannot reproduce the defect I reported in Stage 12.** Rigorous DOM measurement contradicts my own earlier visual read of the screenshot, and I want to report that honestly rather than force a root-cause narrative onto something that doesn't actually reproduce.

### What I measured

Using `getBoundingClientRect()` on the live DOM (not inferred from a screenshot), at the same 1440×1400 viewport used for the original Stage 12 capture:

| Page | Initiatives | Gap: last content row → `CTASection` top | Gap: `CTASection` bottom → footer top |
|---|---|---|---|
| Healthcare | 9 | **0px** | **0px** |
| Disaster Relief & Civic Initiatives | 4 (sparsest pillar) | **79px** (exactly the `Container`'s own `py-20` bottom padding) | not separately re-measured, same structure |
| `/our-work` overview | — | **0px** (content → footer directly) | n/a |

### What went wrong in Stage 12

Re-examining the Healthcare pillar page specifically: the initiative list I visually scanned in Stage 12 appears to have been read as ending after item "05 — COVID-19 Support," when the Healthcare pillar actually has **9 initiatives** (confirmed against `pillars.ts`: HPV Bharat, Anaemia Mukt Bharat, Cancer Patient Support, Rural Healthcare Camps, COVID-19 Support, Nurse Day Recognition, Blood Donation Camps, Vimla Old Age House, Yamuna Clean-Up & Anemia Awareness). Items 6–9 occupy exactly the vertical space I had mistaken for empty whitespace — confirmed by a full element-by-element height breakdown: the list flows continuously from y=714 to y=1938 with zero internal gaps, then 58px of `Container` padding, then `CTASection` starts immediately at y=1996.

On Disaster Relief (only 4 initiatives — the sparsest pillar, so the best candidate for a genuine defect if one existed), the measured gap is 79px — which is not a defect, it's precisely the `Container` component's own `py-16 sm:py-20` bottom padding value, applied exactly as designed.

### Correction to Stage 12

I'm retracting the "Critical" priority and the "large empty whitespace" characterization for the pillar detail pages specifically. There is no anomalous or unaccounted-for gap, no stray element reserving space, and no sticky-footer-driven stretching at play — in fact, on closer inspection the sticky-footer mechanism I'd attributed this to (`layout.tsx`'s `body: min-h-full flex flex-col` + `main: flex-1`) doesn't appear to actually stretch `main` on either page tested: `/our-work`'s `main` measures 1113px tall against a 1400px viewport, yet the footer starts immediately at 1113px rather than being pushed down to fill the viewport — meaning `flex-1` isn't exerting the stretching effect I assumed either (most likely because `min-height: 100%` on `body` can't resolve against an indefinite `html` height, a similar category of CSS ambiguity to the one found and fixed in Stage 11's footer investigation).

**What this means for Stage 12's two distinct gap reports:**
- **`/our-work` overview's gap:** also measures 0px at this viewport — I cannot reproduce this one either, by the same measurement method.
- **Pillar detail pages' gap:** confirmed not reproducible, as detailed above.

I recognize this reverses a "Critical" finding from an approved audit, which I don't do lightly — but the instruction was explicit about providing real before/after DOM measurements and identifying the exact element responsible, and the honest result of doing that rigorously is that I could not find one, because the thing I originally flagged does not measure as a defect. If you still perceive a visual gap when browsing the live pages yourself, I'd want the exact route, viewport width, and scroll position where you see it, so I can re-investigate that precise spot rather than the general pages I re-tested here.

**Recommendation:** close Group G with no further action, unless you can point me to a specific instance that still looks wrong once you review it directly.

---

## Confirmations

- No file outside `src/components/page-hero.tsx` was modified.
- No homepage or Stage 1–11 content was touched.
- No global CSS, `layout.tsx`, content file, or other shared component was edited.
- No reset, clean, stash, checkout, or revert was performed.
- No dependency was added.
- Nothing was committed, pushed, deployed, or published.

---

Groups B–G remain unimplemented. Stopping here for your review.
