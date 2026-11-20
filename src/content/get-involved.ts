import { trust } from "./trust";
import { socialLinks } from "./nav";

export const getInvolvedContact = {
  generalEmail: "contact@kamalatrust.org",
  trusteeEmail: "trustee@kamalatrust.org",
  instagram: socialLinks.instagram,
  phone: trust.phone,
};

export const assistanceCategories = [
  "Healthcare",
  "Education",
  "Women Empowerment",
  "Girl Child Support",
  "General Assistance",
] as const;

export type AssistanceCategory = (typeof assistanceCategories)[number];
