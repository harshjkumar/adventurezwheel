import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const INTERNATIONAL_CAT_SLUGS = ['vietnam', 'thailand', 'bali', 'international'];

async function cleanupTrips() {
  console.log('Fetching all trips...');
  const { data: allTrips, error: fetchError } = await supabase
    .from('trips')
    .select('id, created_at, trip_categories(slug)')
    .order('created_at', { ascending: false });

  if (fetchError) {
    console.error('Error fetching trips:', fetchError);
    return;
  }

  const internationalTrips = allTrips.filter(t => {
    const cat = t.trip_categories as any;
    return cat && INTERNATIONAL_CAT_SLUGS.includes(cat.slug);
  });
  
  const domesticTrips = allTrips.filter(t => {
    const cat = t.trip_categories as any;
    return !cat || !INTERNATIONAL_CAT_SLUGS.includes(cat.slug);
  });

  const keepDomestic = domesticTrips.slice(0, 6);
  const keepInternational = internationalTrips.slice(0, 3);
  
  const keepIds = [...keepDomestic, ...keepInternational].map(t => t.id);

  console.log(`Keeping ${keepDomestic.length} domestic and ${keepInternational.length} international trips.`);
  console.log(`Domestic to keep: ${keepDomestic.map(t => t.id).join(', ')}`);
  console.log(`International to keep: ${keepInternational.map(t => t.id).join(', ')}`);

  const deleteIds = allTrips.filter(t => !keepIds.includes(t.id)).map(t => t.id);

  if (deleteIds.length === 0) {
    console.log('No trips to delete.');
    return;
  }

  console.log(`Deleting ${deleteIds.length} trips...`);
  const { error: deleteError } = await supabase
    .from('trips')
    .delete()
    .in('id', deleteIds);

  if (deleteError) {
    console.error('Error deleting trips:', deleteError);
  } else {
    console.log('Successfully cleaned up trips database!');
  }
}

cleanupTrips();
