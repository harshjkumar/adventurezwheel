import { BarChart3, CalendarRange, FileText, Users } from 'lucide-react';
import { AdminShell } from '@/components/admin/admin-shell';
import { adminMetrics, activityFeed, managementAreas } from '@/data/admin';

export default function AdminPage() {
  return (
    <AdminShell>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <div key={metric.label} className={`rounded-[1.5rem] p-6 ${metric.accent}`}>
            <div className="text-sm uppercase tracking-[0.22em]">{metric.label}</div>
            <div className="mt-4 text-4xl font-semibold text-[#122822]">{metric.value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <h2 className="text-3xl font-semibold text-[#122822]">Management areas</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {managementAreas.map((area) => (
              <div key={area.title} className="rounded-3xl border border-slate-200 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  {area.title === 'Trips' ? <CalendarRange className="h-5 w-5" /> : area.title === 'Bookings' ? <BarChart3 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[#122822]">{area.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <h2 className="text-3xl font-semibold text-[#122822]">Recent activity</h2>
          <div className="mt-6 space-y-4">
            {activityFeed.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}