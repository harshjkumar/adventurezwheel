
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('hero_slides').select('*');
  if (error) {
    console.error('Error fetching hero slides:', error);
    return;
  }
  console.log('Hero Slides:', JSON.stringify(data, null, 2));
}

run();
