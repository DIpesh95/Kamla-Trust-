# Stage 8 Checkpoint: Newsroom

Scope executed: `src/components/newsroom-editorial.tsx` only, per the approved plan and final constraints.

## 1. Pre-implementation verification (required before coding)

Queried the live homepage DOM directly, row by row, before writing any code:

| Order | Title | Category | Date | Description shown live? | Thumbnail live? |
|---|---|---|---|---|---|
| 1 | "The Quiet Revolutionary": Times Magazine profile | Press | April 2026 | No | No |
| 2 | Navbharat Times Utsav 2026 | Event | 2026 | No | No |
| 3 | Republic Day Celebration 2026 | Community | 2026 | No | Yes (256w) |

All three titles matched `newsroom.ts` entries exactly (titles are the only stable identifier available — the data has no `slug` field). **One addition to the plan surfaced by this verification**: the live site's three compact rows show no description at all, only category/title/date — the pre-existing `Row` component rendered `item.description` unconditionally, which would have been wrong for these three rows. Implemented with a new `showDescription` prop (default `true`, passed `false` for the homepage's three rows) so the full `/newsroom` page's rows are unaffected.

## 2. Exact changed-file list and diff

```
git diff --stat -- src/components/newsroom-editorial.tsx
 src/components/newsroom-editorial.tsx | 104 +++++++++++++++++++++++++++-------
 1 file changed, 82 insertions(+), 22 deletions(-)
```

Confirmed via `git status --short` that no other file changed. `src/content/newsroom.ts`, `src/content/types.ts`, `src/app/newsroom/page.tsx`, `src/components/fact.tsx`, and `src/components/motion.tsx` are all untouched.

**What changed, structurally:**
- Removed `"use client"`, the `useState` import, and all filter-tab state/UI/`supportingTabs` — no interactive filter remains anywhere in this file.
- Removed the dead "Press releases" sub-listing block (it never rendered in practice, since there's only one Press item and it was always excluded from that block by definition).
- `FeaturedCard` rebuilt as image-led (title/description/date beside the image) instead of quote-led — matching the live site's actual Lokmata treatment; it no longer renders `item.quote` at all (not needed, since the featured item is now fixed to Lokmata, which has no quote).
- `FeaturedNewsroom` now selects the featured item and all three supporting rows by **exact title match**, not by `kind` filtering or image-availability — per your explicit instruction not to derive this automatically.
- `Row` gained image rendering (a small thumbnail, shown only when `item.image` exists) and the new `showDescription` prop, used by both the homepage (`false`) and the full page (`true`, the existing default).

## 3. Content verification

- **All 19 entries in `newsroom.ts` unchanged** — confirmed the file itself was never edited (no Edit/Write tool call touched it), and the full `/newsroom` page renders all 19 titles across all 4 categories, verified via DOM query (`totalArticles: 19`, `categories: ["Press","Recognition","Event","Community"]`).
- **Homepage displays exactly 4 items** — confirmed via DOM query (`h3s.length + h4s.length === 4`): 1 featured (Lokmata) + 3 supporting rows (Press, Event, Community), in that exact order.
- **Every pending-date placeholder preserved** — confirmed visually on the full page screenshots: "EXACT DATE PENDING CONFIRMATION." badges intact, unchanged wording, for all items that carry them.
- **Republic Day's alt text and provenance caveat preserved exactly**: "Outdoor Republic Day gathering, photo dated 26 January; exact event match pending confirmation" — confirmed verbatim via DOM query on both the homepage and the full page. Not represented as confirmed anywhere.
- **"VIEW ALL →" link unchanged** — still `/newsroom`, still lives in `page.tsx`, untouched.

## 4. Image rendering

Both existing images now render, with their existing alt text, in both places required:

- **Homepage featured card**: `lokmata-ahilyabai-holkar-2026.jpg`, large image beside the text block.
- **Homepage compact row**: Republic Day's row shows its existing small thumbnail; Press and Navbharat rows show no image (they have none in the data — correct, not a gap).
- **Full `/newsroom` page**: both the Lokmata row (under Event) and the Republic Day row (under Community) now show their thumbnails, confirmed via DOM query.

No new photography, stock images, AI-generated images, or Drive assets were introduced — both images were already in `newsroom.ts` before this stage; the only change was making the existing component actually render them.

## 5. Keyboard and reduced-motion test results

**Keyboard/focus:** confirmed zero `<button>` elements remain inside the Newsroom section (filter tabs fully removed) and exactly one `<a>` (the "View all" link, outside this component). Focused it directly and confirmed a visible `2px solid` outline is already present — unchanged, since that link was never part of this file.

**Reduced motion** (real browser, `page.emulateMedia`), measuring the featured card's `Reveal` wrapper opacity every frame for 900ms after scrolling into view:
- Reduced motion: reaches ~0.998 by ~252ms, fully settled by ~319ms.
- Normal motion: ramps smoothly (0 → 0.37 → 0.65 → 0.81 → 0.89 → ... → 1.0) across the full ~858ms window.

This is the same timing profile as every other `Reveal`-based section in this project (0.2s reduced / 0.8s normal, per `motion.tsx`, unchanged) — confirms the existing, already-proven pattern carries over correctly to the rebuilt component.

## 6. Responsive audit — both views, all three widths

- **1440px (both views):** clean, no clipping, image/text split renders correctly on the featured card, rows align with dates right-aligned.
- **768px (both views):** clean within the Newsroom component itself. **`document.body.scrollWidth` (865px) still exceeds the 768px viewport** — identical to the measurement taken before this stage's edit. Traced previously to `site-footer.tsx`, confirmed unrelated to and unchanged by this component. This is the existing, separately-approved issue #5 — not re-investigated or fixed here, per your instruction.
- **375px (both views):** rows stack correctly (date moves below title on narrow widths via the existing `sm:flex-row` breakpoint), thumbnail images scale correctly, no horizontal overflow from any Newsroom element specifically.

## 7. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds, all 23 routes, 0 errors, 0 warnings.

## 8. Screenshots

Six PNG files sent as attachments above: homepage section and full `/newsroom` page, each at 1440px, 768px, and 375px.

## 9. `PENDING-VISUAL-ISSUES.md`

Confirmed unchanged — all four existing entries remain exactly as logged. The footer overflow (issue #5, approved separately) was reconfirmed present and unaffected by this stage, but was not added to or edited in the file, per your instruction not to fix it or otherwise touch the document this stage.

## 10. Final `git status --short`

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
?? src/components/books-publications.tsx
?? src/components/human-impact-archetype.tsx
?? src/components/motion-provider.tsx
?? src/components/named-programmes.tsx
?? src/components/quote-banner.tsx
```

## 11. New findings

None beyond what was already known (the footer overflow, reconfirmed present and unrelated, as described above). No new visual, content, or accessibility issue was discovered during this stage's implementation or testing.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your approval before Stage 9.
