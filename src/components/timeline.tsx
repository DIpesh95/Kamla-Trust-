import { milestones } from "@/content/milestones";
import { Reveal } from "./motion";

export function Timeline() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <div className="relative flex min-w-[900px] gap-0 sm:min-w-0">
        <div aria-hidden="true" className="absolute left-0 right-0 top-[0.7rem] h-px bg-line" />
        {milestones.map((m, i) => (
          <Reveal
            key={m.year}
            delay={i * 0.08}
            className="relative flex flex-1 flex-col gap-4 pr-8 last:pr-0"
          >
            <span aria-hidden="true" className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-surface bg-primary" />
            <span className="font-display text-4xl italic leading-none text-primary sm:text-5xl">{m.year}</span>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted sm:text-base">{m.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
