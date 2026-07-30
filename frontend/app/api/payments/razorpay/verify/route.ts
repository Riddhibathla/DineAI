import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Razorpay is not configured." }, { status: 503 });
  }

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      (await request.json()) as Record<string, unknown>;
    if (
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payment verification request." }, { status: 400 });
    }

    const expectedSignature = createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const receivedSignature = Buffer.from(razorpay_signature, "utf8");
    const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf8");
    const verified =
      receivedSignature.length === expectedSignatureBuffer.length &&
      timingSafeEqual(receivedSignature, expectedSignatureBuffer);

    if (!verified) {
      return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ error: "Unable to verify payment." }, { status: 500 });
  }
}
