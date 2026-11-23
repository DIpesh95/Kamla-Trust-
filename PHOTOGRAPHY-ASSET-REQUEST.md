# Photography Asset Request & Provenance Notes

This is a standalone request list for photography the approved artboards call for but that
wasn't included in the handoff zip, plus a provenance note on one existing asset flagged
during the Direction D2 concept review. Nothing below has been fabricated, substituted, or
silently downloaded — every spot listed currently renders an honest "pending" placeholder
(typographic tag, gradient block, or ivory card with a pending caption) instead of a photo.
Delivering the files requested below lets those placeholders be swapped for real photography
with no further code changes.

## 1. `cleanliness-drive.webp`

- **Section:** "Our Work" page → Focus Areas grid, Row 2
- **Pillar:** Rural Livelihoods & Environment (`src/content/pillars.ts`, slug `rural-livelihoods-environment`)
- **Likely subject:** The trust's environmental clean-up work — candidates from the pillar's
  own initiative list are the BMC-partnered World Environment Day drive, or the World Ocean
  Day Clean-Up at Dadar Beach, Mumbai.
- **Where it plugs in:** Add an entry for this pillar's slug to `pillarImages` in
  [src/content/media.ts](src/content/media.ts). Once present, [work-chapters.tsx](src/components/work-chapters.tsx)
  automatically swaps the card from its `PendingCard` treatment to the real photo — no other
  code change needed.
- **Current placeholder:** Ivory card, bordered numbered tag, large burgundy numeral, caption
  "Programme photography pending."

## 2. `honouring-workers.webp`

- **Section:** "Our Work" page → Focus Areas grid, Row 2
- **Pillar:** Disaster Relief & Civic Initiatives (`src/content/pillars.ts`, slug `disaster-relief-civic-recognition`)
- **Likely subject:** The "Frontline Warriors Recognition" initiative — public recognition
  events honouring COVID-19 frontline workers.
- **Where it plugs in:** Same mechanism as above — add a `disaster-relief-civic-recognition`
  entry to `pillarImages` in [src/content/media.ts](src/content/media.ts).
- **Current placeholder:** Same `PendingCard` treatment, caption "Programme photography pending."

## 3. `portrait-cutout-v2.webp`

- **Section:** Homepage Leadership teaser and "About → Leadership" page
- **Subject:** Trustee Smt. Nidarshana Gowani (first entry in `trust.trustees`,
  [src/content/trust.ts](src/content/trust.ts))
- **Where it plugs in:** [leadership-teaser.tsx](src/components/leadership-teaser.tsx) currently
  has no `image` field wired on the trustee record — a field would need to be added to the
  trustee type and then consumed here once the asset exists.
- **Current placeholder:** Gradient block (burgundy → deep burgundy) with a person-silhouette
  icon and the tag "Portrait pending."
- **Note:** Her co-trustee, Shri Ramesh Gowani, intentionally has no placeholder at all — the
  design treats his entry as type-only ("a photographic portrait awaits trustee approval. No
  placeholder image is used.") until a portrait is separately approved for him too, if one is
  wanted.

## 4. `portrait-primary.webp`

- **Status: not found anywhere in this codebase, its content files, or git history.**
- No component, content file, comment, or fallback references this filename. It does not
  appear to be wired to any current section of the site.
- Before chasing this asset down, please confirm with whoever specified it — it may be:
  - a duplicate/typo of `portrait-cutout-v2.webp` above, or
  - a filename from a design source (e.g. a Figma export) that was never carried into the
    original handoff zip or this implementation.
- No placeholder exists for it because no code currently expects it.

## 5. `yamuna-drive.jpg` — provenance concern (existing asset, flagged during D2 concept review)

- **Caption as currently published:** "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan"
  (`src/content/media.ts`, `pillarImages.healthcare` and `homeAboutImage`). **This caption has
  not been changed** — it is reproduced here only so the concern below is legible against it.
- **What the photograph actually shows:** a felicitation moment — one woman presenting a small
  gift box to another, on a stage, in front of event signage. The signage does reference
  Vrindavan and the Shri Shri Madan Mohan Temple, so the event's identity is plausibly correct,
  but the frame itself does **not** depict a riverbank, a clean-up in progress, or a health
  screening taking place.
- **Recommendation:** confirm with whoever supplied this file whether a second, activity-level
  photograph from the same event exists (one that actually shows the clean-up or the
  screening) before this asset is used anywhere the caption's claim needs to be visually
  supported. Until confirmed, do not treat this frame as proof of the clean-up/screening
  activity itself.
- **How this was handled in the Direction D2 concept:** the image was **not removed from the
  site's asset list and not substituted with a different photo.** Instead, every place the D2
  concept would have shown it (the "One Story, In Full" feature and the Healthcare pillar's
  nav-dropdown thumbnail) now renders a restrained, typographic "Photography Pending" treatment
  instead — consistent with the honest-placeholder language used throughout this site. The
  concern documented in this entry is kept here, as internal documentation, rather than
  displayed as a warning on the public-facing concept.
- **Where it's still wired today:** `pillarImages.healthcare` and `homeAboutImage` in
  [src/content/media.ts](src/content/media.ts) are unchanged in the live Next.js project — this
  entry is a flag for review, not an instruction that was applied to the live site.

---

**Delivery format:** `.webp`, matching the naming convention above exactly (so no renaming is
needed on receipt). Please also confirm usage rights/consent for any identifiable individuals
pictured, consistent with how the rest of the site's photography has been handled.
