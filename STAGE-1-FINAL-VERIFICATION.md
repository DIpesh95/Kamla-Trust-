# Stage 1 Final Verification

Follow-up to `STAGE-1-CHECKPOINT.md`, addressing all four requested items with direct evidence rather than description.

## 1. The 5-vs-6 file discrepancy — resolved with checksums, not recollection

I compared the exact pre-Stage-1 backup (`working-tree-backup-20261122-210507`, 45 files, SHA-256 manifest) against the live tree using `shasum -a 256 -c`, which checks every file's hash directly rather than relying on memory of what I edited.

**Result: exactly 4 of the 45 backed-up files changed, 41 are byte-identical to the pre-Stage-1 snapshot.**

```
src/components/about-intro.tsx: FAILED  (changed)
src/components/human-impact.tsx: FAILED  (changed)
src/components/motion.tsx: FAILED  (changed)
src/components/site-header.tsx: FAILED  (changed)
... all other 41 files: OK (unchanged)
```

**Two files are new** (didn't exist at backup time, confirmed via `comm` against the manifest's path list):
- `src/components/human-impact-archetype.tsx` — the preserved archetype component
- `STAGE-1-CHECKPOINT.md` — the checkpoint report itself

**Where the 5-vs-6 count came from:** my checkpoint's "Files changed" table listed **5 items** (4 modified + 1 new source file), deliberately not counting the checkpoint document itself as an "implementation" file. A plain filesystem count of everything new-or-modified during Stage 1 is **6** (4 modified + 2 new, including the report). Both numbers are correct — they're just answering "files changed" vs. "files touched including the report I wrote about it." I should have stated this distinction in the original checkpoint rather than leaving it to be inferred; that's the source of the discrepancy, not an unreported change.

### Exact git status, right now

```
Changes not staged for commit: (36 files — identical list to the pre-Stage-1 backup, confirmed above: only
about-intro.tsx, human-impact.tsx, motion.tsx, site-header.tsx actually differ in content; the other 32 carry
their pre-existing, already-approved uncommitted Direction D work, untouched by me)

Untracked files (12):
  BASELINE-RECONCILIATION-REPORT.md       (written before Stage 1, already reported then)
  D2-IMPLEMENTATION-PLAN.md               (written before Stage 1, already reported then)
  D2-SECTION-AND-PHOTOGRAPH-MAPPING.md    (written before Stage 1, already reported then)
  EXISTING-WEBSITE-CONTENT-INVENTORY.md   (written before Stage 1, already reported then)
  FINAL-PENDING-ASSETS.md                 (written before Stage 1, already reported then)
  PHOTOGRAPHY-ASSET-REQUEST.md            (written before Stage 1, already reported then)
  STAGE-1-CHECKPOINT.md                   (Stage 1 — the checkpoint report)
  src/components/books-publications.tsx   (pre-existing, untouched)
  src/components/human-impact-archetype.tsx  (Stage 1 — new, the preserved archetype)
  src/components/motion-provider.tsx      (pre-existing, untouched)
  src/components/named-programmes.tsx     (pre-existing, untouched)
  src/components/quote-banner.tsx         (pre-existing, untouched)
```

Nothing is staged. **Confirmed: no out-of-scope file changed** — the checksum comparison is definitive, not a self-report.

## 2. Real screenshot files — attached above this document

Seven PNG files sent as attachments: About at 1440 / 768 / 375, Moments & Gatherings at 1440 / 768 / 375, and the open mobile menu at 375. These were captured with a scripted headless-Chrome pass against the actual running dev server (not the in-conversation screenshot tool, which only displays inline) — real files on disk, not descriptions.

## 3. Remaining carousel checks — all tested with real browser automation

Using Playwright driving the system's actual Chrome binary (real mouse/keyboard events dispatched by the browser engine itself, not `.click()` shortcuts):

| Check | Result |
|---|---|
| **ArrowRight** (repeat) | `scrollLeft`: 0 → 313 → 625, strictly increasing each press |
| **ArrowLeft** | From 625 → 313 — correctly reverses |
| **Next button** | 0 → 313 |
| **Previous button** | 313 → 0 — correctly reverses |
| **Real pointer (mouse) drag** | Mouse down inside the row, moved 150px left, mouse up → `scrollLeft` = 150, matching the implementation's 1:1 drag ratio exactly |
| **Touch dragging** | Not independently exercisable through pointer simulation, because the code intentionally does: `if (e.pointerType !== "mouse") return;` inside `onPointerDown` — touch input is deliberately left alone to use the browser's **native** touch-scroll, not intercepted by any custom JS. Confirmed the enabling CSS is present and correct: `overflow-x: auto`, `touch-action: pan-x`. This is standard platform behaviour (any element with this CSS scrolls natively under a real finger), not something my code could break since it never touches touch events at all. |

All five numeric checks above were run against the real dev server at 375px width, where genuine horizontal overflow exists (confirmed `scrollWidth: 1230 > clientWidth: 331`).

## 4. Reduced motion — tested with a real browser media-feature override, not code review

Used Playwright's `page.emulateMedia({ reducedMotion: "reduce" })`, which sets the actual `prefers-reduced-motion` media feature the browser evaluates — confirmed active via `window.matchMedia('(prefers-reduced-motion: reduce)').matches === true` before testing.

**About section, reduced motion on**, measured 150ms after scrolling into view (normal motion's own duration is 0.8–1.1s, so a reveal that's already ~98% done at 150ms could only happen under the reduced-motion branch):
- Photo `ClipReveal`: `clip-path: inset(0%)` — fully revealed, not mid-animation
- Stat card `Reveal`: opacity `0.979` — essentially fully shown

**Moments & Gatherings, reduced motion on**, same 150ms check: first card opacity `0.992` — same result.

**The clearest test — `DragRow`'s button-triggered scroll, reduced motion vs. normal, side by side on the same page:**

| Time after clicking "Next" | Reduced motion (`behavior: "auto"`) | Normal motion (`behavior: "smooth"`) |
|---|---|---|
| 25ms | **313** (already at target) | 2 |
| 50ms | 313 | 12 |
| 75ms | 313 | 96 |
| 100ms | 313 | 208 |
| 125ms | 313 | 256 |
| 150ms | 313 | 271 (still short of 313) |

Reduced motion jumps straight to the target in one step; normal motion visibly ramps up over the same interval and hasn't even arrived by 150ms. This is a genuine behavioural difference measured live, not inferred from source code.

---

All four items are now verified with direct evidence. No file outside the four already reported was changed; nothing was committed, deployed, or published. Waiting for your approval before Stage 2.
