'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { heroSlides } from '@/data/home';

export function HeroSlider() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const slide = heroSlides[0];
  const videoSrc = '/wheels1 (1).mp4';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#122822]">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Fallback image slides (before video loads) */}
      {!videoLoaded && (
        <div className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient overlays for bottom-left text readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content — dynamic modern layout, bottom left */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-48 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-5xl flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 backdrop-blur-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {slide.subtitle}
              </p>
            </div>
          </motion.div>

          <h1 className="mt-6 font-[family-name:var(--font-heading)] text-5xl font-medium leading-[1.1] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[100px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="block"
            >
              {slide.title}
            </motion.span>
          </h1>
        </motion.div>

        {/* Search bar at bottom — like K2K screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute bottom-20 left-6 sm:left-12 lg:left-24 w-[90%] max-w-3xl"
        >
          <div className="flex items-stretch overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
            <div className="flex flex-1 flex-col justify-center border-r border-white/20 px-5 py-3.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">Destination</span>
              <span className="mt-0.5 text-sm font-medium text-white/90">Where to?</span>
            </div>
            <div className="hidden flex-1 flex-col justify-center border-r border-white/20 px-5 py-3.5 sm:flex">
              <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">Month</span>
              <span className="mt-0.5 text-sm font-medium text-white/90">Any time</span>
            </div>
            <a
              href="/trips"
              className="flex items-center justify-center bg-white px-8 text-[#122822] transition-all hover:bg-slate-200"
            >
              <Search className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
