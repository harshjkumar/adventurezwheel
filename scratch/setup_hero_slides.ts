import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function setup() {
  console.log('Fetching existing slides...');
  // We want to keep the homepage video slide if it exists
  const { data: homeSlides } = await supabase.from('hero_slides').select('*').eq('page', 'homepage').eq('media_type', 'video');
  
  console.log('Cleaning up non-homepage slides...');
  await supabase.from('hero_slides').delete().neq('page', 'homepage');

  console.log('Adding specific banners for Trips, About, and Contact...');
  const newSlides = [
    {
      title: 'Our Adventures',
      subtitle: 'Navigator by Soul',
      image: '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG',
      media_type: 'image',
      page: 'trips-page',
      is_active: true,
      order: 0,
      cta_text: 'Explore',
      cta_link: '/trips'
    },
    {
      title: 'Navigator by Soul',
      subtitle: 'About Us',
      image: '/c8adc763-a691-488d-ab1c-a2fdccda6380.jpg',
      media_type: 'image',
      page: 'about',
      is_active: true,
      order: 0,
      cta_text: 'Our Story',
      cta_link: '/about'
    },
    {
      title: "Let's Plan Your Journey",
      subtitle: 'Contact Us',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
      media_type: 'image',
      page: 'contact',
      is_active: true,
      order: 0,
      cta_text: 'Submit Enquiry',
      cta_link: '/contact'
    }
  ];

  const { error } = await supabase.from('hero_slides').insert(newSlides);
  if (error) console.error('Error adding slides:', error);
  else console.log('Successfully added page banners!');

  console.log('Done!');
}

setup();
