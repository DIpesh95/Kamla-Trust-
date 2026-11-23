# Baseline Reconciliation Report

Read-only investigation only. No file was edited, no branch checked out, no dependency installed, nothing staged or committed to produce this report.

## 1. Backup — created and verified

**Location:** `/private/tmp/claude-502/.../scratchpad/backups/working-tree-backup-20261122-210507/`

Two layers, both verified:

1. **`full-working-tree.tar.gz`** (2.7 MB, 124 entries) — the entire project directory, excluding only `node_modules` and `.next` (486 MB and 513 MB of fully reproducible build output; everything git-relevant and all source is included). Verified readable (`tar -tzf` succeeded).
2. **`changed-files-only/`** — every one of the 45 modified/untracked paths, copied individually with full relative paths preserved, plus:
   - `manifest-sha256.txt` — a SHA-256 checksum of each copied file
   - `git-status-at-backup-time.txt`, `git-diff-tracked-files.patch`, `HEAD-commit.txt` — the exact git state at backup time

**Verification performed:** `shasum -a 256 -c manifest-sha256.txt` against the live working tree — **all 45 files matched, zero mismatches.**

**File count — corrected from my last report:** it's **36 modified + 9 untracked = 45**, not "34 modified." I miscounted by hand last time; this count comes directly from `git diff --name-only | wc -l` and `git ls-files --others --exclude-standard | wc -l`, both re-verified against the manifest.

## 2. Branch comparison — confirmed, nothing new to add

Unchanged from the last report: `main` = my current `HEAD` (`ab028d6`) exactly. `a5bd7b`'s tip (`69af81c`) is `ab028d6` plus exactly one commit. Every route under `src/app/` is identical between my branch and `a5bd7b`.

## 3. The seven-vs-nine discrepancy — resolved

My last report undercounted on two fronts. The precise, re-verified facts:

- Commit `69af81c` modifies **12 existing files**, not 9: `globals.css`, `media.ts`, and **10** components — I previously omitted **`transparency-teaser.tsx`** entirely from the list.
- Of those 12 existing files, **all 12 are also currently dirty in my working tree — 100% overlap, not "7 of 9."**
- The only parts of that commit **not** present on my branch at all are the 3 genuinely new/dependency items: `package.json`, `package-lock.json` (the `gsap` dependency), and `src/components/scroll-fx.tsx` (new file).

So: 12 existing files overlap completely; 3 items are wholly new. 12 + 3 = 15, matching the commit's real diffstat total. My "9" and "7" figures last time were simply wrong — this report's numbers are drawn directly from `comm -12`/`comm -23` set operations against the actual file lists, not recalled by eye.

## 4. What the overlap actually means — the central finding

I read the full diffs for 6 of the 12 overlapping files (`globals.css`, `about-intro.tsx`, `signature-initiatives.tsx`, `site-header.tsx`, `transparency-teaser.tsx`, `media.ts`) and the full content of the 7th (`human-impact.tsx`, both versions). **Every single one shows the same pattern:** my working tree's current version is not an older or divergent state — it's a **later redesign that intentionally superseded `69af81c`'s GSAP-powered treatment** with what this engagement has been calling Direction D: the burgundy/ivory/charcoal token system, square corners, upright (non-italic) headings, and simpler `Reveal`-based motion in place of `ClipReveal`/`GsapStagger`.

Concretely, in every file checked: `ClipReveal`/`GsapStagger` imports are removed, replaced with the existing `Reveal`; `rounded-full` buttons become square; italic headline treatments are removed; `globals.css` moves from a "pink institutional palette" to the named Direction D token set (`--burgundy`, `--ivory`, `--charcoal`, etc.) with `.frame`/`.picture-well`/`.story-well` added.

**This means most of the 12-file overlap does not need "reconciliation" at all — it needs to be left alone.** Direction D already superseded `69af81c`'s approach for those files, and that work is already approved. Only two of the twelve are actually in scope for what you asked me to reconcile.

**One honest caveat I should raise, not bury:** everything I verified about the live site earlier in this engagement was **content** (copy, structure, routes) — I never took a screenshot of `kamlatrust.org` and have not visually confirmed its actual CSS/typography matches Direction D's burgundy/Fraunces system rather than `69af81c`'s older palette. Since Direction D is primarily a visual/typography pass and didn't rewrite most section copy, content matching doesn't prove visual matching. I'd recommend an actual visual check of the live site before Stage 1 if that distinction matters to you — happy to do that as a quick follow-up.

## 5. File-by-file reconciliation table

| File | Current working tree | `69af81c` | What differs | Recommendation | Reconciliation needed? |
|---|---|---|---|---|---|
| `globals.css` | Direction D token set (burgundy/ivory/charcoal), `.frame`/`.picture-well`/`.story-well` | Older "pink institutional palette" tokens, no frame/well classes | Full palette swap — already superseded | **Retain working tree as-is** | No |
| `about-intro.tsx` | Plain 2-column layout, no stat card, no `ClipReveal` | Adds `ClipReveal` on the photo **and** a floating "{years} — years since {founded}, still showing up." stat card | The stat card (what you asked about) was dropped entirely when Direction D simplified this file | **Reconcile**: add the stat-card content back, re-skinned to Direction D tokens, `ClipReveal` replaced with a new Framer-Motion clip-path helper (see §6) | **Yes — primary item 1** |
| `human-impact.tsx` | Full replacement: "What this looks like" illustrative archetype tiles (student/patient/family/community, SVG icons, no photos) | "Moments & gatherings" — real 4-photo draggable carousel (Kanya Sneh Bandhan / Mahila Samman / Republic Day / Kamala Power Women on stage) | **Complete content swap, not a tweak.** Direction D replaced the entire section's subject and purpose | **Reconcile**: this is a decision to make, not just a merge — restoring "Moments & Gatherings" means the archetype-tiles section goes away, not coexists | **Yes — primary item 2, largest single change** |
| `signature-initiatives.tsx` | `ClipReveal` removed (plain `<div>`), upright heading, SVG star icon for Kamala Rising Star's no-photo slot | Uses `ClipReveal` on two images, italic heading, text "Rs" in place of the SVG icon | Superseded — square/upright/SVG-icon treatment is the later, approved state | **Retain working tree as-is** | No |
| `site-header.tsx` | Simpler Escape-only close, no outside-click handler, square Donate button, no `aria-controls`/focus-ref wiring | Escape **and** outside-click both close the mobile menu, `aria-controls="mobile-nav-panel"`, a menu-button ref for focus return, `rounded-full` buttons | Mixed: the square-button change is approved Direction D work; but **`69af81c` has stronger accessibility wiring that Direction D's simplification dropped** (outside-click-close, `aria-controls`, focus return) | **Retain Direction D's square styling, but consider re-adding the outside-click-close and `aria-controls`/focus-ref behavior** — flagged as a worthwhile a11y addition, not a revert | Partial — worth a small accessibility addition at the relevant stage |
| `transparency-teaser.tsx` | Plain `Reveal`-based grid, explicit "Pending Trustee Confirmation" badge, upright heading | `GsapStagger` + a `Fact` component, italic heading, spine labels (Reg./80G/12A/FCRA) | Superseded — the honest-badge treatment is later, approved work | **Retain working tree as-is** | No |
| `media.ts` | `eventGallery` as a `{feature, supporting}` object (consumed by `event-gallery.tsx`, a different, untouched component) | `eventGallery` as a flat 3-item array | Unrelated to Moments & Gatherings — `human-impact.tsx` (both versions) never imports `eventGallery` at all; this is a separate, independent change feeding a different component | **Retain working tree as-is.** Not a reconciliation target — this feeds `event-gallery.tsx`/"Impact Gallery," a section neither this nor last report has touched | No |
| `get-involved-cta.tsx` | Not read in full this pass; diffstat 159 lines changed | Uses `GsapStagger` on the three action cards | Diffstat shape matches the established "GSAP removed, Direction D styling applied" pattern seen in 6/6 files actually read | **Likely retain as-is — recommend a quick confirming read before Stage 9**, not blocking this report | Likely no, confirm before that stage |
| `leadership-teaser.tsx` | Not read in full this pass; diffstat 111 lines changed | Uses GSAP-based effects per the commit message | Same pattern expected | **Likely retain as-is — confirm before Stage 8** | Likely no, confirm before that stage |
| `newsroom-editorial.tsx` | Not read in full this pass; diffstat 180 lines changed (largest of the twelve) | Uses GSAP-based effects | Same pattern expected, but this is the largest diff of the twelve and deserves its own confirming read given its size | **Confirm before Stage 7**, do not assume | Likely no, confirm before that stage |
| `stories-magazine.tsx` | Not read in full this pass; diffstat 72 lines changed | Uses GSAP-based effects | Same pattern expected | **Likely retain as-is — confirm before Stage 7** | Likely no, confirm before that stage |
| `work-chapters.tsx` | Not read in full this pass; diffstat 181 lines changed (tied largest) | Uses GSAP-based effects, per commit message explicitly touches Focus Areas | Same pattern expected, but largest diff tied with Newsroom — deserves its own confirming read | **Confirm before Stage 4**, do not assume | Likely no, confirm before that stage |
| `scroll-fx.tsx` | Does not exist on this branch | New file, 238 lines: `GsapStagger`, `ClipReveal`, `DragRow` | Not a reconciliation — a reimplementation decision (see §6) | **Do not port as-is (no GSAP). Reimplement `GsapStagger`/`ClipReveal` in `motion.tsx`; port `DragRow` unchanged** | N/A — new code, not merge |
| `package.json` / `package-lock.json` | No `gsap` | Adds `gsap: ^3.15.1` | Dependency decision | **Do not add** | N/A |

**Six files read in full this pass** (`globals.css`, `about-intro.tsx`, `signature-initiatives.tsx`, `site-header.tsx`, `transparency-teaser.tsx`, `media.ts`) plus `human-impact.tsx` (both full versions) = 7 of 12 directly verified. The remaining 5 (`get-involved-cta.tsx`, `leadership-teaser.tsx`, `newsroom-editorial.tsx`, `stories-magazine.tsx`, `work-chapters.tsx`) are characterized from diffstat shape and the now-consistent pattern across all 7 verified files, not individually read line-by-line — flagged honestly above rather than asserted with false confidence, with a specific confirming read recommended immediately before the stage that touches each one.

## 6. `scroll-fx.tsx` — the animation-dependency decision, applied

Re-confirming what this means concretely for the two files that actually need it:
- **`about-intro.tsx`** needs `ClipReveal` only (the photo reveal). Recommend adding a `ClipReveal`-equivalent to `motion.tsx` using Framer Motion's ability to animate `clipPath` directly — same visual result, zero new dependency.
- **`human-impact.tsx`** (if restored to Moments & Gatherings) needs `DragRow` and `GsapStagger`. `DragRow` has **zero GSAP dependency already** — it's plain pointer-event DOM code and can be copied into a new file (or into `motion.tsx`) completely unchanged. `GsapStagger` is replaceable by the existing `RevealGroup`/`RevealItem` pair in `motion.tsx`, which already does staggered-reveal-on-scroll via Framer's `staggerChildren`.

No GSAP dependency is needed for either reconciliation item.

## 7. What I'm recommending for Stage 1, concretely

1. Section order, all other content, all routes: unchanged, as already planned.
2. `about-intro.tsx`: add the stat card back (content from `69af81c`, styling in Direction D tokens, motion via a new Framer-based clip-reveal helper).
3. `human-impact.tsx`: this needs your explicit confirmation before I touch it, since it's a full content swap, not a merge — restoring "Moments & Gatherings" means the illustrative archetype-tiles section is replaced, not kept alongside it.
4. The other 10 overlapping files: leave as-is; they represent already-approved Direction D work, not a gap.
5. `site-header.tsx`: flagging the outside-click/`aria-controls` a11y wiring as worth re-adding, independent of the above — your call on whether to bundle it into Stage 1 or treat it separately.
6. No new dependency, nothing committed, nothing staged, nothing in the backup touched.

Waiting for your approval before editing any source file.
