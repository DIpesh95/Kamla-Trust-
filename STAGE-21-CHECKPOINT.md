# Stage 21 Checkpoint: Global Header Dropdown Corner Consistency (Issue H-002)

## Git baseline

- Branch: `claude/kamala-trust-homepage-dev-b141a6`
- HEAD: `ab028d6 Fix photo crop alignment and raise image quality across the site`
- `git status --short` at the start of this stage: 43 pre-existing modified/deleted/untracked entries from Stages 1–20 (identical to the Stage 20 checkpoint's end-state), including `src/components/site-header.tsx` already carrying extensive pre-existing, previously-approved drift (focus-visible additions, mobile-menu Escape/outside-click handling, max-width/padding updates, prior `rounded-full` removals on nav links and the Donate button). No file was added, removed, or changed between Stage 20 and this stage's start.

## Pre-edit reconciliation against the Stage 19 audit

`grep -n "rounded" src/components/site-header.tsx` on the file as it stood at the start of this stage returned exactly 10 occurrences:

| Line | Class | Element | In scope (dropdown/container)? |
|---|---|---|---|
| 75 | `rounded-sm` | Logo `<Link>` | **No** — not a dropdown; shapes only the focus ring on an element with no visible fill/border (same exclusion reasoning as Stage 18/19) |
| 119 | `rounded-2xl` | "Our Work" mega-menu panel (640×398px) | **Yes** |
| 129 | `rounded-xl` | Pillar card inside the mega-menu | **Yes** |
| 155 | `rounded-lg` | "View all our work →" link inside the mega-menu | **Yes** |
| 162 | `rounded-xl` | "About Us"/"Get Involved" dropdown panel (224×86px) | **Yes** |
| 169 | `rounded-lg` | Dropdown menu item link (About Us/Get Involved children) | **Yes** |
| 198 | `rounded-full` | Mobile menu toggle button (circular hamburger/✕ icon) | **No** — not a dropdown panel; a circular icon toggle, same approved-exception category as other circular controls (search button, location pills, `ArrowButton` circles) |
| 223 | `rounded-lg` | Mobile nav panel top-level link | **Yes** — same menu-item function as the desktop dropdown links |
| 234 | `rounded-lg` | Mobile nav panel pillar sub-link | **Yes** |
| 247 | `rounded-lg` | Mobile nav panel "Get Involved" sub-link | **Yes** |

This matches the Stage 19 audit's H-002 finding exactly — the same 8 lines (119, 129, 155, 162, 169, 223, 234, 247) it cited, with no discrepancy between the audit and the current source. Lines 75 and 198 were never part of Stage 19's H-002 citation and were correctly excluded here on the same reasoning.

## Scope

Authorized file: `src/components/site-header.tsx`
Required change: remove the 8 confirmed dropdown-related rounded-corner classes, leaving everything else (dimensions, positioning, shadows, backgrounds, borders, typography, spacing, content, interactions) untouched.

## Exact before/after class changes (this stage's own edit)

| Line | Element | Before | After |
|---|---|---|---|
| 119 | Our Work mega-menu panel | `...w-[640px] -translate-x-1/2 rounded-2xl border border-line...` | `...w-[640px] -translate-x-1/2 border border-line...` |
| 129 | Pillar card in mega-menu | `group/card flex flex-col overflow-hidden rounded-xl border border-line...` | `group/card flex flex-col overflow-hidden border border-line...` |
| 155 | "View all our work →" link | `mt-3 block rounded-lg px-3 py-2...` | `mt-3 block px-3 py-2...` |
| 162 | About Us/Get Involved dropdown panel | `...min-w-56 rounded-xl border border-line...` | `...min-w-56 border border-line...` |
| 169 | Dropdown menu item link | `block rounded-lg px-3 py-2...` | `block px-3 py-2...` |
| 223 | Mobile nav top-level link | `block rounded-lg px-3 py-2.5...` | `block px-3 py-2.5...` |
| 234 | Mobile nav pillar sub-link | `rounded-lg px-3 py-2...` | `px-3 py-2...` |
| 247 | Mobile nav "Get Involved" sub-link | `rounded-lg px-3 py-2...` | `px-3 py-2...` |

All 8 are pure `className` string edits — one Tailwind radius utility removed per element, nothing else on the same line changed.

### Reconciliation note — pre-existing drift elsewhere in the file

`git diff --stat -- src/components/site-header.tsx` against HEAD shows 49 insertions/18 deletions — far more than these 8 removals alone, because the file already carried extensive pre-existing, previously-approved drift before this stage began (confirmed by comparing the file's content as read at the very start of this stage against its current state): `useRef`/Escape-key/outside-click mobile-menu handling, `aria-controls`/dynamic `aria-label` on the toggle button, the `max-w-6xl`→`max-w-[1320px]` container update, `focus-visible` outline classes added to nearly every link, and prior `rounded-full` removals on the primary nav links and the Donate button. **None of that is this stage's edit** — only the 8 rounded-corner removals listed above are mine this turn.

## Verification

### Responsive + console errors — homepage, `/about`, `/our-work/healthcare` at 1440/768/375px

| Route | Width | Overflow | Console errors |
|---|---|---|---|
| `/` | 1440/768/375 | None (body/docEl/viewport all equal) | 0/0/0 |
| `/about` | 1440/768/375 | None | 0/0/0 |
| `/our-work/healthcare` | 1440/768/375 | None | 0/0/0 |

9/9 checks clean.

### Dropdown appearance — computed border-radius

- Our Work mega-menu panel: `0px`. Pillar card inside it: `0px`. "View all our work →" link: `0px`.
- About Us dropdown panel: `0px` (width unchanged at 224px, matching the Stage 19 audit's recorded dimension exactly — confirming no size change). Dropdown item link: `0px`.
- Mobile nav panel's first link: `0px`.

All square, as required. Screenshots of the open Our Work mega-menu, the open About Us dropdown, and the open mobile nav panel sent as attachments, alongside Stage 19's own "before" evidence screenshot of the (then-rounded) Our Work mega-menu for direct comparison. Panel dimensions, backgrounds, shadows, borders, spacing, and all text content are visually identical to before — the only change is the corner treatment.

### Desktop interactions, keyboard navigation, focus visibility

- **Hover-open**: hovering "Our Work" and "About Us" opens their respective panels correctly (confirmed via the radius checks above, which required the panel to be open to measure).
- **Keyboard-open**: tabbing to "About Us" (2nd tab stop) triggers its `onFocus` handler and opens the dropdown (`visibility: visible` confirmed); the next `Tab` press moves focus into the dropdown's first item ("Our Story"), confirmed `insideDropdown: true`, with a visible `2px solid` outline and the new `0px` border-radius.
- **Full tab sequence** (12 stops from page load): logo → About Us → Our Work → Our Impact → Stories → Newsroom → Get Involved → Search → Donate → Explore Our Work → Be Part of the Change → Read Our Story. Every custom-focus-visible element shows `solid 2px`; the two elements without a custom focus-visible class (search button, "Read Our Story" link — both unrelated to this stage) correctly fall back to the browser's native `auto 1px` outline. No element was skipped, reordered, or left without a visible focus indicator.

### Mobile navigation

- Opening the mobile menu via its toggle button: panel found, panel height resolves to a non-zero value (visibly open), first link's border-radius `0px`.
- Closing it: the panel is fully removed from the DOM after the exit animation completes (`AnimatePresence` conditional render), confirming the open/close cycle and its animation still function correctly — unaffected by the className-only edit.

### Build

- `tsc --noEmit`: clean, no errors.
- `eslint src/components/site-header.tsx`: no issues found.
- Fresh `next build`: compiled successfully, **all 22 routes generated**, no errors or warnings.

## Exact Git status reconciliation

```
git diff --stat -- src/components/site-header.tsx
 src/components/site-header.tsx | 67 ++++++++++++++++++++++++++++++------------
 1 file changed, 49 insertions(+), 18 deletions(-)
```

Of this, only the 8 rounded-corner-class removals listed above are this stage's own edit; the remainder was pre-existing drift from earlier approved stages, as detailed in the reconciliation note.

`git status --short` at the end of this stage is identical to the Stage 20 baseline — same 43 pre-existing entries, with `src/components/site-header.tsx`'s working-tree diff now including this stage's 8 removals. No file other than `src/components/site-header.tsx` was modified.

## Boundaries confirmed

- Only `src/components/site-header.tsx` was edited this turn.
- Dropdown dimensions, positioning, shadows, backgrounds, borders, typography, spacing, and content are all unchanged.
- Hover, click, keyboard navigation, focus states, mobile menu behavior, and animations are all unchanged and verified still working.
- Location-tag pills (`program-list.tsx`) and the `Fact` badge (`fact.tsx`) were not touched.
- No header redesign or new visual effect was introduced — only the 8 identified radius classes were removed.
- No reset, clean, stash, checkout, or revert was performed.
- Nothing was committed, pushed, deployed, or published.
- No further stage was started.

---

Stopping here for your review.
