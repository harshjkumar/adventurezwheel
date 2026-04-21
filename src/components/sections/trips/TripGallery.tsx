'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface TripGalleryProps {
  images: string[];
}

export function TripGallery({ images }: TripGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Double the images for seamless infinite loop
  const doubledImages = [...images, ...images];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // px per frame

    const animate = () => {
      scrollPos += speed;
      // Reset when we've scrolled through half (the original set)
      const halfWidth = el.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, doubledImages.length]);

  if (!images || images.length === 0) return null;

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative w-full overflow-hidden py-16 bg-[#faf7f2]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-10 px-6 lg:px-12 mx-auto max-w-[1440px]"
      >
        <span
          className="mb-3 inline-block text-[12px] font-bold uppercase tracking-[0.4em] text-[#122822]/50"
          style={{ fontFamily: '"vaccine", serif' }}
        >
          ── Gallery
        </span>
        <h2
          className="text-3xl font-normal text-[#122822] md:text-4xl"
          style={{ fontFamily: '"vaccine", serif' }}
        >
          Moments on the Trail
        </h2>
      </motion.div>

      {/* Full-width auto-scrolling row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {doubledImages.map((imgSrc, idx) => (
          <motion.div
            key={`gallery-${idx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.4) }}
            className="group relative h-[280px] w-[420px] shrink-0 overflow-hidden rounded-sm bg-[#122822]/5"
          >
            <Image
              src={imgSrc}
              alt={`Trip gallery image ${(idx % images.length) + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="420px"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
