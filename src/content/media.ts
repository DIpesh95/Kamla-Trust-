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
 * Real per-pillar photography, populated only where a genuinely on-topic photo exists in the
 * Trust's own archive (matched to what the photo actually depicts, not assigned for coverage).
 * Education and Rural Livelihoods have no dedicated photography yet; those pillars render a
 * typographic chapter treatment (see components/work-chapters.tsx) instead of a stand-in photo.
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
  "disaster-relief-civic-recognition": {
    src: "/images/republic-day-2026.jpg",
    width: 900,
    height: 643,
    alt: "Republic Day Celebration 2026 at Kamala Mills Compound",
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
 * The five hero banners. Each is a distinct real event, with the crop position tuned per photo
 * so faces are never cut off (object-position varies a lot by source aspect ratio and subject
 * placement, so each one is hand-tuned rather than defaulted to center).
 */
export const heroSlides = [
  {
    src: "/images/hero-kanya-sneh-bandhan.jpg",
    width: 1080,
    height: 720,
    alt: "Governor of Maharashtra Shri Jishnu Dev Varma Ji at the Kanya Sneh Bandhan mass wedding ceremony",
    caption: "Kanya Sneh Bandhan — Governor of Maharashtra Shri Jishnu Dev Varma Ji at the mass wedding ceremony.",
    objectPosition: "center 22%",
  },
  {
    src: "/images/kamala-power-women-2026.jpg",
    width: 2000,
    height: 859,
    alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026: award presented on stage",
    caption: "Lokmata Ahilyabai Holkar Mahila Samman 2026 — Kamala Power Woman award presented on stage.",
    objectPosition: "20% 24%",
  },
  {
    src: "/images/pillars-of-humanity-2024.jpg",
    width: 1200,
    height: 1600,
    alt: "Pillars of Humanity Fashion Show, 23rd February 2024, Gateway of India, Mumbai",
    caption: "Pillars of Humanity Fashion Show, 23 February 2024, Gateway of India.",
    objectPosition: "50% 10%",
  },
  {
    src: "/images/republic-day-2026.jpg",
    width: 900,
    height: 643,
    alt: "Outdoor Republic Day gathering, Kamala Mills Compound",
    caption: "Republic Day Celebration 2026 — livelihood-support kits distributed, Kamala Mills Compound.",
    objectPosition: "18% 46%",
  },
  {
    src: "/images/lokmata-ahilyabai-holkar-2026.jpg",
    width: 900,
    height: 643,
    alt: "Devendra Fadnavis speaking at the Lokmata Ahilyabai Holkar Mahila Samman 2026, NCPA",
    caption: "Devendra Fadnavis speaking at the Lokmata Ahilyabai Holkar Mahila Samman 2026, NCPA.",
    objectPosition: "38% 20%",
  },
];

export const eventGallery = [
  {
    src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
    width: 720,
    height: 720,
    alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
    caption: "Kanya Sneh Bandhan, 25 couples married with the Governor of Maharashtra in attendance",
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
