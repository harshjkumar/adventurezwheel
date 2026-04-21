-- =============================================
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Add parent_type to trip_categories for Domestic/International grouping
ALTER TABLE trip_categories ADD COLUMN IF NOT EXISTS parent_type TEXT DEFAULT 'domestic';

-- Set all existing categories as domestic (as confirmed)
UPDATE trip_categories SET parent_type = 'domestic' WHERE parent_type IS NULL;

-- 2. Add page field to hero_slides for page labeling
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS page TEXT DEFAULT 'homepage';

-- 3. Page Content table for admin-editable website content
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT UNIQUE NOT NULL,
  section TEXT NOT NULL DEFAULT 'general',
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read page_content" ON page_content;
CREATE POLICY "Public can read page_content" ON page_content
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage page_content" ON page_content;
CREATE POLICY "Service role can manage page_content" ON page_content
  FOR ALL USING (true);

-- 4. Seed initial page content entries
INSERT INTO page_content (page_key, section, content) VALUES
  ('homepage_hero', 'homepage', '{"title": "Adventures Wheel", "subtitle": "Explore the world with us", "cta_text": "Explore Now"}'),
  ('homepage_about', 'homepage', '{"title": "Why Choose Us", "description": "We create unforgettable adventure experiences"}'),
  ('homepage_cta', 'homepage', '{"title": "Ready for your next adventure?", "subtitle": "Join thousands of adventurers", "button_text": "Start Exploring"}'),
  ('domestic_page', 'domestic', '{"title": "Domestic Trips", "description": "Explore the beauty of India", "banner_text": "Discover India"}'),
  ('international_page', 'international', '{"title": "International Trips", "description": "Explore the world beyond borders", "banner_text": "Go Global"}'),
  ('contact_info', 'contact', '{"phone": "+91-7015760563", "email": "info@adventureswheel.com", "address": "India", "working_hours": "Mon-Sat 9AM-6PM", "map_label": "Our Location"}'),
  ('footer_info', 'footer', '{"company_name": "Adventures Wheel", "tagline": "Your adventure starts here", "copyright": "© 2026 Adventures Wheel. All rights reserved.", "instagram": "https://www.instagram.com/adventureswheel/", "facebook": "https://www.facebook.com/AdventuresWheel", "email": "explore@adventureswheel.com"}'),
  ('about_page', 'about', '{"title": "About Adventures Wheel", "story": "We are passionate about creating unforgettable adventure experiences.", "mission": "To make adventure travel accessible and memorable for everyone."}')
ON CONFLICT (page_key) DO NOTHING;

-- 5. Add is_featured flag to trip_categories for Navbar dropdown
ALTER TABLE trip_categories ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
