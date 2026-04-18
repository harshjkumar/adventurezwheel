-- 1. Safely add the user_id column back
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS user_id UUID;

-- 2. Link all existing orphaned bookings to their correct user_id based on email!
UPDATE bookings b
SET user_id = u.id
FROM auth.users u
WHERE b.customer_email = u.email;

-- 3. Update the RLS policy so users can securely read their own bookings
DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
CREATE POLICY "Users can read own bookings" ON bookings FOR SELECT USING (
  auth.uid() = user_id OR auth.jwt()->>'email' = customer_email
);
