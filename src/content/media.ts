/**
 * Real photography, sourced from the trust's own channels — not stock, not generated.
 *
 * IMPORTANT: ankibaighamandiramgowanitrust.com (the trust's current site) is returning 404 at
 * the time of this build — the domain itself, not just individual assets. The handful of real
 * photos that were hosted there (the real logo, all 5 pillar category images, and a few
 * newsroom/gallery photos) are not fetchable right now and have been removed from this file
 * rather than left as broken links. Everything below is still hosted and working (via ImageKit,
 * now mirrored locally so the site doesn't depend on any third party's uptime). Swap the
 * missing pieces back in — or get higher-resolution originals — once the trust's site is back
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
 * No real per-pillar photography is currently reachable (see note above). Each pillar page
 * instead uses a custom icon treatment — see components/pillar-icon.tsx — until real photos
 * are available.
 */
export const pillarImages: Record<string, { src: string; width: number; height: number; alt: string }> = {};

/**
 * Homepage "About" section photo. No dedicated trust/office photo exists yet. Uses a different
 * real event photo than the Hero (Yamuna Clean-Up & Anemia Awareness) rather than repeating the
 * same image twice on the homepage. Swap for a dedicated photo once the trust provides one.
 */
export const homeAboutImage = {
  src: "/images/yamuna-drive.jpg",
  width: 1080,
  height: 720,
  alt: "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan",
};

export const eventGallery = [
  {
    src: "/images/hero-kanya-sneh-bandhan-alt.jpg",
    width: 1080,
    height: 720,
    alt: "Kanya Sneh Bandhan mass wedding ceremony",
    caption: "Kanya Sneh Bandhan — 25 couples married with the Governor of Maharashtra in attendance",
  },
  {
    src: "/images/yamuna-drive.jpg",
    width: 1080,
    height: 720,
    alt: "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan",
    caption: "Yamuna Clean-Up & Anemia Awareness, Vrindavan",
  },
  {
    src: "/images/kpw-lokmata-award.jpg",
    width: 1440,
    height: 960,
    alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026 awards ceremony",
    caption: "Lokmata Ahilyabai Holkar Mahila Samman 2026",
  },
];
