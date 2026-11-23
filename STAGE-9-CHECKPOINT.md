# Stage 9 Checkpoint: Leadership

Scope executed: `src/components/leadership-teaser.tsx` only. `src/app/about/leadership/page.tsx`, `src/content/trust.ts`, and `src/content/types.ts` were not touched.

## 1. Scoping clarification — same pattern as Stages 3–8

`git diff --stat -- src/components/leadership-teaser.tsx` reports **65 insertions, 19 deletions**. That full diff is against the last commit and includes substantial pre-existing, already-approved work from earlier in this engagement (the file had already been rebuilt from a single-trustee rounded-avatar card to the two-trustee layout before this stage began). **My own Stage 9 work was exactly two edits:**

**Edit 1 — the approved structural changes (B, C, D, and the heading from A):**
- Added `HONORIFICS` set + `getInitials()` helper, replacing the old single-initial logic.
- Added the missing `<h2>The people carrying this forward.</h2>` directly below the eyebrow.
- Replaced the `PersonGlyph` icon + "Portrait pending" treatment with: `TRUSTEE PHOTOGRAPHY PENDING` badge, `NG` initials, and the disclosure "Shown as initials until cleared by the trustees."
- Changed the grid ratio from `lg:grid-cols-[1.6fr_1fr]` to `lg:grid-cols-[0.8fr_1.3fr]` — Ramesh's column now wider.
- Added `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface` to the "Meet the Trustees" link.
- Kept both trustee names as `<h3>` (per your decision D), now both nested correctly under the new `<h2>`.

**Edit 2 — a necessary fix found during verification, not separately pre-approved:**
- Changed Nidarshana's card from a fixed `aspect-[4/3] sm:aspect-[16/11]` (landscape) to `min-h-[380px]` (content-driven height). **Why:** adding the initials line and disclosure text (required by approved change B) made the card's content taller than the old landscape aspect ratio could hold, and the box had `overflow-hidden` — the bio text was being silently clipped at the bottom at both 1440px (31px cut off) and 375px (73px cut off), confirmed by direct measurement before I touched it. This is also a closer match to the live site's own measured proportions (414×550, a portrait ~3:4 ratio, not the landscape ratio the old code used). I did not ask before making this fix because shipping a clipped bio would have violated your own explicit verification requirement ("No clipping... within the Leadership section") — but I'm flagging it clearly here as a necessary consequence of implementing approved change B correctly, not an independent redesign decision.

No other file changed — confirmed via `git status --short`, identical to the Stage 8 close plus this one file.

## 2. Content verification

- Both trustees' names, roles, and full biographies confirmed unchanged, verbatim — read directly from `trust.ts` (not modified) and compared against the rendered DOM.
- No designation invented or altered.
- No portrait image added anywhere — both trustees remain explicitly marked pending (Nidarshana via initials + badge, Ramesh via the unchanged "shown in type only" disclosure).
- No stock photography, AI portrait, or Drive asset used.
- Full `/about/leadership` page confirmed **byte-for-byte unchanged** — pulled its full rendered text after the build and compared against the pre-Stage-9 capture: identical in every respect (single "N" initial, same pull-quote, same Selected Roles, same "Also on the board" section, same "Content gap" disclosure).

## 3. Verification results

**NG initials — correct.** `getInitials("Smt. Nidarshana Gowani")` filters out the honorific "Smt." and joins the first letters of "Nidarshana" and "Gowani" → confirmed rendering as "NG" in the DOM, not "N".

**Heading hierarchy — correct and unique.** Queried the rendered DOM: exactly one `<h2>` in this section ("The people carrying this forward."), with both trustee `<h3>`s nested inside the same `Reveal`/grid beneath it — no duplicate heading, no orphaned heading level.

**Column width ratio — corrected, matches live proportions.** Measured the two cards directly: **436px (Nidarshana) vs. 708px (Ramesh)** at 1440px — Ramesh's card is now visibly wider, matching the live site's measured 414px/690px ratio (436/708 = 0.616 vs. live's 414/690 = 0.600 — very close).

**No clipping or horizontal overflow within the Leadership section — confirmed after the fix.** Re-measured all three widths directly: bio text bottom now sits above the card's bottom edge at 1440px, 768px, and 375px (previously clipped by 31px and 73px respectively before the fix). `document.body.scrollWidth` does exceed the 768px viewport sitewide (865px) — this is the already-known, separately-approved footer overflow (issue #5), reconfirmed present and unrelated to Leadership, not touched.

**Keyboard focus — tested via real Tab navigation, not a bare `.focus()` call.** (An initial check using `element.focus()` directly showed no visible outline — this turned out to be a Chromium quirk where programmatic focus without prior keyboard interaction doesn't reliably trigger `:focus-visible`; re-tested by actually pressing Tab repeatedly from page load, which is the correct test and is what a real keyboard user experiences.) Result: a visible white `2px solid` outline on the "Meet the Trustees" link.

**Reduced motion — tested in a real browser.** Measuring the card's `Reveal` opacity every frame for 900ms: reduced motion reaches ~0.998 by ~247ms, fully settled by ~313ms; normal motion ramps smoothly (0 → 0.39 → 0.66 → 0.81 → ... → 1.0) across the full ~858ms window — the same timing profile as every other `Reveal`-based section, confirming the pattern carries over correctly.

**Mobile and tablet stacking — clean.** At 768px and 375px, both cards stack to full width below the `lg:` breakpoint; text wraps normally; no overlapping elements.

## 4. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors (checked twice — before and after the clipping fix).
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first, re-run after the fix): succeeds, all 23 routes, 0 errors, 0 warnings.

## 5. Screenshots

Three PNG files sent as attachments above: 1440px, 768px, 375px — all showing the corrected, unclipped layout.

## 6. Final `git status --short`

```
 M .claude/launch.json
 M next.config.ts
 M src/app/about/page.tsx
 M src/app/globals.css
 M src/app/layout.tsx
 M src/app/our-work/page.tsx
 M src/app/page.tsx
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
 M src/components/recognition-strip.tsx
 M src/components/signature-initiatives.tsx
 M src/components/site-footer.tsx
 M src/components/site-header.tsx
 M src/components/stories-magazine.tsx
 M src/components/sub-nav.tsx
 M src/components/timeline.tsx
 M src/components/transparency-teaser.tsx
 M src/components/work-chapters.tsx
 M src/content/flagship-programs.ts
 M src/content/media.ts
 M src/content/newsroom.ts
 M src/content/stats.ts
 M src/content/stories.ts
 M src/content/types.ts
?? BASELINE-RECONCILIATION-REPORT.md
?? D2-IMPLEMENTATION-PLAN.md
?? D2-SECTION-AND-PHOTOGRAPH-MAPPING.md
?? EXISTING-WEBSITE-CONTENT-INVENTORY.md
?? FINAL-PENDING-ASSETS.md
?? PENDING-VISUAL-ISSUES.md
?? PHOTOGRAPHY-ASSET-REQUEST.md
?? STAGE-1-CHECKPOINT.md
?? STAGE-1-FINAL-VERIFICATION.md
?? STAGE-2-CHECKPOINT.md
?? STAGE-3-CHECKPOINT.md
?? STAGE-4-CHECKPOINT.md
?? STAGE-5-CHECKPOINT.md
?? STAGE-6-CHECKPOINT.md
?? STAGE-7-CHECKPOINT.md
?? STAGE-8-CHECKPOINT.md
?? STAGE-8-NEWSROOM-PLAN.md
?? STAGE-9-CHECKPOINT.md
?? STAGE-9-LEADERSHIP-PLAN.md
?? src/components/books-publications.tsx
?? src/components/human-impact-archetype.tsx
?? src/components/motion-provider.tsx
?? src/components/named-programmes.tsx
?? src/components/quote-banner.tsx
```

## 7. Confirmations

- Trustee content (names, roles, biographies) and photography status: **unchanged** — both remain explicitly marked pending, no image introduced.
- `PENDING-VISUAL-ISSUES.md`: untouched, all five entries (including the separately-approved footer overflow, issue #5) remain exactly as logged.
- The footer overflow was only reconfirmed present during this stage's responsive check — not fixed, not re-logged.
- Nothing committed, pushed, deployed, or published.

---

Stopping here — waiting for your approval before Stage 10.
