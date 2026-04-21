export const dynamic = 'force-dynamic';

import { createAdminSupabase } from '@/lib/supabase/server';
import { IndianRupee, Search, Download, Filter } from 'lucide-react';

export default async function PaymentsPage() {
  const supabase = createAdminSupabase();
  
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  const allBookings = bookings || [];
  const totalCollected = allBookings.reduce((s: number, b: any) => s + (Number(b.amount_paid) || 0), 0);
  const totalPending = allBookings.reduce((s: number, b: any) => s + (Number(b.remaining_amount) || 0), 0);
  const totalPayable = totalCollected + totalPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Payment Records</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100">
          <span className="text-xs font-medium text-emerald-600/70 uppercase tracking-[0.15em]">Total Collected</span>
          <p className="text-3xl font-[family-name:var(--font-heading)] text-emerald-800 mt-2">₹{totalCollected.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
          <span className="text-xs font-medium text-amber-600/70 uppercase tracking-[0.15em]">Pending Dues</span>
          <p className="text-3xl font-[family-name:var(--font-heading)] text-amber-800 mt-2">₹{totalPending.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
          <span className="text-xs font-medium text-blue-600/70 uppercase tracking-[0.15em]">Total Payable</span>
          <p className="text-3xl font-[family-name:var(--font-heading)] text-blue-800 mt-2">₹{totalPayable.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">{allBookings.length} payment records</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Trip</th>
                <th className="text-left p-4">Persons</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Paid</th>
                <th className="text-left p-4">Remaining</th>
                <th className="text-left p-4">Razorpay ID</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((b: any) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {b.created_at ? new Date(b.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{b.customer_name || '—'}</div>
                    <div className="text-[10px] text-slate-400">{b.customer_email || ''}</div>
                    <div className="text-[10px] text-slate-400">{b.customer_phone || ''}</div>
                  </td>
                  <td className="p-4 text-slate-600 max-w-[200px] truncate">{b.trip_title || b.trip_slug || '—'}</td>
                  <td className="p-4 text-slate-600">{b.total_persons || '—'}</td>
                  <td className="p-4 font-medium text-slate-700">₹{(Number(b.total_payable) || 0).toLocaleString('en-IN')}</td>
                  <td className="p-4 font-bold text-emerald-700">₹{(Number(b.amount_paid) || 0).toLocaleString('en-IN')}</td>
                  <td className="p-4 font-medium text-amber-700">₹{(Number(b.remaining_amount) || 0).toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono text-slate-400 break-all">{b.razorpay_payment_id || '—'}</span>
                    {b.razorpay_order_id && (
                      <div className="text-[9px] font-mono text-slate-300 mt-0.5">Order: {b.razorpay_order_id}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${
                      b.payment_status === 'paid' || b.payment_status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : b.payment_status === 'partial'
                        ? 'bg-amber-50 text-amber-700'
                        : b.payment_status === 'failed'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-50 text-gray-500'
                    }`}>
                      {b.payment_status || b.booking_status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {allBookings.length === 0 && (
                <tr><td colSpan={9} className="p-12 text-center text-slate-400">No payment records yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
