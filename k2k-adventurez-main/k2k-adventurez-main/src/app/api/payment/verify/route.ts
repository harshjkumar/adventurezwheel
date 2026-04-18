import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails,
    } = body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // Payment is verified — save booking to Supabase
    const supabase = createAdminSupabase();

    const { data, error } = await supabase.from("bookings").insert({
      user_id: bookingDetails.userId,
      trip_title: bookingDetails.tripTitle,
      trip_slug: bookingDetails.tripSlug,
      customer_name: bookingDetails.customerName,
      customer_email: bookingDetails.customerEmail,
      customer_phone: bookingDetails.customerPhone,
      departure_date: bookingDetails.departureDate,
      occupancy_rule: bookingDetails.occupancyRule,
      total_persons: bookingDetails.totalPersons,
      packages: bookingDetails.packages,
      riders: bookingDetails.riders,
      subtotal: bookingDetails.subtotal,
      gst: bookingDetails.gst,
      total_payable: bookingDetails.totalPayable,
      amount_paid: bookingDetails.amountPaid,
      remaining_amount: bookingDetails.remainingAmount,
      payment_type: bookingDetails.paymentType, // 'full' or 'partial'
      razorpay_order_id,
      razorpay_payment_id,
      payment_status: "paid",
      booking_status: bookingDetails.remainingAmount > 0 ? "partial_payment" : "confirmed",
      created_at: new Date().toISOString(),
    }).select().single();

    if (error) {
      console.error("Supabase insert error details:", JSON.stringify(error, null, 2));
      // Payment was successful even if DB insert fails
      // Return success with a note
      return NextResponse.json({
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        note: "Payment successful, but failed to save booking to database."
      });
    }

    return NextResponse.json({
      success: true,
      verified: true,
      dbSaved: true,
      bookingId: data?.id,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error: any) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
