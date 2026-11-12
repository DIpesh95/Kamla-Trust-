export type FlagshipProgram = {
  slug: string;
  name: string;
  blurb: string;
  story: string;
  year: string;
  impact: string;
  image: { src: string; alt: string };
};

export const flagshipPrograms: FlagshipProgram[] = [
  {
    slug: "kamala-power-women-awards",
    name: "Kamala Power Women Awards",
    blurb: "Recognises, felicitates, and empowers exemplary women of India on International Women's Day.",
    story:
      "Every year, women who've changed what's possible in their fields — healthcare, journalism, education, art, entrepreneurship, social work — are recognised on one stage. Not as a gesture, but as a record: these women did the work, and the work is seen.",
    year: "2026",
    impact: "20+ sectors recognised in the most recent edition",
    image: {
      src: "https://ik.imagekit.io/cujb7fqte/KamlaWeb/2026/KPW/KPW5.jpg?updatedAt=1773312685258",
      alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026 awards ceremony",
    },
  },
  {
    slug: "pillars-of-humanity",
    name: "Pillars of Humanity",
    blurb:
      "An annual walk for humanity, honouring people across communities — transgender individuals, tribal women, sex workers, acid-attack survivors, the elderly, and cancer patients.",
    story:
      "Some communities are only ever spoken about. This is a day they're spoken to, and with. Six groups the country too often looks past, honoured in the same room, on the same terms.",
    year: "Annual",
    impact: "6 communities honoured each year",
    image: {
      src: "https://www.ankibaighamandiramgowanitrust.com/assets/Rcelebration3-C1fPowGe.jpeg",
      alt: "Republic Day Celebration — livelihood kits distributed to mochis, street vendors, Dabbawalas, and transgender artisans",
    },
  },
  {
    slug: "kamala-rising-star",
    name: "Kamala Rising Star",
    blurb: "Honours and celebrates rising talent across sectors and industries.",
    story:
      "Recognition early in a career can change its entire trajectory. This initiative looks for the people doing exceptional work before the world has noticed — and makes sure it does.",
    year: "Annual",
    impact: "Celebrating emerging talent nationally",
    image: {
      src: "https://www.ankibaighamandiramgowanitrust.com/assets/NBTAward1-DfaBYNjf.jpg",
      alt: "Navbharat Times' Utsav 2026 awards presentation",
    },
  },
];
