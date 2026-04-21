'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertTriangle, Backpack, Heart, Mountain, Shield, Shirt, Thermometer, Droplets } from 'lucide-react';

const guidelines = [
  {
    icon: Mountain,
    title: 'Altitude Awareness',
    details: [
      'Be prepared for altitudes above 10,000 ft on Ladakh and Spiti trips.',
      'Acclimatize for at least 24 hours before strenuous activities.',
      'Stay hydrated and avoid alcohol at high altitudes.',
      'Inform guides immediately if you feel symptoms of altitude sickness.',
    ],
  },
  {
    icon: Shirt,
    title: 'Packing Essentials',
    details: [
      'Layered clothing for temperature changes (hot days, cold nights).',
      'Sturdy trekking shoes with good ankle support.',
      'Sunscreen (SPF 50+), sunglasses, and a wide-brim hat.',
      'A personal first-aid kit with your prescribed medications.',
    ],
  },
  {
    icon: Shield,
    title: 'Safety Protocols',
    details: [
      'Always follow the guide\'s instructions, especially on mountain roads.',
      'Wear seatbelts in vehicles and helmets on bikes at all times.',
      'Do not venture off the marked trails without a guide.',
      'Emergency contacts will be provided before every trip.',
    ],
  },
  {
    icon: Heart,
    title: 'Health & Fitness',
    details: [
      'Basic fitness is required — start light cardio 2-3 weeks before your trip.',
      'Carry any prescribed medications and inform us about allergies.',
      'Eat light, hygienic food. Drink only bottled or purified water.',
      'Get a general health checkup if you have pre-existing conditions.',
    ],
  },
  {
    icon: Thermometer,
    title: 'Weather Preparedness',
    details: [
      'Mountain weather changes rapidly — always carry a rain jacket.',
      'Temperatures can drop below 0°C at night even in summer.',
      'Flash floods are possible during monsoon — follow road advisories.',
      'Check the weather forecast before outdoor activities.',
    ],
  },
  {
    icon: Droplets,
    title: 'Environmental Responsibility',
    details: [
      'Carry a reusable water bottle to reduce plastic waste.',
      'Do not litter — carry biodegradable bags for waste.',
      'Respect wildlife and do not feed wild animals.',
      'Use eco-friendly toiletries at camp and homestay locations.',
    ],
  },
  {
    icon: Backpack,
    title: 'Documents & Permits',
    details: [
      'Carry original govt. ID (Aadhar, Passport) at all times.',
      'Inner line permits required for restricted areas (Ladakh, Spiti).',
      'Keep 2 passport-size photos and copies of all documents.',
      'Vehicle registration documents for self-drive trips.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Information',
    details: [
      'Save emergency numbers provided in the trip briefing.',
      'Learn basic distress signals for remote areas.',
      'Keep your phone charged and carry a power bank.',
      'Inform your emergency contact about your itinerary and dates.',
    ],
  },
];

export default function GuidelinesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/d64bcf8e-b8bb-406c-9121-5dc05c695a0f.JPG" alt="Travel guidelines" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Preparation</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Travel Guidelines
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Important information to ensure a safe, comfortable, and unforgettable adventure.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 sm:grid-cols-2">
            {guidelines.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl border border-slate-100 bg-[#f8f9fa] p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#122822]/10 text-[#122822]">
                    <g.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#122822]">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {g.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#122822]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
