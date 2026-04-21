'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CreditCard, Eye, Search } from 'lucide-react';

interface Booking {
  id: string; booking_id: string; trip_title: string; customer_name: string;
  customer_email: string; customer_phone: string; departure_date: string;
  total_persons: number; total_payable: number; amount_paid: number;
  remaining_amount: number; booking_status: string; payment_status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-emerald-50 text-emerald-700',
  partial_payment: 'bg-amber-50 text-amber-700',
  pending: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/bookings');
    setBookings(await res.json());
    setLoading(false);
  };

  const filtered = bookings.filter(b =>
    b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    b.booking_id?.toLowerCase().includes(search.toLowerCase()) ||
    b.trip_title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Bookings</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CreditCard size={16} /> {bookings.length} total
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none" />
      </div>

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
              <th className="text-left p-4">Booking ID</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Trip</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-mono text-xs text-slate-600">{b.booking_id || b.id.slice(0,8)}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{b.customer_name}</p>
                    <p className="text-[10px] text-slate-400">{b.customer_email}</p>
                  </td>
                  <td className="p-4 text-slate-500">{b.trip_title || '—'}</td>
                  <td className="p-4 text-slate-500 text-xs">{b.departure_date || '—'}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-700">₹{(b.amount_paid || 0).toLocaleString('en-IN')}</p>
                    {b.remaining_amount > 0 && <p className="text-[10px] text-amber-600">Due: ₹{b.remaining_amount.toLocaleString('en-IN')}</p>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${STATUS_COLORS[b.booking_status] || 'bg-gray-100 text-gray-600'}`}>
                      {b.booking_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/bookings/${b.id}`} className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 inline-flex"><Eye size={14} /></Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-slate-400">No bookings found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
