import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-[960px] rounded-[2rem] border border-emerald-100 bg-white p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.38em] text-emerald-700">404</p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(3rem,6vw,5.5rem)] leading-[0.92] text-slate-900">
          We could not find that page.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          The route may have moved or no longer exists. Use the homepage to continue exploring trips and destinations.
        </p>
        <Link href="/" className="mt-10 inline-flex rounded-2xl bg-emerald-700 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-800">
          Back to home
        </Link>
      </section>
    </main>
  );
}
