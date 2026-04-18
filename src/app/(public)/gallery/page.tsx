'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { galleryImages } from '@/data/home';

const categories = ['All', ...Array.from(new Set(galleryImages.map((img) => img.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === 'All' ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/cc934709-69bd-4eeb-9f70-83aa1636c9ee.JPG" alt="Gallery" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Gallery</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Moments from our adventures
          </h1>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Filter chips */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                  cat === active
                    ? 'border-[#122822] bg-[#122822] text-white'
                    : 'border-slate-300 bg-white text-[#122822] hover:border-[#2596be]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <motion.div layout className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    onClick={() => setLightbox(i)}
                    className="group relative block w-full overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.url}
                      alt={img.title}
                      width={600}
                      height={i % 3 === 0 ? 800 : 500}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div>
                        <span className="text-sm font-semibold text-white">{img.title}</span>
                        <span className="ml-2 text-xs text-white/70">{img.category}</span>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setLightbox(null)}>
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].url}
                alt={filtered[lightbox].title}
                width={1200}
                height={800}
                className="max-h-[85vh] rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-white">{filtered[lightbox].title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}