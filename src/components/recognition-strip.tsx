import { newsroom } from "@/content/newsroom";
import { Fact } from "./fact";

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Recognition").slice(0, 6);

  return (
    <div className="border-b border-line bg-soft-bg py-9">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">Recognised by</p>
        <div className="mt-5 flex gap-10 overflow-x-auto pb-1">
          {awards.map((award) => (
            <div key={award.title} className="flex shrink-0 flex-col gap-1 border-l-2 border-primary pl-3.5">
              <span className="font-data text-[13px] text-primary">
                <Fact value={award.date} />
              </span>
              <span className="max-w-[26ch] text-sm leading-snug text-text">{award.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
