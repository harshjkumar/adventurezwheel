'use client';

import { motion } from 'framer-motion';

export function QuoteSection() {
  return (
    <section className="bg-white px-6 pt-12 pb-4 lg:px-12 lg:pt-16 lg:pb-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 
            className="text-xl sm:text-2xl lg:text-3xl italic leading-relaxed text-[#122822]/60"
            style={{ fontFamily: 'vaccine, serif', fontWeight: 200 }}
          >
            "From roads we've ridden to stays we've lived — every journey crafted by experts, built to leave a mark on your soul."
          </h2>
          <div className="mt-6 mx-auto h-px w-12 bg-[#122822]/10" />
        </motion.div>
      </div>
    </section>
  );
}
