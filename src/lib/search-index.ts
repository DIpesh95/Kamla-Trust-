import { pillars } from "@/content/pillars";
import { newsroom } from "@/content/newsroom";
import { flagshipPrograms } from "@/content/flagship-programs";

export type SearchResult = {
  title: string;
  category: string;
  href: string;
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const pillar of pillars) {
    results.push({ title: pillar.name, category: "Pillar", href: `/our-work/${pillar.slug}` });
    for (const initiative of pillar.initiatives) {
      results.push({ title: initiative.name, category: pillar.name, href: `/our-work/${pillar.slug}` });
    }
  }

  for (const program of flagshipPrograms) {
    results.push({ title: program.name, category: "Signature initiative", href: "/#signature-initiatives" });
  }

  for (const item of newsroom) {
    results.push({ title: item.title, category: item.kind, href: "/newsroom" });
  }

  return results;
}

export const searchIndex = buildIndex();

export function search(query: string, limit = 7): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex.filter((item) => item.title.toLowerCase().includes(q)).slice(0, limit);
}
