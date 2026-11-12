export type Placeholder = {
  /** True when this field is not yet confirmed by the trust and needs real data before launch. */
  pending: true;
  note: string;
};

export type Verified<T> = T | Placeholder;

export function isPlaceholder(value: unknown): value is Placeholder {
  return typeof value === "object" && value !== null && (value as Placeholder).pending === true;
}

export function placeholder(note: string): Placeholder {
  return { pending: true, note };
}

export type Trustee = {
  name: string;
  role: string;
  bio: string;
};

export type TrustProfile = {
  legalName: string;
  shortName: string;
  relatedEntityNote: string;
  tagline: string;
  founded: number;
  orgType: string;
  trustees: Trustee[];
  registeredOffice: string;
  phone: string;
  email: string;
  registrationNumber: Verified<string>;
  exemption80G: Verified<string>;
  exemption12A: Verified<string>;
  exemptionFCRA: Verified<string>;
};

export type Initiative = {
  name: string;
  blurb: Verified<string>;
  location?: string;
};

export type Pillar = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  stat: Verified<string>;
  initiatives: Initiative[];
};

export type PressItem = {
  title: string;
  date: Verified<string>;
  kind: "Press" | "Recognition" | "Event" | "Community";
  description: string;
  image?: { src: string; alt: string };
};

export type HeadlineStat = {
  value: string;
  label: string;
  note?: string;
  source?: Verified<string>;
  period?: Verified<string>;
};
