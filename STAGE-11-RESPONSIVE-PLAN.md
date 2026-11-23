# Stage 11 Plan: Responsive Refinement (Phase 1 — Audit Only, No Code Changes)

## 1. Baseline

- **Branch:** `claude/kamala-trust-homepage-dev-b141a6`
- **HEAD:** `ab028d6` — "Fix photo crop alignment and raise image quality across the site"
- **Working tree:** substantial pre-existing, already-approved uncommitted work from Stages 1–10 (36 modified tracked files, 2 deletions from Stage 10's Transparency removal, ~20 untracked files including every prior checkpoint/plan document). Confirmed via `git status --short` before touching anything — see §8 for the exact listing, unchanged from before this audit began.
- No reset, clean, stash, checkout, or revert was performed. Nothing was overwritten.

Read in full before starting: `PENDING-VISUAL-ISSUES.md` (all five entries, used as the authoritative record below) and the Stage 4, 5, 6, and 10 checkpoints (already authored by me earlier in this engagement; re-confirmed, not assumed, against fresh browser measurements in §3 below).

## 2. Components inspected

- `src/components/work-chapters.tsx` (issues 1 & 2)
- `src/components/signature-initiatives.tsx` (issue 3)
- `src/components/human-impact.tsx` (issue 4)
- `src/components/site-footer.tsx` + `src/components/newsletter-form.tsx` (issue 5 — the newsletter form had to be inspected too, since it's the other candidate element in the overflowing footer column)
- `src/content/trust.ts` (read-only, to confirm the exact email string causing issue 5)

No other file was found to be a genuine dependency for any of the five fixes.

## 3. Reproduced evidence, all five issues, real browser, all three widths

A single Playwright session (driving the system's real Chrome, same methodology used in every prior stage) loaded the current local dev server, scrolled to each section, and both screenshotted and measured it via `getBoundingClientRect()`/`getComputedStyle()` at 1440, 768, and 375px. Screenshots are attached to this message. Measurements:

| Issue | 1440px | 768px | 375px |
|---|---|---|---|
| 1 — Pending card size | 387×193 | **216×108** | 331×166 |
| 2 — Women & Girl Child card clipping | not clipped (89px slack) | **clipped 98px** | **clipped 80px** |
| 3 — Pillars of Humanity card height | 465×620 | **686×915** | 329×439 |
| 4 — Moments card clipping (4 cards) | wide cards clipped 2px/41px; regular cards fine | **all 4 clipped 149–276px** | not clipped (all negative) |
| 5 — Footer `document.body.scrollWidth` vs viewport | 1440 = 1440 (none) | **865 vs 768 (+97px)** | 375 = 375 (none) |

All five numbers match (and sharpen) the existing `PENDING-VISUAL-ISSUES.md` record. **No new regression was found** — every measurement is consistent with what was already logged; nothing has gotten worse or better since Stage 10.

### Issue 5 — exact element and exact CSS rule, isolated and confirmed

Queried every element inside `<footer>` whose `getBoundingClientRect().right` exceeds the 768px viewport. The offending chain is the fourth grid column ("Stay updated"), specifically its `<ul>` and, within it, the plain-text email link:

```
<a href="mailto:trustee@ankibaighamandiramgowanitrust.com">trustee@ankibaighamandiramgowanitrust.com</a>
```

I isolated the two candidate culprits in that column (the "Get Updates by Email" CTA from `newsletter-form.tsx`, and this email link) by cloning each in isolation and measuring its unconstrained natural width:

- CTA link ("Get Updates by Email →"): natural width **207px**, renders at exactly 207px — not being compressed, not the cause.
- Email address link: natural width **352px** (computed via `white-space: nowrap` clone), but renders squeezed to **308px** — the browser cannot wrap it any narrower because the string `trustee@ankibaighamandiramgowanitrust.com` contains no space, hyphen, or other break opportunity, and the element's computed `overflow-wrap`/`word-break` are both `normal` (the default — no wrapping allowed for an unbroken token).

**Exact CSS rule responsible:** `src/components/site-footer.tsx`'s grid wrapper uses a raw arbitrary value, `sm:grid-cols-[1.3fr_1fr_1fr_1.2fr]` — four bare `fr` tracks with no `minmax(0, ...)` wrapper. Per the CSS Grid spec, a plain `<flex>` track's implicit minimum is `auto`, i.e. the content's min-content size — not zero. (Tailwind's own numbered `grid-cols-N` utilities set `minmax(0, 1fr)` automatically; this hand-written arbitrary value does not.) With the email address's min-content width fixed at 352px (unbreakable) and no `min-width: 0` override anywhere in the chain, the fourth column — and therefore the whole grid, and therefore the page — is forced to grow to accommodate it, producing the ~97px overflow measured at 768px specifically (where the column's fair fr-share is far too narrow to hold 352px, unlike 1440px where there's ample width, and unlike 375px where the grid collapses to a single full-width column wide enough to hold it without wrapping).

## 4. Minimal implementation plan

| | Issue 1 — Pending cards cramped at 768px | Issue 2 — Focus Areas headline clipping | Issue 3 — Pillars of Humanity excess height at 768px | Issue 4 — Moments & Gatherings caption clipping | Issue 5 — Footer overflow at 768px |
|---|---|---|---|---|---|
| **Root cause** | `PendingCard`'s row switches to 3 columns at `sm:` (640px), and `aspect-[2/1]` locks each card's height to half of that already-narrow column width — tightest of all three breakpoints. | Bottom-anchored caption (tag+headline+summary) is sized by content, but the card box is locked to `aspect-[2/1]` with `overflow-hidden`. At column widths around ~330px (both the 768px 2-up row and the 375px 1-up row land near this width), the resulting ~165px box is shorter than the content needs; at 1440px the column is wide enough (~645px) that the same ratio gives ample height. | Below `lg:` (1024px), the two-column grid collapses to one column, and the portrait `aspect-[3/4]` box is sized off nearly the full ~686px container width, producing 915px — proportionally correct for the ratio, but far taller than necessary for a stat-overlay photo. | Same mechanism as issue 2, worse: captions stack three elements (tag, title, multi-line description) instead of two, and the "wide" (16:11) and "regular" (3:4) aspect ratios apply uniformly from `sm:` upward with no `lg:` differentiation — so the tablet range (640–1023px, similar effective column width to mobile) gets the same flat ratio that only has enough absolute height at full desktop width. | `site-footer.tsx`'s grid uses bare `1.3fr 1fr 1fr 1.2fr` tracks (no `minmax(0,…)` floor) and the footer's `mailto:` email-address link has no `break-words`/`overflow-wrap` styling — an unbreakable 352px string forces its column, and the whole page, wider than the 768px viewport. |
| **Affected file(s)** | `src/components/work-chapters.tsx` | `src/components/work-chapters.tsx` | `src/components/signature-initiatives.tsx` | `src/components/human-impact.tsx` | `src/components/site-footer.tsx` |
| **Proposed fix** | Change the pending-card row's grid from `grid-cols-1 sm:grid-cols-3` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — 2 columns at tablet width (matching the `PhotoFeature` row immediately above it, same visual rhythm), 3 columns only once there's enough room (desktop, unchanged). No change to the card component itself. | Increase the card's aspect ratio at narrow widths so the box is taller (candidate: `aspect-[4/5]` or similar, base/`sm:`), reverting to the current `aspect-[2/1]` only at `lg:` (1024px+) where desktop already has enough width. Exact ratio to be confirmed empirically in Phase 2 against the longest headline+summary combination across all five pillars, not just Women & Girl Child. | Add a `max-h` cap (candidate: `max-h-[560px]`, close to the already-correct 1440px rendered height) to the portrait box below `lg:`, removed at `lg:` where the two-column layout already produces reasonable proportions. `object-cover` (already present) absorbs the resulting crop change gracefully. | Differentiate the `sm:` and `lg:` aspect ratios instead of one flat value from `sm:` upward: a single, taller shared ratio (candidate: `aspect-[3/4]`, same as mobile's existing safe value) for the `sm:` (tablet) range on both "wide" and "regular" cards, with the current flatter `aspect-[16/11]` / `aspect-[3/4]` ratios moved to apply only at `lg:` (desktop) where there's enough absolute height. Exact values to be confirmed empirically against all four captions. | Add `break-words` (Tailwind for `overflow-wrap: break-word`, or `break-all` if that proves insufficient for a string with zero natural break points) to the single email `<a>` element. Scoped to one element; no grid-level or global change proposed unless this targeted fix is empirically shown not to fully resolve the measured 97px overflow. |
| **Breakpoint behaviour expected after fix** | 1440: unchanged (3 cols, 387×193). 768: 2 cols, each card roughly 330×165 — comparable proportions to the 1440/375 renderings instead of the current outlier. 375: unchanged (1 col, 331×166). | 1440: unchanged (`lg:aspect-[2/1]` preserves today's exact look). 768 & 375: taller box, headline and tag fully visible, no clipping — to be confirmed by re-measuring `captionTop >= cardTop` at both widths. | 1440: unchanged (`lg:` removes the cap, same 465×620 as today). 768: height capped near ~560px instead of 915px, bringing the section's total height back in line with 1440/375 rather than being the tallest of the three. 375: unchanged (single column already fine at 439px). | 1440: unchanged at `lg:` (today's 2px/41px clips on wide cards should also disappear once `lg:` explicitly carries the flatter ratio only where it already mostly works — to be re-verified, since this is the one place where 1440 itself needs a small correction too, not just 768). 768: all four captions fully visible — to be confirmed per-card. 375: unchanged (already correct). | 1440 & 375: unchanged (no overflow there today). 768: `document.body.scrollWidth` returns to 768px, matching the viewport exactly. |
| **Regression risk** | Low — isolated to one grid wrapper's breakpoint class; `PhotoFeature` row and the cards' own internals are untouched. | Low–medium — aspect-ratio changes affect `next/image`'s `fill` sizing and the gradient scrim's proportions; must re-verify the photo crop still looks intentional (not oddly letterboxed) at the new ratio, not just that text fits. | Low — a `max-h` cap with `object-cover` already in place is a well-understood, contained change; only visual risk is a tighter crop on the portrait at 768px, to be visually reviewed, not just measured. | Low–medium — same aspect-ratio/image-fill consideration as issue 2, across four cards and two ratio variants instead of one; more surface area to re-verify. | Very low — a single utility class on a single `<a>` tag; the stated "no global override unless demonstrably global" constraint is satisfied, since the grid-track `minmax(0,…)` approach (the alternative, more global fix) is explicitly not being proposed unless the targeted fix proves insufficient. |
| **Verification plan** | Re-measure the same card's `getBoundingClientRect()` at 768px post-fix; confirm 1440/375 unchanged via the same measurement script already used for this audit. | Re-run the exact clipping check used in this audit (`captionTop < cardTop`) for **all five pillars**, not just Women & Girl Child, at 768 and 375; screenshot all three widths; confirm 1440 unchanged pixel-for-pixel via screenshot diff. | Re-measure the card's height at 768px; confirm it no longer exceeds roughly the 1440px height by more than a small margin; re-screenshot all three widths; visually confirm the crop still reads correctly (face/subject not awkwardly cut). | Re-run the same clipping measurement across all four cards at all three widths; confirm tag/title/description fully visible everywhere, including the two 1440px wide-card clips found in this very audit. | Re-run the exact `document.body.scrollWidth` vs. viewport check at 768px (and re-confirm 1440/375 stay clean); re-run the element-level overflow scan used to isolate the root cause, confirming zero offending elements remain. |

## 5. Priorities honored in every proposed fix

- No fix clips content — every proposed change either adds height/room or caps excess height while keeping all text and images fully visible.
- No fix relies on shrinking or truncating text.
- Cards are allowed to size closer to their actual content needs rather than a one-size-fits-all aspect ratio across all breakpoints.
- No new horizontal overflow is introduced by any proposed change (the footer fix specifically removes the only overflow currently measured anywhere on the homepage).
- Spacing and visual hierarchy are preserved — none of the five fixes touch spacing utilities (`gap`, `py`, `px`) anywhere.
- The approved 1440px desktop rendering is explicitly preserved or restored in all five cases — four of five fixes scope their change to apply only below `lg:` (1024px), and the fifth (footer) has no effect at 1440px at all since no overflow exists there today.

## 6. What will not be touched

- No shared component (`Container`, `Reveal`, `DragRow`, `Fact`, `motion.tsx`, etc.) — every proposed fix is scoped to the four section-level files already named, confirming the Phase 1 instruction not to modify shared components merely to make individual sections fit.
- `PENDING-VISUAL-ISSUES.md` — not modified during this phase.
- No previously-approved stage's content, copy, image, or link.
- Typography faces, color tokens, square-corner convention, and Framer Motion usage — none of the five proposed fixes touches any of these; all are pure sizing/layout adjustments.

## 7. Confirmation: no production source files were modified

Every file read in this audit (`work-chapters.tsx`, `signature-initiatives.tsx`, `human-impact.tsx`, `site-footer.tsx`, `newsletter-form.tsx`, `trust.ts`, `PENDING-VISUAL-ISSUES.md`, and the Stage 4/5/6/10 checkpoints) was opened with a read-only tool call. No `Edit`/`Write` call was made against any of them. The only file created during this phase is this plan document itself.

## 8. Final `git status --short` (identical to the pre-audit baseline in §1 — nothing changed)

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

Exact diff summary: **zero** — no tracked file's content changed during this audit; the only addition is `STAGE-11-RESPONSIVE-PLAN.md` itself (untracked, new).

---

Nothing was implemented. Waiting for your review and explicit approval of the five proposed fixes before Phase 2 begins.
