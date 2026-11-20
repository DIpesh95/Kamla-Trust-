import Link from "next/link";
import Image from "next/image";
import { footerLinks, socialLinks } from "@/content/nav";
import { trust } from "@/content/trust";
import { isPlaceholder } from "@/content/types";
import { getInvolvedContact } from "@/content/get-involved";
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
    <footer className="border-t border-line bg-text text-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-14 px-6 py-24 sm:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="block w-44">
            <Image
              src="/images/logo-dark.png"
              alt={`${trust.legalName}: ${trust.tagline}`}
              width={1060}
              height={669}
              className="h-auto w-full"
            />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-surface/55">{trust.registeredOffice}</p>
          <div className="mt-7 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-surface/20 text-surface/70 transition-colors hover:border-secondary hover:text-secondary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-surface/50">Explore</p>
          <ul className="mt-5 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                  {link.label}
                </Link>
              </li>
            ))}
            {trust.wikipediaUrl && !isPlaceholder(trust.wikipediaUrl) ? (
              <li>
                <a
                  href={trust.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4"
                >
                  Wikipedia ↗
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-surface/50">Get involved</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <Link href="/get-involved" className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                Request Assistance
              </Link>
            </li>
            <li>
              <Link href="/get-involved/donate" className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                Donate
              </Link>
            </li>
            <li>
              <Link href="/get-involved/volunteer" className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/get-involved/csr-partnership" className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                CSR Partnership
              </Link>
            </li>
            <li>
              <Link href="/get-involved/careers" className="text-sm text-surface/75 transition-colors hover:text-secondary hover:underline underline-offset-4">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-surface/50">Stay updated</p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
          <ul className="mt-7 flex flex-col gap-3 text-sm text-surface/75">
            <li>
              <a href={`tel:${trust.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-secondary hover:underline underline-offset-4">
                {trust.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${getInvolvedContact.generalEmail}`} className="transition-colors hover:text-secondary hover:underline underline-offset-4">
                {getInvolvedContact.generalEmail}
              </a>
            </li>
            <li>
              <a href={`mailto:${getInvolvedContact.trusteeEmail}`} className="transition-colors hover:text-secondary hover:underline underline-offset-4">
                {getInvolvedContact.trusteeEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-surface/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {trust.legalName}. All rights reserved.
          </p>
          <p>{trust.orgType}</p>
        </div>
      </div>
    </footer>
  );
}
