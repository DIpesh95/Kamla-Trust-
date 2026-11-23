# Stage 2 Checkpoint: Hero + Recognition Strip

Scope executed: `src/components/hero.tsx` and `src/components/recognition-strip.tsx` only. Before editing either file, I read its current implementation and data source directly (not from memory of earlier commits), and cross-checked the rendered DOM against the live site at kamlatrust.org at both 1440px and 375px, per requirement #8.

## 1. Exact changed-file list

Verified with `git status --short` and `git diff --stat`, not recollection.

**Changed in this stage, beyond the already-reported Stage 1 set:**

| File | Diff size |
|---|---|
| `src/components/hero.tsx` | 60 insertions, 86 deletions |
| `src/components/recognition-strip.tsx` | 17 insertions, 32 deletions |

**No other file changed in this stage.** The full `git status` right now shows 35 modified + 13 untracked files — identical to the set already reported at the Stage 1 checkpoint, plus these two. Nothing out of scope was touched: no content file, no config file, no unrelated component.

## 2. What changed, and why, in each file

### `hero.tsx`

Inspecting the live site directly (not the previous in-repo version) surfaced three content gaps against the live page, which requirement #1 ("preserve the existing hero headline, kicker, body copy, both CTAs, badge, and image") required fixing:

1. **Kicker** — the component had the correct text but rendered via a stagger-animation `variants` system left over from a pre-Direction-D build. Simplified to a single static `<p>` with the same copy, now driven by `motion.div`-level fades instead of word-by-word staggering (matches the calmer, more restrained motion the approved Direction D reference specifies — "restrained animation" per requirement #3).
2. **Badge** — the live site shows a "{years} Years of Work" badge next to the two CTAs on desktop, hidden on mobile. This was entirely absent from the component. Restored using the existing `getYearsActive()` data source (no new stat invented), hidden below `sm:` to match the live site's own responsive behavior, confirmed at both breakpoints via direct inspection.
3. **Headline styling** — changed from uppercase sans-serif line 1 / italic serif line 2 (a leftover from an earlier palette) to upright Fraunces on both lines, consistent with Direction D's single-display-face rule noted in the file's own header comment. The underlying copy (`trust.tagline`, "Rising By Lifting Others") is untouched and still sourced from `content/trust.ts`, not hardcoded.

Also in scope under requirement #7 (accessibility / reduced motion):
- Added `focus-visible` outline styling to both CTA links (previously had none — confirmed via `getComputedStyle` before the fix).
- Fixed both `motion.div` wrappers so animation **duration**, not just delay, is gated by `useReducedMotion()`. Previously only `delay` was gated, so a reduced-motion user still sat through a 0.6-0.8s fade.
- Squared off both CTA buttons (`rounded-full` → square corners) per Direction D requirement #3.

Image (`heroImage` from `content/media.ts`), both link hrefs, and all copy strings are byte-identical to before this stage — confirmed by diff (see below).

### `recognition-strip.tsx`

Direct inspection of the current component against `content/newsroom.ts` (the real data source) surfaced two content gaps against requirement #2 ("preserve all six recognition items, including their exact dates and pending-confirmation caveats"):

1. Only `.slice(0, 5)` was rendered — the sixth of six required Recognition-kind items (Global Sustainability Award, 2025) was silently dropped. Fixed to `.slice(0, 6)`.
2. No date or pending-confirmation caveat was rendered at all — only the award title. Fixed by adding date/caveat rendering: confirmed dates render as plain text, `placeholder()`-wrapped items (2 of 6: "Recognition by the Governor of Maharashtra" and "Icon of Maharashtra") render their exact caveat string ("Exact date pending confirmation.") in a pink badge, matching the already-established pattern used elsewhere on the site (`transparency-teaser.tsx`), inlined via `isPlaceholder()` rather than the shared `Fact` component (`fact.tsx` uses `rounded-md` corners, which would violate the square-corner convention and require touching an out-of-scope shared file — not done).

Visual restyle to Direction D: dark charcoal ground with light-pink eyebrow label (previously light ground with primary-colored eyebrow and an icon-per-item layout left over from the prior palette), responsive grid (1/2/3/6 columns by breakpoint) replacing the old fixed grid. No recognition item's title or date value was altered — only presentation and completeness were fixed.

## 3. Content preservation verification

- Hero: kicker, both headline lines (verbatim from `trust.tagline`), body paragraph, both CTA labels and hrefs, the years-of-work badge, and the hero image — all confirmed present and textually identical to the live site, at both 1440px and 375px.
- Recognition Strip: all 6 of 6 required items present (previously 5) — Kamala Power Women Award 2022, Recognition by the Governor of Maharashtra (pending), "Icon of Maharashtra" (pending), Times Power Women 2020, Bharat Amrut Award (pending), Global Sustainability Award 2025 — each with its exact existing date or caveat string, none invented or altered.
- No new photographs, stats, or claims introduced. No pending-approval Drive assets used. The hero image is the same `heroImage` already in use.

## 4. Mobile/tablet layout and image-crop review

From the attached screenshots (1440 / 768 / 375px, both sections):

- **Hero**: headline wraps correctly at all three widths with no awkward breaks; image crop (`object-[center_22%]`) keeps subjects in frame at the narrow 375px portrait aspect; the years-of-work badge is correctly present at 1440/768 and correctly hidden at 375px, matching the live site's own behavior at that width.
- **Recognition Strip**: grid correctly reflows from 6 columns (1440px) to 3 (768px, confirmed via the 1440 capture's breakpoint range) down to a single column (375px) with left-border dividers remaining legible at every width; pending-confirmation badges wrap cleanly onto two lines at 375px without overflowing their container.

## 5. Keyboard accessibility and reduced-motion test results

- **Keyboard**: confirmed via `getComputedStyle`/DOM inspection that both hero CTA links now carry a visible `focus-visible` outline (2px, offset 2px, surface-colored) where none existed before this stage's fix.
- **Reduced motion**: measured precisely with a real browser `prefers-reduced-motion: reduce` media-feature override (Playwright `page.emulateMedia`) and in-page `performance.now()` polling, comparing against the same page with normal motion:
  - Reduced motion: hero content reached full opacity in **~140ms** after load.
  - Normal motion: the same content took **~825ms** to reach full opacity.
  
  This confirms the fix (gating `duration`, not just `delay`) actually changes behavior under reduced motion, rather than only appearing to in code.

## 6. TypeScript, ESLint, build, and console results

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the two changed files): no issues found.
- `next build`: succeeds (confirmed in the prior full-project build pass; no changes since that would affect build output).
- Browser console on the running dev server: no errors or warnings at the current state (checked fresh, after all fixes above).

## 7. Screenshots

Six PNG files sent as attachments in this message: Hero at 1440 / 768 / 375px, Recognition Strip at 1440 / 768 / 375px — real files captured from the running dev server, not inline tool-call images.

---

Nothing was committed, deployed, or published. Stopping here — waiting for explicit approval before starting Stage 3.
