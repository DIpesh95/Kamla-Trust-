"use client";

import { useState, type FormEvent } from "react";
import { trust } from "@/content/trust";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.location.href = `mailto:${trust.email}?subject=${encodeURIComponent(
      "Newsletter signup"
    )}&body=${encodeURIComponent(`Please add ${email} to the Kamala Trust mailing list.`)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="min-w-0 flex-1 rounded-full border border-surface/20 bg-transparent px-4 py-2.5 text-sm text-surface placeholder:text-surface/40 outline-none focus:border-secondary"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong"
        >
          Subscribe
        </button>
      </div>
      <p className="text-xs text-surface/45">No mailing list is wired up yet. This opens an email to sign up manually.</p>
    </form>
  );
}
