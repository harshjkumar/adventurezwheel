'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { PricingOption } from '@/data/trips';

interface TripPricingProps {
  pricing: PricingOption[];
  inclusions: string[];
  exclusions: string[];
}

export function TripPricing({ pricing, inclusions, exclusions }: TripPricingProps) {
  return (
    <div className="space-y-12">
      {/* Pricing Cards */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {pricing.map((option, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="group flex cursor-pointer flex-col justify-center rounded-sm border border-[#122822]/10 bg-[#faf7f2] p-8 text-center transition-all hover:border-[#122822] hover:shadow-md"
          >
            <h4 className="mb-2 text-lg font-bold uppercase tracking-widest text-[#122822]/60 transition-colors group-hover:text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
              {option.label}
            </h4>
            <div className="mb-2 text-4xl font-bold tracking-tight text-[#122822] transition-colors group-hover:text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
              ₹{option.price.toLocaleString('en-IN')}
              <span className="ml-1 text-base font-normal text-[#122822]/50">/ person</span>
            </div>
            {option.description && (
              <p className="text-sm text-[#122822]/40 font-medium" style={{ fontFamily: '"vaccine", serif' }}>{option.description}</p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Security deposit note */}
      <motion.div
        className="rounded-r-sm border-l-4 border-[#122822] bg-[#122822]/[0.03] p-8 shadow-sm"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xl leading-relaxed text-[#122822] font-medium" style={{ fontFamily: '"vaccine", serif' }}>
          <strong className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-[#122822]/60">
            Important Note
          </strong>
          Participants who opt for the <span className="font-bold">Bike + Fuel Package</span> are required
          to pay a security deposit of <span className="font-bold text-[#122822]">₹5,000</span>. This amount
          is fully refundable once the bike is returned at the end of the trip in proper condition.
        </p>
      </motion.div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="mb-6 flex items-center gap-2 text-2xl font-normal text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
            <CheckCircle2 className="text-[#122822]" size={28} /> What&apos;s Included
          </h4>
          <ul className="space-y-4">
            {inclusions.map((item, idx) => (
              <li key={idx} className="relative pl-7 text-lg leading-relaxed text-[#122822]/70 font-medium" style={{ fontFamily: '"vaccine", serif' }}>
                <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#122822]/20 bg-[#122822]/10">
                  <div className="h-2 w-2 rounded-full bg-[#122822]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="mb-6 flex items-center gap-2 text-2xl font-normal text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
            <XCircle className="text-[#122822]/40" size={28} /> What&apos;s Not Included
          </h4>
          <ul className="space-y-4">
            {exclusions.map((item, idx) => (
              <li key={idx} className="relative pl-7 text-lg leading-relaxed text-[#122822]/50 font-medium" style={{ fontFamily: '"vaccine", serif' }}>
                <span className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-[#122822]/20" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
