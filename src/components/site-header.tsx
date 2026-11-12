"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { primaryNav } from "@/content/nav";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { Logomark, Wordmark } from "./logomark";
import { PillarIcon } from "./pillar-icon";
import { SearchBox } from "./search-box";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 72);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !open;

  function closeMenuOnBlur(e: React.FocusEvent<HTMLDivElement>, label: string) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpenMenu((current) => (current === label ? null : current));
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "border-b border-line bg-surface/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 transition-colors duration-500 ${
            transparent ? "text-surface" : "text-text"
          }`}
        >
          <Logomark className={`h-7 w-7 ${transparent ? "text-surface" : "text-primary"}`} />
          <Wordmark className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isOurWork = item.label === "Our Work";
            const hasMenu = isOurWork || !!item.children;
            const isMenuOpen = openMenu === item.label;
            const panelVisibility = isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0";
            const linkColor = transparent ? "text-surface/90 hover:text-surface" : "text-text-muted hover:text-primary";

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasMenu && setOpenMenu(item.label)}
                onMouseLeave={() => hasMenu && setOpenMenu((current) => (current === item.label ? null : current))}
                onFocus={() => hasMenu && setOpenMenu(item.label)}
                onBlur={(e) => hasMenu && closeMenuOnBlur(e, item.label)}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpenMenu(null)}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors ${linkColor}`}
                >
                  {item.label}
                  {hasMenu ? (
                    <span aria-hidden="true" className="text-[9px] opacity-60">
                      &#9662;
                    </span>
                  ) : null}
                </Link>

                {isOurWork ? (
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 rounded-2xl border border-line bg-surface p-4 shadow-xl transition-all ${panelVisibility}`}
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {pillars.map((pillar) => {
                        const image = pillarImages[pillar.slug];
                        return (
                          <Link
                            key={pillar.slug}
                            href={`/our-work/${pillar.slug}`}
                            onClick={() => setOpenMenu(null)}
                            className="group/card flex flex-col overflow-hidden rounded-xl border border-line hover:border-primary/40"
                          >
                            <div className="relative flex h-20 w-full items-center justify-center bg-soft-bg">
                              {image ? (
                                <Image
                                  src={image.src}
                                  alt=""
                                  fill
                                  sizes="200px"
                                  className="object-cover transition-transform group-hover/card:scale-105"
                                />
                              ) : (
                                <PillarIcon slug={pillar.slug} className="h-8 w-8 text-primary" />
                              )}
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-medium text-text">{pillar.name}</p>
                              <p className="mt-0.5 text-xs text-text-muted">{pillar.initiatives.length} programs</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/our-work"
                      onClick={() => setOpenMenu(null)}
                      className="mt-3 block rounded-lg px-3 py-2 text-center text-sm font-semibold text-primary-strong hover:bg-soft-bg"
                    >
                      View all our work →
                    </Link>
                  </div>
                ) : item.children ? (
                  <div
                    className={`absolute left-0 top-full z-50 min-w-56 rounded-xl border border-line bg-surface p-1.5 shadow-lg transition-all ${panelVisibility}`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-soft-bg hover:text-primary-strong"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className={transparent ? "text-surface" : "text-text"}>
            <SearchBox />
          </span>
          <Link
            href="/get-involved/donate"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:bg-primary-strong sm:inline-flex"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              transparent ? "border-surface/40 text-surface" : "border-line text-text"
            }`}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {primaryNav.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text"
                  >
                    {item.label}
                  </Link>
                  {item.label === "Our Work" ? (
                    <div className="ml-3 flex flex-col border-l border-line pl-3">
                      {pillars.map((pillar) => (
                        <Link
                          key={pillar.slug}
                          href={`/our-work/${pillar.slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-text-muted"
                        >
                          {pillar.name}
                        </Link>
                      ))}
                    </div>
                  ) : item.children ? (
                    <div className="ml-3 flex flex-col border-l border-line pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-text-muted"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Link
                href="/get-involved/donate"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold uppercase tracking-[0.04em] text-surface"
              >
                Donate
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
