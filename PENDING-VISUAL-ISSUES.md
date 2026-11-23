# Pending Visual Issues

A record of visual/layout defects found during stage-by-stage review, logged for future resolution. Nothing on this list has been fixed — logging only, per explicit instruction not to change layout, breakpoints, dimensions, or captions without approval.

## 1. Focus Areas: 768px pending-card row is visually cramped

**Found:** Stage 4 checkpoint (homepage "Our Focus Areas" section, `src/components/work-chapters.tsx`, the `PendingCard` component — Education / Rural Livelihoods / Disaster Relief).

**What's wrong:** At 768px, the three-column pending-card row renders each card at **216 × 108px** — smaller than the same cards at both 1440px (387 × 193) and 375px (331 × 166). Three columns at tablet width divide into narrower boxes than mobile's single full-width column, while the `aspect-[2/1]` ratio locks each card's height to half of that already-narrow width. The tag, numeral, two-line summary, and "Programme photography pending" caption all have to fit in that compressed space. Text doesn't overflow (`line-clamp-2` is working as intended), but the row reads as the tightest of the three breakpoints.

**Status:** Confirmed via direct measurement, not fixed. Needs a decision: wider breakpoint for the 3-column switch, a different aspect ratio at tablet width, or an accepted tradeoff.

## 2. Focus Areas: photo-card headlines clipped at 768px and 375px

**Found:** Same Stage 4 checkpoint, the `PhotoFeature` component (Women & Girl Child, Healthcare cards).

**What's wrong:** The caption block (tag + headline + summary) is anchored to the bottom of each photo card and sized by its content. At 768px and 375px, the headline wraps onto two lines, making the caption block taller than the card's `aspect-[2/1]` box. Because the block grows upward from the bottom anchor, its top (the first headline line) gets pushed above the card's own top edge and is clipped away by the card's `overflow-hidden`. Only the second headline line is fully visible at these widths; the first line is partially or fully cut off.

**Status:** Confirmed via screenshot at both widths, not fixed. Pre-existing in the already-approved asymmetric-grid rebuild — not introduced by the Stage 4 focus-visible edit. Needs a decision: taller card aspect ratio at narrow widths, a dynamic/min-height on the gradient scrim, or a different caption-sizing approach.

## 3. Signature Initiatives: Pillars of Humanity portrait is disproportionately tall at 768px

**Found:** Stage 5 checkpoint (homepage "Signature Initiatives" section, `src/components/signature-initiatives.tsx`, the Pillars of Humanity card).

**What's wrong:** Below the `lg:` (1024px) breakpoint, Pillars of Humanity and Kamala Rising Star stack into a single column, and Pillars of Humanity keeps its `aspect-[3/4]` portrait ratio at nearly the full container width. At 768px this produces a portrait card that renders **approximately 915px tall** — noticeably taller than the same card at 1440px (620px) or 375px (439px). As a result, the overall Signature Initiatives section reaches **approximately 2066px** total height at 768px, taller than both 1440px (1585px) and 375px (1447px), making 768px the tallest rendering of the three breakpoints and requiring noticeably more scrolling than either neighboring width.

**Status:** Confirmed via direct measurement and screenshot, not fixed. Needs review during a future responsive-refinement stage: options include a shorter aspect ratio at tablet width, a max-height constraint, or an accepted tradeoff.

## 4. Moments & Gatherings: caption clipping at 1440px and 768px

**Found:** Stage 6 checkpoint (homepage "Moments & Gatherings" section, `src/components/human-impact.tsx`, the carousel cards).

**What's wrong:** At 1440px, both "wide" cards (Kanya Sneh Bandhan and Republic Day Celebration) have their tag completely hidden — the Republic Day card's "2026" tag is entirely invisible. At 768px, all four cards have clipped titles, with some titles almost entirely disappearing (e.g. "Kamala Power Women, on stage" renders as just "on stage").

**Likely cause:** the bottom-anchored caption block (tag + title + description) is sized by its own content, not by the card's box. The card itself is sized purely by its aspect ratio at whatever width the grid-column track assigns it. When the caption's content needs more vertical space than the aspect-locked card height provides, the block's top — and therefore the topmost content (the tag, and at narrower widths the title too) — gets pushed above the card's top edge and clipped away by `overflow-hidden`. This is the same underlying mechanism as issue #2 above, but more severe here since these captions stack three text elements (tag, title, multi-line description) instead of two.

**Status:** Confirmed via direct measurement and screenshot at both widths, not fixed.

**Resolution:** Needs a future dedicated responsive-refinement stage.

---

All four items are presentation-only bugs. No content, copy, image, or data was affected by any of them.
