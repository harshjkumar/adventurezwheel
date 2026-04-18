'use client';

import { CheckCircle2, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { addOns, bookingSteps, travelers } from '@/data/booking';

export function BookingFlow({ tripName }: { tripName: string }) {
  return (
    <main id="main-content" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-emerald-700">Booking</p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] text-slate-900">
            Book {tripName}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            {bookingSteps.map((step, index) => (
              <div
                key={step}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] ${
                  index === 0 ? 'bg-emerald-700 text-white' : 'border border-slate-300 text-slate-600'
                }`}
              >
                {index + 1}. {step}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6">
            <section className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-semibold text-[#122822]">Trip details review</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ['Departure date', '18 May 2026'],
                  ['Travelers', '2 adults'],
                  ['Occupancy', 'Double'],
                  ['Add-ons', 'Airport transfer'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
                    <div className="mt-2 text-lg font-semibold text-[#122822]">{value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-semibold text-[#122822]">Traveler information</h2>
              <div className="mt-6 space-y-4">
                {travelers.map((traveler) => (
                  <div key={traveler.label} className="rounded-2xl border border-slate-200 p-5">
                    <div className="text-lg font-semibold text-[#122822]">{traveler.label}</div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {traveler.fields.map((field) => (
                        <label key={field} className="block">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{field}</span>
                          <input className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-semibold text-[#122822]">Contact & payment</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {['Email', 'Phone', 'Payment type', 'Minimum booking amount'].map((field) => (
                  <label key={field} className="block sm:col-span-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{field}</span>
                    <input className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                  </label>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {addOns.map((addOn) => (
                  <label key={addOn} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                    <input type="checkbox" className="h-4 w-4 accent-emerald-700" />
                    {addOn}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-800">
                  <CreditCard className="h-4 w-4" />
                  Continue to payment
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Review terms
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-2xl font-semibold text-[#122822]">Confirmation</h2>
              <div className="mt-4 rounded-2xl bg-emerald-50 p-5 text-emerald-900">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  <Sparkles className="h-4 w-4" />
                  Next step
                </div>
                <p className="mt-3 text-sm leading-7">
                  Once payment is complete, the booking summary and confirmation email will appear here.
                </p>
              </div>
            </section>
          </div>
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-emerald-100 bg-[#122822] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Summary</p>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.95]">
              Price snapshot
            </h2>
          </div>

          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm text-white/75">
              <span>Trip</span>
              <span>{tripName}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/75">
              <span>Base fare</span>
              <span>$7,199</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/75">
              <span>Add-ons</span>
              <span>$390</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/75">
              <span>GST</span>
              <span>$379</span>
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <div className="text-sm uppercase tracking-[0.2em] text-white/70">Total payable</div>
              <div className="mt-2 text-5xl font-bold">$7,968</div>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              'Flexible payment options',
              'Instant booking summary',
              'Secure confirmation flow',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
