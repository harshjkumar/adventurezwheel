'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search } from 'lucide-react';

export function HeroSlider({ initialSlides }: { initialSlides: any[] }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slide = initialSlides?.[0]?.image 
    ? initialSlides[0] 
    : { image: '/placeholder.jpg', subtitle: 'Explore the World' };
  const videoSrc = 'https://pub-d188086126f842e88f76855b16e973b0.r2.dev/wheels1%20(1).mp4';

  const titles = [
    "Adventures Wheel offers you the world",
    "Discover untamed landscapes",
    "Experience the extraordinary",
    "Your next journey begins here",
    "Where every path tells a story",
    "Adventure awaits in every corner"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#122822]">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 z-0 ${
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
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center pt-32 px-5 pb-32 sm:px-12 sm:pb-48 lg:px-24">
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#122822] animate-pulse" />
              <p className="text-[12px] font-medium uppercase tracking-[0.4em] text-white" style={{ fontFamily: '"vaccine", serif' }}>
                {slide.subtitle}
              </p>
            </div>
          </motion.div>

          <h1 className="mt-4 text-[40px] font-normal leading-[1.05] tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[80px] max-w-[90%] min-h-[120px] sm:min-h-[180px] lg:min-h-[200px]" style={{ fontFamily: '"vaccine", serif' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTitleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="block"
              >
                {titles[currentTitleIdx]}
              </motion.span>
            </AnimatePresence>
          </h1>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute bottom-6 left-5 sm:bottom-20 sm:left-12 lg:left-24 w-[calc(100%-40px)] sm:w-[90%] max-w-3xl"
        >
          <div className="flex items-stretch overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
            <div className="flex flex-1 flex-col justify-center border-r border-white/10 px-4 py-2.5 sm:px-5 sm:py-3.5">
              <span className="text-[10px] sm:text-[12px] font-medium uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: '"vaccine", serif' }}>Destination</span>
              <span className="mt-0.5 text-sm sm:text-base font-medium text-white/90" style={{ fontFamily: '"vaccine", serif' }}>Where to?</span>
            </div>
            <div className="hidden flex-1 flex-col justify-center border-r border-white/10 px-4 py-2.5 sm:px-5 sm:py-3.5 sm:flex">
              <span className="text-[10px] sm:text-[12px] font-medium uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: '"vaccine", serif' }}>Month</span>
              <span className="mt-0.5 text-sm sm:text-base font-medium text-white/90" style={{ fontFamily: '"vaccine", serif' }}>Any time</span>
            </div>
            <a
              href="/trips"
              className="flex items-center justify-center bg-white px-5 sm:px-8 text-[#122822] transition-all hover:bg-slate-200"
            >
              <Search className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
