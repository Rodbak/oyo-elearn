import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const idToken = formData.get("id_token");

  if (!idToken) {
    return NextResponse.json({ error: "Missing id_token" }, { status: 400 });
  }

  return NextResponse.redirect(
    new URL("/dashboard/student", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
  );
}
