# Stage 3 Checkpoint: Institutional Footprint / Five Decades of Action

Scope executed: `src/components/impact-numbers.tsx` only, exactly as approved.

## 1. Exact changed-file list

```
git diff --stat -- src/components/impact-numbers.tsx
 src/components/impact-numbers.tsx | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
```

Confirmed via `git status --short` that no other file changed beyond this one plus the already-approved Stage 1/2 set (35 modified + 14 untracked, identical to the state reported at the Stage 2 checkpoint, plus this one line-level diff). `stats.ts`, `types.ts`, and `fact.tsx` are untouched.

## 2. What changed

Three one-line edits, all inside `impact-numbers.tsx`:

1. The eyebrow label element changed from `<p>` to `<h2>` (identical text, "Five decades of action," identical classes — purely a semantic tag change, no visual difference).
2. `italic` removed from the "57" figure's class list, replaced with `tabular-nums`.
3. `tabular-nums` added to the "6" and "30+" figures' class list (previously had neither).

No figure value, label, note, or source string was touched. No other markup, layout, or spacing changed.

## 3. Content verification

All three figures and their exact text confirmed visible in the screenshots above, at all three widths:

| Figure | Label | Note/caveat | Source |
|---|---|---|---|
| 57 | Years of work | "Registered public trust since 1969." | "Trust registration records" |
| 6 | Cities reached | — | **"SOURCE PENDING TRUSTEE CONFIRMATION."** (pink badge, visible at 1440/768/375) |
| 30+ | Active programs | "Count of named initiatives currently listed across all focus areas." | "Internal programme list, as published on this site" |

The cities figure's pending-confirmation caveat — the item specifically flagged as easy to accidentally drop — is clearly visible and unshortened at every width. The previously-removed "50,000+ lives impacted" figure was not reintroduced.

## 4. Heading hierarchy

Queried every heading element on the live rendered page: the new `<h2>FIVE DECADES OF ACTION</h2>` appears exactly once, in its correct position in document order (after About's "57 years of rising..." h2, before Focus Areas' "Five chapters, one trust." h2) — no duplicate headings were introduced, and no other section's heading was affected.

## 5. Reduced-motion test (real browser, not code review)

Used Playwright's `page.emulateMedia({ reducedMotion })` against the running dev server, sampling the "57" figure's rendered text roughly every animation frame for 900ms after it scrolls into view:

- **Reduced motion:** the figure showed only one distinct value across the entire sampled window — `"57"` — never anything else.
- **Normal motion:** the figure visibly counted up through 25+ distinct intermediate values (`1 → 4 → 19 → 31 → 40 → 47 → ... → 57`) over the same window, confirming the animation genuinely runs under normal motion and is genuinely skipped under reduced motion. This is the same `CountUp` helper already proven correct in Stage 1/2; this test confirms the behavior still holds for these three figures specifically after the edit.

## 6. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds, all 23 routes generated, 0 errors, 0 warnings.

## 7. Screenshots

Three PNG files sent as attachments above: 1440px, 768px, and 375px. All confirm: upright "57" (no italic), consistent tabular-numeral alignment across all three figures, the asymmetric desktop/tablet layout and fully-stacked mobile layout both preserved, and the dark (`bg-text`) ground unchanged.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your approval before Stage 4.
