'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { TripCardData } from '@/data/catalog';

export function TripCard({ trip }: { trip: TripCardData }) {
  return (
    <Link href={`/trips/${trip.slug}`} className="group relative flex flex-col overflow-hidden bg-[#eaeff2] rounded-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm">
          {trip.badge || 'NOVELTY'}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-6 font-sans">
        <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight leading-tight text-[#122822] transition-colors duration-300 group-hover:text-[#1d3d35]">
          {trip.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#122822]">
          <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-semibold">{trip.category || 'GROUP TRIP'}</span>
          <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-semibold">CIRCUIT</span>
        </div>

        <div className="mt-auto pt-6">
          <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#122822]/20 pt-5">
            <ul className="space-y-1.5 text-sm font-medium text-[#122822] pr-4">
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.duration}</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.difficulty}</li>
              <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {Math.max(20, trip.title.length * 2)} meals</li>
            </ul>
            <div className="relative flex flex-col justify-center pl-6 text-[#122822]">
              <div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dotted border-[#122822]/20" />
              <div className="text-sm mb-1 text-[#122822]/80">From :</div>
              <div className="text-2xl font-bold tracking-tight">
                {trip.price}*
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
