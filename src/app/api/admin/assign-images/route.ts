import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // Update Tawang trips with generated image
    const { error: e1 } = await supabase.from('trips')
      .update({ cover_image: '/tawang-hero.png', hero_image: '/tawang-hero.png' })
      .eq('slug', 'ultimate-tawang-expedition-9d8n');
    if (e1) throw e1;
    results.push('✅ Tawang 9D/8N image set');

    const { error: e2 } = await supabase.from('trips')
      .update({ cover_image: '/tawang-hero.png', hero_image: '/tawang-hero.png' })
      .eq('slug', 'ultimate-tawang-expedition-8d7n');
    if (e2) throw e2;
    results.push('✅ Tawang 8D/7N image set');

    // Update international trips with generated images + mark as coming soon
    const { error: e3 } = await supabase.from('trips')
      .update({ cover_image: '/vietnam-hero.png', hero_image: '/vietnam-hero.png', badge: 'Coming Soon' })
      .eq('slug', 'vietnam-journey');
    if (e3) throw e3;
    results.push('✅ Vietnam image set');

    const { error: e4 } = await supabase.from('trips')
      .update({ cover_image: '/thailand-hero.png', hero_image: '/thailand-hero.png', badge: 'Coming Soon' })
      .eq('slug', 'thailand-adventure');
    if (e4) throw e4;
    results.push('✅ Thailand image set');

    const { error: e5 } = await supabase.from('trips')
      .update({ cover_image: '/bali-hero.png', hero_image: '/bali-hero.png', badge: 'Coming Soon' })
      .eq('slug', 'bali-explorer');
    if (e5) throw e5;
    results.push('✅ Bali image set');

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
