# Stage 4 Checkpoint: Our Focus Areas

Scope executed: `src/components/work-chapters.tsx` only, exactly as approved — two `focus-visible` outline additions, nothing else.

## 1. Exact changed-file list, with a scoping note up front

`git diff --stat -- src/components/work-chapters.tsx` reports **101 insertions, 53 deletions**. That number is **not** this stage's work — it's the file's full diff against the last commit, which already contained the pre-existing, previously-approved asymmetric PhotoFeature/PendingCard rebuild from before this stage-gated sequence began (the same rebuild described and approved in the Stage 4 plan). To avoid the same confusion as the Stage 3 file-count clarification, here is exactly what I changed **in this turn, and nothing else**:

**Edit 1** — `PhotoFeature`'s `<Link>`:
```diff
- <Link href={`/our-work/${slug}`} className="group relative block aspect-[2/1] w-full overflow-hidden">
+ <Link
+   href={`/our-work/${slug}`}
+   className="group relative block aspect-[2/1] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-surface"
+ >
```

**Edit 2** — `PendingCard`'s `<Link>`:
```diff
- className="group flex aspect-[2/1] w-full flex-col justify-between overflow-hidden bg-soft-bg p-6 sm:p-7"
+ className="group flex aspect-[2/1] w-full flex-col justify-between overflow-hidden bg-soft-bg p-6 sm:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
```

That's the entire stage. No other file changed — confirmed via `git status --short`, identical to the Stage 3 checkpoint's set plus this one file.

## 2. Content verification

All five focus areas confirmed present with exact titles, taglines, descriptions, and links, read directly from the rendered DOM:

| # | Slug | Tag label | Tagline |
|---|---|---|---|
| 1 | women-and-girl-child | WOMEN & GIRL CHILD | "Because dignity is not negotiable." |
| 2 | healthcare | HEALTH | "Because a healthy life should never be a privilege." |
| 3 | education | EDUCATION | (pending card, numeral "03") |
| 4 | rural-livelihoods-environment | LIVELIHOODS & ENVIRONMENT | (pending card, numeral "04") |
| 5 | disaster-relief-civic-recognition | RELIEF & RECOGNITION | (pending card, numeral "05") |

`gallery-kanya-sneh-bandhan-square.jpg` and `yamuna-drive.jpg` both unchanged — confirmed via diff, neither appears in either edit. Education/Rural Livelihoods/Disaster Relief remain `PendingCard` typographic treatments; no stock or unverified photo was added anywhere.

## 3. Keyboard navigation test (real browser, not code review)

Used Playwright to tab through the page from the top and recorded every focused element whose `href` starts with `/our-work/`. **All five cards received focus in the correct reading order**: Women & Girl Child → Healthcare → Education → Rural Livelihoods → Disaster Relief — matching the visual/DOM order exactly, nothing skipped or out of sequence.

## 4. Focus indicator contrast confirmation

Read each card's `getComputedStyle` at the moment it held keyboard focus:

| Card | Outline color | Background |
|---|---|---|
| Women & Girl Child (photo) | `rgb(255,255,255)` (surface/white) | dark photo + scrim |
| Healthcare (photo) | `rgb(255,255,255)` (surface/white) | dark photo + scrim |
| Education (pending) | `rgb(110,22,48)` (primary/burgundy) | ivory (`bg-soft-bg`) |
| Rural Livelihoods (pending) | `rgb(110,22,48)` (primary/burgundy) | ivory |
| Disaster Relief (pending) | `rgb(110,22,48)` (primary/burgundy) | ivory |

Both variants render a 2px solid outline, visibly distinguishable against their respective backgrounds — white on dark photo cards, burgundy on ivory pending cards.

## 5. Reduced-motion test (real browser)

Confirmed the section is genuinely below the fold at page load (`rectTop: 4047.5` before scrolling), then measured the Reveal wrapper's live opacity every frame for 900ms after scrolling it into view:

- **Reduced motion:** opacity reaches ~0.99 by ~250ms and settles at 1.0 by ~385ms — the fast, near-instant reveal path.
- **Normal motion:** opacity ramps smoothly through intermediate values (0 → 0.65 → 0.89 → 0.97 → 0.999 → 1.0) over the full ~900ms window — a genuinely slower, visible fade.

This confirms `Reveal`'s existing reduced-motion handling (unchanged by this stage) still works correctly for these cards.

## 6. 768px pending-card row — cramped, as you suspected

Measured the Education pending card's actual rendered box at each width:

| Width | Card size (px) |
|---|---|
| 1440px | 387 × 193 |
| **768px** | **216 × 108** |
| 375px | 331 × 166 |

**768px produces the smallest card of all three breakpoints** — smaller even than the single-column mobile layout, because three columns at tablet width divide into narrower boxes than a single full-width mobile column, while the `aspect-[2/1]` ratio locks height to half of that already-narrow width. In the screenshot, all three pending cards' tag, numeral, 2-line summary, and caption are visibly tight with little breathing room. The text itself doesn't overflow (the `line-clamp-2` on the summary is working as designed), but the row does read as the most compressed of the three widths. Reporting this as requested — **no layout or breakpoint change made.**

## 7. Additional finding (not fixed, flagging per instructions)

While reviewing the same screenshots, I noticed the two `PhotoFeature` cards (Women & Girl Child, Healthcare) have their headline text **clipped at the top edge** at both 768px and 375px — the first line of each headline ("Because dignity" / "...should never") is cut off by the card's `overflow-hidden`, with only the second line fully visible. This is caused by the bottom-anchored caption block (tag + 2-line headline + 3-line summary) growing taller than the card's `aspect-[2/1]` box as the headline wraps onto two lines at narrower widths, pushing its top edge above the card's own top and getting clipped.

**This is not something introduced by this stage's edit** — my two changes only appended `focus-visible` utility classes; I did not touch the caption block's sizing, padding, or typography. It's a pre-existing issue in the already-approved asymmetric-grid rebuild, visible in both the 768px and 375px screenshots attached. I have not touched it, per your instruction not to change layout without asking — flagging it here for you to decide whether it should become a dedicated fix in a future stage.

## 8. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to the changed file): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds, all 23 routes, 0 errors, 0 warnings.

## 9. Screenshots

Three PNG files sent as attachments above: 1440px, 768px, 375px.

---

Nothing was committed, deployed, or published. Stopping here — waiting for your approval before Stage 5.
