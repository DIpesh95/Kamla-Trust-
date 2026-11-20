import type { HeadlineStat } from "./types";
import { trust } from "./trust";
import { pillars } from "./pillars";

export function getYearsActive(): number {
  return new Date().getFullYear() - trust.founded;
}

/**
 * A "lives impacted" headline figure is deliberately NOT included here. The trust's prior site
 * carried a "50,000+" total with no sourced methodology or reporting period. Per trustee
 * direction, that unverified claim has been removed rather than displayed with a caveat. Add it
 * back once a real, sourced total is confirmed.
 *
 * A "cities reached" figure was removed for the same reason: its only source was marked pending
 * trustee confirmation, with no number anyone had actually verified. Don't re-add a headline
 * stat here without a real source.
 */
export const headlineStats: HeadlineStat[] = [
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
