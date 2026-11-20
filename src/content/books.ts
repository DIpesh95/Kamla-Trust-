import { placeholder, type Verified } from "./types";

export type BookSlot = {
  slug: string;
  relatedTo: string;
  title: Verified<string>;
  description: Verified<string>;
  cover?: { src: string; alt: string };
};

/**
 * Souvenir books / publications released alongside the trust's annual ceremonies are referenced
 * by name in trust literature, but no titles, covers, or descriptions have been confirmed yet.
 * Each slot below is a real, named slot, tied to a specific initiative, waiting on the actual
 * book details and cover art from the trustees, following the same honest-placeholder
 * convention used for stories and awards elsewhere on this site.
 */
export const bookSlots: BookSlot[] = [
  {
    slug: "kamala-power-women-publication",
    relatedTo: "Kamala Power Women Awards",
    title: placeholder("Title pending confirmation."),
    description: placeholder("Description pending confirmation."),
  },
  {
    slug: "kamala-rising-star-publication",
    relatedTo: "Kamala Rising Star",
    title: placeholder("Title pending confirmation."),
    description: placeholder("Description pending confirmation."),
  },
  {
    slug: "pillars-of-humanity-publication",
    relatedTo: "Pillars of Humanity",
    title: placeholder("Title pending confirmation."),
    description: placeholder("Description pending confirmation."),
  },
];
