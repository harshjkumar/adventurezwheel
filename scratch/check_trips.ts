
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkTrips() {
  const { data, error } = await supabase
    .from('trips')
    .select('id, title, slug, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    fs.writeFileSync('scratch/trips_output.txt', 'Error fetching trips: ' + error.message);
    return;
  }

  let output = '--- CURRENT TRIPS IN DATABASE ---\n';
  data.forEach(trip => {
    output += `[${trip.created_at}] ${trip.title} (${trip.slug}) - ID: ${trip.id}\n`;
  });
  output += `Total: ${data.length}\n`;
  fs.writeFileSync('scratch/trips_output.txt', output);
  console.log('Output written to scratch/trips_output.txt');
}

checkTrips();
