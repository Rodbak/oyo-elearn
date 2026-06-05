import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  switch (true) {
    case body.includes("customer.subscription.created"):
    case body.includes("customer.subscription.deleted"):
    case body.includes("invoice.payment_failed"):
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
