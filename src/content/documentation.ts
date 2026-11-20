import { placeholder, type Verified } from "./types";

export type AnnualDocument = {
  title: Verified<string>;
  description: Verified<string>;
  /** Omitted until the trust supplies the actual PDF/book file. */
  file?: { href: string; label: string; sizeLabel?: string };
};

export const annualDocumentation: AnnualDocument = {
  title: placeholder("Compiled annual work documentation (PDF/book) not yet uploaded."),
  description:
    "The trust has referenced a compiled record of its programs and initiatives. Once the file is supplied, it will be viewable and downloadable directly from this page.",
};
