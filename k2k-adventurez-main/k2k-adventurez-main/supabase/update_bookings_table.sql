-- Run this in the Supabase SQL Editor to update the bookings table to the new schema

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS trip_title TEXT,
  ADD COLUMN IF NOT EXISTS trip_slug TEXT,
  ADD COLUMN IF NOT EXISTS customer_name TEXT,
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS customer_phone TEXT,
  ADD COLUMN IF NOT EXISTS departure_date TEXT,
  ADD COLUMN IF NOT EXISTS occupancy_rule TEXT,
  ADD COLUMN IF NOT EXISTS total_persons INT,
  ADD COLUMN IF NOT EXISTS packages JSONB,
  ADD COLUMN IF NOT EXISTS riders JSONB,
  ADD COLUMN IF NOT EXISTS subtotal INT,
  ADD COLUMN IF NOT EXISTS gst INT,
  ADD COLUMN IF NOT EXISTS total_payable INT,
  ADD COLUMN IF NOT EXISTS amount_paid INT,
  ADD COLUMN IF NOT EXISTS remaining_amount INT,
  ADD COLUMN IF NOT EXISTS payment_type TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS booking_status TEXT;


