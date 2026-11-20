import { placeholder, type Verified } from "./types";

export type StorySlot = {
  slug: string;
  pillar: string;
  title: string;
  location: Verified<string>;
  background: string;
  challenge: Verified<string>;
  support: string;
  outcome: Verified<string>;
};

/**
 * Real beneficiary stories are the single most important content gap on the site; see the
 * Content Writer Brief. No stock photography is used here (removed per trustee direction);
 * each slot renders an honest "photo pending" placeholder in stories-magazine.tsx instead,
 * until real interviews, consent, and photography are available. `background` and `support`
 * describe the program itself, already documented elsewhere on this site, so they're populated;
 * `location`, the individual's specific `challenge`, and their `outcome` require a real interview
 * and stay flagged as pending until the trust supplies one. None of the three slots below are
 * geographically confirmed yet; stories from multiple states should replace/extend this list
 * once interviews exist.
 */
export const storySlots: StorySlot[] = [
  {
    slug: "kanya-sneh-bandhan-couple",
    pillar: "Women & Girl Child",
    title: "A wedding day, a year on",
    location: placeholder("State/city pending confirmation."),
    background:
      "One of the couples married in the most recent Kanya Sneh Bandhan mass wedding ceremony, attended by the Governor of Maharashtra.",
    challenge: placeholder("This couple's specific circumstances before the ceremony are pending a real interview."),
    support: "A full wedding ceremony and the essentials provided to all 25 couples married in this edition.",
    outcome: placeholder("Where they are a year on is pending a real interview."),
  },
  {
    slug: "hpv-vaccination-recipient",
    pillar: "Healthcare",
    title: "What early detection changed",
    location: placeholder("State/city pending confirmation."),
    background:
      "Reached through HPV Bharat – Kamala Beti Kavach, the trust's named cervical-cancer prevention mission.",
    challenge: placeholder("This individual's specific health situation is pending a real interview."),
    support: "HPV vaccination and awareness, part of over 10,000 doses administered to date.",
    outcome: placeholder("What changed, in their own words, is pending a real interview."),
  },
  {
    slug: "kamala-rising-stars-student",
    pillar: "Education",
    title: "Before and after the scholarship",
    location: placeholder("State/city pending confirmation."),
    background: "A student recognised through Kamala Rising Star, honouring emerging talent early in a career.",
    challenge: placeholder("This student's circumstances before recognition are pending a real interview."),
    support: "Public recognition and the support extended to Kamala Rising Star honourees.",
    outcome: placeholder("Before-and-after specifics are pending a real interview."),
  },
];
