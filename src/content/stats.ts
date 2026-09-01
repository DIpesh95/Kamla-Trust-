import type { HeadlineStat } from "./types";
import { trust } from "./trust";
import { pillars } from "./pillars";

export function getYearsActive(): number {
  return new Date().getFullYear() - trust.founded;
}

export const headlineStats: HeadlineStat[] = [
  {
    value: "50k+",
    label: "Lives impacted",
    note: "Carried over from the trust’s current site — pending a verified, per-program breakdown.",
  },
  {
    value: "6",
    label: "Cities reached",
  },
  {
    value: `${getYearsActive()}`,
    label: "Years of work",
    note: `Registered public trust since ${trust.founded}.`,
  },
  {
    value: `${pillars.reduce((sum, p) => sum + p.initiatives.length, 0)}+`,
    label: "Active programs",
  },
];
