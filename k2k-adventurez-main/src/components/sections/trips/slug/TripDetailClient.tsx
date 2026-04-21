"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Mountain, Map, Info, Star } from "lucide-react";
import { Trip } from "@/types/trip";
import { TripItinerary } from "./TripItinerary";
import { TripPricing } from "./TripPricing";
import { TripBookingWidget } from "./TripBookingWidget";
import { TripGallery } from "./TripGallery";

const HERO_IMAGES = [
  "/images/trips/1.webp",
  "/images/trips/2.webp",
  "/images/trips/3.webp",
  "/images/trips/4.webp",
  "/images/trips/5.webp",
];

interface TripDetailClientProps {
  trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  // Pick a consistent hero image based on the trip slug
  const heroImage = useMemo(() => {
    if (trip.heroImage) return trip.heroImage;
    if (trip.coverImage) return trip.coverImage;
    const hash = (trip.slug || trip.title || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return HERO_IMAGES[hash % HERO_IMAGES.length];
  }, [trip.slug, trip.title, trip.coverImage]);

  return (
    <div className="relative bg-[#FAF9F6] min-h-screen">
      {/* Background Map */}
      <div className="bg-map-texture" />

      <div className="relative z-10">

        {/* Unified Hero Banner */}
        <div className="relative w-full border-b border-charcoal/10 mb-8">
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={heroImage}
                alt={trip.title}
                fill
                priority
                className="object-cover object-top"
                sizes="100vw"
              />
            </div>
            {/* Fades to white near the bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FAF9F6]" />
          </div>

          {/* Top Offset to push title down */}
          <div className="relative pt-[22vh] md:pt-[26vh]" />

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-16"
          >
            <span className="font-nav text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80 mb-4 drop-shadow-md">
              {trip.category || "Expedition"}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white drop-shadow-lg leading-tight max-w-4xl">
              {trip.title}
            </h1>
            {trip.tagline && (
              <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl font-light drop-shadow">
                {trip.tagline}
              </p>
            )}
          </motion.div>

          {/* Hero Meta & Page Navigation */}
          <div className="relative z-10 pb-12 md:pb-16 px-6 lg:px-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="flex justify-center items-center gap-4 mb-3">
                  <span className="font-nav text-xs uppercase tracking-[0.2em] text-accent border border-accent/20 px-4 py-1.5 rounded-full bg-[#FAF9F6]/95 shadow-sm">
                    {trip.category || "Expedition"}
                  </span>
                  <span className="font-nav text-xs uppercase tracking-[0.2em] text-charcoal flex items-center gap-1 drop-shadow-sm">
                    <Star size={12} className="fill-accent text-accent drop-shadow-sm" /> {trip.rating} <span className="text-charcoal/60 font-medium">({trip.reviewCount})</span>
                  </span>
                </div>

                {trip.displayTitle && (
                  <p className="font-nav text-sm md:text-base font-semibold uppercase tracking-[0.15em] text-accent mb-2 pt-2 drop-shadow-sm">
                    {trip.displayTitle}
                  </p>
                )}

                {/* In-page Navigation Links */}
                <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="px-6 py-3 rounded-full border border-charcoal/20 text-xs font-nav uppercase tracking-widest text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-[#FAF9F6] transition-all shadow-sm bg-[#FAF9F6]/90"
                  >
                    Overview
                  </button>
                  {trip.itinerary?.length > 0 && (
                    <button
                      onClick={() => document.getElementById('itinerary')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="px-6 py-3 rounded-full border border-charcoal/20 text-xs font-nav uppercase tracking-widest text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-[#FAF9F6] transition-all shadow-sm bg-[#FAF9F6]/90"
                    >
                      Itinerary
                    </button>
                  )}
                  {(trip.pricing?.length > 0 || trip.inclusions?.length > 0) && (
                    <button
                      onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="px-6 py-3 rounded-full border border-charcoal/20 text-xs font-nav uppercase tracking-widest text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-[#FAF9F6] transition-all shadow-sm bg-[#FAF9F6]/90"
                    >
                      Pricing
                    </button>
                  )}
                  {trip.galleryImages?.length > 0 && (
                    <button
                      onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="px-6 py-3 rounded-full border border-charcoal/20 text-xs font-nav uppercase tracking-widest text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-[#FAF9F6] transition-all shadow-sm bg-[#FAF9F6]/90"
                    >
                      Gallery
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Left Column: Details */}
            <div className="w-full lg:w-2/3">
              {/* Quick Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-charcoal/10"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {[
                  { icon: Clock, label: "Duration", value: `${trip.durationDays} Days, ${trip.durationNights} Nights` },
                  { icon: Map, label: "Region", value: trip.region },
                  { icon: Mountain, label: "Max Altitude", value: `${trip.maxAltitudeFt.toLocaleString()} ft` },
                ].map((stat, idx) => (
                  <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="flex flex-col gap-2">
                    <stat.icon className="text-accent mb-2" size={28} strokeWidth={1.5} />
                    <span className="text-xs font-nav uppercase tracking-widest text-charcoal/50">{stat.label}</span>
                    <span className="font-sans font-medium text-lg text-charcoal tracking-tight">{stat.value}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Overview */}
              <motion.div
                id="overview"
                className="mb-16 scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-6 flex items-center gap-3">
                  <Info className="text-accent" size={32} strokeWidth={1} />
                  Overview
                </h2>
                <p className="text-charcoal/70 leading-relaxed text-lg whitespace-pre-line">
                  {trip.description}
                </p>

                <div className="mt-8 bg-charcoal/5 rounded-xl p-8 border border-charcoal/10">
                  <h3 className="font-nav text-sm uppercase tracking-widest text-charcoal mb-6 flex items-center gap-2">
                    <Star className="text-accent fill-accent" size={16} />
                    Trip Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(trip.highlights || []).map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-charcoal/70"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Itinerary */}
              {trip.itinerary?.length > 0 && (
                <motion.div
                  id="itinerary"
                  className="mb-20 scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-10">
                    <Map className="text-accent" size={32} strokeWidth={1} />
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Detailed Itinerary</h2>
                  </div>
                  <TripItinerary itinerary={trip.itinerary} />
                </motion.div>
              )}

              {/* Pricing & Inclusions */}
              {(trip.pricing?.length > 0 || trip.inclusions?.length > 0) && (
                <motion.div
                  id="pricing"
                  className="mb-20 scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-10">
                    <Star className="text-accent fill-accent" size={32} strokeWidth={1} />
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal">Pricing & Details</h2>
                  </div>
                  <TripPricing
                    pricing={trip.pricing || []}
                    inclusions={trip.inclusions || []}
                    exclusions={trip.exclusions || []}
                  />
                </motion.div>
              )}

              {/* Preparation Policy / Gear Guide */}
              <motion.div
                className="bg-accent/5 rounded-2xl p-8 border border-accent/10 scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h3 className="font-serif text-2xl text-accent mb-4 uppercase tracking-tight">Essential Gear & Preparation</h3>
                <p className="text-charcoal/70 mb-4 leading-relaxed">
                  Proper gear is essential for your safety and comfort. We provide a comprehensive packing list upon booking. Ensure you have high-quality trekking boots, thermal layers, and a suitable daypack.
                </p>
                <a href="/guidelines" className="text-sm font-nav uppercase tracking-widest text-charcoal hover:text-accent transition-colors underline underline-offset-4">
                  View Travel Guidelines
                </a>
              </motion.div>

              {/* Trip Gallery */}
              {trip.galleryImages?.length > 0 && (
                <div className="mt-24">
                  <TripGallery images={trip.galleryImages} />
                </div>
              )}

            </div>

            {/* Right Column: Sidebar / Booking Widget */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-32" id="booking">
                <TripBookingWidget trip={trip} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
