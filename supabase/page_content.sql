-- Page Content table for admin-editable website content
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT UNIQUE NOT NULL,
  section TEXT NOT NULL DEFAULT 'general',
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can read page_content" ON page_content
  FOR SELECT USING (true);

-- Allow service role full access  
CREATE POLICY "Service role can manage page_content" ON page_content
  FOR ALL USING (true);

-- Seed initial page content entries
INSERT INTO page_content (page_key, section, content) VALUES
  ('homepage_hero', 'homepage', '{"title": "Adventures Wheel", "subtitle": "Explore the world with us", "cta_text": "Explore Now"}'),
  ('homepage_about', 'homepage', '{"title": "Why Choose Us", "description": "We create unforgettable adventure experiences"}'),
  ('contact_info', 'contact', '{"phone": "+91-7015760563", "email": "info@adventureswheel.com", "address": "India", "working_hours": "Mon-Sat 9AM-6PM"}'),
  ('footer_info', 'footer', '{"company_name": "Adventures Wheel", "tagline": "Your adventure starts here"}'),
  ('about_page', 'about', '{"title": "About Adventures Wheel", "story": "We are passionate about creating unforgettable adventure experiences."}')
ON CONFLICT (page_key) DO NOTHING;
