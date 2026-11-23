# Stage 6 Checkpoint: Moments & Gatherings

Scope executed: `src/components/human-impact.tsx` only — one change, `rounded-sm` removed from the four card wrappers.

## 1. Exact changed-file list — same scoping clarification as Stages 3–5

`git diff --stat -- src/components/human-impact.tsx` reports **88 insertions, 48 deletions**. That is **not** this stage's work — it's the file's full diff against the last commit, which already contained the entire Stage 1 rebuild (the "What this looks like" illustrative archetype replaced by the real "Moments & Gatherings" carousel, approved before this stage-gated sequence began). The actual Stage 6 edit is exactly one line:

```diff
-                className={`group relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-sm sm:w-auto ${
+                className={`group relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-auto ${
```

That's the whole stage. No other file changed — confirmed via `git status --short`, identical to the Stage 5 close plus this one file.

## 2. Content verification

All four event items confirmed present, same order, same titles/descriptions/tags/images as before this edit and as the live site: Kanya Sneh Bandhan → Lokmata Ahilyabai Holkar Mahila Samman → Republic Day Celebration → Kamala Power Women, on stage. All four images unchanged (`hero-kanya-sneh-bandhan-alt.jpg`, `lokmata-ahilyabai-holkar-2026.jpg`, `republic-day-2026.jpg`, `kpw-lokmata-award.jpg`). No Drive photographs introduced. No crop, caption, or typography change beyond the corner-radius removal.

## 3. Keyboard, button, pointer, and reduced-motion tests (real browser)

**Keyboard:** At 375px (where real overflow exists — at 1440px `scrollWidth === clientWidth`, nothing to scroll by design, consistent with Stage 1's own finding), `ArrowRight` moved `scrollLeft` 0 → 313, `ArrowLeft` moved it back 313 → 0.

**Carousel buttons:** Both "Scroll left" and "Scroll right" buttons found, correctly labeled, each with a visible 2px solid burgundy `focus-visible` outline. Clicking "Scroll right" moved `scrollLeft` 0 → 313; clicking "Scroll left" reversed it 313 → 0.

**Pointer/touch:** A real mouse-driven drag (down → move → up, dispatching genuine `pointerdown`/`pointermove`/`pointerup` events) moved `scrollLeft` by exactly the drag distance (140px drag → 140 `scrollLeft`, held steady after release) in an isolated test. One earlier combined test run showed a stale `0` reading — traced to a leftover in-flight `smooth`-scroll animation from a prior button click in that same test script still resolving when the drag began; re-run in isolation, the drag behaves correctly and deterministically. Not a component defect.

**Reduced motion:** Comparing button-triggered scroll under `prefers-reduced-motion: reduce` vs. normal: reduced motion jumps straight to the target (`scrollLeft` = 313 within ~55ms, the first sampled frame) with no intermediate values; normal motion visibly ramps (0 → 208 → 298 → 313 over ~328ms). Confirms the existing, already-proven `DragRow` reduced-motion handling is unaffected by this stage's edit.

## 4. Headline-clipping investigation — a confirmed, significant finding, NOT fixed

Per your instruction, I checked all four cards at all three widths and measured each card's own box against its caption block's actual rendered position. **Clipping occurs, and it's worse than the already-logged Focus Areas issue** — at 768px it hides entire titles, not just a headline's first line.

| Width | Card (index) | Clipped? | Card height | Caption height | Detail |
|---|---|---|---|---|---|
| 1440px | Kanya Sneh Bandhan (0, wide) | **Yes** | 196px | 198px | Caption top sits 2px above the card's top — the "WOMEN & GIRL CHILD" tag is visibly sliced at the very top edge (visible in the attached screenshot). |
| 1440px | Lokmata Mahila Samman (1, regular) | No | 380px | 269px | Ample room, fully visible. |
| 1440px | Republic Day Celebration (2, wide) | **Yes** | 196px | 237px | Caption top sits 41px above the card's top — the "2026" tag is **entirely clipped off**, invisible in the rendered page. |
| 1440px | Kamala Power Women, on stage (3, regular) | No | 380px | 218px | Ample room, fully visible. |
| **768px** | **All four cards** | **Yes, severely** | 108–209px | 343–429px | Caption content is 150–280px taller than its own card box. The tag and most or all of the title are clipped away — e.g. "Kamala Power Women, on stage" renders as just "on stage"; "Kanya Sneh Bandhan" and its tag are completely invisible, leaving only the trailing half of the description visible (see attached 768px screenshot). |
| 375px | All four cards | No | 366px (uniform) | 146–191px | Ample room at every card, no clipping anywhere. |

**Likely cause:** each card's caption block (tag + title + description) is absolutely positioned and bottom-anchored, sized by its own content — not by the card's box. The card itself is sized by its `aspect-[4/5]` (mobile) / `aspect-[16/11]` or `aspect-[3/4]` (≥640px) ratio at whatever width the grid-column track assigns it. At 1440px, the "wide" (16:11) aspect ratio produces a short box (196px) that isn't quite tall enough for its own caption content, clipping the topmost line. At 768px, the effective column width (and therefore the aspect-derived card height) shrinks sharply — the same mechanism that produced the already-logged Focus Areas clipping, but far more severe here because these cards hold three stacked text elements (tag, title, multi-line description) rather than two, so the caption block needs more height than the aspect-locked box can ever provide at this width. The "regular" (3:4, taller) cards have enough natural height to avoid clipping except at 768px, where even their generous box isn't big enough.

**Per your instruction, I have not changed any aspect ratio, card height, caption positioning, or typography.** This is a separate, new finding from the three already in `PENDING-VISUAL-ISSUES.md` — flagging it here, as instructed, rather than adding it to the file myself. Let me know if you'd like it logged as a fourth entry.

## 5. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds, all 23 routes, 0 errors, 0 warnings.

## 6. Screenshots

Three PNG files sent as attachments above: 1440px, 768px, 375px — the 768px and 1440px images directly show the clipping finding described above.

## 7. `PENDING-VISUAL-ISSUES.md`

Confirmed unchanged — all three existing entries remain exactly as logged, untouched by this stage.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your approval before Stage 7, and for your decision on whether to log the new clipping finding as a fourth pending issue.
