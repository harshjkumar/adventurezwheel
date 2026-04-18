'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Mountain, Map, Info, Star, Phone, Instagram, Mail } from 'lucide-react';
import type { TripData } from '@/data/trips';
import { TripItinerary } from './TripItinerary';
import { TripPricing } from './TripPricing';
import { TripBookingWidget } from './TripBookingWidget';
import { TripGallery } from './TripGallery';

export default function TripDetailClient({ trip }: { trip: TripData }) {
  return (
    <div className="relative min-h-screen bg-[#faf7f2]">
      <div className="relative z-10">

        {/* ── Hero Banner (Card Style) ───────────────────────── */}
        <div className="relative mb-8 w-full border-b border-[#122822]/10 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Main Background Image - Blurred */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={trip.heroImage}
              alt="Background"
              fill
              priority
              className="object-cover blur-[8px] scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#faf7f2]/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#eef2f3] rounded-lg shadow-2xl p-3 sm:p-5 mx-auto max-w-4xl"
            >
              {/* Inner Image Container */}
              <div className="relative h-[50vh] md:h-[60vh] w-full rounded-md overflow-hidden">
                <Image
                  src={trip.heroImage}
                  alt={trip.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
                <div className="absolute bottom-4 left-4">
                  <button className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#122822] rounded-sm hover:bg-white transition-colors">
                    Show All Photos
                  </button>
                </div>
              </div>

              {/* Bottom Card Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch py-6 px-4 md:px-8 bg-[#eef2f3]">
                {/* Details List */}
                <div className="w-full sm:w-1/2 flex items-center">
                  <ul className="space-y-1.5 text-[#122822]/80 text-sm font-medium">
                    <li className="flex items-center gap-2">
                       <span className="h-1.5 w-1.5 bg-[#122822] rounded-full" /> {trip.durationDays} days
                    </li>
                    <li className="flex items-center gap-2">
                       <span className="h-1.5 w-1.5 bg-[#122822] rounded-full" /> {trip.durationNights} nights
                    </li>
                    <li className="flex items-center gap-2">
                       <span className="h-1.5 w-1.5 bg-[#122822] rounded-full" /> {trip.mealsIncluded.split('(')[0].trim()}
                    </li>
                  </ul>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px border-l border-dashed border-[#122822]/30 mx-4" />
                <div className="sm:hidden w-full h-px border-t border-dashed border-[#122822]/30 my-4" />

                {/* Price */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center sm:items-start sm:pl-8">
                  <span className="text-[#122822]/70 text-xs font-semibold uppercase tracking-widest mb-1">From:</span>
                  <div className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-semibold text-[#122822]">
                    ₹{trip.pricing[0]?.price.toLocaleString()}*
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Title / Header below the card */}
            <div className="text-center mt-12 mb-4">
               <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-5xl text-[#122822] drop-shadow-sm">
                 {trip.title}
               </h1>
            </div>
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────── */}
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">

            {/* Left Column: Details */}
            <div className="w-full lg:w-2/3">
              {/* Quick Stats */}
              <motion.div
                className="mb-16 grid grid-cols-2 gap-6 border-b border-[#122822]/10 pb-12 md:grid-cols-3"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
              >
                {[
                  { icon: Clock, label: 'Duration', value: `${trip.durationDays} Days, ${trip.durationNights} Nights` },
                  { icon: Map, label: 'Region', value: trip.region },
                  { icon: Mountain, label: 'Max Altitude', value: `${trip.maxAltitudeFt.toLocaleString()} ft` },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="flex flex-col gap-2"
                  >
                    <stat.icon className="mb-2 text-[#122822]" size={28} strokeWidth={1.5} />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#122822]/50">
                      {stat.label}
                    </span>
                    <span className="text-lg font-medium tracking-tight text-[#122822]">{stat.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Overview */}
              <motion.div
                id="overview"
                className="mb-16 scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-6 flex items-center gap-3 font-[family-name:var(--font-heading)] text-3xl text-[#122822] md:text-4xl">
                  <Info className="text-[#122822]" size={32} strokeWidth={1} />
                  Overview
                </h2>
                <p className="whitespace-pre-line text-lg leading-relaxed text-[#122822]/70">
                  {trip.description}
                </p>

                {/* Highlights */}
                <div className="mt-8 rounded-sm border border-[#122822]/10 bg-[#122822]/5 p-8">
                  <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#122822]">
                    <Star className="fill-[#122822] text-[#122822]" size={16} />
                    Trip Highlights
                  </h3>
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {trip.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-[#122822]/70"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#122822]" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Itinerary */}
              {trip.itinerary.length > 0 && (
                <motion.div
                  id="itinerary"
                  className="mb-20 scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-10 flex items-center gap-3">
                    <Map className="text-[#122822]" size={32} strokeWidth={1} />
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[#122822] md:text-4xl">
                      Detailed Itinerary
                    </h2>
                  </div>
                  <TripItinerary itinerary={trip.itinerary} coverImage={trip.coverImage} />
                </motion.div>
              )}

              {/* Pricing & Inclusions */}
              {(trip.pricing.length > 0 || trip.inclusions.length > 0) && (
                <motion.div
                  id="pricing"
                  className="mb-20 scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-10 flex items-center gap-3">
                    <Star className="fill-[#122822] text-[#122822]" size={32} strokeWidth={1} />
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[#122822] md:text-4xl">
                      Pricing & Details
                    </h2>
                  </div>
                  <TripPricing pricing={trip.pricing} inclusions={trip.inclusions} exclusions={trip.exclusions} />
                </motion.div>
              )}

              {/* Gear & Guidelines */}
              <motion.div
                className="scroll-mt-32 rounded-sm border border-[#122822]/10 bg-[#122822]/5 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl uppercase tracking-tight text-[#122822]">
                  Essential Gear & Preparation
                </h3>
                <p className="mb-4 leading-relaxed text-[#122822]/70">
                  Proper gear is essential for your safety and comfort. We provide a comprehensive packing list upon
                  booking. Ensure you have high-quality trekking boots, thermal layers, and a suitable daypack.
                </p>
                <Link
                  href="/guidelines"
                  className="text-sm font-semibold uppercase tracking-widest text-[#122822] underline underline-offset-4 transition-colors hover:text-[#122822]/70"
                >
                  View Travel Guidelines
                </Link>
              </motion.div>

              {/* Trip Gallery */}
              {trip.galleryImages.length > 0 && (
                <div className="mt-24">
                  <TripGallery images={trip.galleryImages} />
                </div>
              )}

              {/* Contact Banner */}
              <div className="mt-16 rounded-sm bg-[#122822] p-8 text-center text-white md:p-12 mb-24 md:mb-0">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl">
                  Adventures Wheel — Navigator by Soul
                </h3>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                  <a href={`tel:${trip.contactPhone}`} className="flex items-center gap-2 hover:text-white">
                    <Phone size={16} /> {trip.contactPhone}
                  </a>
                  <a href={`https://instagram.com/${trip.contactInstagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                    <Instagram size={16} /> @{trip.contactInstagram}
                  </a>
                  <a href={`mailto:${trip.contactEmail}`} className="flex items-center gap-2 hover:text-white">
                    <Mail size={16} /> {trip.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Booking Widget */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-32" id="booking">
                <TripBookingWidget trip={trip} />
              </div>
            </div>
          </div>
        </div>
        
        {/* ── Sticky Bottom Bar ───────────────────────────────── */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#122822] text-white shadow-2xl py-3 px-6 hidden md:flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-sm overflow-hidden border border-white/20">
              <Image src={trip.heroImage} alt={trip.title} fill className="object-cover" sizes="48px" />
            </div>
            <span className="font-[family-name:var(--font-heading)] font-semibold text-lg">{trip.displayTitle || trip.title}</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-white/70 hover:text-white text-xs uppercase tracking-widest font-semibold pb-1 border-b border-white/20 hover:border-white transition-all">
              Share
            </button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#faf7f2] text-[#122822] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-sm">
              Departures & Prices
            </button>
            <a href={`tel:${trip.contactPhone}`} className="bg-[#1e61d4] hover:bg-[#164cb0] text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors rounded-sm shadow-md">
              Contact an Agency
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}
