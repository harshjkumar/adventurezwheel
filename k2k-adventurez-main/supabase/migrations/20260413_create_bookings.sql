-- ============================================
-- Bookings & Razorpay Payment Tracking
-- Run each section separately if needed
-- ============================================

-- Step 1: Drop table if it partially exists
DROP TABLE IF EXISTS bookings CASCADE;

-- Step 2: Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_title TEXT NOT NULL,
  trip_slug TEXT NOT NULL,
  customer_name TEXT NOT NULL DEFAULT '',
  customer_email TEXT DEFAULT '',
  customer_phone TEXT DEFAULT '',
  departure_date TEXT,
  occupancy_rule TEXT DEFAULT 'DBL',
  total_persons INTEGER DEFAULT 1,
  packages JSONB DEFAULT '[]'::jsonb,
  riders JSONB DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12, 2) DEFAULT 0,
  gst NUMERIC(12, 2) DEFAULT 0,
  total_payable NUMERIC(12, 2) DEFAULT 0,
  amount_paid NUMERIC(12, 2) DEFAULT 0,
  remaining_amount NUMERIC(12, 2) DEFAULT 0,
  payment_type TEXT DEFAULT 'full',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  booking_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Step 4: Allow service role full access (used by API routes)
CREATE POLICY "Service role full access" ON bookings
  FOR ALL USING (true) WITH CHECK (true);

-- Step 5: Allow authenticated users to read their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.jwt() ->> 'email' = customer_email);

-- Step 6: Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_razorpay ON bookings(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
