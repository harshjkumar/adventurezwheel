'use client';

import type { ReactNode } from 'react';
import { BarChart3, Bookmark, LogOut, Settings, UserRound, Ticket, Star } from 'lucide-react';
import { dashboardLinks } from '@/data/dashboard';

const icons = [UserRound, Ticket, Bookmark, Star, Settings];

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main id="main-content" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="rounded-3xl bg-[#122822] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-300">Dashboard</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl leading-none">Adventures Wheel</h1>
          </div>

          <nav className="mt-6 space-y-2">
            {dashboardLinks.map((link, index) => {
              const Icon = icons[index] ?? BarChart3;
              const active = link === 'My Bookings';

              return (
                <a
                  key={link}
                  href="#"
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link}
                </a>
              );
            })}
          </nav>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <div className="space-y-8">{children}</div>
      </section>
    </main>
  );
}
