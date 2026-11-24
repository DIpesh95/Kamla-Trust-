import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

const references = [
  { title: "Kamala Rising Star", note: "Publication details pending confirmation from the trust." },
  { title: "Kamala Power Woman", note: "Publication details pending confirmation from the trust." },
];

export function BooksPublications() {
  return (
    <section className="bg-soft-bg py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Books &amp; publications
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            In print, alongside the work.
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.1}>
          {references.map((ref) => (
            <RevealItem
              key={ref.title}
              className="flex items-center gap-5 rounded-sm border border-dashed border-line bg-surface p-6"
            >
              <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-sm border border-line bg-soft-bg text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                Cover
                <br />
                pending
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl font-medium text-text">{ref.title}</h3>
                <p className="text-sm text-text-muted">{ref.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
