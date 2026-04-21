ALTER TABLE trip_categories ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
