
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkCategories() {
  const { data, error } = await supabase
    .from('trip_categories')
    .select('id, name, slug, parent_type');

  if (error) {
    console.error('Error fetching categories:', error);
    return;
  }

  console.log('--- TRIP CATEGORIES ---');
  data.forEach(cat => {
    console.log(`[${cat.parent_type}] ${cat.name} (${cat.slug}) - ID: ${cat.id}`);
  });
}

checkCategories();
