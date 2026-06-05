import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const signature = req.headers.get("x-paystack-signature");
  if (!signature && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = await req.json();

  switch (event.event) {
    case "subscription.create":
    case "subscription.disable":
    case "charge.failed":
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
