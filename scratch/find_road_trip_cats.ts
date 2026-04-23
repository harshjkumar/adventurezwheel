
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: trips, error } = await supabase
    .from('trips')
    .select('id, title, trip_tags(*)');

  if (error) {
    console.error(error);
    return;
  }

  const roadTripSubcats = new Set();
  for (const trip of trips) {
    const tags = trip.trip_tags || [];
    const isRoadTrip = tags.some(t => t.tag_type === 'category' && t.tag_value === 'Road Trip');
    if (isRoadTrip) {
      tags.filter(t => t.tag_type === 'subcategory').forEach(t => roadTripSubcats.add(t.tag_value));
    }
  }

  console.log('Road Trip Subcategories:', Array.from(roadTripSubcats));
}

run();
