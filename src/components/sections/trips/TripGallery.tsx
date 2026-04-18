'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface TripGalleryProps {
  images: string[];
}

export function TripGallery({ images }: TripGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!images || images.length === 0) return null;

  return (
    <section ref={ref} id="gallery" className="relative overflow-hidden py-20">
      <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#122822]/10 to-transparent" />
      <div className="mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#122822]">
            ── Gallery
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light text-[#122822] md:text-4xl">
            Moments on the Trail
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08 * idx }}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#122822]/5"
            >
              <Image
                src={imgSrc}
                alt={`Trip gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
