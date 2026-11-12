import type { HeadlineStat } from "./types";
import { trust } from "./trust";
import { pillars } from "./pillars";
import { placeholder } from "./types";

export function getYearsActive(): number {
  return new Date().getFullYear() - trust.founded;
}

export const headlineStats: HeadlineStat[] = [
  {
    value: "50k+",
    label: "Lives impacted",
    note: "Carried over from the trust’s current site — pending a verified, per-program breakdown.",
    source: placeholder("Source and methodology pending trustee confirmation."),
    period: placeholder("Reporting period pending trustee confirmation."),
  },
  {
    value: "6",
    label: "Cities reached",
    source: placeholder("Source pending trustee confirmation."),
  },
  {
    value: `${getYearsActive()}`,
    label: "Years of work",
    note: `Registered public trust since ${trust.founded}.`,
    source: "Trust registration records",
  },
  {
    value: `${pillars.reduce((sum, p) => sum + p.initiatives.length, 0)}+`,
    label: "Active programs",
    note: "Count of named initiatives currently listed across all focus areas.",
    source: "Internal programme list, as published on this site",
  },
];
