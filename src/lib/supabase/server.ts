import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using the anon key.
 * Use for server components that need RLS-respecting queries.
 */
export function createServerSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Admin client using the service role key — bypasses RLS.
 * Use ONLY in server-side API routes / admin operations.
 */
export function createAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
