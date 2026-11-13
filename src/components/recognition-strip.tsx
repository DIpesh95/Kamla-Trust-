import { newsroom } from "@/content/newsroom";
import { Fact } from "./fact";

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="12" r="7.2" />
      <path d="M11.3 18.2 9 27l7-3.2 7 3.2-2.3-8.8" />
    </svg>
  );
}

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Recognition").slice(0, 6);

  return (
    <div className="border-b border-line bg-surface py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">Recognised by</p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {awards.map((award) => (
            <div key={award.title} className="flex flex-col items-start gap-2.5">
              <RibbonIcon className="h-6 w-6 text-primary/70" />
              <span className="text-sm font-medium leading-snug text-text-muted">{award.title}</span>
              <span className="text-xs text-text-muted/60">
                <Fact value={award.date} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
