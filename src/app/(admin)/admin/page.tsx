export const dynamic = 'force-dynamic';

import { createAdminSupabase } from '@/lib/supabase/server';
import { Mountain, MessageSquare, Tags, CreditCard, IndianRupee, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createAdminSupabase();

  const [
    { count: tripsCount },
    { count: enquiriesCount },
    { count: categoriesCount },
    { data: bookingsData },
  ] = await Promise.all([
    supabase.from('trips').select('*', { count: 'exact', head: true }),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('trip_categories').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('amount_paid, remaining_amount, booking_status, payment_status, total_persons').then(res => {
      if (res.error) return { data: [] };
      return res;
    }),
  ]);

  const bookings = bookingsData || [];
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (Number(b.amount_paid) || 0), 0);
  const pendingDues = bookings.reduce((sum: number, b: any) => sum + (Number(b.remaining_amount) || 0), 0);
  const confirmedBookings = bookings.filter((b: any) => b.booking_status === 'confirmed' || b.booking_status === 'completed').length;
  const partialBookings = bookings.filter((b: any) => b.booking_status === 'partial_payment').length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Dashboard Overview</h1>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em] mb-2">Total Trips</h3>
            <p className="text-4xl font-[family-name:var(--font-heading)] text-slate-800">{tripsCount || 0}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <Mountain className="text-emerald-600" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em] mb-2">Enquiries</h3>
            <p className="text-4xl font-[family-name:var(--font-heading)] text-slate-800">{enquiriesCount || 0}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <MessageSquare className="text-emerald-600" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em] mb-2">Categories</h3>
            <p className="text-4xl font-[family-name:var(--font-heading)] text-slate-800">{categoriesCount || 0}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
            <Tags className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Bookings / Revenue Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Payments & Bookings</h2>
          <Link href="/admin/bookings" className="text-xs text-emerald-600 hover:underline uppercase tracking-[0.15em] font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-emerald-600/70 uppercase tracking-[0.15em]">Revenue Collected</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <IndianRupee className="text-emerald-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-[family-name:var(--font-heading)] text-emerald-800">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-600/70 uppercase tracking-[0.15em]">Pending Dues</span>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-amber-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-[family-name:var(--font-heading)] text-amber-800">₹{pendingDues.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em]">Total Bookings</span>
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <CreditCard className="text-blue-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-[family-name:var(--font-heading)] text-slate-800">{totalBookings}</p>
            <div className="flex gap-3 mt-2 text-[10px] text-slate-400">
              <span className="text-emerald-600">{confirmedBookings} confirmed</span>
              <span>•</span>
              <span className="text-amber-600">{partialBookings} partial</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-[0.15em]">Total Travelers</span>
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-[family-name:var(--font-heading)] text-slate-800">
              {bookings.reduce((sum: number, b: any) => sum + (b.total_persons || 0), 0) || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/trips?action=new" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all text-center">
            <Mountain className="mx-auto text-emerald-600 mb-2" size={24} />
            <p className="text-sm font-medium text-slate-700">Add New Trip</p>
          </Link>
          <Link href="/admin/blogs?action=new" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all text-center">
            <Tags className="mx-auto text-emerald-600 mb-2" size={24} />
            <p className="text-sm font-medium text-slate-700">New Blog Post</p>
          </Link>
          <Link href="/admin/enquiries" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all text-center">
            <MessageSquare className="mx-auto text-emerald-600 mb-2" size={24} />
            <p className="text-sm font-medium text-slate-700">View Enquiries</p>
          </Link>
          <Link href="/api/seed" className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-amber-200 hover:shadow-md transition-all text-center">
            <TrendingUp className="mx-auto text-amber-600 mb-2" size={24} />
            <p className="text-sm font-medium text-slate-700">Seed Data</p>
          </Link>
        </div>
      </div>
    </div>
  );
}