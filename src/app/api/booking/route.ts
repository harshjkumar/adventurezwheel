import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

// POST /api/booking — public booking creation
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminSupabase();
    const body = await req.json();

    // Generate booking ID
    const bookingId = `AW-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    const bookingData = {
      booking_id: bookingId,
      trip_id: body.trip_id || null,
      trip_title: body.trip_title,
      trip_slug: body.trip_slug,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      departure_date: body.departure_date,
      occupancy_rule: body.occupancy_rule,
      total_persons: body.total_persons || 1,
      packages: body.packages || null,
      riders: body.riders || null,
      subtotal: body.subtotal || 0,
      gst: body.gst || 0,
      total_payable: body.total_payable || 0,
      amount_paid: body.amount_paid || 0,
      remaining_amount: body.remaining_amount || 0,
      payment_type: body.payment_type || 'full',
      razorpay_order_id: body.razorpay_order_id || null,
      razorpay_payment_id: body.razorpay_payment_id || null,
      booking_status: body.amount_paid >= body.total_payable ? 'confirmed' : 'partial_payment',
      payment_status: body.amount_paid >= body.total_payable ? 'paid' : 'partial',
      notes: body.notes || null,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, booking: data }, { status: 201 });
  } catch (err: any) {
    console.error('Booking creation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
