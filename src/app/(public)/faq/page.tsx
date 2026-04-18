'use client';

import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqItems } from '@/data/home';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery
    ? faqItems.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/7d4eaaa5-bc8c-4cd5-a0de-dbf472184965.jpg" alt="FAQ" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Support</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Frequently asked questions
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Find answers to the most common questions about our trips.
          </p>
        </div>
      </section>

      {/* Search + FAQ */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {/* Search */}
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-[#f8f9fa] py-4 pl-12 pr-4 text-sm focus:border-[#2596be] focus:outline-none focus:ring-1 focus:ring-[#2596be]"
            />
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-[#f8f9fa] shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-100"
                >
                  <span className="text-lg font-semibold text-[#122822]">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[#2596be] transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-slate-200 px-6 py-5 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-2xl bg-[#f8f9fa] p-12 text-center">
                <p className="text-slate-500">No matching questions found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}