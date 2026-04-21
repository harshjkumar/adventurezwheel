'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBooking(); }, []);

  const fetchBooking = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/bookings/${id}`);
    setBooking(await res.json());
    setLoading(false);
  };

  const updateBooking = async (updates: any) => {
    setSaving(true);
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    fetchBooking();
    setSaving(false);
    alert('Booking updated!');
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading...</div>;
  if (!booking) return <div className="py-20 text-center text-red-400">Booking not found</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/admin/bookings')} className="p-2 rounded hover:bg-gray-100 text-slate-400"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Booking Detail</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">{booking.booking_id || booking.id}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Customer</p><p className="text-slate-800 font-medium">{booking.customer_name}</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email</p><p className="text-slate-800">{booking.customer_email}</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Phone</p><p className="text-slate-800">{booking.customer_phone || '—'}</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Trip</p><p className="text-emerald-600 font-medium">{booking.trip_title || '—'}</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Departure Date</p><p className="text-slate-800">{booking.departure_date || '—'}</p></div>
          <div><p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Persons</p><p className="text-slate-800">{booking.total_persons || 1}</p></div>
        </div>

        <hr className="border-gray-100" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg"><p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total Payable</p><p className="text-lg font-bold text-slate-800">₹{(booking.total_payable || 0).toLocaleString('en-IN')}</p></div>
          <div className="bg-emerald-50 p-4 rounded-lg"><p className="text-[10px] text-emerald-600 uppercase tracking-wider mb-1">Amount Paid</p><p className="text-lg font-bold text-emerald-700">₹{(booking.amount_paid || 0).toLocaleString('en-IN')}</p></div>
          <div className="bg-amber-50 p-4 rounded-lg"><p className="text-[10px] text-amber-600 uppercase tracking-wider mb-1">Remaining</p><p className="text-lg font-bold text-amber-700">₹{(booking.remaining_amount || 0).toLocaleString('en-IN')}</p></div>
          <div className="bg-blue-50 p-4 rounded-lg"><p className="text-[10px] text-blue-600 uppercase tracking-wider mb-1">Payment Type</p><p className="text-lg font-bold text-blue-700">{booking.payment_type || 'full'}</p></div>
        </div>

        <hr className="border-gray-100" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Booking Status</label>
            <select value={booking.booking_status} onChange={(e) => setBooking({ ...booking, booking_status: e.target.value })} className="admin-input">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="partial_payment">Partial Payment</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Payment Status</label>
            <select value={booking.payment_status} onChange={(e) => setBooking({ ...booking, payment_status: e.target.value })} className="admin-input">
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Notes</label>
          <textarea value={booking.notes || ''} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} rows={3} className="admin-input" />
        </div>

        <button onClick={() => updateBooking({ booking_status: booking.booking_status, payment_status: booking.payment_status, notes: booking.notes })} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Update Booking'}
        </button>

        {booking.razorpay_payment_id && (
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-slate-500">
            <p><strong>Razorpay Order:</strong> {booking.razorpay_order_id}</p>
            <p><strong>Razorpay Payment:</strong> {booking.razorpay_payment_id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
