import { trust } from "@/content/trust";

/**
 * No mailing-list backend exists yet, so this is a single honest "Get Updates by Email" CTA
 * (a direct mailto: link) rather than an input + subscribe form that would imply a live
 * subscription. Swap this back to a real form field once an ESP integration ships.
 */
export function NewsletterForm() {
  const href = `mailto:${trust.email}?subject=${encodeURIComponent("Newsletter signup")}`;

  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong"
    >
      Get Updates by Email
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
