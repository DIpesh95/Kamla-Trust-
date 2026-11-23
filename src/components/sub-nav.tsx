"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="border-b border-line bg-soft-bg px-[22px] py-3 sm:px-10 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-wrap gap-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active ? "bg-primary text-surface" : "text-text-muted hover:bg-soft-bg hover:text-primary-strong"
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
