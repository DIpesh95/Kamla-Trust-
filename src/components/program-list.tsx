import { Fact } from "./fact";
import { Reveal } from "./motion";
import type { Initiative } from "@/content/types";

export function ProgramList({ initiatives }: { initiatives: Initiative[] }) {
  return (
    <div className="flex flex-col">
      {initiatives.map((initiative, i) => (
        <Reveal key={initiative.name} delay={Math.min(i, 6) * 0.05}>
          <div className="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 sm:grid-cols-[3.5rem_1fr]">
            <span className="font-display text-xl italic text-primary/70 transition-colors group-hover:text-primary sm:text-2xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-medium text-text transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                  {initiative.name}
                </h3>
                {initiative.location ? (
                  <span className="shrink-0 rounded-full bg-light-pink px-2.5 py-0.5 text-xs font-medium text-primary-strong">
                    {initiative.location}
                  </span>
                ) : null}
              </div>
              <div className="max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
                <Fact value={initiative.blurb} />
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
