export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavLink[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Registration & Transparency", href: "/about/transparency" },
    ],
  },
  { label: "Our Work", href: "/our-work" },
  { label: "Our Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Newsroom", href: "/newsroom" },
  {
    label: "Get Involved",
    href: "/get-involved/donate",
    children: [
      { label: "Donate", href: "/get-involved/donate" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "CSR Partnership", href: "/get-involved/csr-partnership" },
      { label: "Careers", href: "/get-involved/careers" },
    ],
  },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/kamala.gowani.trust",
  instagram: "https://www.instagram.com/kamala.trust/",
  youtube: "https://www.youtube.com/channel/UCFlyBOUqF_brpIP5vw2feOA",
  x: "https://x.com/TrustKamala",
};

export const footerLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Our Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact", href: "/contact" },
];
