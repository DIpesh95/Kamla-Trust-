# Stage 9 Plan: Leadership (Planning & Audit Only — No Implementation)

This is a planning document only. No project source file was edited to produce it.

## 1. Files responsible

- **Homepage preview:** [src/components/leadership-teaser.tsx](src/components/leadership-teaser.tsx) — exports `LeadershipTeaser()`. Standalone component, not shared with the full page.
- **Full Leadership page:** [src/app/about/leadership/page.tsx](src/app/about/leadership/page.tsx) — a route-level file containing its own inline JSX for both the lead trustee's profile and the "Also on the board" list. **It does not import or reuse `leadership-teaser.tsx` at all** — these are two entirely separate, independently-coded implementations of the same underlying data, confirmed by reading both files directly rather than assuming a shared component.
- **Data:** [src/content/trust.ts](src/content/trust.ts) — `trust.trustees`, an array of exactly 2 entries (`Smt. Nidarshana Gowani`, `Shri Ramesh Gowani`), each with `name`, `role`, `bio`. **No `image` field exists on the `Trustee` type** ([src/content/types.ts](src/content/types.ts)) or anywhere in the data.
- **Shared components used:** `Reveal`, `Container`, `PageHero`, `SubNav` (full page only) — all already-approved, unchanged elsewhere.
- **Nav data:** `primaryNav` from `src/content/nav.ts`, used only to build the full page's `SubNav` links (unchanged, out of scope).

## 2. Live vs. local comparison

### Homepage preview — exact comparison table

| Aspect | Live site | Local implementation |
|---|---|---|
| Eyebrow | "LEADERSHIP" | "Leadership" — matches |
| **Section heading** | **`<h2>The people carrying this forward.</h2>`** | **None — no heading element beyond the eyebrow exists at all** |
| Nidarshana's placeholder | Two-letter initials **"NG"**, badge reading "TRUSTEE PHOTOGRAPHY PENDING", disclosure "Shown as initials until cleared by the trustees." | Icon glyph (`PersonGlyph` SVG) + "Portrait pending" label, no initials shown anywhere |
| Nidarshana's name heading | `<h3>` | `<h3>` — matches |
| Ramesh's name heading | Plain text (`<span>`), no heading element | **`<h3>`** |
| Ramesh's disclosure | None shown | "Shown here in type only, intentionally — a photographic portrait awaits trustee approval. No placeholder image is used." |
| **Card width ratio** | Measured directly: Nidarshana's card **414px wide**, Ramesh's **690px wide** — Ramesh's is the *larger* of the two | `lg:grid-cols-[1.6fr_1fr]` — Nidarshana's column is the *larger* one — **the opposite ratio** |
| "Meet the Trustees" link | `/about/leadership`, same label | Matches |
| Names, roles, bios | Verbatim identical to `trust.ts` | Matches |

### Full `/about/leadership` page — exact comparison table

| Aspect | Live site | Local implementation |
|---|---|---|
| Breadcrumb | Home / About Us / Leadership | Matches |
| Page title/dek | "Leadership" / "The trustees steering Kamala Trust's work." | Matches |
| Sub-nav | Our Story / Leadership / Registration & Transparency | Matches |
| Lead trustee portrait placeholder | Single initial **"N"**, large italic, "PORTRAIT PENDING" label, dark ground | Matches exactly — same split logic (`name.split(" ")...[1]?.[0]`), same label, same dark background |
| Pull-quote | "Leadership rooted in service." | Matches |
| Selected Roles list | 3 items, same wording | Matches |
| "Also on the board" | Ramesh Gowani, role, bio, **no heading level on the name** (plain text) | Matches — local also uses a plain `<p>`, not a heading, for this name |
| "Content gap" disclosure | Exact wording present | Matches verbatim |
| Additional trustees beyond the 2 named | None found on live site | None in local data — consistent |

**Summary: the full page already matches the live site closely and accurately. The homepage preview has three real discrepancies** — a missing section heading, the wrong placeholder treatment (icon vs. initials) for Nidarshana, and a reversed column-width ratio — plus one minor heading-level inconsistency (Ramesh as `<h3>` locally vs. plain text live).

## 3. Portrait and photography verification

| Person | Local image file | Status |
|---|---|---|
| Smt. Nidarshana Gowani | **None exists** | Confirmed via `find` across `public/images/` — no file matches her name, and the `Trustee` type has no `image` field to hold one even if it existed. **The previously identified gap still exists; it has not been resolved.** |
| Shri Ramesh Gowani | **None exists** | Same — confirmed no matching file, no data field. **Gap still exists.** |

No stock photography, AI-generated image, or new Drive photo is proposed anywhere in this plan. Both portraits remain `PENDING CONFIRMATION` from the Trust — I am not inferring identity from any filename (none exists to infer from) and not substituting either person's likeness.

## 4. D2 design-direction review

Both implementations already use Fraunces/Inter, burgundy/ivory/charcoal tokens, and `Reveal` (no GSAP). One square-corner inconsistency found on the full page: the portrait-placeholder box, the "Also on the board" card, and the "Content gap" warning box all still carry `rounded-sm` — the same leftover inconsistency already fixed in other sections across Stages 2–8. The homepage teaser has no `rounded-sm` anywhere (already square).

## 5. Responsive audit — tested, both views, all three widths

Rendered the current local implementation (not a hypothetical future one).

- **Homepage, 1440px:** clean two-column split, no clipping. Confirms the width-ratio issue visually: Nidarshana's maroon card is the wider of the two, opposite of what's live.
- **Homepage, 768px:** both columns stack to full width below the `lg:` (1024px) breakpoint — no cramping, no clipping. **`document.body.scrollWidth` (865px) exceeds the 768px viewport** — identical to every other page's measurement this engagement; already traced to `site-footer.tsx`, unrelated to Leadership, not re-investigated here.
- **Homepage, 375px:** clean single-column stack, text wraps normally, no overflow from this section specifically.
- **Full page, 1440/768/375px:** clean at all three — portrait-placeholder box scales proportionally, "Selected Roles" list and "Also on the board" card wrap correctly, no clipped text, no overlapping elements. Same 768px footer overflow present, same unrelated cause.

No clipped text or broken wrapping was found inside the Leadership component or page itself at any width.

## 6. Accessibility and interaction audit — tested, not just read

- **Heading hierarchy (homepage, tested live):** confirmed via DOM query — **zero `<h1>`, zero `<h2>`** inside this section; two `<h3>`s (Nidarshana, Ramesh). This directly reflects the missing-headline finding above.
- **"Meet the Trustees" link — tested live:** focused it and read its computed outline: `outlineStyle: "auto"`, `1px` — the **unstyled browser default**, not a custom `focus-visible` style. This is the same gap pattern already found and fixed in Stages 2, 4, 5, 6, and found again (pre-fix) in Stage 8's Newsroom tabs.
- **Portrait alt text:** not applicable — zero `<img>` elements exist anywhere in either implementation (confirmed via DOM query: `images: 0` on the homepage section), since no portrait photo exists for either person. Nothing to audit for alt text until a real photo exists.
- **Reduced motion:** confirmed the homepage card is genuinely below the fold pre-scroll (`top: 12004px`) and starts at `opacity: 0` under both reduced and normal motion, consistent with the proven `Reveal` pattern — this is a pre-scroll spot-check only; I have not yet produced the full before/after timing proof (that belongs in the implementation checkpoint, matching the precedent set in every prior stage).
- **Full page's SubNav, breadcrumb, PageHero:** shared components already tested and approved in earlier, unrelated stages — not re-audited here.
- **No carousel, slider, or accordion exists anywhere in Leadership** — it's static content throughout.

## 7. Content and verification gaps — for the Trust, not to be filled by assumption

- Full, current trustee/board list — the live site and local data both show only 2 named trustees; the full page's own "Content gap" disclosure already states the board *may* include additional trustees not yet named. This plan does not add, remove, or guess any name.
- Portraits for both Nidarshana and Ramesh — confirmed still missing, confirmed not resolvable without new, Trust-approved photography.
- Whether "Smt."/"Shri" honorifics, exact designations, and the listed "Selected Roles" are complete and current — not independently verifiable from any project evidence on hand; preserved exactly as currently published.
- Whether Ramesh Gowani should also receive a "Selected Roles" list (only Nidarshana has one, on the full page) — a content-completeness question for the Trust, not something to infer.

## 8. Proposed Stage 9 implementation plan

**Scope kept minimal, homepage-only** — the full page already matches live closely and needs no structural change.

1. **`src/components/leadership-teaser.tsx`** (the only file proposed for change):
   - Add the missing section heading, `<h2>The people carrying this forward.</h2>`, matching the live site's exact copy — directly below the existing eyebrow.
   - Replace the `PersonGlyph` icon + "Portrait pending" label with a two-letter-initials placeholder ("NG") plus the exact live badge wording "Trustee photography pending" and disclosure "Shown as initials until cleared by the trustees." — matching the live treatment exactly, reusing the same initials-generation approach already proven on the full page (`name.split(" ")` logic), not inventing a new one.
   - Correct the column-width ratio so Ramesh's (text-only) column is the wider of the two, matching the live site's measured 414px/690px proportions, rather than the current reversed 1.6fr/1fr split.
   - Add explicit `focus-visible` styling to the "Meet the Trustees" link, matching the pattern already used on every other fixed link across Stages 2, 4, 5, 6, and 8.
   - Leave the heading-level question (Ramesh as `<h3>` vs. plain text) for your decision — noted in §4 of the discrepancy table, not assumed.
2. **No other file.** `src/app/about/leadership/page.tsx`, `src/content/trust.ts`, and `src/content/types.ts` all stay untouched — the full page already matches live, and no new data field (e.g., an `image` field) is needed since no portrait exists to populate it.

**Content that stays unchanged regardless:** both trustees' names, roles, and full biographies, verbatim; the "Meet the Trustees" link and its destination; the full page's entire content, structure, and disclosures; the "Content gap" warning; every pending-confirmation caveat already published.

## 9. Desktop/tablet/mobile layout plan (homepage only, contingent on your approval)

- **1440px:** same two-column grid, just with the corrected width ratio (Ramesh's column wider).
- **768px/375px:** no change proposed — the existing stack-below-`lg:` behavior already renders cleanly at both widths; only the content/heading/placeholder-treatment fixes above apply, which reflow naturally within the existing layout.

## 10. Accessibility and testing plan

- Confirm the new `<h2>` doesn't duplicate or conflict with any other heading on the homepage.
- Add and verify `focus-visible` on the "Meet the Trustees" link (tested live, not just read in code).
- Full before/after reduced-motion proof via the established Playwright `emulateMedia` method.
- Screenshots at 1440/768/375 for the homepage section (the full page is unaffected, so no new screenshots needed there, though I'd still do a quick unchanged-confirmation pass).
- `tsc`, `eslint`, fresh `next build`.
- Exact `git diff`/`git status`, confirming only `leadership-teaser.tsx` changed.

## 11. Risks and dependencies

- Low risk overall — all three homepage fixes are additive (a heading, a label swap, a width-ratio correction) or presentational (focus-visible), none touch data, routes, or shared components.
- The initials-placeholder treatment should reuse the exact logic already proven on the full page, to avoid diverging implementations of the same idea.
- No new dependency, no GSAP, no new photography, no content invention.

## 12. Project-rule confirmations

- `newsroom-editorial.tsx`, `newsroom.ts`, `stories-magazine.tsx`: not touched in any way during this audit.
- `PENDING-VISUAL-ISSUES.md`: not modified. All five existing entries (including the separately-approved footer overflow, issue #5) remain exactly as logged.
- No previously approved stage or unrelated homepage section was read for editing or touched.
- The 768px footer overflow was only *reconfirmed present* during this audit's responsive check — not fixed, not re-logged.

## 13. Temporary verification scripts used for this audit

All outside the repository, in `/tmp`, not tracked by git, not referenced anywhere in `src/`:
- `/tmp/stage9-screenshots.mjs`, `/tmp/stage9-screenshots2.mjs` (homepage/full-page screenshot capture — the first had a selector bug caught and corrected in the second)
- `/tmp/stage9-debug.mjs` (diagnosed the selector bug)
- `/tmp/stage9-a11y.mjs` (keyboard-focus, heading-count, and reduced-motion spot-check)

## 14. Final verification

`git status --short` was run after this audit. Every modified (`M`) file shown predates this session's Stage 9 work — none was edited during this audit. The **only new file created in this stage is this plan document, `STAGE-9-LEADERSHIP-PLAN.md`**.

---

Nothing was implemented. Waiting for your review and explicit approval — in particular, your decision on the Ramesh heading-level question noted in §4 — before Stage 9 implementation begins.
