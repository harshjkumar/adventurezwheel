'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Star, StarOff, ArrowUp, ArrowDown, Save, GripVertical, Search } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  slug: string;
  hero_image: string | null;
  cover_image: string | null;
  is_featured: boolean;
  featured_order: number | null;
  is_active: boolean;
  duration_days: number;
  duration_nights: number;
  region: string;
  badge: string;
  trip_pricing: { price: number }[];
  trip_categories: { name: string } | null;
}

export default function FeaturedTripsPage() {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/featured-trips');
      const data = await res.json();
      setAllTrips(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);

  const featuredTrips = allTrips
    .filter((t) => t.is_featured)
    .sort((a, b) => (a.featured_order ?? 999) - (b.featured_order ?? 999));

  const nonFeaturedTrips = allTrips
    .filter((t) => !t.is_featured)
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.region?.toLowerCase().includes(search.toLowerCase()) ||
      t.slug?.toLowerCase().includes(search.toLowerCase())
    );

  const addToFeatured = (tripId: string) => {
    setAllTrips((prev) => {
      const maxOrder = Math.max(0, ...prev.filter((t) => t.is_featured).map((t) => t.featured_order ?? 0));
      return prev.map((t) =>
        t.id === tripId ? { ...t, is_featured: true, featured_order: maxOrder + 1 } : t
      );
    });
    setHasChanges(true);
  };

  const removeFromFeatured = (tripId: string) => {
    setAllTrips((prev) => {
      const updated = prev.map((t) =>
        t.id === tripId ? { ...t, is_featured: false, featured_order: null } : t
      );
      // Re-order remaining featured trips
      let order = 1;
      return updated.map((t) => {
        if (t.is_featured) {
          return { ...t, featured_order: order++ };
        }
        return t;
      });
    });
    setHasChanges(true);
  };

  const moveUp = (tripId: string) => {
    const idx = featuredTrips.findIndex((t) => t.id === tripId);
    if (idx <= 0) return;
    const prev = featuredTrips[idx - 1];
    setAllTrips((trips) =>
      trips.map((t) => {
        if (t.id === tripId) return { ...t, featured_order: prev.featured_order };
        if (t.id === prev.id) return { ...t, featured_order: featuredTrips[idx].featured_order };
        return t;
      })
    );
    setHasChanges(true);
  };

  const moveDown = (tripId: string) => {
    const idx = featuredTrips.findIndex((t) => t.id === tripId);
    if (idx >= featuredTrips.length - 1) return;
    const next = featuredTrips[idx + 1];
    setAllTrips((trips) =>
      trips.map((t) => {
        if (t.id === tripId) return { ...t, featured_order: next.featured_order };
        if (t.id === next.id) return { ...t, featured_order: featuredTrips[idx].featured_order };
        return t;
      })
    );
    setHasChanges(true);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const updates = allTrips.map((t) => ({
        id: t.id,
        is_featured: t.is_featured,
        featured_order: t.is_featured ? t.featured_order : null,
      }));

      const res = await fetch('/api/admin/featured-trips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });

      if (!res.ok) throw new Error('Save failed');
      setHasChanges(false);
      alert('Featured trips updated!');
      await fetchTrips();
    } catch (err: any) {
      alert(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const getMinPrice = (t: Trip) => {
    if (!t.trip_pricing?.length) return '—';
    const min = Math.min(...t.trip_pricing.map((p) => p.price));
    return `₹${min.toLocaleString('en-IN')}`;
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading trips...</div>;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Featured Adventures</h1>
          <p className="text-sm text-slate-400 mt-1">Manage which trips appear on the homepage &amp; their display order.</p>
        </div>
        <button
          onClick={saveChanges}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            hasChanges
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Currently Featured */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Star size={18} className="text-amber-500 fill-amber-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Currently Featured ({featuredTrips.length})
          </h2>
          <span className="text-xs text-slate-400 ml-auto">Drag or use arrows to re-order. Top = first on homepage.</span>
        </div>

        {featuredTrips.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center text-amber-700 text-sm">
            No featured trips yet. Add trips from the list below.
          </div>
        ) : (
          <div className="space-y-2">
            {featuredTrips.map((trip, idx) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow group"
              >
                {/* Rank number */}
                <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
                  <span className="text-2xl font-bold text-emerald-600 font-[family-name:var(--font-heading)]">
                    #{idx + 1}
                  </span>
                </div>

                {/* Up/Down arrows */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveUp(trip.id)}
                    disabled={idx === 0}
                    className={`p-1 rounded transition-colors ${
                      idx === 0
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => moveDown(trip.id)}
                    disabled={idx === featuredTrips.length - 1}
                    className={`p-1 rounded transition-colors ${
                      idx === featuredTrips.length - 1
                        ? 'text-gray-200 cursor-not-allowed'
                        : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                {/* Image */}
                <div className="relative h-14 w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {(trip.hero_image || trip.cover_image) && (
                    <Image
                      src={trip.hero_image || trip.cover_image || ''}
                      alt={trip.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-800 truncate">{trip.title}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-400">{trip.duration_days}D/{trip.duration_nights}N</span>
                    {trip.region && <span className="text-xs text-slate-400">• {trip.region}</span>}
                    {trip.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                        {trip.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <span className="text-sm font-semibold text-slate-700">{getMinPrice(trip)}</span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromFeatured(trip.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                >
                  <StarOff size={14} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Available Trips */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700">All Available Trips</h2>
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search trips..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
            />
          </div>
        </div>

        {nonFeaturedTrips.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-slate-400 text-sm">
            {search ? 'No matching trips found.' : 'All trips are already featured!'}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
                  <th className="text-left p-4">Trip</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Region</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-right p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {nonFeaturedTrips.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                          {(t.hero_image || t.cover_image) && (
                            <Image
                              src={t.hero_image || t.cover_image || ''}
                              alt={t.title}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-slate-800">{t.title}</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">/{t.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">{t.trip_categories?.name || '—'}</td>
                    <td className="p-4 text-slate-500">{t.region || '—'}</td>
                    <td className="p-4 text-slate-500">{t.duration_days}D</td>
                    <td className="p-4 font-medium text-slate-700">{getMinPrice(t)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => addToFeatured(t.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <Star size={14} /> Feature
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
