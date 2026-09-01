"use client";

import { useState, type FormEvent } from "react";
import { trust } from "@/content/trust";

export function InquiryForm({
  subjectPrefix,
  submitLabel = "Send",
  includePhone = false,
}: {
  subjectPrefix: string;
  submitLabel?: string;
  includePhone?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `${subjectPrefix} — ${name || "New inquiry"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      includePhone ? `Phone: ${phone}` : null,
      "",
      message,
    ].filter((line) => line !== null);
    const mailto = `mailto:${trust.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n")
    )}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-rose"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-rose"
          />
        </label>
      </div>
      {includePhone ? (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink">Phone (optional)</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-rose"
          />
        </label>
      ) : null}
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink">Message</span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none focus:border-rose"
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-xs text-ink-soft">
          Opens your email app addressed to {trust.email} — a direct form submission isn&rsquo;t wired up yet.
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
