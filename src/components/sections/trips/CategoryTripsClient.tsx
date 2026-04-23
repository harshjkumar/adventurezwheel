'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Trip {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: string;
  heroImage: string;
  durationDays: number;
  durationNights: number;
  pricing: { label: string; price: number }[];
}

interface CategoryTripsClientProps {
  initialTrips: Trip[];
  categoryName: string;
  categoryDescription?: string;
  categoryImage?: string;
  parentType: 'domestic' | 'international';
  tagline?: string;
}

export default function CategoryTripsClient({
  initialTrips,
  categoryName,
  categoryDescription,
  categoryImage,
  parentType,
  tagline,
}: CategoryTripsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = initialTrips.filter((trip) =>
    !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const parentLabel = parentType === 'domestic' ? 'Domestic' : 'International';
  const parentHref = parentType === 'domestic' ? '/domestic-trips' : '/international-trips';

  const heroImg = categoryImage || 
    (parentType === 'domestic' 
      ? '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG'
      : '/international_hero.png');

  return (
    <main id="main-content" className="bg-[#faf7f2]">
      {/* Hero */}
      <section className="relative h-[75vh] w-full overflow-hidden flex items-end">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroImg}
            alt={categoryName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#122822] via-[#122822]/30 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-20 lg:px-12 mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <Link
              href={parentHref}
              className="inline-flex items-center gap-2 mb-6 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: '"vaccine", serif' }}
            >
              <ArrowLeft size={14} />
              {parentLabel} Trips
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-16 bg-[#D4AF37]"></span>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                {tagline || (parentType === 'domestic' ? 'Explore India' : 'Explore the World')}
              </p>
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-[7rem] leading-none text-white tracking-tight"
              style={{ fontFamily: '"vaccine", serif' }}
            >
              {categoryName}.
            </h1>

            {categoryDescription && (
              <p className="mt-8 max-w-xl text-lg text-white/80 font-light leading-relaxed">
                {categoryDescription}
              </p>
            )}

            <div className="mt-8 flex items-center gap-6 text-white/50 text-sm" style={{ fontFamily: '"vaccine", serif' }}>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]"></span>
                {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search + Grid */}
      <section className="relative z-20 -mt-8 px-6 pb-32 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="rounded-lg bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <p className="text-[#122822]/60 text-sm" style={{ fontFamily: '"vaccine", serif' }}>
              Showing {filteredTrips.length} of {initialTrips.length} trips in <strong className="text-[#122822]">{categoryName}</strong>
            </p>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${categoryName} trips...`}
                className="w-full rounded-sm border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822] transition-all"
              />
            </div>
          </motion.div>

          {/* Trips Grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-md bg-[#eaeff2] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <Link href={`/trips/${trip.slug}`} className="block">
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={trip.heroImage || '/placeholder.jpg'}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div
                        className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm"
                        style={{ fontFamily: '"vaccine", serif' }}
                      >
                        {trip.badge || 'FEATURED'}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="px-6 pt-6 font-sans">
                      <h3
                        className="text-2xl font-normal tracking-tight leading-tight text-[#122822] transition-colors duration-300 group-hover:text-[#1d3d35]"
                        style={{ fontFamily: '"vaccine", serif' }}
                      >
                        {trip.title}
                      </h3>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col px-6 pb-5 font-sans">
                    <div
                      className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-[#122822]"
                      style={{ fontFamily: '"vaccine", serif' }}
                    >
                      <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-bold">
                        {trip.category || 'GROUP TRIP'}
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#122822]/20 pt-5">
                        <ul
                          className="space-y-1.5 text-sm font-normal text-[#122822] pr-4"
                          style={{ fontFamily: '"vaccine", serif' }}
                        >
                          <li className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationDays || 0} days
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationNights || 0} nights
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {Math.max(2, (trip.durationDays || 0) * 2)} meals
                          </li>
                        </ul>
                        <div className="relative flex flex-col justify-center pl-6 text-[#122822]">
                          <div
                            className="text-[12px] mb-1 text-[#122822]/80 font-bold uppercase tracking-widest"
                            style={{ fontFamily: '"vaccine", serif' }}
                          >
                            From :
                          </div>
                          <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: '"vaccine", serif' }}>
                            ₹{trip.pricing.length > 0 ? Math.min(...trip.pricing.map((p) => p.price)).toLocaleString('en-IN') : 'N/A'}*
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/trips/${trip.slug}`}
                        className="mt-6 flex w-full items-center justify-center rounded-sm bg-[#122822] py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d3d35] active:scale-[0.98]"
                        style={{ fontFamily: '"vaccine", serif' }}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-2xl text-[#122822]/50" style={{ fontFamily: '"vaccine", serif' }}>
                No trips found matching your criteria.
              </p>
              <Link
                href={parentHref}
                className="mt-6 inline-block text-sm uppercase tracking-widest text-[#122822]/60 hover:text-[#122822] transition-colors border-b border-[#122822]/20 pb-1"
                style={{ fontFamily: '"vaccine", serif' }}
              >
                ← View all {parentLabel.toLowerCase()} trips
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
