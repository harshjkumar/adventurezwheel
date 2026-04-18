import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { bookings } from '@/data/dashboard';

export default function DashboardPage() {
  return (
    <DashboardShell>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total bookings', '12'],
          ['Upcoming trips', '3'],
          ['Wishlist items', '8'],
          ['Saved credit', '$24,000'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50 p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-emerald-700">{label}</div>
            <div className="mt-4 text-4xl font-semibold text-[#122822]">{value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <h2 className="text-3xl font-semibold text-[#122822]">My bookings</h2>
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.6fr] lg:items-center">
              <div>
                <div className="text-lg font-semibold text-[#122822]">{booking.trip}</div>
                <div className="mt-1 text-sm text-slate-500">{booking.date}</div>
              </div>
              <div className="text-sm text-slate-600">Booking ID: {booking.id}</div>
              <div className="text-sm text-slate-600">{booking.amount}</div>
              <div className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${booking.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}