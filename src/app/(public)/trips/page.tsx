'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Tag, MapPin, Clock, Mountain } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allTrips } from '@/data/trips';

const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Duration: Short', 'Duration: Long'];
const filterTabs = ['All', 'Bike Expedition', 'Backpacking', 'New Route'];

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = allTrips
    .filter((trip) => {
      if (activeTab === 'All') return true;
      if (activeTab === 'Bike Expedition') return trip.category.includes('Bike');
      if (activeTab === 'Backpacking') return trip.category.includes('Backpacking');
      if (activeTab === 'New Route') return trip.badge === 'New Route';
      return true;
    })
    .filter((trip) => !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG" alt="Our trips" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Explore</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Our Adventures
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Discover our curated collection of unforgettable journeys.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Search + Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                    tab === activeTab ? 'border-[#122822] bg-[#122822] text-white' : 'border-slate-300 bg-white text-[#122822] hover:border-[#122822]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trips..."
                  className="rounded-sm border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
              >
                <Link
                  href={`/trips/${trip.slug}`}
                  className="group relative flex flex-col h-full overflow-hidden bg-[#eaeff2] rounded-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-200/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={trip.heroImage} alt={trip.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                    <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm z-10">
                      {trip.badge}
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col px-6 py-6 font-sans">
                    <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight leading-tight text-[#0f211c] transition-colors duration-300 group-hover:text-[#2596be]">
                      {trip.title}
                    </h3>
                    
                    <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#0f211c]">
                      <span className="rounded-sm border border-[#0f211c]/30 bg-white/40 px-2.5 py-1 font-semibold border-b-2">{trip.category || 'GROUP TRIP'}</span>
                      <span className="rounded-sm border border-[#0f211c]/30 bg-white/40 px-2.5 py-1 font-semibold border-b-2">OFFER</span>
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

          {filteredTrips.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-[#122822]/50">No trips found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}