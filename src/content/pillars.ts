import { placeholder, type Pillar } from "./types";

export const pillars: Pillar[] = [
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    summary:
      "Building schools and colleges in rural Rajasthan and recognising promising students, so that background doesn’t decide who gets to learn.",
    stat: placeholder("Verified enrollment / schools-built figures pending from trustees."),
    initiatives: [
      {
        name: "Schools & Colleges",
        blurb: "Schools and colleges built and supported in rural Rajasthan, expanding access to education in underserved areas.",
        location: "Rural Rajasthan",
      },
      {
        name: "Kamala Rising Stars",
        blurb: "Recognises and nurtures young talent, giving promising students a platform and support to pursue their goals.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Health",
    summary:
      "Vaccination drives, cancer-patient support, rural health camps, and pandemic-era relief — care aimed at the people least likely to otherwise receive it.",
    stat: placeholder("Patients treated / vaccinated figures pending from trustees."),
    initiatives: [
      {
        name: "HPV Vaccination",
        blurb: "HPV vaccination drives for women, including over 10,000 doses administered as part of the trust’s cervical-cancer prevention work.",
      },
      {
        name: "Cancer Patient Support",
        blurb: "Support for cancer patients in partnership with Tata Memorial Hospital, Mumbai.",
      },
      {
        name: "Rural Healthcare Camps",
        blurb: "Health screening and treatment camps held in underserved rural communities.",
      },
      {
        name: "COVID-19 Support",
        blurb: "Pandemic-era relief work supporting frontline healthcare needs and vulnerable communities.",
      },
      {
        name: "Nurse Day Recognition",
        blurb: "Annual recognition of nurses and frontline healthcare workers.",
      },
      {
        name: "Blood Donation Camps",
        blurb: "Blood donation drives held at Kamala Mills Compound and other locations.",
      },
      {
        name: "Vimla Old Age House",
        blurb: "Support for elder care through the Vimla Old Age House.",
      },
      {
        name: "Yamuna Clean-Up & Anemia Awareness",
        blurb: "Yamuna Maarjan Seva in Vrindavan combining riverbank clean-up with anemia and health awareness, aligned with the Swachh Bharat mission.",
        location: "Vrindavan",
      },
    ],
  },
  {
    slug: "women-and-girl-child",
    name: "Women & Girl Child",
    shortName: "Women & Girl Child",
    summary:
      "From mass weddings for underprivileged couples to awards recognising women changemakers — programs built around dignity, safety, and recognition.",
    stat: placeholder("Beneficiary counts per program pending from trustees."),
    initiatives: [
      {
        name: "Kamala Power Women",
        blurb: "Annual awards recognising women achievers across healthcare, journalism, education, art, entrepreneurship, and social work.",
      },
      {
        name: "Kanya Sneh Bandhan",
        blurb: "Mass wedding ceremony for underprivileged couples — 25 couples were married in the most recent edition, attended by the Governor of Maharashtra.",
      },
      {
        name: "Kamala Cricket Tournament",
        blurb: "Women’s cricket tournament promoting sport and community participation.",
      },
      {
        name: "Support for Army Widows",
        blurb: "Recognition and support programs for widows of armed-forces officers.",
      },
      {
        name: "Transgender Community Welfare",
        blurb: "Inclusive programs and skill-building support for transgender individuals, including celebration events and savings initiatives.",
      },
      {
        name: "Mahila Sahbhagita",
        blurb: "Women’s participation forums, including intellectual seminars held at Shri Mohankheda Tirth.",
      },
      {
        name: "Girl Child Education & Menstrual Hygiene",
        blurb: "Ongoing support for girl-child education and menstrual-hygiene awareness in the communities the trust serves.",
      },
    ],
  },
  {
    slug: "rural-livelihoods-environment",
    name: "Rural Livelihoods, Environment & Culture",
    shortName: "Livelihoods & Environment",
    summary:
      "Renewable energy, self-employment support, animal welfare, and environmental clean-up drives, alongside the trust’s long-running heritage and temple work.",
    stat: placeholder("Livelihoods/environment impact figures pending from trustees."),
    initiatives: [
      {
        name: "Renewable Power Plants",
        blurb: "Biomass power plant projects supporting sustainable, zero-waste energy models.",
      },
      {
        name: "Self-Employment Focus",
        blurb: "Programs supporting self-employment and income generation in the communities the trust works with.",
      },
      {
        name: "Feed Stray Animals",
        blurb: "Ongoing feeding programs for stray and community animals.",
      },
      {
        name: "Temple Restoration",
        blurb: "Restoration and beautification of Jain temples, including seven temples built or restored in Bhilwara.",
        location: "Bhilwara",
      },
      {
        name: "World Environment Day",
        blurb: "Ground-level environmental action and awareness activities in partnership with the Brihanmumbai Municipal Corporation (BMC).",
        location: "Mumbai",
      },
      {
        name: "World Ocean Day Clean-Up",
        blurb: "Beach clean-up drive at Dadar Beach, Mumbai, marking World Ocean Day.",
        location: "Dadar, Mumbai",
      },
      {
        name: "Annadanam & Food Distribution",
        blurb: "Food and blanket distribution drives for communities in need.",
      },
    ],
  },
  {
    slug: "disaster-relief-civic-recognition",
    name: "Disaster Relief & Civic Recognition",
    shortName: "Relief & Recognition",
    summary:
      "Recognition for frontline workers and the armed forces, and public events that bring civic pride and community spirit together.",
    stat: placeholder("Relief-program figures pending from trustees."),
    initiatives: [
      {
        name: "Frontline Warriors Recognition",
        blurb: "Public recognition events honouring COVID-19 frontline workers.",
      },
      {
        name: "Tiranga Rally",
        blurb: "National-flag rallies held in Mumbai and Varanasi, including at Dr. Rajendra Prasad Ghat, marking Azadi Ka Amrit Mahotsav.",
      },
      {
        name: "Salute to Mumbai Police",
        blurb: "Recognition events honouring the Mumbai Police force.",
      },
      {
        name: "Makar Sankranti Community Event",
        blurb: "Annual community celebration marking Makar Sankranti.",
      },
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}
