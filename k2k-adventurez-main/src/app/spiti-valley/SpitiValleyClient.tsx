"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TripListCard } from "@/components/sections/trips/TripListCard";
import type { Trip } from "@/types/trip";
import { Mountain, MapPin, Calendar, Users } from "lucide-react";

interface SpitiValleyClientProps {
  initialTrips: Trip[];
}

// All Spiti Valley related trip slugs
const SPITI_VALLEY_SLUGS = [
  "9-days-summer-spiti-valley-via-chandratal",
  "9-days-summer-spiti-valley-via-shimla",
];

const SPITI_HERO_IMAGE = "/images/trips/spiti/spiti-key-monastery.jpeg";
const SPITI_MAIN_IMAGE = "/images/trips/spiti/spiti-hero-2.jpeg";
const SPITI_IMPORTANT_PLACE_IMAGE = "/images/trips/spiti/spiti-hero-1.jpeg";

const SPITI_IMAGE_OVERRIDES: Record<string, { coverImage: string; heroImage: string; galleryImages: string[] }> = {
  "9-days-summer-spiti-valley-via-chandratal": {
    coverImage: "/images/trips/spiti/spiti-card-1.jpeg",
    heroImage: SPITI_MAIN_IMAGE,
    galleryImages: [
      "/images/trips/spiti/spiti-chandratal-1.jpeg",
      "/images/trips/spiti/spiti-chandratal-2.jpeg",
      "/images/trips/spiti/spiti-chandratal-3.jpeg",
      "/images/trips/spiti/spiti-wa-1.jpeg",
      "/images/trips/spiti/spiti-wa-2.jpeg",
      "/images/trips/spiti/spiti-wa-3.jpeg",
      "/images/trips/spiti/spiti-wa-4.jpeg",
      "/images/trips/spiti/spiti-key-monastery.jpeg",
      "/images/trips/spiti/spiti-pic-1.jpeg",
      "/images/trips/spiti/spiti-pic-2.jpeg",
    ],
  },
  "9-days-summer-spiti-valley-via-shimla": {
    coverImage: "/images/trips/spiti/spiti-card-2.jpeg",
    heroImage: SPITI_IMPORTANT_PLACE_IMAGE,
    galleryImages: [
      "/images/trips/spiti/spiti-shimla-1.jpeg",
      "/images/trips/spiti/spiti-shimla-2.jpeg",
      "/images/trips/spiti/spiti-shimla-3.jpeg",
      "/images/trips/spiti/spiti-wa-5.jpeg",
      "/images/trips/spiti/spiti-wa-6.jpeg",
      "/images/trips/spiti/spiti-wa-7.jpeg",
      "/images/trips/spiti/spiti-wa-8.jpeg",
      "/images/trips/spiti/spiti-wa-9.jpeg",
      "/images/trips/spiti/spiti-wa-10.jpeg",
    ],
  },
};

const STATS = [
  { icon: Mountain, value: "15,000 ft", label: "Highest Pass" },
  { icon: MapPin, value: "2", label: "Unique Routes" },
  { icon: Calendar, value: "May – Sep", label: "Best Season" },
  { icon: Users, value: "1000+", label: "Happy Riders" },
];

export function SpitiValleyClient({ initialTrips }: SpitiValleyClientProps) {
  // Filter only Spiti Valley related trips
  const spitiTrips = useMemo(() => {
    return initialTrips
      .filter(
        (trip) =>
          SPITI_VALLEY_SLUGS.includes(trip.slug) ||
          (trip.region && trip.region.toLowerCase().includes("spiti")) ||
          (trip.title && trip.title.toLowerCase().includes("spiti")) ||
          trip.categoryId === "cat-spiti"
      )
      .map((trip) => {
        const override = SPITI_IMAGE_OVERRIDES[trip.slug];
        if (!override) return trip;
        return {
          ...trip,
          coverImage: override.coverImage,
          heroImage: override.heroImage,
          galleryImages: override.galleryImages,
        };
      });
  }, [initialTrips]);

  const [durationFilter, setDurationFilter] = useState<string>("all");

  const filteredTrips = useMemo(() => {
    if (durationFilter === "all") return spitiTrips;
    const days = parseInt(durationFilter);
    return spitiTrips.filter((t) => t.durationDays === days);
  }, [spitiTrips, durationFilter]);

  const uniqueDurations = useMemo(() => {
    const durations = new Set(spitiTrips.map((t) => t.durationDays));
    return Array.from(durations).sort((a, b) => a - b);
  }, [spitiTrips]);

  return (
    <div className="relative bg-[#FAF9F6] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-charcoal text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${SPITI_HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-nav uppercase tracking-[0.3em] text-accent mb-4">
              Destination
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6">
              SPITI VALLEY
            </h1>
            <p className="text-warm-gray text-lg max-w-2xl leading-relaxed mb-12">
              Explore the Middle Land — from the pristine Chandratal Lake to
              the ancient Key Monastery. Choose from our spectacular expeditions
              covering every legendary route through the Himalayas.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 border border-white/10 rounded-lg p-4 bg-white/10"
                >
                  <stat.icon
                    size={22}
                    className="text-accent flex-shrink-0"
                  />
                  <div>
                    <p className="text-lg font-bold leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-warm-gray uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-map-texture" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-1">
              All Spiti Valley Expeditions
            </h2>
            <p className="text-sm text-charcoal/50">
              {filteredTrips.length} expedition
              {filteredTrips.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setDurationFilter("all")}
              className={`px-4 py-2 text-xs font-nav uppercase tracking-widest rounded-full border transition-colors ${
                durationFilter === "all"
                  ? "bg-charcoal text-white border-charcoal"
                  : "bg-white text-charcoal/70 border-charcoal/20 hover:border-charcoal/40"
              }`}
            >
              All
            </button>
            {uniqueDurations.map((d) => (
              <button
                key={d}
                onClick={() => setDurationFilter(String(d))}
                className={`px-4 py-2 text-xs font-nav uppercase tracking-widest rounded-full border transition-colors ${
                  durationFilter === String(d)
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-charcoal/70 border-charcoal/20 hover:border-charcoal/40"
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Trip Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip, idx) => (
            <TripListCard key={trip.id} trip={trip} index={idx} />
          ))}
        </div>

        {/* Spiti Visual Highlights */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative min-h-[320px] rounded-sm overflow-hidden border border-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url('${SPITI_MAIN_IMAGE}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-2xl text-white">Spiti Valley Main Landscape</h3>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative min-h-[320px] rounded-sm overflow-hidden border border-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url('${SPITI_HERO_IMAGE}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-2xl text-white">Key Monastery</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative min-h-[320px] rounded-sm overflow-hidden border border-gray-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 md:col-span-2 lg:col-span-1"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-105"
              style={{ backgroundImage: `url('${SPITI_IMPORTANT_PLACE_IMAGE}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-2xl text-white">Spiti High-Altitude Route</h3>
            </div>
          </motion.div>
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-32 text-charcoal/50">
            <p className="text-lg">No expeditions found for this filter.</p>
            <button
              onClick={() => setDurationFilter("all")}
              className="mt-4 text-sm text-accent underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white border border-charcoal/10 rounded-xl p-8 md:p-12"
        >
          <h3 className="font-serif text-2xl text-charcoal mb-4">
            Why Ride Spiti Valley with K2K?
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-charcoal/70 leading-relaxed">
            <div className="space-y-4">
              <p>
                Spiti Valley is the ultimate motorcycle destination in the Himalayas —
                a land of crystal-clear lakes, ancient monasteries, and stark
                desert landscapes that leave every rider spellbound. Our
                expeditions are designed for adventure seekers and passionate riders.
              </p>
              <p>
                Every K2K Spiti trip includes Royal Enfield bike rental, fuel,
                accommodation, meals, backup vehicles, oxygen support, and an
                experienced road captain — so you can focus solely on the ride
                and the experience.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Iconic Highlights:</strong> Shipki La, Kalpa, Nako,
                Key Monastery, Kibber, Chicham Bridge, Hikkim (World’s Highest Post Office),
                Langza, and Chandratal Lake.
              </p>
              <p>
                <strong>Flexible Options:</strong> Choose between our amazing 
                summer expeditions covering the entire circuit either via Chandratal 
                or via the beautiful Kinnaur.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
