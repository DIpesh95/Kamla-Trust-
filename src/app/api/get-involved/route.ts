import { NextResponse } from "next/server";
import { assistanceCategories } from "@/content/get-involved";

type GetInvolvedSubmission = {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  category: string;
  description: string;
};

function isValidSubmission(value: unknown): value is GetInvolvedSubmission {
  if (typeof value !== "object" || value === null) return false;
  const body = value as Record<string, unknown>;
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    body.email.trim().length > 0 &&
    typeof body.phone === "string" &&
    typeof body.state === "string" &&
    typeof body.city === "string" &&
    typeof body.category === "string" &&
    (assistanceCategories as readonly string[]).includes(body.category) &&
    typeof body.description === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidSubmission(body)) {
    return NextResponse.json({ error: "Missing or invalid required fields." }, { status: 400 });
  }

  // TODO: this only logs the submission server-side. Wire this up to a real email service
  // (e.g. Resend, SendGrid, or SMTP) or a database before relying on it in production, so
  // submissions actually reach the trust rather than only appearing in server logs.
  console.log("[get-involved] New assistance request:", body);

  return NextResponse.json({ ok: true });
}
