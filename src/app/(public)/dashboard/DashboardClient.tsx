'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Calendar, Map, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardClient() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadDashboard() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch Bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (bookingsData) {
        setBookings(bookingsData);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#faf7f2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#122822]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[#faf7f2]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-[#122822] text-white flex items-center justify-center text-3xl font-bold font-[family-name:var(--font-heading)] uppercase">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-[family-name:var(--font-heading)] text-[#122822]">
                Welcome, {profile?.full_name || 'Adventurer'}
              </h1>
              <p className="text-slate-500 mt-1">{user?.email}</p>
              {profile?.phone && <p className="text-sm text-slate-400">{profile.phone}</p>}
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#122822] text-[#122822] rounded-full font-semibold hover:bg-[#122822] hover:text-white transition-all w-full md:w-auto"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-[family-name:var(--font-heading)] text-[#122822] mb-6 border-b border-slate-100 pb-4">
            Your Bookings
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Map className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No bookings yet</h3>
              <p className="text-slate-500 mt-2">Looks like you haven't booked any trips. Time to explore!</p>
              <button 
                onClick={() => router.push('/trips')}
                className="mt-6 px-8 py-3 bg-[#122822] text-white rounded-lg font-semibold shadow-xl shadow-[#122822]/20 hover:-translate-y-1 transition-all"
              >
                Browse Trips
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="border border-slate-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        booking.booking_status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.booking_status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.booking_status}
                      </span>
                      <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                        ID: {booking.booking_id}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#122822]">{booking.trip_title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-slate-600 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {booking.departure_date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4 text-slate-400" />
                        {booking.total_persons} Person(s)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end justify-center border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Total Paid</p>
                    <p className="text-2xl font-[family-name:var(--font-heading)] text-[#122822]">
                      ₹{booking.amount_paid?.toLocaleString('en-IN') || 0}
                    </p>
                    {booking.remaining_amount > 0 && (
                      <p className="text-sm text-red-500 font-medium mt-1">
                        Due: ₹{booking.remaining_amount.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
