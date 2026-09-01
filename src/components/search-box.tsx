"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { search } from "@/lib/search-index";

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const results = search(query);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Search"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-rose-tint hover:text-rose-strong"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m20 20-4.8-4.8" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-line bg-surface p-3 shadow-xl">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, news…"
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-rose"
          />
          {query ? (
            <div className="mt-2 flex flex-col gap-0.5">
              {results.length ? (
                results.map((result) => (
                  <Link
                    key={`${result.title}-${result.href}`}
                    href={result.href}
                    onClick={close}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-rose-tint"
                  >
                    <span>{result.title}</span>
                    <span className="shrink-0 text-xs text-ink-soft">{result.category}</span>
                  </Link>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-ink-soft">No matches yet.</p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
