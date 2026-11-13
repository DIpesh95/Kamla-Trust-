export type StorySlot = {
  slug: string;
  pillar: string;
  title: string;
  prompt: string;
};

/**
 * Real beneficiary stories are the single most important content gap on the site; see the
 * Content Writer Brief. No stock photography is used here (removed per trustee direction);
 * each slot renders an honest "photo pending" placeholder in stories-magazine.tsx instead,
 * until real interviews, consent, and photography are available.
 */
export const storySlots: StorySlot[] = [
  {
    slug: "kanya-sneh-bandhan-couple",
    pillar: "Women & Girl Child",
    title: "A wedding day, a year on",
    prompt: "A Kanya Sneh Bandhan couple, on the day of their wedding and a year on.",
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
