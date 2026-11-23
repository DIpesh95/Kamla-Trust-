/**
 * Real photography, sourced from the trust's own channels; not stock, not generated.
 *
 * IMPORTANT: ankibaighamandiramgowanitrust.com (the trust's current site) is returning 404 at
 * the time of this build. The domain itself, not just individual assets. The handful of real
 * photos that were hosted there (the real logo, all 5 pillar category images, and a few
 * newsroom/gallery photos) are not fetchable right now and have been removed from this file
 * rather than left as broken links. Everything below is still hosted and working (via ImageKit,
 * now mirrored locally so the site doesn't depend on any third party's uptime). Swap the
 * missing pieces back in, or get higher-resolution originals, once the trust's site is back
 * up or they send assets directly. See the Content Writer Brief / Trustee Checklist for the
 * full list of what's needed.
 */

export const heroImage = {
  src: "/images/hero-kanya-sneh-bandhan.jpg",
  width: 1080,
  height: 720,
  alt: "Governor of Maharashtra Shri Jishnu Dev Varma Ji at the Kanya Sneh Bandhan mass wedding ceremony",
};

/**
 * Per-pillar photography is sparse (see note above): only Healthcare and Women & Girl Child
 * have a real, working photo to place here. Both are reused crops already shown elsewhere on
 * the site (disclosed reuse, capped at 2 appearances per asset, not a duplicate-content bug).
 * The remaining three pillars fall back to the icon treatment in components/pillar-icon.tsx
 * until real photos are available.
 */
export const pillarImages: Record<string, { src: string; width: number; height: number; alt: string }> = {
  healthcare: {
    src: "/images/yamuna-drive.jpg",
    width: 1080,
    height: 720,
    alt: "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan",
  },
  "women-and-girl-child": {
    src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
    width: 720,
    height: 720,
    alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
  },
};

/**
 * Homepage "About" section photo. No dedicated trust/office photo exists yet. Uses a different
 * real event photo than the Hero (Yamuna Clean-Up & Anemia Awareness) rather than repeating the
 * same image twice on the homepage. Pre-cropped to the section's 4:5 portrait aspect (rather than
 * relying on CSS object-position) so both people stay fully in frame. Swap for a dedicated photo
 * once the trust provides one.
 */
export const homeAboutImage = {
  src: "/images/about-yamuna-drive-portrait.jpg",
  width: 576,
  height: 720,
  alt: "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan",
};

/**
 * Approved composition: one dominant feature (reused from Signature Initiatives, a different
 * crop/wider story) + one supporting photo (reused from Focus Areas, a closer crop) + one
 * honestly-marked pending slot for the Trust's own archive photography. Disclosed reuse,
 * capped at 2 appearances per asset, not a duplicate-content bug.
 */
export const eventGallery = {
  feature: {
    src: "/images/kamala-power-women-2026.jpg",
    width: 2000,
    height: 859,
    alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026: award presented on stage",
    tag: "Signature Initiative, Revisited",
    caption:
      "Lokmata Ahilyabai Holkar Mahila Samman 2026 — the same ceremony featured in Signature Initiatives above, shown here in full.",
  },
  supporting: {
    src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
    width: 720,
    height: 720,
    alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
    caption: "Kanya Sneh Bandhan — revisited from Focus Areas, closer crop",
  },
};
