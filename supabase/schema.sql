-- ============================================================
-- ADVENTURES WHEEL — COMPLETE DATABASE SCHEMA
-- Run this SQL in the Supabase SQL Editor
-- ============================================================

-- ─── Hero Slides ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image TEXT NOT NULL,
  cta_text TEXT DEFAULT 'Explore',
  cta_link TEXT DEFAULT '/trips',
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Stats / Counters ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT DEFAULT 'mountain',
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── How It Works ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS how_it_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'search',
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Testimonials ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar TEXT,
  rating INT NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  trip_reference TEXT,
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Trip Categories ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trip_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'mountain',
  region TEXT,
  cover_image TEXT,
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Trips ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES trip_categories(id),
  title TEXT NOT NULL,
  display_title TEXT,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  category_label TEXT,
  badge TEXT,
  duration_days INT NOT NULL DEFAULT 1,
  duration_nights INT NOT NULL DEFAULT 0,
  max_altitude_ft INT,
  difficulty TEXT NOT NULL DEFAULT 'moderate',
  group_size TEXT,
  season TEXT,
  region TEXT,
  route TEXT,
  start_location TEXT,
  end_location TEXT,
  total_distance TEXT,
  terrain TEXT,
  best_for TEXT,
  rating NUMERIC(2,1) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  highlights TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  cover_image TEXT,
  hero_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  meals_included TEXT,
  contact_phone TEXT DEFAULT '+91-7015760563',
  contact_email TEXT DEFAULT 'explore@adventureswheel.com',
  contact_instagram TEXT DEFAULT 'adventures_wheel_travel',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_order INT DEFAULT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Trip Pricing ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trip_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price INT NOT NULL,
  description TEXT,
  "order" INT NOT NULL DEFAULT 0
);

-- ─── Trip Itinerary ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trip_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  overnight TEXT,
  distance TEXT,
  altitude TEXT,
  highlights TEXT[] DEFAULT '{}'
);

-- ─── Trip Departures ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trip_departures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  available_seats INT NOT NULL DEFAULT 20,
  booked_seats INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available'
);

-- ─── Enquiries ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  trip_interest TEXT,
  group_size TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Bookings ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id TEXT UNIQUE,
  trip_id UUID REFERENCES trips(id),
  trip_title TEXT,
  trip_slug TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  departure_date TEXT,
  occupancy_rule TEXT,
  total_persons INT DEFAULT 1,
  packages JSONB,
  riders JSONB,
  subtotal INT DEFAULT 0,
  gst INT DEFAULT 0,
  total_payable INT NOT NULL DEFAULT 0,
  amount_paid INT DEFAULT 0,
  remaining_amount INT DEFAULT 0,
  payment_type TEXT DEFAULT 'full',
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  booking_status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Blog Posts ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Adventures Wheel',
  author_avatar TEXT DEFAULT '/logo/Artboard 1@3x-8.png',
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  read_time INT DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Gallery Images ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  src TEXT NOT NULL,
  alt TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  caption TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── FAQ Items ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "order" INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Site Settings (key-value) ───────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Row-Level Security
-- ============================================================
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE how_it_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_departures ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ─── Public read policies ────────────────────────────────────
CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Public read stats" ON stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public read how_it_works" ON how_it_works FOR SELECT USING (is_active = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read trip_categories" ON trip_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read trips" ON trips FOR SELECT USING (is_active = true);
CREATE POLICY "Public read trip_pricing" ON trip_pricing FOR SELECT USING (true);
CREATE POLICY "Public read trip_itinerary" ON trip_itinerary FOR SELECT USING (true);
CREATE POLICY "Public read trip_departures" ON trip_departures FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read gallery_images" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faq_items" ON faq_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Allow public to submit enquiries
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Allow public to create bookings
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
