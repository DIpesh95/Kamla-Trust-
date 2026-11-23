# Stage 7 Checkpoint: Stories

Scope executed: `src/components/stories-magazine.tsx` rebuilt per the approved plan. `src/content/stories.ts` was **not modified** — see the file-accounting note below, since it still shows a diff against git HEAD that predates this stage.

## 1. Exact changed-file list — scoping clarification

`git diff --stat` shows two files touching this area:

```
src/components/stories-magazine.tsx | 73 +++++++++++++++++--------------------
src/content/stories.ts              |  3 +-
```

**Only `stories-magazine.tsx` was edited by me in this stage** (35 insertions/41 deletions — the full rebuild). `stories.ts`'s 3-line diff against HEAD is **pre-existing**: it already held the "A Kanya Sneh Bandhan couple, on their wedding day and a year on — in their own words, once the interview is complete." wording before I began Stage 7 planning (confirmed by my own first `Read` of the file during planning, before any edit this stage) — not something I touched now. No `Edit`/`Write` tool call was made against `stories.ts` at any point in this stage, consistent with your explicit "DO NOT MODIFY" instruction.

No other file changed — confirmed via `git status --short`, identical to the Stage 6 close plus this one file.

## 2. What changed, and why

Full rebuild of the three story cards from an asymmetric featured+compact layout into three equal-weight cards, matching the live site's actual structure (confirmed during planning via direct DOM inspection):

- All three cards now share identical chrome: photo-well ("Photograph to follow"), pillar label, an "Awaiting interview" badge, the full `prompt` text, and the exact disclosure sentence.
- Titles render in curly quotes (`&ldquo;…&rdquo;`) with no trailing period — matching the live site.
- All three use `<h3>` consistently (previously `<h3>` for the featured card, `<h4>` for the other two).
- Added `Reveal` wrapping with a staggered delay (`i * 0.08`), matching the convention already used in Focus Areas/Signature Initiatives/Moments & Gatherings — this is the only homepage section that previously had zero scroll-reveal animation.
- The section heading ("Behind every number, a name.") and the "All stories →" link live in `page.tsx`, outside this component, and are untouched.

## 3. Content preservation — including the flagged wording discrepancy

All three story slugs, pillars, and titles preserved exactly. **Per your explicit instruction, the Kanya Sneh Bandhan prompt was left exactly as it already existed in `stories.ts`** — "A Kanya Sneh Bandhan couple, on their wedding day and a year on — in their own words, once the interview is complete." — not rewritten to match the live site's different wording ("...on the day of their wedding and a year on."). This discrepancy remains open, recorded here for future trustee/content confirmation, and in my Stage 7 plan message above. The other two prompts (Healthcare, Education) were already identical to the live site and remain unchanged.

No photographs, placeholder images, or Drive assets were introduced anywhere — confirmed via the rebuilt component: the only visual element is the existing inline SVG person-glyph icon, used identically on all three cards now (previously only on the featured one).

## 4. Responsive layout decision — tested, not assumed

Rendered all three widths before deciding:

- **1440px:** three equal columns (`lg:grid-cols-3`).
- **768px:** tested two-column (`sm:grid-cols-2`) directly — confirmed via screenshot that this reads cleanly, with full breathing room for the badge, title, prompt, and disclosure text on each card (the third card wraps to its own row, left-aligned, which reads fine as a natural consequence of an odd count in a 2-column grid). Kept this arrangement rather than forcing three cramped columns.
- **375px:** single column (`grid-cols-1`), full width.

## 5. A finding: horizontal overflow at 768px — not caused by this stage, not fixed

Measuring the full page at 768px showed `document.body.scrollWidth` (865px) exceeding the viewport (768px). I traced this precisely to the actual overflowing DOM elements rather than assuming: every offending element belongs to the **site footer** (a `<ul>` of footer links and its surrounding `<p>`/`<div>` wrappers, classes like `text-surface/45` — none of which exist anywhere in `stories-magazine.tsx`). This is a pre-existing, unrelated issue in `site-footer.tsx`, not something introduced by this stage's changes. The Stories section itself has zero overflow or clipping at any of the three widths (confirmed both by this element-level scan and by direct visual inspection of the screenshots — no text is cut off, no card extends past its column).

Per the "discovered issue, report separately and ask before adding" instruction: **I have not added this to `PENDING-VISUAL-ISSUES.md`.** Flagging it here for your decision — it's a footer-only issue, unrelated to any of the four already-logged entries, and out of this stage's scope either way.

## 6. Reduced-motion test (real browser)

Confirmed the section is genuinely below the fold pre-scroll, then sampled the first card's actual Reveal-wrapper opacity every frame for 900ms after scrolling it into view:

- **Reduced motion:** reaches ~0.996 by ~264ms, fully settled by ~397ms.
- **Normal motion:** ramps smoothly (0 → 0.30 → 0.78 → 0.93 → 0.98 → 0.997) across the same window.

Confirms the newly-added `Reveal` wrapping correctly respects `prefers-reduced-motion`, using the same proven pattern as every other section.

## 7. Heading hierarchy

Queried the rendered DOM directly: one `<h2>` ("Behind every number, a name."), followed by three consistent `<h3>`s — `"A wedding day, a year on"`, `"What early detection changed"`, `"Before and after the scholarship"` — each correctly quoted, no trailing period, no heading-level inconsistency.

## 8. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds, all 23 routes, 0 errors, 0 warnings.

## 9. Screenshots

Three PNG files sent as attachments above: 1440px, 768px, 375px.

## 10. `PENDING-VISUAL-ISSUES.md`

Confirmed unchanged — all four existing entries remain exactly as logged, untouched by this stage.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your approval before Stage 8, and for your decision on whether the footer overflow finding needs separate attention.
