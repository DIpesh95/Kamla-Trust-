/**
 * The five homepage hero slides. Slide 1 is the trust's main introduction; slides 2–5 cover its
 * four broad focus themes. Real photography only: each image below is an existing, already-used
 * photo from the trust's own archive, reused here because it's a genuine, truthful match for the
 * theme (e.g. the Kamala Power Women stage photo for "Women's Empowerment"). The "education"
 * theme has no real matching photo anywhere in the project yet, so that slide intentionally uses
 * an icon-forward treatment instead of a photo, rather than mis-captioning an unrelated image.
 *
 * Once the trust supplies its own dedicated banner photography (5 images, one per slide), drop
 * the files into public/images/banners/ and swap the `image` fields below, nothing else needs
 * to change.
 */
export type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: [string, string];
  description: string;
  image?: { src: string; alt: string };
  pillarIconSlug?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "intro",
    eyebrow: "Kamala Trust · Est. 1969",
    headline: ["Rising By", "Lifting Others."],
    description: "Creating opportunities, restoring dignity, and building stronger communities for more than five decades.",
    image: {
      src: "/images/hero-kanya-sneh-bandhan.jpg",
      alt: "Governor of Maharashtra Shri Jishnu Dev Varma Ji at the Kanya Sneh Bandhan mass wedding ceremony",
    },
    primaryCta: { label: "Explore Our Work", href: "/our-work" },
    secondaryCta: { label: "Be Part of the Change", href: "/get-involved/donate" },
  },
  {
    id: "womens-empowerment",
    eyebrow: "Focus area",
    headline: ["Women's Empowerment", "& Equality."],
    description: "Creating opportunities and celebrating the achievements of women who are too often only spoken about, never to.",
    image: {
      src: "/images/kpw-lokmata-award.jpg",
      alt: "A woman honoured on stage at the Kamala Power Women Awards",
    },
    primaryCta: { label: "Meet the Honourees", href: "/our-experiences" },
    secondaryCta: { label: "Women & Girl Child Programs", href: "/our-work/women-and-girl-child" },
  },
  {
    id: "healthcare",
    eyebrow: "Focus area",
    headline: ["Healthcare", "& Well-being."],
    description: "Promoting health, care, and access to essential support, from vaccination drives to rural health camps.",
    image: {
      src: "/images/yamuna-drive.jpg",
      alt: "Yamuna Clean-Up & Anemia Awareness drive in Vrindavan",
    },
    primaryCta: { label: "Explore Healthcare Programs", href: "/our-work/healthcare" },
    secondaryCta: { label: "Donate", href: "/get-involved/donate" },
  },
  {
    id: "education",
    eyebrow: "Focus area",
    headline: ["Education", "& Youth Development."],
    description: "Encouraging learning, talent, and future leaders, so background never decides who gets to learn.",
    pillarIconSlug: "education",
    primaryCta: { label: "Explore Education Programs", href: "/our-work/education" },
    secondaryCta: { label: "Donate", href: "/get-involved/donate" },
  },
  {
    id: "community-welfare",
    eyebrow: "Focus area",
    headline: ["Community Welfare", "& Humanitarian Support."],
    description: "Extending care and support to communities in need, a flag raised, a kit handed over, a street vendor's morning made steadier.",
    image: {
      src: "/images/republic-day-2026.jpg",
      alt: "Republic Day community gathering and kit distribution at Kamala Mills Compound",
    },
    primaryCta: { label: "Explore Our Experiences", href: "/our-experiences" },
    secondaryCta: { label: "Volunteer", href: "/get-involved/volunteer" },
  },
];
