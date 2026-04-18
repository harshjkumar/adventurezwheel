'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allTrips } from '@/data/trips';
import { destinationCards } from '@/data/home';

const filterChips = ['Individual Travel', 'Circuit', 'Group Trip', 'Stay', 'Extension', 'Cruise', 'Self-Drive Tour', 'Safari', 'Seaside Holiday'];

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paramsResolved = require('react').use(params);
  const slug = paramsResolved.slug;

  const dest = destinationCards.find((d) => d.slug === slug) || destinationCards[0];
  const displayName = dest.title;

  const toggleChip = (chip: string) => {
    setActiveChips((prev) => prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]);
  };

  const destinationTrips = allTrips.filter(t => t.slug.includes(slug) || t.region.toLowerCase().includes(slug.replace(/-/g, ' ')));

  return (
    <main id="main-content">
      {/* Hero — Full screen redesign */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute inset-0"
        >
          {slug === 'leh-ladakh' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/DJI_20250814145813_0158_D.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image src={dest.image} alt={displayName} fill className="object-cover" sizes="100vw" priority />
          )}
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/50 via-[#122822]/20 to-[#122822]/90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-32 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
             initial={{ opacity: 0, y: -40, rotateX: 10 }}
             animate={{ opacity: 1, y: 0, rotateX: 0 }}
             transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80 drop-shadow-md">
              Discover the beauty of
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-6xl font-semibold uppercase tracking-tight text-white drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-none">
              {displayName}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, type: "spring" }}
            className="mt-16 w-full max-w-4xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 rounded-2xl bg-white/10 p-3 backdrop-blur-md shadow-2xl border border-white/20">
              <div className="flex-1 w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
                <input type="text" placeholder="Search experiences, tours, or routes..." className="w-full bg-white/10 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner" />
              </div>
              <div className="flex-1 w-full relative">
                <input type="date" className="w-full bg-white/10 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-[#2596be] hover:bg-[#1d7999] text-white font-bold rounded-xl uppercase tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Explore Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Filter chips at bottom of hero */}
        <div className="absolute inset-x-0 bottom-8 z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-3">
            {filterChips.map((chip, i) => (
              <motion.button
                key={chip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                onClick={() => toggleChip(chip)}
                className={`rounded-lg border px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] transition-all ${
                  activeChips.includes(chip)
                    ? 'border-white bg-white text-[#122822] shadow-lg'
                    : 'border-white/30 bg-white/10 text-white hover:bg-white/30 hover:border-white/50 backdrop-blur-sm'
                }`}
              >
                {chip}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Top filters bar */}
      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8 border-b border-slate-100 shadow-sm sticky top-[72px] z-40">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between text-sm text-slate-800 font-semibold">
          <div className="flex items-center gap-2 cursor-pointer hover:text-[#2596be] transition-colors bg-slate-100 px-4 py-2 rounded-lg">
            Sort : Recommended
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div className="text-[#122822] uppercase tracking-widest text-xs px-4 py-2 bg-[#122822]/5 rounded-lg border border-[#122822]/10">{destinationTrips.length} Tours Found</div>
        </div>
      </div>

      {/* Trips for this destination utilizing the new unified design */}
      <section className="bg-[#fafbfc] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinationTrips.map((trip, idx) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
              >
                <Link
                  href={`/trips/${trip.slug}`}
                  onMouseEnter={() => setHoveredCard(trip.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative flex flex-col h-full overflow-hidden bg-[#eaeff2] rounded-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-200/50"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image src={trip.heroImage} alt={trip.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm z-10">
                      Top Rated
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col px-6 py-6 font-sans">
                    <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight leading-tight text-[#0f211c] transition-colors duration-300 group-hover:text-[#2596be]">
                      {trip.title}
                    </h3>
                    
                    <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#0f211c]">
                      <span className="rounded-sm border border-[#0f211c]/30 bg-white/40 px-2.5 py-1 font-semibold border-b-2">Individual</span>
                      <span className="rounded-sm border border-[#0f211c]/30 bg-white/40 px-2.5 py-1 font-semibold border-b-2">Wildlife</span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#0f211c]/20 pt-5">
                        <ul className="space-y-1.5 text-sm font-medium text-[#0f211c] pr-4">
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0f211c]"></span> {trip.durationDays} days</li>
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0f211c]"></span> {trip.durationNights} nights</li>
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0f211c]"></span> {Math.max(2, trip.durationDays * 2)} meals</li>
                        </ul>
                        
                        <div className="relative flex flex-col justify-center pl-6 text-[#0f211c]">
                          <div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dotted border-[#0f211c]/20" />
                          <div className="text-sm mb-1 text-[#0f211c]">From :</div>
                          <div className="text-2xl font-bold tracking-tight">
                            ₹{Math.min(...trip.pricing.map(p => p.price)).toLocaleString('en-IN')}*
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}