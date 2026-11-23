import { getYearsActive, getActiveProgramCount } from "@/content/stats";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";

const milestones = [
  {
    year: "1967",
    text: "Shri G.K. Gowani founds a Commerce College in Bhinmal, Rajasthan, bringing higher education to a region where access was limited.",
  },
  {
    year: "1969",
    text: `${trust.legalName} is formally established as a registered public trust.`,
  },
  {
    year: "1975",
    text: "The Smt. Ankibai Ghamandiram Ji Hostel opens, giving students from distant villages a safe place to stay while they study.",
  },
  {
    year: "Today",
    text: `${getYearsActive()} years on. ${getActiveProgramCount()}+ active programs, across education, healthcare, women & girl child, rural livelihoods, and civic life.`,
  },
];

export function Timeline() {
  return (
    <div className="relative flex flex-col gap-14 border-l border-line pl-9 sm:gap-20 sm:pl-14">
      {milestones.map((m, i) => (
        <Reveal key={m.year} delay={i * 0.08} className="group relative cursor-default">
          <span
            aria-hidden="true"
            className="absolute -left-[2.65rem] top-2 h-2.5 w-2.5 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-150 sm:-left-[3.65rem]"
          />
          <span className="font-display text-5xl italic leading-none text-primary transition-colors duration-300 group-hover:text-burgundy-glow sm:text-7xl">
            {m.year}
          </span>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:text-lg">
            {m.text}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
