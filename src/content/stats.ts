import type { HeadlineStat } from "./types";
import { trust } from "./trust";
import { pillars } from "./pillars";
import { placeholder } from "./types";

export function getYearsActive(): number {
  return new Date().getFullYear() - trust.founded;
}

/**
 * A "lives impacted" headline figure is deliberately NOT included here. The trust's prior site
 * carried a "50,000+" total with no sourced methodology or reporting period — per trustee
 * direction, that unverified claim has been removed rather than displayed with a caveat. Add it
 * back once a real, sourced total is confirmed.
 */
export const headlineStats: HeadlineStat[] = [
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
