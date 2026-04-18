'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { galleryImages } from '@/data/home';

export function GallerySection() {
  return (
    <section className="bg-[#faf7f2] py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#122822]/50">Gallery</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none text-[#122822]">
              Moments from the road
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-[#122822] transition-colors hover:text-[#122822]/60 md:inline-flex"
          >
            View All →
          </Link>
        </motion.div>
      </div>

      {/* Horizontal scrolling gallery */}
      <div className="hide-scrollbar flex gap-4 overflow-x-auto px-6 pb-4 lg:px-12">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group relative shrink-0 overflow-hidden rounded-sm"
            style={{ width: i % 3 === 0 ? '380px' : '300px' }}
          >
            <div className={`relative ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden`}>
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                <p className="text-sm font-semibold">{img.title}</p>
                <p className="text-xs text-white/70">{img.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
