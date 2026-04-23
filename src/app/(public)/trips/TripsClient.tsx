'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const categoryTabs = ['Domestic', 'International', 'Road Trip'] as const;
type CategoryTab = (typeof categoryTabs)[number];

// Map region to a display location tag
function getLocationTag(region: string) {
  const r = region.toLowerCase();
  if (r.includes('leh') || r.includes('ladakh')) return 'Leh';
  if (r.includes('spiti')) return 'Spiti';
  if (r.includes('meghalaya')) return 'Meghalaya';
  if (r.includes('arunachal') || r.includes('tawang')) return 'Tawang';
  if (r.includes('vietnam')) return 'Vietnam';
  if (r.includes('thailand')) return 'Thailand';
  if (r.includes('indonesia') || r.includes('bali')) return 'Bali';
  return region;
}

export default function TripsClient({ initialTrips, heroSlides }: { initialTrips: any[], heroSlides?: any[] }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<CategoryTab>('Domestic');
  const [searchQuery, setSearchQuery] = useState('');

  const heroSlide = heroSlides?.[0] || { 
    image: "/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG", 
    title: "Our Adventures", 
    subtitle: "Navigator by Soul" 
  };

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
    
    const tab = searchParams.get('tab');
    if (tab && categoryTabs.includes(tab as CategoryTab)) {
      setActiveTab(tab as CategoryTab);
    }
  }, [searchParams]);

  const filteredTrips = initialTrips
    .filter((trip) => {
      const hasCategoryTag = (cat: string) => trip.tags?.some((t: any) => t.tag_type === 'category' && t.tag_value === cat);
      const catLabel = (trip.categoryLabel || '').toLowerCase();
      
      if (activeTab === 'Domestic') return hasCategoryTag('Domestic') || catLabel === 'domestic';
      if (activeTab === 'International') return hasCategoryTag('International') || catLabel === 'international';
      if (activeTab === 'Road Trip') return hasCategoryTag('Road Trip') || catLabel === 'road trip' || catLabel === 'domestic';
      return true;
    })
    .filter((trip) => !searchQuery || trip.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const isInternational = activeTab === 'International';

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image src={heroSlide.image} alt={heroSlide.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/30 via-[#122822]/10 to-[#122822]/80" />
        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[14px] font-bold uppercase tracking-[0.6em] text-white/90 mb-4" style={{ fontFamily: '"vaccine", serif' }}>{heroSlide.subtitle}</p>
            <h1 className="max-w-4xl text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-white font-normal drop-shadow-2xl" style={{ fontFamily: '"vaccine", serif' }}>
              {heroSlide.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl md:text-2xl text-white/90 font-medium leading-relaxed" style={{ fontFamily: '"vaccine", serif' }}>
              Discover our curated collection of unforgettable journeys across the most breathtaking landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs + Search + Grid */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Category Tabs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                    tab === activeTab ? 'border-[#122822] bg-[#122822] text-white shadow-lg' : 'border-slate-300 bg-white text-[#122822] hover:border-[#122822]'
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

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip, i) => (
              <motion.div
                key={trip.slug}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
                className="w-full"
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm" style={{ fontFamily: '"vaccine", serif' }}>
                        {trip.badge || 'FEATURED'}
                      </div>
                    </div>

                    {/* Content Top */}
                    <div className="px-6 pt-6 font-sans">
                      <h3 className="text-2xl font-normal tracking-tight leading-tight text-[#122822] transition-colors duration-300 group-hover:text-[#1d3d35]" style={{ fontFamily: '"vaccine", serif' }}>
                        {trip.title}
                      </h3>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col px-6 pb-5 font-sans">
                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
                      <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-bold flex items-center gap-1.5">
                        <Clock size={10} /> {trip.durationDays}D / {trip.durationNights}N
                      </span>
                      <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-bold">{getLocationTag(trip.region)}</span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#122822]/20 pt-5">
                        <ul className="space-y-1.5 text-sm font-normal text-[#122822] pr-4" style={{ fontFamily: '"vaccine", serif' }}>
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationDays} days</li>
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {trip.durationNights} nights</li>
                          <li className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {Math.max(2, trip.durationDays * 2)} meals</li>
                        </ul>
                        <div className="relative flex flex-col justify-center pl-6 text-[#122822]">
                          <div className="absolute left-0 top-0 bottom-0 w-px border-l-2 border-dotted border-[#122822]/20" />
                          <div className="text-[12px] mb-1 text-[#122822]/80 font-bold uppercase tracking-widest" style={{ fontFamily: '"vaccine", serif' }}>From :</div>
                          <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: '"vaccine", serif' }}>
                            ₹{trip.minPrice?.toLocaleString('en-IN') || 'N/A'}*
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/trips/${trip.slug}`}
                        className="mt-6 flex w-full items-center justify-center rounded-sm bg-[#122822] py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#1d3d35] active:scale-[0.98]"
                        style={{ fontFamily: '"vaccine", serif' }}
                      >
                        {isInternational ? 'View Details' : 'Book Now'}
                      </Link>
                    </div>
                  </div>
                </div>
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
