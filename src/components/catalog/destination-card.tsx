'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { DestinationCardData } from '@/data/catalog';

export function DestinationCard({ destination }: { destination: DestinationCardData }) {
  return (
    <article className="group overflow-hidden rounded-[1rem] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,28,0)_35%,rgba(21,49,93,0.34)_100%)]" />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{destination.region}</p>
          <h3 className="mt-2 text-3xl font-semibold leading-tight text-[#122822]">{destination.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{destination.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[#122822]">
          <span className="rounded-full border border-slate-300 px-2.5 py-1">{destination.tripCount}</span>
          <span className="rounded-full border border-slate-300 px-2.5 py-1">{destination.bestFor}</span>
        </div>

        <Link
          href={`/destinations/${destination.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#122822] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-emerald-700"
        >
          Explore destination
        </Link>
      </div>
    </article>
  );
}
