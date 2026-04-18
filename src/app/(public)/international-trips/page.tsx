'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allTrips } from '@/data/trips';

export default function InternationalTripsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = allTrips
    .filter((trip) => trip.category === 'International')
    .filter((trip) => !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main id="main-content" className="bg-[#faf7f2]">
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-end">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image src="/international_hero.png" alt="International trips" fill className="object-cover object-bottom" sizes="100vw" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#122822] via-[#122822]/40 to-transparent" />
        
        <div className="relative z-10 w-full px-6 pb-20 lg:px-12 mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-16 bg-[#D4AF37]"></span>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Wanderlust</p>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-white tracking-tight">
              International Trips.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/80 font-light leading-relaxed">
              Discover completely tailored luxury and adventure travel connecting you with incredible destinations globally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="relative z-20 -mt-8 px-6 pb-32 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Search + Filters Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="rounded-lg bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-slate-100 flex flex-col md:flex-row md:items-center justify-end gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search international destinations..."
                  className="w-full rounded-sm border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822] transition-all"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href={`/trips/${trip.slug}`}
                  className="group relative flex flex-col h-full overflow-hidden bg-white shadow-sm ring-1 ring-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={trip.heroImage} alt={trip.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-4 left-4 rounded-sm bg-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-xl z-10 transition-transform duration-300 group-hover:scale-105">
                      {trip.badge}
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col px-6 py-6 pb-8 font-sans">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-semibold tracking-tight leading-tight text-[#122822] transition-colors duration-300">
                      {trip.title}
                    </h3>
                    
                    <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#122822]/70 font-semibold mb-6">
                      <span>{trip.category || 'GROUP TRIP'}</span>
                      <span>•</span>
                      <span>{trip.region || 'INTERNATIONAL'}</span>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 border-dashed">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[0.7rem] uppercase tracking-widest text-slate-400 font-semibold mb-1">Starting From</span>
                          <span className="text-xl font-bold tracking-tight text-[#122822]">
                            ₹{Math.min(...trip.pricing.map(p => p.price)).toLocaleString('en-IN')}*
                          </span>
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-50 text-[#122822] group-hover:bg-[#122822] group-hover:text-white transition-colors duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="py-32 text-center">
              <p className="font-[family-name:var(--font-heading)] text-2xl text-[#122822]/50">No destinations found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
