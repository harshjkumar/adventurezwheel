export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/lib/supabase/server";
import { Mountain, MessageSquare, Tags, CreditCard, IndianRupee, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createServerSupabase();
  
  const [
    { count: tripsCount }, 
    { count: enquiresCount },
    { data: bookingsData },
  ] = await Promise.all([
    supabase.from("trips").select("*", { count: "exact", head: true }),
    supabase.from("enquiries").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("amount_paid, remaining_amount, booking_status, payment_status").then(res => {
      // If table doesn't exist yet, return empty
      if (res.error) return { data: [] };
      return res;
    }),
  ]);

  const bookings = bookingsData || [];
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (Number(b.amount_paid) || 0), 0);
  const pendingDues = bookings.reduce((sum: number, b: any) => sum + (Number(b.remaining_amount) || 0), 0);
  const confirmedBookings = bookings.filter((b: any) => b.booking_status === "confirmed" || b.booking_status === "completed").length;
  const partialBookings = bookings.filter((b: any) => b.booking_status === "partial_payment").length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif text-charcoal">Dashboard Overview</h1>
      
      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-nav font-medium text-charcoal/60 uppercase tracking-widest mb-2">Total Trips</h3>
            <p className="text-4xl font-serif text-charcoal">{tripsCount || 0}</p>
          </div>
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Mountain className="text-accent" />
          </div>
        </div>
        <div className="bg-white p-8 rounded border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-nav font-medium text-charcoal/60 uppercase tracking-widest mb-2">Enquiries</h3>
            <p className="text-4xl font-serif text-charcoal">{enquiresCount || 0}</p>
          </div>
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <MessageSquare className="text-accent" />
          </div>
        </div>
        <div className="bg-white p-8 rounded border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xs font-nav font-medium text-charcoal/60 uppercase tracking-widest mb-2">Categories</h3>
            <p className="text-4xl font-serif text-charcoal">3</p>
          </div>
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Tags className="text-accent" />
          </div>
        </div>
      </div>

      {/* Bookings / Revenue Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif text-charcoal">Payments & Bookings</h2>
          <Link 
            href="/admin/bookings" 
            className="text-xs font-nav text-accent hover:underline uppercase tracking-widest"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-lg border border-emerald-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-nav font-medium text-emerald-700/70 uppercase tracking-widest">Revenue Collected</span>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <IndianRupee className="text-emerald-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-serif text-emerald-800">₹{totalRevenue.toLocaleString("en-IN")}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-lg border border-amber-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-nav font-medium text-amber-700/70 uppercase tracking-widest">Pending Dues</span>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-amber-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-serif text-amber-800">₹{pendingDues.toLocaleString("en-IN")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Total Bookings</span>
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <CreditCard className="text-blue-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-serif text-charcoal">{totalBookings}</p>
            <div className="flex gap-3 mt-2 text-[10px] text-charcoal/50">
              <span className="text-emerald-600">{confirmedBookings} confirmed</span>
              <span>•</span>
              <span className="text-amber-600">{partialBookings} partial</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Total Travelers</span>
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={14} />
              </div>
            </div>
            <p className="text-2xl font-serif text-charcoal">
              {bookings.reduce((sum: number, b: any) => sum + (b.total_persons || 0), 0) || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
