
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) {
    fs.writeFileSync('scratch/settings_error.txt', error.message);
    return;
  }
  fs.writeFileSync('scratch/settings_output.json', JSON.stringify(data, null, 2));
}

run();
