import type { ReactNode } from 'react';

type RouteShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function RouteShell({ eyebrow, title, description, children }: RouteShellProps) {
  return (
    <main id="main-content" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-[1200px] rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.38em] text-emerald-700">{eyebrow}</p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] text-slate-900">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        {children ? <div className="mt-10">{children}</div> : null}
      </section>
    </main>
  );
}