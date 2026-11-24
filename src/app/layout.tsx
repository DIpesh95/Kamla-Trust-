import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site";

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  // "optional": the browser uses the fallback if Fraunces isn't ready almost immediately,
  // rather than swapping it in later. Fraunces is a variable font with exotic axes (opsz,
  // SOFT) whose glyph metrics next/font's automatic fallback-matching can't fully replicate,
  // so the default "swap" caused a small but real reflow (and visible content shift) once it
  // finished loading, a few seconds into every page view. This trades a rare, slow-connection
  // chance of keeping the serif fallback for eliminating that shift on every normal load.
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kamala Trust | Rising By Lifting Others",
    template: "%s | Kamala Trust",
  },
  description:
    "Kamala Ankibai Ghamandiram Gowani Trust, a Mumbai-based, women-led public charitable trust working in education, healthcare, women & child welfare, and rural livelihoods since 1969.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-text">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
