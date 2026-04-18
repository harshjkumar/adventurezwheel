'use client';

import type { ReactNode } from 'react';

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main id="main-content" className="min-h-screen px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-[1200px] gap-8 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[#122822] p-8 text-white sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-emerald-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-md font-[family-name:var(--font-heading)] text-[clamp(3rem,5vw,5.6rem)] leading-[0.92]">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-white/85">{description}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ['Fast access', 'Secure sessions'],
              ['Trip history', 'Booking support'],
              ['Saved trips', 'Wishlist sync'],
              ['Profile tools', 'Notification settings'],
            ].map(([titleText, subtitle]) => (
              <div key={titleText} className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                <div className="text-lg font-semibold">{titleText}</div>
                <div className="mt-1 text-sm text-white/70">{subtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12">{children}</div>
      </section>
    </main>
  );
}
