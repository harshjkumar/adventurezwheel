import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('section', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createAdminSupabase();
    const { id, content } = await request.json();
    
    const { data, error } = await supabase
      .from('page_content')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminSupabase();
    const { page_key, section, content } = await request.json();
    
    const { data, error } = await supabase
      .from('page_content')
      .upsert({ page_key, section, content, updated_at: new Date().toISOString() }, { onConflict: 'page_key' })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
