"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="border-b border-line bg-surface px-6 py-3">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? "bg-brand text-white" : "text-ink-soft hover:bg-teal-tint hover:text-teal-strong"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
