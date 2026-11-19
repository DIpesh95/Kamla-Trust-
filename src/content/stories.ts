export type StorySlot = {
  slug: string;
  pillar: string;
  title: string;
  prompt: string;
  /** A real event photo that represents the program, not a portrait of this specific person/couple. */
  image?: { src: string; alt: string; caption: string };
};

/**
 * Real, named, first-person beneficiary stories are still the single most important content
 * gap on the site; see the Content Writer Brief. No stock photography is used here (removed
 * per trustee direction). Where a real event photo genuinely represents the program, it is
 * shown with an honest "representative photo" caption; the interview/testimony itself still
 * renders the "awaiting interview" placeholder until a real conversation and consent exist.
 */
export const storySlots: StorySlot[] = [
  {
    slug: "kanya-sneh-bandhan-couple",
    pillar: "Women & Girl Child",
    title: "A wedding day, a year on",
    prompt: "A Kanya Sneh Bandhan couple, on the day of their wedding and a year on.",
    image: {
      src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
      alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
      caption: "Representative photo from a Kanya Sneh Bandhan ceremony, not this specific couple",
    },
  },
  {
    slug: "hpv-vaccination-recipient",
    pillar: "Healthcare",
    title: "What early detection changed",
    prompt: "Someone reached through the HPV vaccination drives, in their own words.",
  },
  {
    slug: "kamala-rising-stars-student",
    pillar: "Education",
    title: "Before and after the scholarship",
    prompt: "A Kamala Rising Stars student, before and after the scholarship.",
  },
];
