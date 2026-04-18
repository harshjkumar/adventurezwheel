import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";
import {
  defaultTrips,
  defaultCategories,
} from "@/lib/data/trips";

/**
 * POST /api/seed/sync-trips
 * Syncs all local defaultTrips into Supabase.
 * - Upserts categories by slug
 * - Upserts trips by slug (insert if missing, update if existing)
 * - Replaces pricing, itinerary, and departures for each trip
 */
export async function POST() {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // ── 1. Ensure all categories exist ───────────────────────────
    const { data: existingCats } = await supabase
      .from("trip_categories")
      .select("id, slug");

    const catMap = new Map<string, string>();
    for (const cat of existingCats || []) {
      catMap.set(cat.slug, cat.id);
    }

    // Insert any missing categories
    for (const c of defaultCategories) {
      if (!catMap.has(c.slug)) {
        const { data: inserted, error } = await supabase
          .from("trip_categories")
          .insert({
            name: c.name,
            slug: c.slug,
            description: c.description,
            region: c.region,
            order: c.order,
            is_active: c.isActive,
          })
          .select("id, slug")
          .single();

        if (error) {
          results.push(`⚠️ Category ${c.slug}: ${error.message}`);
        } else if (inserted) {
          catMap.set(inserted.slug, inserted.id);
          results.push(`✅ Category added: ${c.slug}`);
        }
      }
    }

    // Build old categoryId → slug map
    const oldCatIdToSlug = new Map<string, string>();
    for (const c of defaultCategories) {
      oldCatIdToSlug.set(c.id, c.slug);
    }

    // ── 2. Upsert each trip ──────────────────────────────────────
    for (const trip of defaultTrips) {
      const catSlug = oldCatIdToSlug.get(trip.categoryId) || "";
      const categoryId = catMap.get(catSlug) || null;

      // Check if trip already exists by slug
      const { data: existing } = await supabase
        .from("trips")
        .select("id")
        .eq("slug", trip.slug)
        .maybeSingle();

      let tripId: string;

      if (existing) {
        // Update existing trip
        const { error: updateErr } = await supabase
          .from("trips")
          .update({
            category_id: categoryId,
            title: trip.title,
            display_title: trip.displayTitle,
            tagline: trip.tagline,
            description: trip.description,
            duration_days: trip.durationDays,
            duration_nights: trip.durationNights,
            max_altitude_ft: trip.maxAltitudeFt,
            difficulty: trip.difficulty,
            season: trip.season,
            region: trip.region,
            route: trip.route,
            start_location: trip.startLocation,
            end_location: trip.endLocation,
            total_distance: trip.totalDistance,
            terrain: trip.terrain,
            best_for: trip.bestFor,
            rating: trip.rating,
            review_count: trip.reviewCount,
            highlights: trip.highlights,
            inclusions: trip.inclusions,
            exclusions: trip.exclusions,
            cover_image: trip.coverImage,
            gallery_images: trip.galleryImages,
            is_featured: trip.isFeatured,
            is_active: trip.isActive,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (updateErr) {
          results.push(`❌ Trip update failed (${trip.slug}): ${updateErr.message}`);
          continue;
        }
        tripId = existing.id;
        results.push(`🔄 Trip updated: ${trip.slug}`);
      } else {
        // Insert new trip
        const { data: inserted, error: insertErr } = await supabase
          .from("trips")
          .insert({
            category_id: categoryId,
            title: trip.title,
            slug: trip.slug,
            display_title: trip.displayTitle,
            tagline: trip.tagline,
            description: trip.description,
            duration_days: trip.durationDays,
            duration_nights: trip.durationNights,
            max_altitude_ft: trip.maxAltitudeFt,
            difficulty: trip.difficulty,
            season: trip.season,
            region: trip.region,
            route: trip.route,
            start_location: trip.startLocation,
            end_location: trip.endLocation,
            total_distance: trip.totalDistance,
            terrain: trip.terrain,
            best_for: trip.bestFor,
            rating: trip.rating,
            review_count: trip.reviewCount,
            highlights: trip.highlights,
            inclusions: trip.inclusions,
            exclusions: trip.exclusions,
            cover_image: trip.coverImage,
            gallery_images: trip.galleryImages,
            is_featured: trip.isFeatured,
            is_active: trip.isActive,
          })
          .select("id")
          .single();

        if (insertErr) {
          results.push(`❌ Trip insert failed (${trip.slug}): ${insertErr.message}`);
          continue;
        }
        tripId = inserted!.id;
        results.push(`✅ Trip added: ${trip.slug}`);
      }

      // Replace pricing
      await supabase.from("trip_pricing").delete().eq("trip_id", tripId);
      if (trip.pricing.length) {
        const pricingRows = trip.pricing.map((p, i) => ({
          trip_id: tripId,
          label: p.label,
          price: p.price,
          order: i,
        }));
        const { error } = await supabase.from("trip_pricing").insert(pricingRows);
        if (error) results.push(`  ⚠️ pricing (${trip.slug}): ${error.message}`);
      }

      // Replace itinerary
      await supabase.from("trip_itinerary").delete().eq("trip_id", tripId);
      if (trip.itinerary.length) {
        const itRows = trip.itinerary.map((d) => ({
          trip_id: tripId,
          day: d.day,
          title: d.title,
          description: d.description,
          overnight: d.overnight || null,
          distance: d.distance || null,
          altitude: d.altitude || null,
        }));
        const { error } = await supabase.from("trip_itinerary").insert(itRows);
        if (error) results.push(`  ⚠️ itinerary (${trip.slug}): ${error.message}`);
      }

      // Replace departures
      await supabase.from("trip_departures").delete().eq("trip_id", tripId);
      if (trip.departures.length) {
        const depRows = trip.departures.map((d) => ({
          trip_id: tripId,
          start_date: d.startDate,
          end_date: d.endDate,
          available_seats: d.availableSeats,
          booked_seats: d.bookedSeats,
          status: d.status,
        }));
        const { error } = await supabase.from("trip_departures").insert(depRows);
        if (error) results.push(`  ⚠️ departures (${trip.slug}): ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${defaultTrips.length} trips`,
      details: results,
    });
  } catch (err: any) {
    console.error("Sync trips error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
