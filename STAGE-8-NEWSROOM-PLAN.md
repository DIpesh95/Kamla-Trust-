# Stage 8 Plan: Newsroom (Planning & Audit Only — No Implementation)

This is a planning document only. No project source file was edited to produce it.

## 1. Files responsible

- **Homepage preview + full page, same component:** [src/components/newsroom-editorial.tsx](src/components/newsroom-editorial.tsx) — exports `NewsroomEditorial({ featured })`. When `featured` is true (homepage usage in `page.tsx`), it renders the internal `FeaturedNewsroom` function (one `FeaturedCard` + client-side filter tabs + a `Row` list + a conditional "Press releases" box). When `featured` is omitted (full `/newsroom` page usage), it renders a flat per-category (`Press`/`Recognition`/`Event`/`Community`) grouped list using the same `Row` component.
- **Full page route:** [src/app/newsroom/page.tsx](src/app/newsroom/page.tsx) — renders `PageHero` + `<NewsroomEditorial />` (no `featured` prop), inside a `Container`.
- **Data:** [src/content/newsroom.ts](src/content/newsroom.ts) — 19 `PressItem` entries (`title`, `date` as `Verified<string>`, `kind`, `description`, optional `image`, optional `quote`). Only 2 of 19 items carry an `image` field: the Lokmata Ahilyabai Holkar Mahila Samman 2026 event and the Republic Day Celebration 2026 event.
- **Types:** `PressItem` in [src/content/types.ts](src/content/types.ts) (read only, unchanged).
- **Shared primitives used:** `Fact` (date/placeholder rendering), `Reveal` (scroll animation).

## 2. Live-site comparison — a significant structural mismatch, not a minor copy issue

I queried the live site's actual DOM directly (headings by tag, images, links, buttons) for both the homepage section and the full `/newsroom` page, rather than relying on visible text alone.

### Homepage preview

| Aspect | Live site | Current local implementation |
|---|---|---|
| **Items shown** | Exactly 4: one featured + three compact rows | All 18 non-featured items rendered inline (the entire remaining newsroom list), plus the featured card |
| **Featured item** | **Lokmata Ahilyabai Holkar Mahila Samman 2026** (an Event) — large photo, title, description, date. No quote. Rendered as the page's only `<h3>` in this section. | Always the sole **Press** item ("The Quiet Revolutionary") — dark quote card, no photo (by design, since Press has no image). Rendered as `<h3>`; Lokmata is demoted to a plain `<h4>` row with no image. |
| **Filter tabs** | **None.** No buttons at all in this section — confirmed via DOM query (`buttons: []`). | "ALL / RECOGNITION / EVENT / COMMUNITY" client-side filter buttons, not present on the live site. |
| **"Press releases" box** | Does not exist. | Present in code (dashed border, light-pink background) but currently never renders in practice, since there's only one Press item total and it's always the featured one — effectively dead code with real content (19 items), not a live-content gap. |
| **Images** | Featured item shows a large photo (1920w); the Republic Day row also carries a small thumbnail (256w) | **No image renders anywhere** — confirmed via code: neither `Row` nor `FeaturedCard` reference `item.image` at all. |
| **"View all" link** | `/newsroom`, exact text "VIEW ALL →" | Matches — this one link lives in `page.tsx`, outside this component, unchanged. |

### Full `/newsroom` page

This part matches well: four category groups (Press 1 / Recognition 8 / Event 8 / Community 2), same order, same titles, dates (including every "Exact date pending confirmation." placeholder), and descriptions — confirmed item-for-item against the live page's full text. **The one gap here too:** the live page shows small thumbnail images (256w) for the same two items (Lokmata, Republic Day) within their category rows; the local page shows none, for the same code reason as above.

**Summary:** the full page's content is accurate; the homepage preview's selection logic, item count, and presence of filter tabs diverge substantially from the live site. This is the main finding of this audit.

## 3. Photography review

| Item | Image file | Verified event match | Suitable? |
|---|---|---|---|
| Lokmata Ahilyabai Holkar Mahila Samman 2026 | `lokmata-ahilyabai-holkar-2026.jpg` | Yes — same image already verified and in use elsewhere (Signature Initiatives, Moments & Gatherings) | Yes |
| Republic Day Celebration 2026 | `republic-day-2026.jpg` | **Carries its own existing caveat in the alt text**: "photo dated 26 January; exact event match pending confirmation." Already flagged in prior stages, unresolved. | Pending confirmation — not newly introduced by this audit, already an existing, documented open item |

The other 17 items have no image in `newsroom.ts` and none exists on the live site either — no gap to fill, nothing missing beyond what's already true in production. **No Drive photographs, stock images, or AI-generated images are proposed or needed** — both images already in use are existing, approved site assets, already wired in the data file; the only change needed is to actually *render* them, not to source anything new.

## 4. D2 visual-direction review

Current component already uses: Fraunces display type (`font-display`) for headings/quote, Inter body type, burgundy/ivory/charcoal tokens, `Reveal` for scroll animation (no GSAP), square corners confirmed site-wide **except** one leftover: the inert "Press releases" box uses `rounded-sm` (dead code as noted above, but still present in source). No other square-corner violations found in this file.

## 5. Responsive audit — tested at all three widths, both homepage and full page

Rendered the current local implementation (not a hypothetical future one) at 1440/768/375 for both the homepage section and `/newsroom`.

- **1440px:** Featured card renders as a clean 2-column split (quote block + text block), no clipping. The flat list below (currently showing all 18 items, not 4) reads fine row-by-row at this width — no cramping, no overflow.
- **768px:** Same layout holds up (rows stack their date below the title/description on narrower widths via the `sm:flex-row` breakpoint, nothing clipped). **However, I confirmed `document.body.scrollWidth` (865px) exceeds the 768px viewport on both the homepage and the full `/newsroom` page.** I traced the actual overflowing elements in a prior stage and confirmed they belong to `site-footer.tsx`, not to Newsroom — this is the same sitewide footer overflow you've already treated as issue #5. Not re-investigated here since it's unrelated to this component; I'm only confirming it's still present and not something newly introduced.
- **375px:** Rows stack correctly, filter tabs wrap onto two lines, placeholder date badges wrap without clipping. No horizontal overflow from Newsroom's own elements at this width.

**No clipped text or broken wrapping was found inside the Newsroom component itself at any width.** The only cross-cutting issue present is the already-known footer overflow at 768px.

## 6. Accessibility and interaction audit — tested, not just read

- **Heading hierarchy:** one `<h3>` (the featured item) plus `<h4>`s for every row, on the homepage; on the full page, four `<h3>` category headings with `<h4>` rows beneath each. This is internally consistent, though it's worth noting the homepage's single `<h3>` exists only because exactly one item is currently chosen as "featured" — if the homepage preview is rebuilt to match live (see below), the heading-level logic needs to carry over correctly.
- **Filter tabs — tested live:** focused the "ALL" tab via script and read its computed outline: `outlineStyle: "auto"`, `1px` — this is the **unstyled browser default focus ring**, not a custom `focus-visible` style. Every other interactive element fixed in Stages 2, 4, 5, and 6 got an explicit, visible, on-brand outline; these tab buttons never did. Confirmed by testing, not just by reading the source (which also has no `focus-visible` classes on these buttons).
- **"View all →" link — tested live:** focused it and confirmed a `2px solid` outline is already present and visible.
- **Image alt text:** both existing image entries already carry descriptive alt text in the data file (confirmed by reading `newsroom.ts` directly) — this is fine as data; the problem is that the images using that alt text never render.
- **Reduced motion:** confirmed via code inspection that `Reveal` (the same proven, reduced-motion-safe helper used everywhere else) wraps the featured card; a live pre-scroll check confirms the element starts at `opacity: 0` under both reduced and normal motion before entering view, consistent with the established, already-proven pattern — I did not re-run the full before/after timing proof in this planning pass (that belongs in the implementation checkpoint), so I'm distinguishing this as "spot-checked," not "fully verified."
- **Interactive controls:** the filter-tab buttons use `aria-pressed` correctly (confirmed `"true"`/`"false"` toggling via `getAttribute`).

## 7. Proposed Stage 8 implementation plan

**Primary recommendation, requiring your decision:** rebuild the homepage preview (`FeaturedNewsroom` inside `newsroom-editorial.tsx`) to match the live site's actual structure — one featured item with its real photo (whichever the data's own content determines as most newsworthy; the live site currently features the Lokmata event, not the Press item), three compact rows below it, a "View all" link (already correct, untouched), and **no filter tabs** — rather than the current all-18-items-plus-tabs treatment. This is a bigger structural change than prior single-component fixes in this engagement, so I'm flagging it clearly rather than assuming it's approved by default.

1. **`src/components/newsroom-editorial.tsx`** (only file proposed for change):
   - Remove the "ALL/RECOGNITION/EVENT/COMMUNITY" filter-tab UI and its `useState` from the homepage path — not present on the live site, and removing the unused "Press releases" dead-code block along with it (also removes its one remaining `rounded-sm`).
   - Limit the homepage preview's supporting list to 3 items total (matching live), rather than all 18.
   - Re-evaluate which item is "featured" — the live site features an Event (with photo), not the Press item (quote-only). I'd propose deriving this directly from which items *have* an image rather than hardcoding a specific slug, so the logic stays data-driven rather than me guessing a fixed title — but this needs your confirmation before I build it.
   - Render `item.image` (via `next/image`, matching the thumbnail treatment already established elsewhere in the project) wherever present — the featured card's photo, and a small thumbnail on any compact row whose item has one (currently just Republic Day, on the full page; potentially more once the featured item changes).
   - Add explicit `focus-visible` styling to any interactive control that remains (if filter tabs are removed entirely, this item may become moot; if any interactive element is kept, it gets the same outline treatment already used in Stages 2/4/5/6).
2. **No other file.** `src/content/newsroom.ts`, `src/content/types.ts`, `src/app/newsroom/page.tsx`, `src/components/fact.tsx`, and `src/components/motion.tsx` all stay untouched — the full `/newsroom` page's content is already accurate and only needs the same image-rendering addition inside the shared `Row`/category path, not a structural change.

**Content that stays unchanged regardless of your decision above:** all 19 `newsroom.ts` entries, every title/date/description/kind, the full `/newsroom` page's category grouping and order, the "View all →" link and its destination, the two existing images and their alt text (including Republic Day's own provenance caveat, left exactly as worded).

## 8. Content/image discrepancies requiring your decision

1. **Which item should be homepage-featured** — the live site's Event-with-photo choice, versus the current code's fixed "always feature Press" rule. I'm not proposing to silently flip this without your sign-off, since it changes what's visually prioritized on the homepage.
2. **Whether to remove the filter tabs entirely** (matching live exactly) or keep them as an intentional enhancement beyond the live site (as has been judged acceptable in a few earlier stages, e.g., Moments & Gatherings' carousel vs. the live site's simpler version) — this is a content-architecture choice, not just a styling one, so I'm asking rather than assuming "match live" applies here by default.
3. **Republic Day's image provenance caveat** — already an existing, documented open item from prior stages, not new; no action proposed, just carried forward.

## 9. Desktop/tablet/mobile layout plan (contingent on your decision above)

- **If rebuilt to match live:** one featured image+text card (desktop: image beside text; tablet/mobile: stacked), three compact rows beneath it, same row treatment already used (`Row` component, already responsive-proven across Stages 2–7).
- **If tabs are kept:** only add the missing `focus-visible` styling and image rendering, no structural change, same breakpoints as today (already confirmed clipping-free at all three widths).
- Either way: the full `/newsroom` page keeps its current category-grouped structure, just with thumbnail images added to the two items that have them.

## 10. Accessibility and testing plan

- Add `focus-visible` outlines to any interactive element that remains (filter tabs, if kept).
- Verify heading hierarchy holds correctly under whichever featured-item logic is approved.
- Full before/after reduced-motion proof (not just the spot-check done here) via the established Playwright `emulateMedia` method.
- Keyboard-tab through the section, confirm order and visible outlines.
- Screenshots at 1440/768/375 for both the homepage section and the full `/newsroom` page.
- `tsc`, `eslint`, fresh `next build`.
- Exact `git diff`/`git status`, confirming only the approved file changed.

## 11. Risks and dependencies

- Changing the featured-item logic touches the only `<h3>` in this section — needs care to avoid a heading-hierarchy regression.
- Removing the filter tabs removes an interaction the current build offers that the live site doesn't — purely a reduction in scope, low risk, but it's a user-facing behavior change worth your explicit sign-off rather than mine.
- Adding images reintroduces `next/image` usage in a component that currently has none — low risk, same pattern already proven everywhere else on the site (correct `sizes`, `quality={92}`, no layout-shift regressions expected given fixed aspect treatment already established elsewhere).
- No new dependency, no GSAP, no Drive asset, no new content.

## 12. Project-rule confirmations

- `stories.ts` and `stories-magazine.tsx`: not read for editing purposes, not touched in any way during this audit.
- `PENDING-VISUAL-ISSUES.md`: not modified. All four existing entries remain exactly as logged.
- The footer overflow finding (treated as issue #5 per your message) was only *observed again* during this audit's responsive check, consistent with what was already reported — I have not added it to `PENDING-VISUAL-ISSUES.md` in this pass, since this stage's only permitted file addition is this plan document itself; let me know if you'd like it formally logged in a separate documentation-only step.
- No other homepage section, no previously-approved stage's component, was read for editing or touched.

---

Nothing was implemented. Waiting for your review, your decisions on the two flagged items in §8, and explicit approval before Stage 8 implementation begins.
