# Stage 16 Checkpoint: InquiryForm Consistency (Group C)

## Pre-stage state

- Branch: `claude/kamala-trust-homepage-dev-b141a6`
- HEAD: `ab028d6 Fix photo crop alignment and raise image quality across the site`
- `git status --short` at the start of this stage showed the same 40 modified/deleted/untracked files present since Stage 15 (all previously approved, uncommitted work), including `src/components/inquiry-form.tsx` already modified — that pre-existing diff removed `rounded-full` from the submit button only (squaring it), done in an earlier stage, not this one. This was preserved, not re-done.

## Scope

Authorized file: `src/components/inquiry-form.tsx`
Required changes: remove `rounded-sm` from the form container, every input, and the textarea; add `focus-visible` styling to the submit button.

## Exact diff (against HEAD)

```diff
--- a/src/components/inquiry-form.tsx
+++ b/src/components/inquiry-form.tsx
@@ -34,7 +34,7 @@ export function InquiryForm({
   }

   return (
-    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-sm border border-line bg-surface p-6">
+    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-line bg-surface p-6">
       <div className="grid gap-4 sm:grid-cols-2">
         <label className="flex flex-col gap-1.5 text-sm">
           <span className="font-medium text-text">Name</span>
@@ -42,7 +42,7 @@ export function InquiryForm({
             required
             value={name}
             onChange={(e) => setName(e.target.value)}
-            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
+            className="border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
           />
         </label>
         <label className="flex flex-col gap-1.5 text-sm">
@@ -52,7 +52,7 @@ export function InquiryForm({
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
-            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
+            className="border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
           />
         </label>
       </div>
@@ -62,7 +62,7 @@ export function InquiryForm({
           <input
             value={phone}
             onChange={(e) => setPhone(e.target.value)}
-            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
+            className="border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
           />
         </label>
       ) : null}
@@ -73,7 +73,7 @@ export function InquiryForm({
           rows={4}
           value={message}
           onChange={(e) => setMessage(e.target.value)}
-          className="resize-none rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
+          className="resize-none border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
         />
       </label>
       <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
@@ -82,7 +82,7 @@ export function InquiryForm({
         </p>
         <button
           type="submit"
-          className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong"
+          className="shrink-0 bg-primary px-6 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
         >
           {submitLabel}
         </button>
```

### Reconciliation note on the final hunk

The button's diff line spans from the committed HEAD state (`rounded-full`) directly to the current state (no `rounded-full`, plus `focus-visible`), because the `rounded-full` removal was already done as pre-existing drift in an earlier stage, before I opened the file this turn — confirmed by reading the file at the start of this stage, which already showed no `rounded-full` on the button. My own edit this turn added only the `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong` fragment. The four `rounded-sm` removals (form, two top inputs, phone input, textarea) are entirely this stage's own edits.

Field labels, placeholders, field names/ordering, `required`/`type="email"` validation, the `mailto:` submission mechanism, subject/body construction, and the "A direct form submission isn't wired up yet" disclosure are all unchanged — confirmed by inspecting `handleSubmit` (untouched) and the diff above (JSX `className` attributes only).

## Verification

### Responsive — all 5 routes, 1440/768/375px

| Route | 1440px | 768px | 375px |
|---|---|---|---|
| `/contact` | 1440/1440 | 768/768 | 375/375 |
| `/get-involved/donate` | 1440/1440 | 768/768 | 375/375 |
| `/get-involved/volunteer` | 1440/1440 | 768/768 | 375/375 |
| `/get-involved/csr-partnership` | 1440/1440 | 768/768 | 375/375 |
| `/get-involved/careers` | 1440/1440 | 768/768 | 375/375 |

(`document.body.scrollWidth` / `document.documentElement.scrollWidth`, both equal `window.innerWidth` in every case — no overflow on any route at any width)

### Corner-radius check (live DOM, `/contact`)

```json
{"formRadius":"0px","inputRadius":"0px","textareaRadius":"0px","buttonRadius":"0px"}
```

All four computed `border-radius` values are `0px` — square corners confirmed on the form container, an input, the textarea, and the submit button.

### Screenshots

- **Before**: reused Stage 12's own audit screenshots (captured before any Group C fix) — `contact-{1440,768,375}.png`, `donate-{1440,768,375}.png`.
- **After**: fresh full-page captures of all 5 InquiryForm routes at all 3 widths this stage.
- Sent as attachments: Contact at 1440px and Donate at 375px, before/after. The only visible change is the form container, inputs, and textarea switching from slightly rounded to square corners; all copy, spacing, and field layout are unchanged.

### Keyboard accessibility (`/contact`, real `Tab` key presses)

```
1. <input type="text">  (Name)      — outlineStyle: none (unchanged focus:border-primary treatment, not in scope)
2. <input type="email">             — outlineStyle: none (unchanged)
3. <input type="text">  (Phone)     — outlineStyle: none (unchanged)
4. <textarea>           (Message)   — outlineStyle: none (unchanged)
5. <button type="submit"> "Send message" — outlineStyle: solid, outlineWidth: 2px, outlineColor: rgb(255,255,255)
```

Tabbing through all fields in order confirms the field sequence and ordering are unchanged. The submit button shows a clearly visible `2px solid` white outline on keyboard focus, offset from the burgundy (`bg-primary`) button background — confirmed visible against the button's own color.

### Form behavior (`/contact`)

- **Required-field validation**: clicking Submit on the empty form does not navigate (`page.url()` unchanged) and `form.checkValidity()` returns `false` — native required-field validation still blocks submission.
- **Invalid email validation**: filling the email field with `"not-an-email"` returns `emailInput.checkValidity() === false` — the `type="email"` constraint is intact.
- **Valid state**: filling Name, a well-formed email, and a message returns `form.checkValidity() === true` — the form correctly validates once all required fields are properly filled.
- **`mailto:` submission mechanism**: `handleSubmit` itself was not touched by this stage's edit (diff above shows only `className` changes); subject is built as `` `${subjectPrefix}: ${name || "New inquiry"}` `` and the body from `Name/Email/[Phone]/message` lines, identical to the pre-stage source. I deliberately did not force a live `window.location.href = "mailto:..."` call in the browser (an attempt to intercept and inspect it without firing was blocked by Chrome disallowing redefinition of `window.location`), to honor "do not actually send an email" — verification instead relies on (a) the unchanged source of `handleSubmit`, and (b) the validation-gating tests above, which confirm the form correctly reaches the point of calling it only when all fields are valid.

Donate page: spot-checked that `/get-involved/donate`'s InquiryForm renders with the same square corners and `includePhone` behavior; not re-run through the full validation sequence since the validation logic is shared and already verified on Contact.

### Build

- `tsc --noEmit`: clean, no errors.
- `eslint src/components/inquiry-form.tsx`: no issues found.
- Fresh `next build`: compiled successfully, all 22 routes generated, no errors or warnings.

## Exact `git diff` and `git status`

```
git diff --stat -- src/components/inquiry-form.tsx
 src/components/inquiry-form.tsx | 12 ++++++------
 1 file changed, 6 insertions(+), 6 deletions(-)
```

Of the 6 changed lines, 5 are this stage's own edits (4 `rounded-sm` removals + the `focus-visible` addition on the button); 1 (the `rounded-full` removal on the same button line) is pre-existing drift from an earlier stage, as detailed above.

`git status --short` shows the same 40 modified/deleted/untracked files present at the start of this stage (all previously approved, uncommitted), with `src/components/inquiry-form.tsx`'s working-tree diff now reflecting this stage's additional edits. No other file was touched this turn.

## Boundaries confirmed

- Only `src/components/inquiry-form.tsx` was edited this turn.
- Groups E and F were not implemented.
- The homepage and Stages 1–15 were not touched.
- No shared CSS, `layout.tsx`, or Tailwind config was modified.
- No dependency was added or changed.
- No reset, clean, stash, checkout, or revert was performed.
- No email was actually sent.
- Nothing was committed, pushed, deployed, or published.

---

Stopping here for your review.
