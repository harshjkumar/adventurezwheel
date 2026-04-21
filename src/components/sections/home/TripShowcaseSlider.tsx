'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { allTrips } from '@/data/trips';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TripShowcaseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allTrips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % allTrips.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + allTrips.length) % allTrips.length);

  const currentTrip = allTrips[currentIndex];
  
  // Create an array of 11 images by repeating the gallery images if needed
  const displayImages = Array(11).fill(currentTrip.galleryImages).flat().slice(0, 11);

  return (
    <section className="bg-[#faf7f2] px-6 py-24 lg:px-12 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        {/* Header & Controls */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrip.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.4em] text-[#122822]/40 md:text-xs" style={{ fontFamily: '"vaccine", serif' }}>
                  {currentTrip.region}
                </p>
                <h2 className="text-4xl font-normal uppercase tracking-wide text-[#122822] sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: '"vaccine", serif' }}>
                  {currentTrip.displayTitle.split(' ')[0]} {/* Shorten title slightly for big display */}
                  <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 text-[#122822]/70">{currentTrip.title}</span>
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col md:items-end gap-6 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrip.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="md:text-right"
              >
                <p className="text-sm leading-7 text-[#122822]/60 line-clamp-3">
                  {currentTrip.description.split('\n')[0]}
                </p>
                <Link
                  href={`/trips/${currentTrip.slug}`}
                  className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.2em] text-[#122822] transition-colors hover:text-[#122822]/60 border-b-2 border-[#122822] pb-1"
                  style={{ fontFamily: '"vaccine", serif' }}
                >
                  Explore Tour →
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Manual Navigation Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={prevSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#122822]/20 text-[#122822] transition-colors hover:bg-[#122822] hover:text-white"
                aria-label="Previous trip"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-1">
                {allTrips.map((trip, idx) => (
                  <button
                    key={trip.slug}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-[#122822]' : 'w-2 bg-[#122822]/20 hover:bg-[#122822]/50'
                    }`}
                    aria-label={`Go to ${trip.title}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#122822]/20 text-[#122822] transition-colors hover:bg-[#122822] hover:text-white"
                aria-label="Next trip"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Masonry-style image grid */}
        <AnimatePresence mode="wait">
          <motion.div 
             key={currentTrip.slug}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.98 }}
             transition={{ duration: 0.6 }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Large featured image — spans 2 cols and 2 rows */}
              <div className="group relative overflow-hidden rounded-sm sm:col-span-2 sm:row-span-2">
                <div className="relative aspect-square overflow-hidden sm:aspect-auto sm:h-full sm:min-h-[500px]">
                  <Image
                    src={displayImages[0]}
                    alt={`${currentTrip.title} image 1`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-lg font-semibold text-white">{currentTrip.title}</p>
                    <span className="mt-2 inline-block rounded-sm bg-white/20 px-3 py-1 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white">
                      {currentTrip.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Remaining images in smaller cards */}
              {displayImages.slice(1, 7).map((src, i) => (
                <div key={i} className="group relative overflow-hidden rounded-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${currentTrip.title} image ${i + 2}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row — remaining 4 images */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {displayImages.slice(7).map((src, i) => (
                <div key={i} className="group relative overflow-hidden rounded-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${currentTrip.title} image ${i + 8}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
