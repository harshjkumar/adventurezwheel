
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const targetSlugs = [
  'ultimate-tawang-expedition-8d7n',
  'ultimate-tawang-expedition-9d8n',
  'meghalaya-bike-expedition-standalone',
  'meghalaya-bike-expedition-with-kaziranga',
  'spiti-valley-circuit-expedition',
  'leh-to-leh-ladakh-bike-expedition',
  'vietnam-journey',
  'thailand-adventure',
  'bali-explorer'
];

async function fixDatabase() {
  console.log('--- STARTING DATABASE FIX ---');

  // 1. Fetch current trips
  const { data: currentTrips, error: fetchError } = await supabase.from('trips').select('id, slug, title');
  if (fetchError) {
    console.error('Error fetching trips:', fetchError);
    return;
  }

  const toDelete = currentTrips.filter(t => !targetSlugs.includes(t.slug));
  const deleteIds = toDelete.map(t => t.id);

  if (deleteIds.length > 0) {
    console.log(`Deleting ${deleteIds.length} extra trips:`, toDelete.map(t => t.slug));
    
    // Delete related data first
    await supabase.from('trip_pricing').delete().in('trip_id', deleteIds);
    await supabase.from('trip_itinerary').delete().in('trip_id', deleteIds);
    await supabase.from('trip_departures').delete().in('trip_id', deleteIds);
    await supabase.from('trip_tags').delete().in('trip_id', deleteIds);
    
    const { error: deleteError } = await supabase.from('trips').delete().in('id', deleteIds);
    if (deleteError) {
      console.error('Error deleting trips:', deleteError);
    } else {
      console.log('Successfully deleted extra trips.');
    }
  } else {
    console.log('No extra trips to delete.');
  }

  console.log('--- DATABASE FIX COMPLETE ---');
}

fixDatabase();
