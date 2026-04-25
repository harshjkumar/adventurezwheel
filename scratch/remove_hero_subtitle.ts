
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { error } = await supabase
    .from('hero_slides')
    .update({ subtitle: '' })
    .eq('id', '5b9f0990-b4cf-4412-81f4-619a62e87f97');

  if (error) {
    console.error('Error updating hero slide:', error);
    return;
  }
  console.log('Successfully removed subtitle from hero slide.');
}

run();
