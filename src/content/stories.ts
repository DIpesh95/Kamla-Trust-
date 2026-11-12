export type StorySlot = {
  slug: string;
  pillar: string;
  title: string;
  prompt: string;
  image: { src: string; alt: string };
};

/**
 * Real beneficiary stories are the single most important content gap on the site — see the
 * Content Writer Brief. These stock images are placeholders for layout only, clearly labeled,
 * and must be replaced with real interviews, consent, and photography before launch.
 */
export const storySlots: StorySlot[] = [
  {
    slug: "kanya-sneh-bandhan-couple",
    pillar: "Women & Girl Child",
    title: "A wedding day, a year on",
    prompt: "A Kanya Sneh Bandhan couple, on the day of their wedding and a year on.",
    image: {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1400&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
  {
    slug: "hpv-vaccination-recipient",
    pillar: "Healthcare",
    title: "What early detection changed",
    prompt: "Someone reached through the HPV vaccination drives, in their own words.",
    image: {
      src: "https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=1200&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
  {
    slug: "kamala-rising-stars-student",
    pillar: "Education",
    title: "Before and after the scholarship",
    prompt: "A Kamala Rising Stars student, before and after the scholarship.",
    image: {
      src: "https://images.unsplash.com/photo-1572847748080-bac263fae977?w=1200&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
];
