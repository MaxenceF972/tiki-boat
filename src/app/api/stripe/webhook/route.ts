import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    // TODO: save reservation to database
    console.log("New reservation:", {
      sessionId: session.id,
      excursion: meta.excursionTitle,
      date: meta.date,
      customer: meta.customerName,
      email: session.customer_email,
      totalPrice: meta.totalPrice,
      paymentType: meta.paymentType,
    });

    // TODO: send confirmation email
  }

  return NextResponse.json({ received: true });
}
