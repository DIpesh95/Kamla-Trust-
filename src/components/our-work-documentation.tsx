import { Reveal } from "./motion";
import { Container } from "./container";

export function OurWorkDocumentation() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-col items-start gap-6 rounded-sm border border-dashed border-line bg-soft-bg p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Our work &middot; PDF / annual documentation
            </p>
            <h2 className="font-display text-2xl font-medium text-text sm:text-3xl">
              Compiled programme documentation, coming soon.
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-text-muted">
              A downloadable PDF covering the trust&rsquo;s programmes and annual activity is being compiled for
              publication here. Until it is ready, request a copy directly.
            </p>
          </div>
          <a
            href="mailto:contact@kamalatrust.org?subject=Request%20for%20Kamala%20Trust%20programme%20documentation"
            className="shrink-0 rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong transition-colors hover:bg-primary hover:text-surface"
          >
            Request documentation
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
