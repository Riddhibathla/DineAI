import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay test keys are not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const { amount, receipt } = (await request.json()) as {
      amount?: unknown;
      receipt?: unknown;
    };
    if (
      !Number.isSafeInteger(amount) ||
      typeof amount !== "number" ||
      amount < 100 ||
      typeof receipt !== "string" ||
      receipt.length === 0 ||
      receipt.length > 40
    ) {
      return NextResponse.json({ error: "Invalid payment request." }, { status: 400 });
    }

    const authorization = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency: "INR", receipt }),
      cache: "no-store",
    });

    if (!razorpayResponse.ok) {
      return NextResponse.json(
        { error: "Razorpay could not create the test order." },
        { status: 502 },
      );
    }

    const order = (await razorpayResponse.json()) as { id: string; amount: number; currency: string };
    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch {
    return NextResponse.json({ error: "Unable to create the payment order." }, { status: 500 });
  }
}
