'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Tag, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { featuredTrips } from '@/data/home';

export function FeaturedTrips() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
  };

  return (
    <section className="bg-white px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header — matching "Where to Next?" style */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -40, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-semibold uppercase tracking-tight text-[#122822] sm:text-5xl lg:text-6xl">
              Featured Adventures
            </h2>
          </motion.div>
          <div className="flex shrink-0 items-center gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`flex h-12 w-12 items-center justify-center border transition-all ${
                !canScrollLeft
                  ? 'border-gray-200 text-gray-300'
                  : 'border-[#122822]/30 text-[#122822] hover:border-[#122822] hover:bg-[#122822] hover:text-white'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`flex h-12 w-12 items-center justify-center border transition-all ${
                !canScrollRight
                  ? 'border-gray-200 text-gray-300'
                  : 'border-[#122822]/30 text-[#122822] hover:border-[#122822] hover:bg-[#122822] hover:text-white'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable trip cards */}
        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-6 overflow-x-auto pb-4 lg:gap-8"
        >
          {featuredTrips.map((trip, i) => (
            <motion.div
              key={trip.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-[320px] shrink-0 sm:w-[360px] lg:w-[400px]"
            >
              <Link href={`/trips/${trip.slug}`} className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-md bg-[#eaeff2] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px"
                    />
                    <div className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#122822] shadow-sm backdrop-blur-sm">
                      {trip.badge || 'FEATURED'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col px-6 py-6 pb-5 font-sans">
                    <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight leading-tight text-[#122822] transition-colors duration-300 group-hover:text-[#1d3d35]">
                      {trip.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-widest text-[#122822]">
                      <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-semibold">{trip.badge}</span>
                      <span className="rounded-sm border border-[#122822]/30 px-2.5 py-1 font-semibold">CIRCUIT</span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="grid grid-cols-[1fr_auto] border-t-2 border-dotted border-[#122822]/20 pt-5">
                        <ul className="space-y-1.5 text-sm font-medium text-[#122822] pr-4">
                          {trip.stats.slice(0, 3).map((stat) => (
                            <li key={stat} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-[#122822]"></span> {stat}</li>
                          ))}
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
