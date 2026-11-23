# Stage 12 Implementation Plan (Proposal Only — Awaiting Approval)

Grouped by shared-component leverage first (highest value, lowest risk), then by page-specific items.

## Group A — Shared-component typography/accessibility fixes (recommended first)

| | |
|---|---|
| **Pages affected** | All 16 inner routes |
| **Files** | `src/components/page-hero.tsx` only |
| **Change** | Remove `italic` from the `<h1>`; add `focus-visible` styling to breadcrumb links (same pattern already used in Hero, Focus Areas, Signature Initiatives, Leadership, Newsroom across Stages 2–11) |
| **Must remain unchanged** | Breadcrumb structure, eyebrow/title/dek content, all page-specific copy passed into this component |
| **Dependencies** | None — fully self-contained |
| **Verification** | Re-run the same live DOM query used in this audit (`getComputedStyle(h1).fontStyle`) across all 16 routes, confirm `normal` everywhere; keyboard-tab to a breadcrumb link on 2–3 sample pages, confirm visible outline |
| **Complexity** | **Small** |
| **Priority** | Critical (highest-leverage single fix available) |

## Group B — Pillar detail page components

| | |
|---|---|
| **Pages affected** | All 5 `/our-work/[slug]` routes |
| **Files** | `src/components/program-list.tsx`, `src/components/cta-section.tsx` |
| **Change** | Remove `italic` from `ProgramList`'s numeral (match the upright-numeral convention from Stages 3/5); add `focus-visible` to both `CTASection` buttons |
| **Must remain unchanged** | Initiative names/blurbs/locations, pillar stat content, CTA copy and destinations, the location-tag pill's `rounded-full` (left alone pending your confirmation — see Open Decision 1 below) |
| **Dependencies** | None |
| **Verification** | Screenshot all 5 pillar pages at 1440/768/375 before/after; keyboard-tab to both CTA buttons on 2 sample pillar pages |
| **Complexity** | **Small** |
| **Priority** | Medium |

## Group C — Form pages (Donate, Volunteer, CSR Partnership, Careers, Contact)

| | |
|---|---|
| **Pages affected** | 5 routes sharing `InquiryForm` |
| **Files** | `src/components/inquiry-form.tsx` |
| **Change** | Remove `rounded-sm` from the form, each input, and the textarea; add `focus-visible` to the submit button |
| **Must remain unchanged** | The honest "A direct form submission isn't wired up yet" disclosure, the `mailto:` submission mechanism itself, all field labels and validation (`required`, `type="email"`) |
| **Dependencies** | None |
| **Verification** | Fill and submit the form on 2 sample pages (Contact, Donate), confirm the `mailto:` link still opens correctly with the right subject/body; keyboard-tab through all fields and the submit button |
| **Complexity** | **Small** |
| **Priority** | Medium |

## Group D — Contact page overflow (the one genuine bug found)

| | |
|---|---|
| **Pages affected** | `/contact` only |
| **Files** | `src/app/contact/page.tsx` |
| **Change** | Add `break-all` to the email link — the exact one-line fix already proven correct in Stage 11 for the same string in the footer |
| **Must remain unchanged** | Phone/email values themselves, surrounding card copy |
| **Dependencies** | None — fully isolated, same fix pattern as Stage 11 |
| **Verification** | Re-run the overflow scan used in this audit at 375px, confirm `document.body.scrollWidth === 375` |
| **Complexity** | **Small** |
| **Priority** | **High** (only confirmed overflow bug in the audit) |

## Group E — Volunteer page's oversized corner radius

| | |
|---|---|
| **Pages affected** | `/get-involved/volunteer` only |
| **Files** | `src/app/get-involved/volunteer/page.tsx` |
| **Change** | Remove `rounded-xl` from the "where volunteers help" list items (bring in line with the `rounded-sm`/square pattern used everywhere else, pending Open Decision 2 below on whether `rounded-sm` itself should also go) |
| **Must remain unchanged** | Pillar names and summaries listed |
| **Dependencies** | None |
| **Complexity** | **Small** |
| **Priority** | Medium–High (most visually inconsistent single element found) |

## Group F — Remaining `rounded-sm` card treatments (About, Impact, Contact, Donate, CSR, pillar stat badges)

| | |
|---|---|
| **Pages affected** | About, Impact, Contact, Donate, CSR Partnership, pillar detail pages |
| **Files** | `src/app/about/page.tsx`, `src/app/impact/page.tsx`, `src/app/contact/page.tsx`, `src/app/get-involved/donate/page.tsx`, `src/app/get-involved/csr-partnership/page.tsx` (card-level `rounded-sm`, each page edited individually since these are page-level JSX, not a shared component) |
| **Change** | Remove `rounded-sm` from each info-card `<div>`, matching the square-corner convention already enforced on the homepage |
| **Must remain unchanged** | All text content in every card |
| **Dependencies** | None between pages — can be done in any order, or together as one batch since the change is mechanical and repetitive |
| **Complexity** | **Medium** (five separate files, each needs its own targeted edit, more surface area to verify than Groups A–E) |
| **Priority** | Medium |

## Group G — Empty whitespace on content-sparse pages (Our Work overview + pillar details)

**This is not a simple CSS fix** — traced the mechanism precisely: `src/app/layout.tsx` uses an intentional sticky-footer pattern (`body` is `min-h-full flex flex-col`, `main` is `flex-1`), which correctly pushes the footer to the bottom of the viewport on any page shorter than the viewport height. `layout.tsx` is explicitly out of scope (global/shared). The empty space on `/our-work` and the 5 pillar pages is a **content/visual-balance** question, not a layout bug: these pages simply have less content than a typical inner page, so the sticky-footer mechanism leaves a large visible gap.

| | |
|---|---|
| **Pages affected** | `/our-work`, all 5 pillar detail pages |
| **Files** | Likely `src/app/our-work/page.tsx` and `src/app/our-work/[slug]/page.tsx` |
| **Change** | **Needs your decision before any file is touched** — see Open Decision 3 below. Options: (a) accept the gap as normal short-page behavior and do nothing, (b) add a CTA/related-content section to these specific pages (same `CTASection` component already used on pillar pages, or something analogous for the `/our-work` overview, which currently has none), (c) something else you specify. |
| **Must remain unchanged** | All existing initiative/pillar content — no invented statistics or sections |
| **Dependencies** | Depends on your decision; if a new section is added, it must use only verified, already-approved content (e.g., reusing the homepage's existing CTA copy/pattern, not inventing new copy) |
| **Complexity** | **Medium** (if a new section is added) or **none** (if accepted as-is) |
| **Priority** | **Critical** for visibility/severity, but **blocked** pending your decision on approach |

## Suggested stage order

1. **Group A** (shared `page-hero.tsx`) — do first, highest leverage, zero risk, fixes all 16 pages at once.
2. **Group D** (Contact overflow) — do second, it's the one real bug, trivially small, isolated.
3. **Groups B, C, E** — can run as one combined stage or three small ones; all are small, independent, low-risk.
4. **Group F** — do after B/C/E since it's the most repetitive/mechanical, benefits from a steady pattern already established by then.
5. **Group G** — last, and only once you've made the decision it's waiting on.

## Open decisions needed before implementation

1. **Group B's location-tag pill** (`rounded-full` on initiative location badges, e.g. "Bhinmal, Rajasthan") — keep as a small rounded metadata chip (consistent with how small pills are sometimes treated as an exception elsewhere), or square it off too?
2. **Group E/F's underlying `rounded-sm`** — should the general `rounded-sm` card treatment across inner pages be squared off entirely (full consistency with the homepage), or is a small radius acceptable on secondary info cards specifically (as opposed to primary buttons, which should definitely be square)? This affects how aggressively Groups E and F are scoped.
3. **Group G's empty-space resolution** — accept as-is, add a new section (and if so, what — reusing existing approved content only), or a different approach entirely?

## What stays untouched regardless of which groups are approved

- The homepage and all previously-closed Stages 1–11.
- `src/content/*` data files — no content, statistic, date, or biography changes anywhere in this plan.
- `PENDING-VISUAL-ISSUES.md`.
- Global CSS, Tailwind config, and `layout.tsx`.
- No new dependency, no GSAP, no new photography.

---

Nothing has been implemented. Waiting for your review, your decisions on the three open items above, and your approval of which groups to authorize before any file is touched.
