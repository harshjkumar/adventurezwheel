-- Trip Tags: Multi-category system for trips
-- Each trip can have multiple categories (Domestic, International, Road Trip)
-- and multiple subcategories (Leh, Spiti, Meghalaya, Tawang, etc.)

CREATE TABLE IF NOT EXISTS trip_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  tag_type TEXT NOT NULL CHECK (tag_type IN ('category', 'subcategory')),
  tag_value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, tag_type, tag_value)
);

-- Enable RLS
ALTER TABLE trip_tags ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read trip_tags" ON trip_tags FOR SELECT USING (true);
CREATE POLICY "Admin can manage trip_tags" ON trip_tags FOR ALL USING (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_trip_tags_trip_id ON trip_tags(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_tags_type_value ON trip_tags(tag_type, tag_value);
