# Stage 10 Checkpoint: Complete Removal of Annual Reports & Transparency

Phase 2 executed exactly per the approved plan and decisions A/B.

## 1. Exact deleted file list

- `src/components/transparency-teaser.tsx` — deleted
- `src/app/about/transparency/page.tsx` — deleted (the now-empty `src/app/about/transparency/` directory was removed with it)

## 2. Exact modified file list, with precise before/after for each

**`src/app/page.tsx`** — two changes only:
```diff
-import { LeadershipTeaser } from "@/components/leadership-teaser";
-import { TransparencyTeaser } from "@/components/transparency-teaser";
+import { LeadershipTeaser } from "@/components/leadership-teaser";
 import { BooksPublications } from "@/components/books-publications";
```
```diff
       {/* Leadership */}
       <LeadershipTeaser />

-      {/* Annual Reports & Transparency */}
-      <TransparencyTeaser />
-
       {/* Books & Publications */}
```
(Note: `git diff --stat` reports 120 insertions for this file — that figure includes substantial pre-existing, already-approved drift from earlier stages' homepage rebuild, unrelated to Stage 10. My own edit here was exactly the two hunks shown above — 1 import line removed, 3 lines removed (component call + its comment + the blank line), 0 lines added.)

**`src/content/nav.ts`** — one line removed:
```diff
     children: [
       { label: "Our Story", href: "/about" },
       { label: "Leadership", href: "/about/leadership" },
-      { label: "Registration & Transparency", href: "/about/transparency" },
     ],
```

**`src/app/sitemap.ts`** — one line removed:
```diff
     "/about",
     "/about/leadership",
-    "/about/transparency",
     "/our-work",
```

**`src/app/get-involved/donate/page.tsx`** — per approved Decision A:
```diff
-            <p className="mt-2 text-sm leading-relaxed text-text-muted">
-              80G eligibility isn&rsquo;t confirmed yet, see{" "}
-              <Link href="/about/transparency" className="font-medium text-primary-strong">
-                Registration &amp; Transparency
-              </Link>
-              .
-            </p>
+            <p className="mt-2 text-sm leading-relaxed text-text-muted">80G eligibility isn&rsquo;t confirmed yet.</p>
```
No other content on this page was touched. The `Link` import remains in use elsewhere in the same file (the CSR Partnership link), confirmed before leaving it in place.

**Not touched, per Decision B:** `src/content/trust.ts` and `src/content/types.ts` — the four fields (`registrationNumber`, `exemption80G`, `exemption12A`, `exemptionFCRA`) remain exactly as they were, now simply unused.

## 3. Verification results

**Route removal confirmed.** `http://localhost:55579/about/transparency` renders Next.js's standard 404 page (`h1: "404"`, "This page could not be found.") — confirmed by reading the live DOM, not assumed.

**Repository-wide search, zero results:**
```
grep -rn "/about/transparency" src/   →  no matches
grep -rn "TransparencyTeaser" src/    →  no matches
```

**Sitemap confirmed clean** — fetched the live `/sitemap.xml` output directly; no "transparency" string present.

**Navigation confirmed clean, tested live:**
- Desktop "About Us" dropdown: exactly 2 children (`Our Story`, `Leadership`) — no third entry.
- Mobile menu: searched full rendered text after opening it — no "Transparency" anywhere.
- `/about` page's sub-nav: exactly 2 tabs (`Our Story`, `Leadership`).
- `/about/leadership` page's sub-nav: exactly 2 tabs (`Our Story`, `Leadership`) — both pages still work correctly with the reduced tab set.

**Donate page confirmed correct**, read live: *"80G eligibility isn't confirmed yet."* — exact approved wording, no link present (`hasLink: false`).

**Homepage section order preserved, transition verified clean at all three widths.** The section immediately following Leadership is now Books & Publications (confirmed via DOM query: `sectionAfterLeadership` = "BOOKS & PUBLICATIONS..."), which was already the next section in the original order — Transparency sat between them and is now simply gone, with no gap, no stray spacing, and no layout break at 1440px, 768px, or 375px (see attached screenshots). No other homepage section was touched or reordered.

**All other routes confirmed still working** — spot-checked via HTTP status: `/`, `/about`, `/about/leadership`, `/our-work`, `/our-work/healthcare`, `/impact`, `/stories`, `/newsroom`, `/get-involved/donate`, `/get-involved/volunteer`, `/get-involved/csr-partnership`, `/get-involved/careers`, `/contact` — all returned `200`.

## 4. TypeScript, ESLint, build

- `tsc --noEmit`: clean, no errors (one transient error appeared mid-process from a stale `.next/types` cache referencing the just-deleted page; resolved automatically once `next build` regenerated the type cache — not a real issue, confirmed clean on the final standalone re-run).
- `eslint` (scoped to the four edited files): no issues found.
- `next build` (fresh, `.next` cleared first): succeeds. **22 routes** now (down from 23) — `/about/transparency` is confirmed absent from the route list; every other route present and unchanged.

## 5. Final `git status --short`

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

## 6. Confirmations

- `site-header.tsx`, `site-footer.tsx`, `sub-nav.tsx`: **not touched** — confirmed unnecessary, as predicted in the Phase 1 audit (all three render navigation generically from `nav.ts` data).
- `books-publications.tsx`: **not touched** — its comment-only mention was not a functional dependency.
- `trust.ts`, `types.ts`: **not touched**, per Decision B.
- No previously-approved homepage component was modified.
- `PENDING-VISUAL-ISSUES.md`: untouched, all five entries (including the separately-approved footer overflow, issue #5) remain exactly as logged. The 768px footer overflow was reconfirmed present during this stage's responsive check (865px vs. 768px viewport, identical to every prior measurement) — not fixed, not re-logged, per instruction.
- Nothing committed, pushed, deployed, or published.

## 7. Screenshots

Three PNG files sent as attachments above: the Leadership → Books & Publications → Get Involved transition at 1440px, 768px, and 375px, all showing a clean, gap-free section boundary.

---

Stage 10 complete. Stopping here for your review.
