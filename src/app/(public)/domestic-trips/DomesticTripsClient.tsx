'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Trip {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: string;
  region: string;
  heroImage: string;
  durationDays: number;
  durationNights: number;
  pricing: { label: string; price: number }[];
}

const filterTabs = ['All', 'Bike Expedition', 'Backpacking', 'New Route'];

export default function DomesticTripsClient({ initialTrips }: { initialTrips: Trip[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = initialTrips
    .filter((trip) => {
      if (activeTab === 'All') return true;
      if (activeTab === 'Bike Expedition') return trip.category.includes('Bike');
      if (activeTab === 'Backpacking') return trip.category.includes('Backpacking');
      if (activeTab === 'New Route') return trip.badge === 'New Route';
      return true;
    })
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
          <Image src="/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG" alt="Domestic trips" fill className="object-cover" sizes="100vw" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#122822] via-[#122822]/20 to-transparent" />
        
        <div className="relative z-10 w-full px-6 pb-20 lg:px-12 mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-16 bg-[#D4AF37]"></span>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">Discover India</p>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-6xl md:text-8xl lg:text-[7rem] leading-none text-white tracking-tight">
              Domestic Trips.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/80 font-light leading-relaxed">
              From the rugged terrains of the high Himalayas to the lush scenic beauty of the East, discover our curated collection of unforgettable journeys across the motherland.
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
            className="rounded-lg bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] ring-1 ring-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-sm px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-widest transition-all ${
                    tab === activeTab 
                      ? 'bg-[#122822] text-white' 
                      : 'bg-slate-50 text-[#122822] hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search domestic routes..."
                  className="w-full rounded-sm border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-medium focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822] transition-all"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  className="group relative block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-md bg-[#eaeff2] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={trip.heroImage || '/placeholder.jpg'}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px"
                      />
                      <div className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm" style={{ fontFamily: '"vaccine", serif' }}>
                        {trip.badge || 'FEATURED'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-6 py-6 pb-5 font-sans">
                      <h3 className="text-2xl font-normal tracking-tight leading-tight text-[#122822] transition-colors duration-300 group-hover:text-[#1d3d35]" style={{ fontFamily: '"vaccine", serif' }}>
                        {trip.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
                        <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-bold">{trip.category || 'GROUP TRIP'}</span>
                        <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-bold">CIRCUIT</span>
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#122822]/20 pt-5">
                          <ul className="space-y-1.5 text-sm font-normal text-[#122822] pr-4" style={{ fontFamily: '"vaccine", serif' }}>
                            <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationDays || 0} days</li>
                            <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationNights || 0} nights</li>
                            <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {Math.max(2, (trip.durationDays || 0) * 2)} meals</li>
                          </ul>
                          <div className="relative flex flex-col justify-center pl-6 text-[#122822]">
                            <div className="text-[12px] mb-1 text-[#122822]/80 font-bold uppercase tracking-widest" style={{ fontFamily: '"vaccine", serif' }}>From :</div>
                            <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: '"vaccine", serif' }}>
                              ₹{trip.pricing.length > 0 ? Math.min(...trip.pricing.map(p => p.price)).toLocaleString('en-IN') : 'N/A'}*
                            </div>
                          </div>
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
              <p className="font-[family-name:var(--font-heading)] text-2xl text-[#122822]/50">No routes found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
