# Stage 11 Checkpoint: Responsive Refinement (Phase 2 Implementation)

All five approved fixes implemented, verified with real browser measurements and screenshots at 1440/768/375px, and image crops reviewed visually (not judged on text-fit alone).

## 1. Exact modified file list

Only the four approved files were touched:
- `src/components/work-chapters.tsx`
- `src/components/signature-initiatives.tsx`
- `src/components/human-impact.tsx`
- `src/components/site-footer.tsx`

`git diff --stat` for these four shows 210 insertions / 113 deletions — that figure includes substantial pre-existing, already-approved drift from Stages 1–10 (same pattern flagged in every prior checkpoint this engagement). Below is my own precise, isolated diff for each file — exactly what changed in this stage, nothing more.

## 2. Exact changes, before → after

### `work-chapters.tsx` — Issues 1 & 2

```diff
- className="group relative block aspect-[2/1] w-full overflow-hidden ..."
+ className="group relative block aspect-[4/5] w-full overflow-hidden ... lg:aspect-[2/1]"
```
(`PhotoFeature`'s card — taller at base/tablet, reverts to the original `2:1` only at `lg:`/1024px+)

```diff
- <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
+ <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
```
(pending-card row — 2 columns at tablet, 3 only at desktop)

### `signature-initiatives.tsx` — Issue 3

```diff
- <div className="relative aspect-[3/4] w-full">
+ <div className="relative aspect-[3/4] max-h-[700px] w-full lg:max-h-none">
```
(Pillars of Humanity portrait — height capped below `lg:`, uncapped at desktop)

### `human-impact.tsx` — Issue 4

This one went through several iterations during verification, documented honestly below rather than only showing the final state:

- **First attempt** (taller "wide" ratio `lg:aspect-[3/2]`): measurement showed this made things *worse* — `3/2` (1.5) is numerically *flatter* than the original `16/11` (≈1.454), the opposite of what was intended. Caught by re-measuring immediately, not assumed fixed.
- **Second attempt** (2-up tablet view via `sm:auto-cols-[minmax(0,48%)]`): percentage-based `grid-auto-columns` on this element doesn't resolve as expected — empirically, Chrome still divided the row evenly regardless of the requested percentage, confirmed by reading `getComputedStyle` directly rather than trusting the source.
- **Third attempt** (`width:max-content` on the scroller): fixed the track-sizing problem but caused a *new* regression — the carousel's own box grew wider than its container, leaking into `document.body.scrollWidth` (a genuine newly-introduced overflow, caught by exactly the verification step the brief asked for).
- **Final, verified state:**

```diff
- <DragRow rowClassName="sm:grid sm:grid-flow-col sm:auto-cols-[minmax(0,1fr)]" ariaLabel="Moments and gatherings">
+ <DragRow
+   rowClassName="sm:grid sm:w-full sm:grid-cols-[repeat(4,320px)] lg:grid-cols-none lg:grid-flow-col lg:auto-cols-[minmax(0,1fr)]"
+   ariaLabel="Moments and gatherings"
+ >
```
```diff
- className={`... ${m.width === "wide" ? "sm:aspect-[16/11]" : "sm:aspect-[3/4]"}`}
+ className={`... ${m.width === "wide" ? "lg:aspect-[1/1]" : "lg:aspect-[3/4]"}`}
```

Net effect: below `lg:`, the row becomes an explicit 4×320px-track grid, clamped to `w-full` so overflow is genuinely internal and scrollable (matching the "Drag, or use the arrows" copy, which is now actually true at tablet width too — previously all 4 cards were force-fit into view with no overflow to drag to). At `lg:`/desktop, the original 4-equal-column behavior is restored, with "wide" cards now square (`1:1`) instead of `16:11`/`3:2` to eliminate the pre-existing 1440px clipping the audit found.

### `site-footer.tsx` — Issue 5

Also went through one correction:

- **First attempt** (`break-words`, i.e. `overflow-wrap: break-word`): did **not** resolve the overflow — confirmed by direct measurement (`document.body.scrollWidth` still 865 at 768px). Root cause: `overflow-wrap: break-word` affects line-breaking during layout but is explicitly excluded from a grid item's *minimum content size* calculation per spec, so the column still refused to shrink.
- **Final, verified fix:**

```diff
- <a href={`mailto:${trust.email}`} className="break-words transition-colors hover:text-secondary">
+ <a href={`mailto:${trust.email}`} className="break-all transition-colors hover:text-secondary">
```

`word-break: break-all` (unlike `break-word`) does affect intrinsic/minimum sizing, which is why it works.

## 3. Before/after measurements, all five issues, all three widths

| Issue | Width | Before | After |
|---|---|---|---|
| 1 — Pending card size | 768px | 216×108 | **334×167** |
| | 1440px | 387×193 (unchanged) | 387×193 |
| | 375px | 331×166 (unchanged) | 331×166 |
| 2 — Focus Areas clipping | 768px | clipped 98px | **not clipped (−114 to −153px slack)** |
| | 375px | clipped 80px | **not clipped (−135 to −168px slack)** |
| | 1440px | not clipped (−89px) | not clipped (−50 to −89px) |
| 3 — Pillars of Humanity height | 768px | 686×915 | **686×700** |
| | 1440px / 375px | 465×620 / 329×439 (unchanged) | 465×620 / 329×439 |
| 4 — Moments clipping | 1440px | 2 wide cards clipped (2px, 41px) | **not clipped (−48 to −163px slack), all 4 cards** |
| | 768px | all 4 clipped (149–276px) | **not clipped (−182 to −234px slack), all 4 cards** |
| | 375px | not clipped (unchanged) | not clipped (unchanged) |
| 5 — Footer overflow | 768px | `document.body.scrollWidth` 865 vs. 768 | **768 vs. 768 — exact match** |
| | 1440px / 375px | 1440/1440, 375/375 (unchanged) | 1440/1440, 375/375 (unchanged) |

## 4. Image-crop review (not judged on text-fit alone)

- **Pillars of Humanity** (`pillars-of-humanity-2024.jpg`): viewed the source photo directly before choosing a value — both men are visible mid-frame with headroom above and margin below. Capped at 700px (down from 915px, a ~23% reduction, deliberately gentler than the originally-discussed 560px cap) specifically to avoid cutting off the subjects. Reviewed the rendered 768px screenshot: both figures remain fully visible, centered, no awkward cut at head or feet.
- **Focus Areas photo cards** (`gallery-kanya-sneh-bandhan-square.jpg`, `yamuna-drive.jpg`): going from `2:1` to `4:5` at narrow widths makes the box *taller*, which for these `object-cover` crops means showing *more* of the image vertically, not less — confirmed visually in the 768px/375px screenshots: both photos show more of the scene than before, nothing new is cut off.
- **Moments & Gatherings** (`hero-kanya-sneh-bandhan-alt.jpg`, `republic-day-2026.jpg` — the two "wide" cards): viewed both source photos directly before changing the ratio. Both are landscape event photos with subjects centered and margin on all sides; moving from `16:11` to `1:1` crops in from the sides (not top/bottom), confirmed safe for both compositions. Reviewed the rendered 1440px/768px screenshots: subjects remain fully in frame, no heads or key subjects cut off.

## 5. Keyboard focus and reduced-motion regression check

- **Keyboard:** tabbed to the Focus Areas Women & Girl Child card via real `Tab` presses — confirmed visible `2px solid` focus outline, unchanged. Tested the Moments `DragRow`'s `ArrowRight` key at 375px — `scrollLeft` moved 0 → 313, unchanged, confirming the drag/keyboard carousel mechanism itself (in `motion.tsx`, not touched) still works correctly with the new grid-column sizing.
- **Reduced motion:** re-measured a Focus Areas card's `Reveal` opacity under both settings — reduced motion reaches ~0.9999 by 285ms; normal motion is still at 0.808 at a comparable point (298ms) — the same clear differentiation proven in every prior stage, no regression from the aspect-ratio changes.

## 6. TypeScript, ESLint, build

Run after every edit iteration, not just once at the end:
- `tsc --noEmit`: clean at every step, no errors, final state confirmed clean.
- `eslint` (scoped to the four changed files): no issues found, every iteration.
- `next build` (fresh, `.next` cleared each time): succeeds, all 22 routes, 0 errors, 0 warnings — final build re-run after the last correction (the footer `break-all` fix).

## 7. Final `git diff --stat`

```
 src/components/human-impact.tsx          | 139 ++++++++++++++++++----------
 src/components/signature-initiatives.tsx |  24 +++--
 src/components/site-footer.tsx           |   6 +-
 src/components/work-chapters.tsx         | 154 ++++++++++++++++++++-----------
 4 files changed, 210 insertions(+), 113 deletions(-)
```

(As noted in §1, this includes pre-existing drift predating this stage — §2 above isolates exactly what I changed.)

## 8. Final `git status --short`

```
 M .claude/launch.json
 M next.config.ts
 M src/app/about/page.tsx
 D src/app/about/transparency/page.tsx
 M src/app/get-involved/donate/page.tsx
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
?? BASELINE-RECONCILIATION-REPORT.md
?? D2-IMPLEMENTATION-PLAN.md
?? D2-SECTION-AND-PHOTOGRAPH-MAPPING.md
?? EXISTING-WEBSITE-CONTENT-INVENTORY.md
?? FINAL-PENDING-ASSETS.md
?? PENDING-VISUAL-ISSUES.md
?? PHOTOGRAPHY-ASSET-REQUEST.md
?? STAGE-1-CHECKPOINT.md
?? STAGE-1-FINAL-VERIFICATION.md
?? STAGE-10-CHECKPOINT.md
?? STAGE-10-REMOVAL-PLAN.md
?? STAGE-11-CHECKPOINT.md
?? STAGE-11-RESPONSIVE-PLAN.md
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

## 9. Confirmation: unrelated pre-existing work untouched

Every file shown as modified/deleted above, other than the four approved files, was already in that exact state before this stage began (confirmed against the Stage 10 checkpoint's own `git status --short`, which is identical except for this stage's four files and the two new plan/checkpoint documents). No shared component (`Container`, `Reveal`, `DragRow`, `Fact`, `motion.tsx` itself), no other homepage section, no global CSS, and no Tailwind config was modified. `PENDING-VISUAL-ISSUES.md` was not edited. No dependency was added.

## 10. Screenshots

Twelve PNG files sent as attachments above: Focus Areas, Signature Initiatives, Moments & Gatherings, and the Footer, each at 1440px, 768px, and 375px.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your review.
