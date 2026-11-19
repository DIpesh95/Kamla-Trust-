import { placeholder, type Verified } from "./types";

export type HeroSlide = {
  id: string;
  theme: string;
  title: string;
  dek: string;
  image: Verified<{ src: string; alt: string }>;
};

/**
 * Six themed hero slides. Real, working photography is used wherever the trust's existing
 * assets genuinely match the theme. Two themes (Nitin Gadkari, Flood Relief) have no verified
 * photo in the asset library yet, so they render the site's existing "photo pending" treatment
 * rather than a stock substitute. Swap in real photos for those two once supplied.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "vvip-leadership",
    theme: "VVIP Leadership",
    title: "Recognised on the biggest stages.",
    dek: "Shri Devendra Fadnavis, Hon'ble Chief Minister of Maharashtra, at the Lokmata Ahilyabai Holkar Mahila Samman 2026.",
    image: {
      src: "/images/lokmata-ahilyabai-holkar-2026.jpg",
      alt: "Devendra Fadnavis speaking at the Lokmata Ahilyabai Holkar Mahila Samman 2026, NCPA",
    },
  },
  {
    id: "nitin-gadkari",
    theme: "Nitin Gadkari",
    title: "Voices that stand behind the work.",
    dek: "A dedicated feature on Shri Nitin Gadkari's association with the trust.",
    image: placeholder("Real photo pending; not yet available in the asset library."),
  },
  {
    id: "our-impact",
    theme: "Our Impact",
    title: "57 years of showing up.",
    dek: "Kanya Sneh Bandhan: 25 underprivileged couples married in the most recent edition, with the Governor of Maharashtra in attendance.",
    image: {
      src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
      alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
    },
  },
  {
    id: "flood-relief",
    theme: "Flood Relief",
    title: "Here when the water rises.",
    dek: "Disaster-relief and civic-initiative work for communities hit hardest.",
    image: placeholder("Real photo pending; not yet available in the asset library."),
  },
  {
    id: "people-centric",
    theme: "People-Centric",
    title: "Every program has a name attached.",
    dek: "Real communities, real ceremonies, not illustrations of impact.",
    image: {
      src: "/images/hero-kanya-sneh-bandhan-alt.jpg",
      alt: "Governor of Maharashtra at the Kanya Sneh Bandhan mass wedding ceremony",
    },
  },
  {
    id: "tiranga",
    theme: "Tiranga",
    title: "Patriotism, carried into the streets.",
    dek: "Republic Day: flag hoisting, a community pledge, and livelihood-support kits at Kamala Mills Compound.",
    image: {
      src: "/images/republic-day-2026.jpg",
      alt: "Outdoor Republic Day gathering with flag hoisting at Kamala Mills Compound",
    },
  },
];
