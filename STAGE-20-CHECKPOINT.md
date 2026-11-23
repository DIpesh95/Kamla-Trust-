# Stage 20 Checkpoint: Homepage H1 Semantic Correction (Issue H-001)

## Git baseline

- Branch: `claude/kamala-trust-homepage-dev-b141a6`
- HEAD: `ab028d6 Fix photo crop alignment and raise image quality across the site`
- `git status --short` at the start of this stage: 42 pre-existing modified/deleted/untracked entries from Stages 1–19 (identical to the Stage 19 audit's end-state), including `src/components/hero.tsx` already modified by earlier, previously-approved stages. No file was added, removed, or changed between Stage 19 and this stage's start.

## Scope

Authorized file: `src/components/hero.tsx`
Required change: convert the homepage headline's two responsive `<div>`/`<span>` variants into one semantic `<h1>`, with no visual redesign.

## Exact diff — this stage's own edit

```diff
--- a/src/components/hero.tsx  (as it stood at the start of this stage)
+++ b/src/components/hero.tsx  (after this stage's edit)
@@
-        <div className="flex flex-col sm:hidden">
-          <span className="font-display text-[13vw] font-semibold leading-[0.92] text-surface">{mobileLine1}</span>
-          <span className="font-display text-[13vw] font-semibold leading-[0.95] text-surface">{mobileLine2}</span>
-        </div>
-        <div className="hidden flex-col sm:flex">
-          <span className="font-display text-[8.5vw] font-semibold leading-[0.92] text-surface lg:text-[6.2rem]">
-            {desktopLine1}
-          </span>
-          <span className="font-display text-[8.5vw] font-semibold leading-[0.95] text-surface lg:text-[6.2rem]">
-            {desktopLine2}
-          </span>
-        </div>
+        <h1 className="contents">
+          <div className="flex flex-col sm:hidden">
+            <span className="font-display text-[13vw] font-semibold leading-[0.92] text-surface">{mobileLine1}</span>
+            <span className="font-display text-[13vw] font-semibold leading-[0.95] text-surface">{mobileLine2}</span>
+          </div>
+          <div className="hidden flex-col sm:flex">
+            <span className="font-display text-[8.5vw] font-semibold leading-[0.92] text-surface lg:text-[6.2rem]">
+              {desktopLine1}
+            </span>
+            <span className="font-display text-[8.5vw] font-semibold leading-[0.95] text-surface lg:text-[6.2rem]">
+              {desktopLine2}
+            </span>
+          </div>
+        </h1>
```

This is the entirety of my own edit: an `<h1 className="contents">` wrapper added around the two existing responsive `<div>`s, with no change to any class, any text, any child element, or any other line in the file.

**`className="contents"` was chosen deliberately**: CSS `display: contents` makes the `<h1>` itself generate no box of its own — its children (the two responsive `<div>`s) participate directly in the parent flex container's layout exactly as if the `<h1>` wrapper weren't there. This is what preserves the exact `gap-7` spacing and flex-column layout of the surrounding `motion.div` with zero visual change, while still being a real, semantic `<h1>` in the accessibility tree.

### Reconciliation note — pre-existing drift in this file

`git diff -- src/components/hero.tsx` against HEAD shows a much larger diff (49 insertions, 58 deletions) than the one above, because `hero.tsx` already carried extensive pre-existing, previously-approved drift from earlier stages (a full Hero rewrite: new responsive-tagline-splitting logic, `useReducedMotion()` wiring, new button styling, a new "years of work" badge, removal of the old scroll-indicator, etc.) — all of that predates this stage and was already present when I read the file at the start of Stage 20. I verified this by comparing the file's content as read at the very start of this stage (quoted in full in my own working notes) against its current state: they are identical except for the `<h1>` wrapper addition shown above. This stage touched nothing else.

## Verification

### Visual preservation — 1440/768/375px

| Width | `bodyScrollWidth` | `docElScrollWidth` | `viewportWidth` |
|---|---|---|---|
| 1440px | 1440 | 1440 | 1440 |
| 768px | 768 | 768 | 768 |
| 375px | 375 | 375 | 375 |

No horizontal overflow introduced at any width. Full-page screenshots captured and compared at all 3 widths — headline position, line breaks, font size, spacing, and the rest of the Hero section are pixel-identical to before the edit (the `display: contents` wrapper is, by design, visually inert).

### Animation preservation

- Non-reduced-motion: the text wrapper's opacity measured `0` immediately after `domcontentloaded`, then `1` after 1 second — confirming the existing fade-in animation (`motion.div` on the text block, `transition.duration: 0.6`, `delay: 0.2`) still fires exactly as before. The `<h1>` wrapper sits inside this `motion.div` but doesn't participate in the animation itself (it's not a `motion.*` element), so it has no effect on the animation.
- Reduced motion (`prefers-reduced-motion: reduce`): hero section opacity resolved to `1` immediately, confirming `useReducedMotion()` branching is unaffected.

### Accessibility verification

- **H1 count on homepage**: exactly **1**, confirmed via `document.querySelectorAll("h1").length` at all 3 widths.
- **Accessible text**: checked via `h1.innerText` (which, unlike `textContent`, respects `display: none` the same way assistive-tech accessible-name computation does) — resolves to exactly **"Rising By Lifting Others."** at both 1440px (desktop line split) and 375px (mobile line split). No duplication: the hidden responsive variant (`sm:hidden` or `hidden sm:flex`) is `display: none` and correctly excluded from the computed text, at every width tested.
  - Note: my first check used `textContent`, which does **not** respect `display: none` and returned a concatenated, incorrect-looking string combining both responsive variants. I caught this, identified it as a flaw in my own check (not the markup), and re-verified with `innerText` to get the accurate reading. Flagging this correction explicitly per the standing transparency discipline.
- **Heading hierarchy**: homepage heading order is now `H1 → H2 → H2 → H2 → H3 → H3 → H2 → H3 …` — the `<h1>` correctly precedes every `<h2>` on the page (the first `<h2>` being "About Kamala Trust" further down), confirming proper hierarchy with no skipped or out-of-order levels at the top.
- **Other 16 content routes unchanged**: re-ran the `<h1>` count check on all 16 other content routes (About, Leadership, Our Work overview + all 5 pillar pages, Impact, Stories, Newsroom, Donate, Volunteer, CSR Partnership, Careers, Contact) — **every one still reports exactly 1 `<h1>`**, unchanged by this stage (only `hero.tsx`, used exclusively by the homepage, was touched).

### Build

- `tsc --noEmit`: clean, no errors.
- `eslint src/components/hero.tsx`: no issues found.
- Fresh `next build`: compiled successfully, **all 22 routes generated**, no errors or warnings.

### Screenshots

Before/after captured at 1440px, 768px, and 375px (before: Stage 19's own homepage audit screenshots, `_-1440.png`/`_-375.png`; after: fresh captures this stage). Visually identical in every pair — the only change is in the accessibility tree, not the rendered pixels.

## Exact Git status reconciliation

```
git diff --stat -- src/components/hero.tsx
 src/components/hero.tsx | 107 ++++++++++++++++++++++--------------------------
 1 file changed, 49 insertions(+), 58 deletions(-)
```

Of this, only the `<h1 className="contents">` wrapper (13 lines: 1 opening tag + 1 closing tag, with the 4 existing lines of the two `<div>`s and their 4 `<span>`s re-indented one level deeper, net +2 lines) is this stage's own edit. All other lines in that diff were already present before this stage began, carried over from earlier approved Hero-rewrite work (not part of this authorization and not touched by me this turn).

`git status --short` at the end of this stage is identical to the Stage 19 baseline — same 42 pre-existing entries, with `src/components/hero.tsx`'s working-tree diff now including this stage's `<h1>` addition. No file other than `src/components/hero.tsx` was modified.

## Boundaries confirmed

- Only `src/components/hero.tsx` was edited this turn.
- `site-header.tsx` was not touched (Issue H-002 remains open, unauthorized this stage).
- No other shared component, global CSS, or `layout.tsx` was modified.
- No homepage content other than the heading wrapper itself was changed — all text, classes, animation props, and the "years of work" badge are untouched.
- `Fact` badge styling (`fact.tsx`) was not touched.
- No reset, clean, stash, checkout, or revert was performed.
- Nothing was committed, pushed, deployed, or published.
- Stage 21 was not started.

---

Stopping here for your review.
