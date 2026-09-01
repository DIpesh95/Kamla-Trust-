import { flagshipPrograms } from "@/content/flagship-programs";
import { SectionHeading } from "./section-heading";
import { Container } from "./container";

export function FlagshipProgramsSection() {
  return (
    <section id="signature-initiatives" className="scroll-mt-20 bg-surface py-20 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Signature initiatives"
          title="Three programs the trust runs every year"
          dek="Recurring, national-scale initiatives — distinct from the day-to-day pillar programs."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {flagshipPrograms.map((program) => (
            <div key={program.name} className="rounded-2xl border border-line bg-paper p-6">
              <p className="font-display text-lg font-medium text-ink">{program.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{program.blurb}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
