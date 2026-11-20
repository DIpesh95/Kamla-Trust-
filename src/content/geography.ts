/**
 * Named places the trust has actually worked in, cross-referenced from pillars.ts (program
 * locations) and newsroom.ts (event locations) rather than introduced fresh here. Six distinct
 * named places, matching the existing "Cities reached" headline stat in stats.ts.
 */
export type GeographyEntry = {
  city: string;
  state: string;
  context: string;
};

export const geographicReach: GeographyEntry[] = [
  {
    city: "Bhinmal",
    state: "Rajasthan",
    context: "Where it started: the Commerce College and Smt. Ankibai Ghamandiram Ji Hostel.",
  },
  {
    city: "Bhilwara",
    state: "Rajasthan",
    context: "Seven Jain temples built or restored across the city.",
  },
  {
    city: "Palitana",
    state: "Gujarat",
    context: "The Ankibai Ghamandiram Gowani Dharamshala, built for pilgrims.",
  },
  {
    city: "Vrindavan",
    state: "Uttar Pradesh",
    context: "Yamuna Maarjan Seva: riverbank clean-up and anemia awareness.",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    context: "World Environment Day, Dadar Beach clean-up, and the trust's flagship annual events.",
  },
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
    context: "Tiranga Rally and the Kashi Vaishwik Gaurav Samaan.",
  },
];
