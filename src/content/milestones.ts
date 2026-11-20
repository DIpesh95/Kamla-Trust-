import { getYearsActive } from "./stats";
import { trust } from "./trust";

export const milestones = [
  {
    year: "1967",
    text: "Shri G.K. Gowani founds a Commerce College in Bhinmal, Rajasthan, bringing higher education to a region where access was limited.",
  },
  {
    year: "1969",
    text: `${trust.legalName} is formally established as a registered public trust.`,
  },
  {
    year: "1975",
    text: "The Smt. Ankibai Ghamandiram Ji Hostel opens, giving students from distant villages a safe place to stay while they study.",
  },
  {
    year: "Today",
    text: `${getYearsActive()} years on. 30+ active programs, across education, healthcare, women & girl child, rural livelihoods, and civic life.`,
  },
];
