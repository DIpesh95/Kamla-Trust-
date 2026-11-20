"use client";

import { useState, type FormEvent } from "react";
import { assistanceCategories } from "@/content/get-involved";

type Status = "idle" | "submitting" | "success" | "error";

export function GetInvolvedForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<string>(assistanceCategories[0]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, state, city, category, description }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setState("");
      setCity("");
      setCategory(assistanceCategories[0]);
      setDescription("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-2 rounded-sm border border-good/40 bg-good/10 p-6">
        <p className="font-semibold text-good">Request received</p>
        <p className="text-sm text-text-muted">
          Thank you, we&rsquo;ve noted your request and will route it to the relevant team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-sm border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">Contact number</span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-text">Email address</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">State</span>
          <input
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-text">City</span>
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-text">Category of assistance</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
        >
          {assistanceCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-text">Tell us about your requirement</span>
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none rounded-sm border border-line bg-soft-bg px-3.5 py-2.5 text-text outline-none focus:border-primary"
        />
      </label>

      {status === "error" ? (
        <p className="text-sm font-medium text-warn">
          Something went wrong submitting this. Please try again, or email us directly.
        </p>
      ) : null}

      <div className="flex items-center justify-end pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:bg-primary-strong disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit request"}
        </button>
      </div>
    </form>
  );
}
