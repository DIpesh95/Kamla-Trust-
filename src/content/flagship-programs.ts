import { placeholder, type Verified } from "./types";

export type FlagshipProgram = {
  slug: string;
  name: string;
  blurb: string;
  story: string;
  year: string;
  /** Exact date of the most recent / most documented edition, when known. */
  date: Verified<string>;
  /** Venue of the most recent / most documented edition, when known. */
  venue: Verified<string>;
  impact: string;
  /** Specific recognitions or notable moments from past editions, drawn from existing records. */
  highlights: string[];
  /** Omitted when no real, working photo is available; renders an icon fallback instead. */
  image?: { src: string; alt: string };
};

export const flagshipPrograms: FlagshipProgram[] = [
  {
    slug: "kamala-power-women-awards",
    name: "Kamala Power Women Awards",
    blurb: "Recognises, felicitates, and empowers exemplary women of India on International Women's Day.",
    story:
      "Every year, women who've changed what's possible in their fields, healthcare, journalism, education, art, entrepreneurship, social work, are recognised on one stage. Not as a gesture, but as a record: these women did the work, and the work is seen.",
    year: "2026",
    date: placeholder("Exact 2026 ceremony date pending confirmation."),
    venue: "Lokmata Ahilyabai Holkar Mahila Samman 2026, NCPA, Mumbai",
    impact: "20+ sectors recognised in the most recent edition",
    highlights: [
      "2026: Lokmata Ahilyabai Holkar Mahila Samman, with Hon'ble CM Shri Devendra Fadnavis in attendance",
      "2022: 38 women achievers honoured; awards presented by then-Governor of Maharashtra, Shri Bhagat Singh Koshyari",
      "Also held in Delhi, recognising inspiring women achievers across 20 sectors",
    ],
    image: {
      src: "/images/kamala-power-women-2026.jpg",
      alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026: award presented on stage",
    },
  },
  {
    slug: "pillars-of-humanity",
    name: "Pillars of Humanity",
    blurb:
      "An annual walk for humanity, honouring people across communities: transgender individuals, tribal women, sex workers, acid-attack survivors, the elderly, and cancer patients.",
    story:
      "Some communities are only ever spoken about. This is a day they're spoken to, and with. Six groups the country too often looks past, honoured in the same room, on the same terms.",
    year: "Annual",
    date: "23 February 2024 (most recent edition)",
    venue: "Gateway of India, Mumbai",
    impact: "6 communities honoured each year",
    highlights: [
      "A fashion show format, walked by honourees rather than professional models",
      "6 communities recognised: transgender individuals, tribal women, sex workers, acid-attack survivors, the elderly, and cancer patients",
    ],
    image: {
      src: "/images/pillars-of-humanity-2024.jpg",
      alt: "Pillars of Humanity Fashion Show, 23rd February 2024, Gateway of India, Mumbai",
    },
  },
  {
    slug: "kamala-rising-star",
    name: "Kamala Rising Star",
    blurb: "Honours and celebrates rising talent across sectors and industries.",
    story:
      "Recognition early in a career can change its entire trajectory. This initiative looks for the people doing exceptional work before the world has noticed, and makes sure it does.",
    year: "Annual",
    date: placeholder("Date of most recent edition pending confirmation."),
    venue: placeholder("Venue pending confirmation."),
    impact: "Celebrating emerging talent nationally",
    // No confirmed past honourees/editions yet; the component shows a placeholder note instead.
    highlights: [],
    // No working photo available. The one previously used 404s. Renders an icon fallback
    // in signature-initiatives.tsx until a real photo is supplied.
  },
];
