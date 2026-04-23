'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { destinationCards } from '@/data/home';

export function WhereToNext() {
  return (
    <section className="bg-transparent px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-normal uppercase tracking-wide text-[#122822] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: '"vaccine", serif' }}
          >
            Where to next?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-md text-sm leading-7 text-[#122822]/60 md:text-right"
          >
            Exclusive access to India&apos;s most breathtaking landscapes, tailored for the adventurous soul.
          </motion.p>
        </div>

        {/* Destination cards — horizontal scroll */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="hide-scrollbar -mx-2 flex gap-6 overflow-x-auto px-2 pb-4 lg:gap-8"
        >
          {destinationCards.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-[280px] shrink-0 sm:w-[320px] lg:w-[340px]"
            >
              <Link href={`/trips?category=${dest.slug}`} className="group block">
                {/* Tall portrait image */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                  />
                </div>
                {/* Title + description below image */}
                <div className="mt-5">
                  <h3 className="text-xl font-normal text-[#122822] transition-colors group-hover:text-[#122822]/70 lg:text-2xl" style={{ fontFamily: '"vaccine", serif' }}>
                    {dest.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#122822]/50">
                    {dest.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
