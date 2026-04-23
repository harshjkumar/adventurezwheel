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
  const heroImg = trip.heroImage || '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG';
  const coverImg = trip.coverImage || heroImg;
  return (
    <div className="relative min-h-screen bg-[#faf7f2]">
      <div className="relative z-10">

        {/* ── Hero Banner (Card Style) ───────────────────────── */}
        <div className="relative mb-12 w-full border-b border-[#122822]/10 pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          {/* Main Background Image - Blurred */}
          <div className="absolute inset-0 h-full w-full">
            <Image
              src={heroImg}
              alt="Background"
              fill
              priority
              className="object-cover blur-[10px] scale-110 opacity-60"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#faf7f2]/50 backdrop-blur-[4px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#eef2f3] rounded-xl shadow-2xl p-4 sm:p-6 mx-auto max-w-5xl"
            >
              {/* Inner Image Container */}
              <div className="relative h-[70vh] md:h-[85vh] w-full rounded-lg overflow-hidden">
                <Image
                  src={heroImg}
                  alt={trip.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <button className="bg-white/95 backdrop-blur-sm px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822] rounded-sm hover:bg-white transition-all shadow-lg active:scale-95">
                    Explore Gallery
                  </button>
                </div>
              </div>

              {/* Bottom Card Info */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch py-6 px-4 md:px-8 bg-[#eef2f3]">
                {/* Details List */}
                <div className="w-full sm:w-1/2 flex items-center">
                  <ul className="space-y-2 text-[#122822]/80 text-lg font-medium" style={{ fontFamily: '"vaccine", serif' }}>
                    <li className="flex items-center gap-2">
                       <span className="h-2 w-2 bg-[#122822] rounded-full" /> {trip.durationDays} days
                    </li>
                    <li className="flex items-center gap-2">
                       <span className="h-2 w-2 bg-[#122822] rounded-full" /> {trip.durationNights} nights
                    </li>
                    <li className="flex items-center gap-2">
                       <span className="h-2 w-2 bg-[#122822] rounded-full" /> {trip.mealsIncluded.split('(')[0].trim()}
                    </li>
                  </ul>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px border-l border-dashed border-[#122822]/30 mx-4" />
                <div className="sm:hidden w-full h-px border-t border-dashed border-[#122822]/30 my-4" />

                {/* Price */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center sm:items-start sm:pl-8">
                  <span className="text-[#122822]/70 text-[12px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: '"vaccine", serif' }}>From:</span>
                  <div className="text-4xl md:text-5xl font-bold text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
                    ₹{trip.pricing[0]?.price.toLocaleString()}*
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Title / Header below the card */}
            <div className="text-center mt-12 mb-4">
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#122822] drop-shadow-sm leading-[1.1]" style={{ fontFamily: '"vaccine", serif' }}>
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
                    <stat.icon className="mb-2 text-[#122822]" size={32} strokeWidth={1.5} />
                    <span className="text-[12px] font-bold uppercase tracking-widest text-[#122822]/50" style={{ fontFamily: '"vaccine", serif' }}>
                      {stat.label}
                    </span>
                    <span className="text-xl font-bold tracking-tight text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>{stat.value}</span>
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
                <h2 className="mb-6 flex items-center gap-3 text-3xl font-normal text-[#122822] md:text-4xl" style={{ fontFamily: '"vaccine", serif' }}>
                  <Info className="text-[#122822]" size={32} strokeWidth={1.5} />
                  Overview
                </h2>
                <p className="whitespace-pre-line text-xl leading-relaxed text-[#122822]/70 font-medium" style={{ fontFamily: '"vaccine", serif' }}>
                  {trip.description}
                </p>

                {/* Highlights */}
                <div className="mt-8 rounded-sm border border-[#122822]/10 bg-[#122822]/5 p-8">
                  <h3 className="mb-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
                    <Star className="fill-[#122822] text-[#122822]" size={16} />
                    Trip Highlights
                  </h3>
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {trip.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-[#122822]/70 text-lg font-medium"
                        style={{ fontFamily: '"vaccine", serif' }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#122822]" />
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
                    <Map className="text-[#122822]" size={32} strokeWidth={1.5} />
                    <h2 className="text-3xl font-normal text-[#122822] md:text-4xl" style={{ fontFamily: '"vaccine", serif' }}>
                      Detailed Itinerary
                    </h2>
                  </div>
                  <TripItinerary itinerary={trip.itinerary} coverImage={coverImg} />
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
                    <Star className="fill-[#122822] text-[#122822]" size={32} strokeWidth={1.5} />
                    <h2 className="text-3xl font-normal text-[#122822] md:text-4xl" style={{ fontFamily: '"vaccine", serif' }}>
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
                <h3 className="mb-4 text-2xl font-normal uppercase tracking-tight text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>
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


              {/* Contact Banner */}
              <div className="mt-16 rounded-sm bg-[#122822] p-8 text-center text-white md:p-12 mb-24 md:mb-0">
                <h3 className="text-2xl font-normal md:text-3xl" style={{ fontFamily: '"vaccine", serif' }}>
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

        {/* Full-width Gallery — outside the 2-col layout */}
        {trip.galleryImages.length > 0 && (
          <TripGallery images={trip.galleryImages} />
        )}
        
      </div>
    </div>
  );
}
