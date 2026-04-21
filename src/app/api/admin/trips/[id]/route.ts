import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

// GET /api/admin/trips/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from('trips')
      .select('*, trip_pricing(*), trip_itinerary(*), trip_departures(*), trip_categories(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/admin/trips/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabase();
    const body = await req.json();
    const { pricing, itinerary, departures, trip_pricing, trip_itinerary, trip_departures, trip_categories, ...tripData } = body;

    tripData.updated_at = new Date().toISOString();
    const { data: trip, error: tripError } = await supabase
      .from('trips').update(tripData).eq('id', id).select().single();

    if (tripError) throw tripError;

    if (pricing) {
      await supabase.from('trip_pricing').delete().eq('trip_id', id);
      if (pricing.length) {
        const rows = pricing.map((p: any, i: number) => ({
          trip_id: id, label: p.label, price: p.price, description: p.description || null, order: i,
        }));
        await supabase.from('trip_pricing').insert(rows);
      }
    }

    if (itinerary) {
      await supabase.from('trip_itinerary').delete().eq('trip_id', id);
      if (itinerary.length) {
        const rows = itinerary.map((d: any) => ({
          trip_id: id, day: d.day, title: d.title, description: d.description,
          overnight: d.overnight || null, distance: d.distance || null, altitude: d.altitude || null,
          highlights: d.highlights || [],
        }));
        await supabase.from('trip_itinerary').insert(rows);
      }
    }

    if (departures) {
      await supabase.from('trip_departures').delete().eq('trip_id', id);
      if (departures.length) {
        const rows = departures.map((d: any) => ({
          trip_id: id, start_date: d.start_date, end_date: d.end_date,
          available_seats: d.available_seats || 20, booked_seats: d.booked_seats || 0,
          status: d.status || 'available',
        }));
        await supabase.from('trip_departures').insert(rows);
      }
    }

    return NextResponse.json(trip);
  } catch (err: any) {
    console.error('Trip update error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/admin/trips/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = createAdminSupabase();
    const { error } = await supabase
      .from('trips').update({ is_active: false, updated_at: new Date().toISOString() }).eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
