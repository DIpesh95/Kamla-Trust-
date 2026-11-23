# Stage 10 Plan: Complete Removal of Annual Reports & Transparency

Phase 1 — dependency audit only. No file was edited to produce this document.

## Dependency table

| File | Purpose | References / dependencies | Safe to remove? | Proposed action |
|---|---|---|---|---|
| `src/components/transparency-teaser.tsx` | Homepage "Annual Reports & Transparency" section component | Imports `trust` (4 fields), `isPlaceholder`, `Reveal`, `Container`. Imported by `src/app/page.tsx` only. | **Yes** | Delete file |
| `src/app/about/transparency/page.tsx` | Full `/about/transparency` page/route | Imports `PageHero`, `SubNav`, `Container`, `Fact`, `trust` (4 fields), `primaryNav`. Linked from `nav.ts`, `sitemap.ts`, `get-involved/donate/page.tsx`. | **Yes** | Delete file (removes the route entirely) |
| `src/app/page.tsx` | Homepage assembly | Imports and renders `<TransparencyTeaser />` between Leadership and Books & Publications. | N/A — not deletable, must be **edited** | Remove the import line and the `<TransparencyTeaser />` usage (and its section comment) |
| `src/content/nav.ts` | Shared nav data — `primaryNav` (desktop/mobile header + both About/Leadership pages' `SubNav`), `footerLinks` | The "Registration & Transparency" entry is one item inside `primaryNav`'s "About Us" → `children` array. `footerLinks` has no Transparency entry at all (confirmed by inspection — footer links to About Us generally, not this sub-item). | N/A — not deletable, must be **edited** | Remove the single `{ label: "Registration & Transparency", href: "/about/transparency" }` array entry |
| `src/app/sitemap.ts` | Generates `sitemap.xml` | Lists `/about/transparency` as a static route string in an array. | N/A — must be **edited** | Remove that one string from the array (otherwise the sitemap would advertise a 404 URL to search engines) |
| `src/app/get-involved/donate/page.tsx` | Donate page content | Contains one sentence with a `<Link href="/about/transparency">Registration & Transparency</Link>`, inside a note about 80G eligibility. | N/A — must be **edited**, and this is a content decision, not a pure deletion | **Needs your explicit confirmation on wording** — see §2 below. This file is otherwise a previously-approved page I would not normally touch; this one sentence must change only because its link target is being removed, not for any other reason. |
| `src/components/books-publications.tsx` | Homepage "Books & Publications" section | Mentions "Transparency" once, **only inside a code comment**, as a design-pattern analogy ("Deliberately distinct from the 'Pending Trustee Confirmation' badge used in Transparency"). No import, no link, no functional dependency. | Not applicable — nothing to remove | No action required. Optionally the comment wording could be tidied since the comparison will no longer have a live counterpart, but this is cosmetic only and I'm not proposing it as part of this removal unless you want it. |
| `src/content/trust.ts` — fields `registrationNumber`, `exemption80G`, `exemption12A`, `exemptionFCRA` | Central trust-profile data file, used site-wide for many other fields (name, tagline, founders, trustees, etc.) | These 4 specific fields are used **exclusively** by `transparency-teaser.tsx` and `about/transparency/page.tsx` — confirmed via a grep across all of `src/` for each field name individually; no other file references any of them. | The **file** is not removable (shared, used everywhere else). The 4 **fields** would become dead data if left in place. | **Needs your explicit decision** — see §2 below. Proposed default: leave the fields and their placeholder values in place (harmless, unused), rather than editing the shared `TrustProfile` type, unless you want them stripped too. |
| `src/content/types.ts` — `TrustProfile`'s 4 matching type properties | Type definitions backing the above fields | Same exclusivity as above. | Same as above | Tied to the same decision — would only change if you confirm the fields themselves should be removed |
| PDF reports / certificates / document assets | — | **None exist.** Searched `public/` for any `.pdf`, "report", or "certificate" file — zero results. Both the homepage section and the full page are entirely placeholder/pending-confirmation text; no document was ever actually published. | N/A | Nothing to remove |
| Header, footer, mobile nav components (`site-header.tsx`, `site-footer.tsx`, `sub-nav.tsx`) | Render navigation | All three render their links **generically from `nav.ts` data** — none hardcodes "Transparency" text or href. Confirmed by reading each file directly. | N/A — these files need **no edits at all** | No action — removing the one `nav.ts` array entry automatically removes it from the desktop dropdown, the mobile menu, and the `SubNav` shown on `/about` and `/about/leadership` (which will then correctly show 2 tabs instead of 3) |

## Full reference list (every match found, for completeness)

A repo-wide search for "transparency"/"Transparency" across all `.ts`/`.tsx` files returned exactly 7 files — all captured in the table above:
`src/app/get-involved/donate/page.tsx`, `src/app/about/transparency/page.tsx`, `src/app/sitemap.ts`, `src/app/page.tsx`, `src/content/nav.ts`, `src/components/books-publications.tsx`, `src/components/transparency-teaser.tsx`.

## 2. Two things I need your explicit decision on before Phase 2

**A. The dead link in `get-involved/donate/page.tsx`.** Current sentence: *"80G eligibility isn't confirmed yet, see [Registration & Transparency](/about/transparency)."* Once the route is gone, this link would 404. My proposed minimal fix: remove the link but keep the honest disclosure as plain text — *"80G eligibility isn't confirmed yet."* — preserving the fact being communicated without inventing a replacement destination. Please confirm this wording (or specify different wording) before I implement it.

**B. The four now-orphaned `trust.ts`/`types.ts` fields.** My proposed default is to **leave them in place**, unused but harmless — this avoids touching the shared `TrustProfile` type/data model, which is used by many other already-approved pages, for a removal whose stated scope is "the Annual Reports & Transparency feature," not "the trust data model." If you'd prefer them stripped too for cleanliness, I can do that as part of Phase 2, but I want your explicit instruction either way rather than assuming.

## 3. What will NOT be touched

- `site-header.tsx`, `site-footer.tsx`, `sub-nav.tsx` — no code changes needed (confirmed data-driven, see table).
- `footerLinks` in `nav.ts` — has no Transparency entry to remove.
- `books-publications.tsx` — comment-only mention, no functional dependency.
- Any other homepage section, any previously-approved stage's component, any PDF/document asset (none exist).
- `PENDING-VISUAL-ISSUES.md` — untouched, all five entries (including the separately-approved footer overflow, issue #5) remain exactly as logged.

## 4. Proposed Phase 2 scope, pending your approval of the above

**Delete:**
- `src/components/transparency-teaser.tsx`
- `src/app/about/transparency/page.tsx` (and the now-empty `src/app/about/transparency/` directory)

**Edit:**
- `src/app/page.tsx` — remove the `TransparencyTeaser` import and its usage/comment; verify the gap between Leadership and Get Involved closes cleanly with no extra spacing (each homepage section already carries its own `py-24 sm:py-32`, so removing one `<Component />` call between two others should close the gap naturally — no manual spacing patch anticipated, but I will verify this visually rather than assume).
- `src/content/nav.ts` — remove the one "Registration & Transparency" array entry.
- `src/app/sitemap.ts` — remove the one `/about/transparency` string.
- `src/app/get-involved/donate/page.tsx` — rewrite the one sentence per your confirmed wording from §2A.
- Conditionally, `src/content/trust.ts` and `src/content/types.ts` — only if you confirm per §2B.

## 5. Risks

- Low risk overall — this is a clean, well-isolated feature with no document assets and no hidden dependents beyond the 7 files found.
- The only real risk is leaving a dangling link (the donate-page sentence) or an orphaned sitemap entry if either is missed — both are explicitly captured above.
- Removing the `nav.ts` entry will visibly change the `SubNav` tab count on `/about` and `/about/leadership` from 3 to 2 — this is a necessary, correct consequence of the removal, not an unintended side effect, but I'm naming it explicitly since those are previously-approved pages whose rendered output will change as a result.

---

Nothing was implemented. Waiting for your review, your decisions on the two items in §2, and explicit approval before Phase 2 begins.
