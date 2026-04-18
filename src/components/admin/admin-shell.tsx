'use client';

import type { ReactNode } from 'react';
import { LayoutGrid, GalleryHorizontalEnd, MessageSquareText, Settings, TicketCheck, TrendingUp } from 'lucide-react';

const adminNav = [
  { label: 'Overview', icon: LayoutGrid, active: true },
  { label: 'Trips', icon: TicketCheck },
  { label: 'Bookings', icon: TrendingUp },
  { label: 'Enquiries', icon: MessageSquareText },
  { label: 'Content', icon: GalleryHorizontalEnd },
  { label: 'Settings', icon: Settings },
] as const;

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <main id="main-content" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="rounded-3xl bg-[#122822] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-300">Admin</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl leading-none">Operations</h1>
          </div>

          <nav className="mt-6 space-y-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = 'active' in item && item.active;

              return (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-8">{children}</div>
      </section>
    </main>
  );
}
