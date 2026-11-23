# Stage 15 Checkpoint: Pillar Detail Page Consistency (Group B)

## Scope

Authorized files: `src/components/program-list.tsx`, `src/components/cta-section.tsx`
Required changes: remove italic from the `ProgramList` numeral; add `focus-visible` styling to both `CTASection` buttons; preserve the rounded location-tag pill.

## Exact diff (my edits this stage)

```diff
--- a/src/components/program-list.tsx
+++ b/src/components/program-list.tsx
@@ -8,7 +8,7 @@ export function ProgramList({ initiatives }: { initiatives: Initiative[] }) {
       {initiatives.map((initiative, i) => (
         <Reveal key={initiative.name} delay={Math.min(i, 6) * 0.05}>
           <div className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 sm:grid-cols-[3.5rem_1fr]">
-            <span className="font-display text-xl italic text-primary/70 transition-colors group-hover:text-primary sm:text-2xl">
+            <span className="font-display text-xl text-primary/70 transition-colors group-hover:text-primary sm:text-2xl">
               {String(i + 1).padStart(2, "0")}
             </span>
```

```diff
--- a/src/components/cta-section.tsx
+++ b/src/components/cta-section.tsx
@@ -22,14 +22,14 @@ export function CTASection({
         <div className="flex shrink-0 flex-wrap gap-3">
           <Link
             href={primary.href}
-            className="bg-primary px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong"
+            className="bg-primary px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
           >
             {primary.label}
           </Link>
           {secondary ? (
             <Link
               href={secondary.href}
-              className="border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:border-surface"
+              className="border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:border-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
             >
               {secondary.label}
             </Link>
```

Initiative names, blurbs, locations, and ordering are untouched. CTA button text and `href` destinations are untouched.

### Reconciliation note on `cta-section.tsx`

`git diff --stat` against HEAD for this file shows a larger hunk than the edit above (6 changed lines total, not 2) because the file already carried pre-existing uncommitted drift from an earlier approved stage before I opened it this turn: the container's `max-w-6xl`→`max-w-[1320px]`/padding update, and the removal of `rounded-full` from both CTA buttons (squaring their corners), were both already present in the file when I read it at the start of Stage 15 — I did not touch either of those. My own edit only added the two `focus-visible:...` class fragments shown above. I'm flagging this explicitly per the standing reconciliation discipline, since it affects how the `git diff --stat` count should be read.

## Verification

### Overflow check — all 5 pillar routes, 1440/768/375px

| Route | 1440px | 768px | 375px |
|---|---|---|---|
| `/our-work/education` | 1440/1440 | 768/768 | 375/375 |
| `/our-work/healthcare` | 1440/1440 | 768/768 | 375/375 |
| `/our-work/disaster-relief-civic-recognition` | 1440/1440 | 768/768 | 375/375 |
| `/our-work/rural-livelihoods-environment` | 1440/1440 | 768/768 | 375/375 |
| `/our-work/women-and-girl-child` | 1440/1440 | 768/768 | 375/375 |

(values are `document.body.scrollWidth` / `document.documentElement.scrollWidth`, both equal `window.innerWidth` in every case — no overflow introduced on any route at any width)

### Numeral and pill check (live DOM, `/our-work/education`)

```json
{"numeralStyle":"normal","numeralText":"01","pillBorderRadius":"3.35544e+07px","pillText":"Bhinmal, Rajasthan"}
```

`fontStyle` is `normal` (was `italic` before this stage). The location pill's computed `border-radius` is still the full-pill value — `rounded-full` was preserved exactly as instructed.

### Keyboard focus — both CTA buttons, 2 pillar pages

Tabbed to both buttons via real `Tab` key presses (not programmatic `.focus()`):

```
/our-work/education  -> [{"text":"Donate","outlineStyle":"solid","outlineWidth":"2px","outlineColor":"rgb(255, 255, 255)"},
                          {"text":"CSR Partnership","outlineStyle":"solid","outlineWidth":"2px","outlineColor":"rgb(255, 255, 255)"}]
/our-work/healthcare  -> [{"text":"Donate","outlineStyle":"solid","outlineWidth":"2px","outlineColor":"rgb(255, 255, 255)"},
                          {"text":"CSR Partnership","outlineStyle":"solid","outlineWidth":"2px","outlineColor":"rgb(255, 255, 255)"}]
```

Both the primary ("Donate") and secondary ("CSR Partnership") buttons show a visible `2px solid` white outline on keyboard focus on both pages tested.

### Screenshots

- **Before**: reused Stage 12's own audit screenshots (captured before any Group B fix, untouched since) — `pillar-{education,healthcare,disaster,rural,women}-{1440,768,375}.png`.
- **After**: fresh full-page captures of all 5 pillar routes at all 3 widths this stage.
- Sent as attachments: Healthcare at 1440px and Education at 375px, before/after. The only visible change at default (non-focused) state is the numeral switching from slanted to upright; all other content, spacing, and the rounded location pill are unchanged.

### Build

- `tsc --noEmit`: clean, no errors.
- `eslint` (scoped to both authorized files): no issues found.
- Fresh `next build`: compiled successfully, all 22 routes generated, no errors or warnings.

## Exact `git diff` and `git status`

```
git diff --stat -- src/components/program-list.tsx src/components/cta-section.tsx
 src/components/cta-section.tsx  | 6 +++---
 src/components/program-list.tsx | 2 +-
 2 files changed, 4 insertions(+), 4 deletions(-)
```

As noted above, 4 of the 6 changed lines in `cta-section.tsx` come from pre-existing drift already in the working tree before this stage (the max-width/padding update and the `rounded-full` removal on the buttons); only the two `focus-visible` class additions are this stage's own edit.

`git status --short` shows the same pre-existing modified/untracked files present across all prior checkpoints, plus `src/components/program-list.tsx` and `src/components/cta-section.tsx` now modified by this stage. No file outside the two authorized files was touched this turn.

## Boundaries confirmed

- Only `src/components/program-list.tsx` and `src/components/cta-section.tsx` were edited this turn.
- All initiative names, blurbs, locations, and ordering are unchanged.
- CTA button text and destinations are unchanged.
- The location-tag pill's `rounded-full` is preserved.
- No reset, clean, stash, checkout, or revert was performed.
- No dependency was added or changed.
- Nothing was committed, pushed, deployed, or published.

---

Stopping here for your review.
