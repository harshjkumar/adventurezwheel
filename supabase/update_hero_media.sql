
-- Add media_type to hero_slides to support Video/Image
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Update any existing records to have media_type 'image' if null
UPDATE hero_slides SET media_type = 'image' WHERE media_type IS NULL;

-- Remove unwanted slides if they exist (hardcoded check or specific IDs if known)
-- For now, let's just make sure we have the column and let the user delete from UI.
