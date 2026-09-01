import Link from "next/link";
import Image from "next/image";
import { footerLinks, socialLinks } from "@/content/nav";
import { trust } from "@/content/trust";
import { logo } from "@/content/media";
import { NewsletterForm } from "./newsletter-form";
import { FacebookIcon, InstagramIcon, YoutubeIcon, XIcon } from "./social-icons";

const socials = [
  { href: socialLinks.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: socialLinks.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socialLinks.x, label: "X", Icon: XIcon },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/">
            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-10 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-soft">{trust.tagline}</p>
          <p className="mt-4 text-sm text-ink-soft">{trust.registeredOffice}</p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-navy hover:text-navy-strong"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">Explore</p>
          <ul className="mt-3 flex flex-col gap-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-navy-strong">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">Get involved</p>
          <ul className="mt-3 flex flex-col gap-2">
            <li>
              <Link href="/get-involved/donate" className="text-sm text-ink-soft hover:text-navy-strong">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/get-involved/volunteer" className="text-sm text-ink-soft hover:text-navy-strong">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/get-involved/csr-partnership" className="text-sm text-ink-soft hover:text-navy-strong">
                CSR Partnership
              </Link>
            </li>
            <li>
              <Link href="/get-involved/careers" className="text-sm text-ink-soft hover:text-navy-strong">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">Stay updated</p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
          <ul className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
            <li>
              <a href={`tel:${trust.phone.replace(/\s+/g, "")}`} className="hover:text-navy-strong">
                {trust.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${trust.email}`} className="hover:text-navy-strong">
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
