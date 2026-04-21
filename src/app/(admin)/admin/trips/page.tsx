'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  slug: string;
  region: string;
  difficulty: string;
  is_active: boolean;
  is_featured: boolean;
  duration_days: number;
  trip_categories: { name: string } | null;
  trip_pricing: { price: number }[];
}

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/trips');
      const data = await res.json();
      setTrips(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/trips/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !isActive }),
    });
    fetchTrips();
  };

  const deleteTrip = async (id: string) => {
    if (!confirm('Deactivate this trip?')) return;
    await fetch(`/api/admin/trips/${id}`, { method: 'DELETE' });
    fetchTrips();
  };

  const filtered = trips.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.region?.toLowerCase().includes(search.toLowerCase()) ||
    t.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const getMinPrice = (t: Trip) => {
    if (!t.trip_pricing?.length) return '—';
    const min = Math.min(...t.trip_pricing.map((p) => p.price));
    return `₹${min.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Trips</h1>
        <Link
          href="/admin/trips/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus size={16} /> New Trip
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading trips...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
                <th className="text-left p-4">Trip</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Region</th>
                <th className="text-left p-4">Duration</th>
                <th className="text-left p-4">Price From</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <Link href={`/admin/trips/${t.id}`} className="font-medium text-slate-800 hover:text-emerald-600 transition-colors">
                      {t.title}
                    </Link>
                    <p className="text-[10px] text-slate-400 mt-0.5">/{t.slug}</p>
                  </td>
                  <td className="p-4 text-slate-500">{t.trip_categories?.name || '—'}</td>
                  <td className="p-4 text-slate-500">{t.region || '—'}</td>
                  <td className="p-4 text-slate-500">{t.duration_days}D</td>
                  <td className="p-4 font-medium text-slate-700">{getMinPrice(t)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                      t.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {t.is_active ? 'Active' : 'Inactive'}
                    </span>
                    {t.is_featured && (
                      <span className="ml-1 inline-flex px-2 py-1 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700">Featured</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/trips/${t.id}`} className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors">
                        <Edit size={14} />
                      </Link>
                      <button onClick={() => toggleActive(t.id, t.is_active)} className="p-1.5 rounded hover:bg-gray-100 text-slate-400 hover:text-slate-600 transition-colors">
                        {t.is_active ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => deleteTrip(t.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-12 text-center text-slate-400">No trips found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
