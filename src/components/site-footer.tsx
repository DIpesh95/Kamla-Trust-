import Link from "next/link";
import { footerLinks } from "@/content/nav";
import { trust } from "@/content/trust";
import { Logomark } from "./logomark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logomark className="h-7 w-7 text-rose" />
            <span className="font-display text-lg font-medium text-ink">{trust.shortName}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{trust.tagline}</p>
          <p className="mt-4 text-sm text-ink-soft">{trust.registeredOffice}</p>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">Explore</p>
          <ul className="mt-3 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-rose-strong">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">Contact</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
            <li>
              <a href={`tel:${trust.phone.replace(/\s+/g, "")}`} className="hover:text-rose-strong">
                {trust.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${trust.email}`} className="hover:text-rose-strong">
                {trust.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {trust.legalName}. All rights reserved.
          </p>
          <p>{trust.orgType}</p>
        </div>
      </div>
    </footer>
  );
}
