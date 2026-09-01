"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { primaryNav } from "@/content/nav";
import { logo } from "@/content/media";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { SearchBox } from "./search-box";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const isOurWork = item.label === "Our Work";
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-teal-tint hover:text-teal-strong"
                >
                  {item.label}
                  {item.children || isOurWork ? (
                    <span aria-hidden="true" className="text-[10px] text-ink-soft/60">
                      ▾
                    </span>
                  ) : null}
                </Link>

                {isOurWork ? (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 -translate-y-1 rounded-2xl border border-line bg-surface p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="grid grid-cols-3 gap-2">
                      {pillars.map((pillar) => {
                        const image = pillarImages[pillar.slug];
                        return (
                          <Link
                            key={pillar.slug}
                            href={`/our-work/${pillar.slug}`}
                            className="group/card flex flex-col overflow-hidden rounded-xl border border-line hover:border-teal/40"
                          >
                            <div className="relative h-20 w-full bg-teal-tint">
                              {image ? (
                                <Image
                                  src={image.src}
                                  alt=""
                                  fill
                                  sizes="200px"
                                  className="object-cover transition-transform group-hover/card:scale-105"
                                />
                              ) : null}
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-medium text-ink">{pillar.name}</p>
                              <p className="mt-0.5 text-xs text-ink-soft">{pillar.initiatives.length} programs</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <Link
                      href="/our-work"
                      className="mt-3 block rounded-lg px-3 py-2 text-center text-sm font-semibold text-teal-strong hover:bg-teal-tint"
                    >
                      View all our work →
                    </Link>
                  </div>
                ) : item.children ? (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 -translate-y-1 rounded-xl border border-line bg-surface p-1.5 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-teal-tint hover:text-teal-strong"
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
          <SearchBox />
          <Link
            href="/get-involved/donate"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong sm:inline-flex"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-surface px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink"
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
                        className="rounded-lg px-3 py-2 text-sm text-ink-soft"
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
                        className="rounded-lg px-3 py-2 text-sm text-ink-soft"
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
              className="mt-2 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Donate
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
