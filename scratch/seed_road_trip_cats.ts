
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const roadTripSubcats = ['Meghalaya', 'Spiti', 'Tawang', 'Leh'];
  
  for (const name of roadTripSubcats) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    
    // Check if it exists as road-trip
    const { data: existing } = await supabase
      .from('trip_categories')
      .select('*')
      .eq('name', name)
      .eq('parent_type', 'road-trip')
      .single();

    if (!existing) {
      console.log(`Adding ${name} to Road Trip...`);
      const { error } = await supabase
        .from('trip_categories')
        .insert({
          name: name,
          slug: `${slug}-road-trip`,
          parent_type: 'road-trip',
          is_active: true,
          order: 0,
          description: `${name} Road Trip adventures.`
        });
      if (error) console.error(error);
    } else {
      console.log(`${name} already exists in Road Trip.`);
    }
  }
}

run();
