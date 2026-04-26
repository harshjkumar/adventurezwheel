'use client';

import { motion } from 'framer-motion';

export function QuoteSection() {
  return (
    <section className="bg-transparent px-6 pt-12 pb-8 lg:px-12 lg:pt-16 lg:pb-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#122822]/90 font-bold whitespace-pre-line"
            style={{ fontFamily: '"courier-new", sans-serif', fontWeight: 600, fontStyle: 'normal' }}
          >
            "Born from a restless heart and an open road, we exist for those who travel not to escape life — but to truly live it.
            Every route here has been ridden, every experience felt firsthand.
            This is travel built by wanderers, for wanderers"
          </h2>
          <div className="mt-6 mx-auto h-px w-12 bg-[#122822]/10" />
        </motion.div>
      </div>
    </section>
  );
}
