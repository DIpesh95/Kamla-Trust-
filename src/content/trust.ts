import { placeholder, type TrustProfile } from "./types";

export const trust: TrustProfile = {
  legalName: "Kamala Ankibai Ghamandiram Gowani Trust",
  shortName: "Kamala Trust",
  relatedEntityNote:
    "Trust literature also references a separately named “Ankibai Ghamandiram Gowani Trust.” This site represents Kamala Ankibai Ghamandiram Gowani Trust; the relationship between the two names should be confirmed with the trustees before launch.",
  tagline: "Rising By Lifting Others",
  founded: 1969,
  orgType: "Registered Public Trust, women-led",
  trustees: [
    {
      name: "Smt. Nidarshana Gowani",
      role: "Trustee",
      bio: "Managing Director, Kamala Group of Industries, and National Patron of Bharat Vikas Parishad (Women’s Wing). Leads the trust’s programs across education, healthcare, and women’s empowerment.",
    },
    {
      name: "Shri Ramesh Gowani",
      role: "Trustee",
      bio: "Business leader in real estate and renewable energy, including the redevelopment of Kamala Mills and biomass power projects in Karnataka and Punjab. Supports the trust’s healthcare, education, and social-inclusion initiatives.",
    },
  ],
  registeredOffice:
    "2nd Floor, Kamala House, Kamala City, Senapati Bapat Marg, Lower Parel West, Mumbai, Maharashtra – 400013",
  phone: "+91 86570 05023",
  email: "trustee@ankibaighamandiramgowanitrust.com",
  registrationNumber: placeholder("Trust registration number not yet published; pending from trustees."),
  exemption80G: placeholder("80G tax-exemption status not yet published; pending from trustees."),
  exemption12A: placeholder("12A registration status not yet published; pending from trustees."),
  exemptionFCRA: placeholder("FCRA status not yet published; confirm whether the trust accepts foreign contributions."),
};
