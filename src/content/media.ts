/**
 * Real photography, sourced entirely from the trust's supplied archive at
 * `reference-assets/Kamala photos /` (note the trailing space in that directory name). Nothing
 * here is stock or generated.
 *
 * DELIBERATE NO-REPEAT POLICY: every photograph below has exactly one primary placement on the
 * homepage. Where several sections need imagery from the same real-world event (e.g. the Kamala
 * Power Women Award, or the Kanya Sneh Bandhan wedding), a different photograph from that same
 * event is used in each place rather than the same file twice.
 */

export type HeroTextPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type HeroSlide = {
  src: string;
  alt: string;
  label: string;
  /** Tailwind object-position utility, tuned per photo so the subject stays well framed. */
  focus: string;
  /** Where in the frame this specific photo has negative space clear of faces/subjects. */
  textPosition: HeroTextPosition;
  /** True for photos packed with faces edge-to-edge, where a corner gradient alone isn't enough to keep text off a face. */
  denseCrowd?: boolean;
};

/**
 * Six-slide hero sequence, fixed per the client requirement: VIP/distinguished personalities,
 * Nitin Gadkari, impact photographs, flood relief, people-centric, Tiranga Rally. These 6 photos
 * are reserved for the hero only and are not reused elsewhere on the homepage. Each slide's
 * `textPosition` was chosen by inspecting that specific photograph for the region genuinely free
 * of faces (not a repeated default), so the overlay text never sits on top of a person.
 */
export const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero-vip-dignitaries.jpg",
    alt: "Nidarshana Gowani with dignitaries at the Lokmata Ahilyabai Holkar Mahila Samman, Kamala Power Women Award",
    label: "With dignitaries at the Kamala Power Women Award",
    focus: "object-[center_25%]",
    textPosition: "bottom-left",
  },
  {
    src: "/images/hero-nitin-gadkari.jpg",
    alt: "Shri Nitin Gadkari presenting the Lokmata Ahilyabai Holkar Mahila Samman, Kamala Power Women Award 4.0",
    label: "Shri Nitin Gadkari, Kamala Power Women Award 4.0",
    focus: "object-[center_22%]",
    textPosition: "bottom-right",
  },
  {
    src: "/images/hero-impact-healthcare-camp.jpg",
    alt: "Health screening camp, a patient consulting with Kamala Trust volunteers",
    label: "On the ground, where the work actually happens",
    focus: "object-[30%_30%]",
    textPosition: "bottom-right",
  },
  {
    src: "/images/hero-flood-relief.jpg",
    alt: "Nidarshana Gowani distributing relief material in a flood-affected area",
    label: "Flood relief, hand to hand",
    focus: "object-[center_40%]",
    textPosition: "bottom-left",
  },
  {
    src: "/images/hero-people-centric.jpg",
    alt: "Nidarshana Gowani with fellow changemakers at The Human Connect gathering",
    label: "Standing with changemakers, together",
    focus: "object-[center_10%]",
    textPosition: "bottom-left",
    denseCrowd: true,
  },
  {
    src: "/images/hero-tiranga-rally.jpg",
    alt: "Nidarshana Gowani leading the Tiranga Rally, waving the national flag from an army jeep",
    label: "Tiranga Rally, Mumbai",
    focus: "object-[center_30%]",
    textPosition: "bottom-right",
  },
];

/**
 * Per-pillar photography. Disaster Relief & Civic Initiatives still has no reachable real photo
 * and keeps the icon/pattern treatment. The other four now have real, distinct photographs.
 */
export const pillarImages: Record<string, { src: string; width: number; height: number; alt: string }> = {
  education: {
    src: "/images/focus-education-cards.jpg",
    width: 2000,
    height: 1500,
    alt: "Children holding handmade cards at a Kamala Trust community session",
  },
  healthcare: {
    src: "/images/focus-healthcare-anaemia-camp.jpg",
    width: 5568,
    height: 3712,
    alt: "Anaemia Mukt Bharat screening camp at a school, students registering with volunteers",
  },
  "women-and-girl-child": {
    src: "/images/focus-women-girl-child-session.jpg",
    width: 3792,
    height: 3024,
    alt: "Women's awareness and support session, community members seated together indoors",
  },
  "rural-livelihoods-environment": {
    src: "/images/focus-environment-tree-plantation.jpg",
    width: 4176,
    height: 2784,
    alt: "Tree Plantation Drive on World Environment Day, children holding saplings",
  },
};

/**
 * Homepage "About" section photo: a real, previously-unused event photograph distinct from the
 * hero, focus-area and recognitions imagery.
 */
export const homeAboutImage = {
  src: "/images/about-yamuna-drive-portrait.jpg",
  width: 576,
  height: 720,
  alt: "Yamuna Clean-Up & Anaemia Awareness drive in Vrindavan",
};

/**
 * Moments & Gatherings: every remaining real event photograph not already assigned a primary
 * placement elsewhere, so this gallery is the "catch-all" showcase rather than a thin repeat.
 */
export const eventGallery = [
  {
    src: "/images/kamala-power-women-2026.jpg",
    width: 2000,
    height: 859,
    alt: "Kamala Power Women Awards, 2026 edition",
    caption: "Kamala Power Women Awards, 2026",
  },
  {
    src: "/images/hero-kanya-sneh-bandhan.jpg",
    width: 1080,
    height: 720,
    alt: "Governor of Maharashtra Shri Jishnu Dev Varma Ji at the Kanya Sneh Bandhan mass wedding ceremony",
    caption: "Kanya Sneh Bandhan, with the Governor of Maharashtra in attendance",
  },
  {
    src: "/images/moments-relief-distribution.jpg",
    width: 1800,
    height: 1200,
    alt: "Nidarshana Gowani distributing relief material in a flood-affected area",
    caption: "Relief material distribution",
  },
  {
    src: "/images/moments-wedding-guests.jpg",
    width: 1800,
    height: 1200,
    alt: "Guests gathered at the Kanya Sneh Bandhan wedding reception",
    caption: "Kanya Sneh Bandhan, the reception",
  },
  {
    src: "/images/yamuna-drive.jpg",
    width: 1080,
    height: 720,
    alt: "Yamuna Clean-Up & Anaemia Awareness drive in Vrindavan",
    caption: "Yamuna Clean-Up & Anaemia Awareness, Vrindavan",
  },
];
// Kanya Sneh Bandhan is capped at two photographs here (ceremony + reception) so the gallery
// doesn't over-represent a single event; a third Kanya Sneh Bandhan photo previously appeared
// here and has been removed rather than repeated.

/** Recognitions & Awards section photography: the Top 50 Influential Indians, London feature. */
export const recognitionPhotos = {
  top50Collage: {
    src: "/images/recognition-top50-collage.jpg",
    width: 1600,
    height: 1600,
    alt: "Nidarshana Gowani at the Top 50 Most Influential Indians event, Tower Bridge, London",
  },
  top50Portrait: {
    src: "/images/recognition-top50-portrait.jpg",
    width: 1600,
    height: 1600,
    alt: "Nidarshana Gowani holding the Top 50 Most Influential Indians recognition",
  },
  withDignitary: {
    src: "/images/recognition-kamala-with-dignitary.jpg",
    width: 1440,
    height: 1440,
    alt: "Nidarshana Gowani meeting a dignitary, presenting a bouquet",
  },
};

/** Impact Gallery: photographs distinct from every other section, one per human-centric category. */
export const impactPhotos = {
  student: {
    src: "/images/programme-cervical-cancer-campaign.jpg",
    width: 2000,
    height: 1122,
    alt: "Cervical cancer awareness campaign at a school, students seated with a presenter",
  },
  patient: {
    src: "/images/impact-gallery-patient.jpg",
    width: 1800,
    height: 1200,
    alt: "Breast cancer awareness camp, attendees gathered outside with a Kamala Trust banner",
  },
  woman: {
    src: "/images/impact-gallery-woman.jpg",
    width: 1800,
    height: 1200,
    alt: "Women at a Kamala Trust community event",
  },
  family: {
    src: "/images/impact-gallery-family.jpg",
    width: 1800,
    height: 1200,
    alt: "Guests at the Kanya Sneh Bandhan wedding reception",
  },
  community: {
    src: "/images/impact-gallery-student.jpg",
    width: 1800,
    height: 1200,
    alt: "Community health and wellness camp with schoolchildren",
  },
};

/** Leadership: Nidarshana Gowani on stage, distinct from every other section's photography. */
export const leadershipPhoto = {
  src: "/images/leadership-nidarshana-stage.jpg",
  width: 1012,
  height: 1800,
  alt: "Nidarshana Gowani speaking on stage at an awards ceremony",
};
