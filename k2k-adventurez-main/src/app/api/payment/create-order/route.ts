import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const body = await req.json();
    const { amount, tripTitle, tripSlug, customerName, customerEmail, customerPhone, totalPayable, riders } = body;

    // amount is in INR, convert to paise for Razorpay
    const amountInPaise = Math.round(amount * 100);

    // Minimum ₹1 = 100 paise
    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: "Minimum payment amount is ₹1" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now().toString(36)}`,
      notes: {
        tripSlug: tripSlug?.substring(0, 40) || "",
        customerName: customerName?.substring(0, 40) || "",
        customerEmail: customerEmail?.substring(0, 40) || "",
        customerPhone: customerPhone?.substring(0, 20) || "",
        totalPayable: String(totalPayable),
        paidAmount: String(amount),
        remainingAmount: String(totalPayable - amount),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
