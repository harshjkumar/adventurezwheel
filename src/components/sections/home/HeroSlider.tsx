'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Search } from 'lucide-react';

export function HeroSlider({ initialSlides }: { initialSlides: any[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSlide = initialSlides?.find(s => s.media_type === 'video' && s.is_active);
  const slide = videoSlide || initialSlides?.[0] || { image: '/placeholder.jpg', subtitle: '' };
  const videoSrc = videoSlide?.image || 'https://pub-d188086126f842e88f76855b16e973b0.r2.dev/wheels1%20(1).mp4';

  const titles = [
    "Built by a destination expert who has traveled, ridden, and led journeys across India and beyond.",
    "From roads we’ve ridden to stays we’ve lived — this is travel done right."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIdx((prev) => (prev + 1) % titles.length);
    }, 5000);
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
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 z-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'
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

          <h1 className="mt-4 text-[24px] font-normal leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[44px] max-w-[90%] min-h-[80px] sm:min-h-[120px] lg:min-h-[140px]" style={{ fontFamily: '"vaccine", serif' }}>
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
          className="absolute bottom-12 left-5 sm:bottom-28 sm:left-12 lg:left-24 w-[calc(100%-40px)] sm:w-[90%] max-w-3xl"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const params = new URLSearchParams();
              if (destination) params.set('search', destination);
              router.push(`/trips?${params.toString()}`);
            }}
            className="flex items-stretch overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
          >
            <div className="flex flex-1 flex-col justify-center border-r border-white/10 px-4 py-2.5 sm:px-5 sm:py-3.5 group">
              <span className="text-[10px] sm:text-[12px] font-medium uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: '"vaccine", serif' }}>Destination</span>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-0.5 bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-white/60 focus:outline-none w-full"
                style={{ fontFamily: '"vaccine", serif' }}
              />
            </div>
            <div className="hidden flex-1 flex-col justify-center border-r border-white/10 px-4 py-2.5 sm:px-5 sm:py-3.5 sm:flex group">
              <span className="text-[10px] sm:text-[12px] font-medium uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: '"vaccine", serif' }}>Month</span>
              <input
                type="text"
                placeholder="Any time"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="mt-0.5 bg-transparent text-sm sm:text-base font-medium text-white placeholder:text-white/60 focus:outline-none w-full"
                style={{ fontFamily: '"vaccine", serif' }}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center bg-white px-5 sm:px-8 text-[#122822] transition-all hover:bg-slate-200 active:scale-95"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
