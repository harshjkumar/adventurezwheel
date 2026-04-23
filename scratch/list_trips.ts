import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function listAllTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('id, title, slug, created_at, trip_categories(name, slug)')
    .order('created_at', { ascending: false });

  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

listAllTrips();
