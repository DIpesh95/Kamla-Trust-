# Stage 1 Checkpoint

Scope executed: the About stat card, the Moments & Gatherings restoration, header accessibility, and the Framer-Motion animation helpers needed for both. Nothing else was touched.

## Files changed

| File | Change |
|---|---|
| `src/components/about-intro.tsx` | Restored the floating "57 — years since 1969, still showing up." stat card next to the photo, using content from `69af81c`. Rebuilt as a 12-column asymmetric grid (photo + overlapping stat card on the right, text on the left) matching that commit's layout. Styled in Direction D: square corners on the new stat card (no `rounded-sm`), upright (non-italic) type throughout, existing tokens. Photo reveal now uses the new `ClipReveal` helper instead of a plain `Reveal`. |
| `src/components/human-impact.tsx` | Full content replacement: now renders "Moments & Gatherings," the live site's real 4-photo carousel (Kanya Sneh Bandhan / Lokmata Ahilyabai Holkar Mahila Samman / Republic Day Celebration / Kamala Power Women, on stage), using the exact same images, captions, and tags as `69af81c` and the live site. Built with the new `DragRow` + `RevealGroup`/`RevealItem` helpers instead of GSAP. Headline set upright (not italic) per Direction D's typography rule — the only intentional copy-adjacent change, a styling correction, not new or altered wording. |
| `src/components/human-impact-archetype.tsx` | **New file.** The previous "What this looks like" illustrative-archetype section, preserved verbatim under a renamed export (`HumanImpactArchetype`), unimported and unrendered anywhere. Recoverable, not deleted, per your instruction. |
| `src/components/motion.tsx` | Added two exports: `ClipReveal` (directional clip-path reveal, built on the same proven `useRevealTrigger` hook `Reveal`/`RevealMask` already use, so it shares their reliability and reduced-motion handling) and `DragRow` (ported from the reference commit's pointer-drag carousel, with touch/pointer dragging, visible square prev/next buttons, **and new keyboard support**: ArrowLeft/ArrowRight scroll the row when it has focus, which the original didn't have). No GSAP; both additions are plain Framer Motion plus vanilla DOM pointer events. |
| `src/components/site-header.tsx` | Restored from `69af81c`: outside-click-to-close (click anywhere outside the header closes the mobile menu), `aria-controls="mobile-nav-panel"` wiring the toggle button to the panel it controls, a dynamic `aria-label` ("Open menu" / "Close menu"), and focus return to the toggle button on Escape. **Beyond** `69af81c`: added visible `focus-visible` rings (Tailwind utility classes, scoped to this file only) to every interactive element in the header — the logo link, each top-level nav link, every dropdown row, the mobile toggle, every mobile menu link, and both Donate links — since `69af81c` itself never had a visible focus ring for these either (that existed as a separate sitewide CSS rule in the older palette's `globals.css`, which I did not touch, keeping this change scoped to the header alone as instructed). All Direction D square-corner styling and tokens are unchanged. |

No other file was modified. `package.json`/`package-lock.json` are untouched — no GSAP was added.

## Content preservation verification

- All 12 homepage sections present, in the same order, confirmed via live DOM inspection.
- Moments & Gatherings: all four items present with their exact existing captions and tags (Women & Girl Child / 2026 / 2026 / Recognition) — none shortened, reworded, or reordered.
- About section: existing heading, body paragraph, and "Read Our Story" link unchanged; only the stat card was added back.
- No new statistics, photographs, stories, claims, or awards were introduced anywhere.
- No pending-approval Drive photographs were used — all four Moments images are ones already live on the site (`hero-kanya-sneh-bandhan-alt.jpg`, `lokmata-ahilyabai-holkar-2026.jpg`, `republic-day-2026.jpg`, `kpw-lokmata-award.jpg`).
- The Yamuna photograph remains withheld — not reintroduced anywhere in this stage.
- All 5 files from last report's "not yet inspected" list remain untouched in this stage — none were in scope for Stage 1, so none were edited; `work-chapters.tsx`, `newsroom-editorial.tsx`, `leadership-teaser.tsx`, `stories-magazine.tsx`, and `get-involved-cta.tsx` will each get the promised confirming read immediately before the stage that actually touches them (4, 7, 8, 7, 9 respectively).

## Test results

**Keyboard:**
- `DragRow` row: real `ArrowRight` key press (genuine CDP key dispatch, not `.click()`) moved `scrollLeft` from 0 → 312.5 at 375px width, where overflow genuinely exists. At 1440px, `scrollWidth === clientWidth` (1200 = 1200) — nothing to scroll by design at that width, confirmed this is correct responsive behavior, not a bug.
- Header: all interactive elements confirmed to carry `focus-visible` styling in the rendered DOM.

**Mobile menu:**
- Open/close via the toggle button: confirmed via `aria-expanded` toggling true/false.
- **Outside-click-to-close:** confirmed via a dispatched click on a DOM node verified to be outside the `<header>` boundary — menu closed (`aria-expanded` → `"false"`).
- **Escape-to-close with focus return:** confirmed with a genuine keyboard Escape press — menu closed **and** `document.activeElement` became the toggle button itself.
- `aria-controls`/panel `id` wiring confirmed present and matching.

**Carousel:**
- Confirmed all four real images render (none broken), correct captions/tags, square card corners, square prev/next buttons.
- Keyboard scrolling confirmed as above; pointer-drag logic is a direct, unmodified port of the reference commit's implementation (reviewed, not rewritten), so its touch/mouse behavior is unchanged from the version already proven to work.

**Reduced motion:**
- Verified by code review rather than a live OS toggle (no tool here can flip the browser's actual `prefers-reduced-motion` setting). Both new helpers use the identical `useReducedMotion()` + `useRevealTrigger` pattern already proven correct in `Reveal`/`RevealMask`/`CountUp` elsewhere on this site: `ClipReveal` jumps straight to its revealed state with a 0.01s transition; `DragRow`'s keyboard/button scrolling uses `behavior: "auto"` instead of `"smooth"` when reduced motion is active.

**One real bug found and fixed during this verification pass:** `human-impact.tsx` requested `quality={90}` on its images, copied verbatim from the reference commit, but this project's `next.config.ts` only allows `[75, 92, 95]` — corrected to `92` (visually negligible difference), confirmed the console warning is gone.

**One environment artifact identified and ruled out, not a bug:** early in this verification, both the stat card and the carousel appeared permanently stuck pre-reveal. Traced to the automation tab being in a backgrounded (`document.hidden`) state, which Chrome heavily throttles timers and animation frames in — confirmed by fronting the tab, after which both revealed normally. Not a defect in the shipped code.

## Build and console results

- `tsc --noEmit`: clean.
- `eslint`: no issues found.
- `next build`: succeeds, all 23 routes generated, no errors.
- Browser console: no errors on any width tested (1440 / 768 / 375); the only warnings seen (image quality mismatch) were fixed during this pass.

## Screenshots

Captured and reviewed live during this session at 1440px, 768px, and 375px for both restored sections, plus the open mobile menu at 375px — all shown inline during verification above. Let me know if you'd like them re-sent as attached image files as well.

---

Nothing was deployed, committed, or published. Stopping here for your review before Stage 2.
