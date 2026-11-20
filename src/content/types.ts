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
  /** Link to the trustee's own site/profile for a fuller account of their work, when one exists. */
  knowMoreUrl?: Verified<string>;
  /** The trustee's own personal social profiles, distinct from the trust's institutional accounts. */
  socialLinks?: {
    instagram?: Verified<string>;
    linkedin?: Verified<string>;
    facebook?: Verified<string>;
    x?: Verified<string>;
  };
};

export type TrustProfile = {
  legalName: string;
  shortName: string;
  relatedEntityNote: string;
  tagline: string;
  vision: string;
  mission: string;
  coreValues: string[];
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
  /** Link to a Wikipedia article about the trust or its trustees, when one is confirmed. */
  wikipediaUrl?: Verified<string>;
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
  /** The ceremony or occasion the recognition was presented at, when known. Recognition items only. */
  occasion?: Verified<string>;
  /** Who the recognition was presented to, when it's a specific person rather than the trust itself. */
  recipient?: string;
  /** Name of the publication/outlet, for Press items. */
  publication?: string;
  /** Link to the original article, when one is confirmed. */
  articleUrl?: Verified<string>;
};

export type HeadlineStat = {
  value: string;
  label: string;
  note?: string;
  source?: Verified<string>;
  period?: Verified<string>;
};
