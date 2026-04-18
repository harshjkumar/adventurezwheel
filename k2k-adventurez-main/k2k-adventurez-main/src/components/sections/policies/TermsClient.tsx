"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const sections = [
  {
    title: "1. Payment Policy",
    content: [
      "The full and final payment of the package must be completed at least 30 days prior to the departure date. If the payment is not received within this period, the booking will be automatically cancelled without prior notice, and no refund will be issued."
    ]
  },
  {
    title: "2. Personal Belongings",
    content: [
      "Participants are solely responsible for their personal belongings during the trip. K2K Adventurez will not be responsible for any loss, theft, or damage."
    ]
  },
  {
    title: "3. Safety Guidelines",
    content: [
      "All participants must follow the safety and security instructions provided by the tour leader or organizing team to ensure a safe and smooth journey."
    ]
  },
  {
    title: "4. Packing Guidance",
    content: [
      "A “Things to Carry” list and packing guidelines will be shared before the trip to help participants prepare properly and ensure they bring all necessary items."
    ]
  },
  {
    title: "5. Driving & Riding Responsibility",
    content: [
      "Participants who drive or ride during the trip are fully responsible for their own safety and conduct on the road. K2K Adventurez will not be responsible for any accidents caused due to unsafe or negligent driving/riding."
    ]
  },
  {
    title: "6. Accident, Illness or Injury",
    content: [
      "In case of an accident, illness, or injury, our team will assist in arranging medical help or emergency support. However, all medical expenses and related costs must be borne by the participant."
    ]
  },
  {
    title: "7. High Altitude Travel",
    content: [
      "During trips to high-altitude destinations, participants must strictly follow the health and safety guidelines provided by the tour leader to avoid altitude-related health issues."
    ]
  },
  {
    title: "8. Fitness Declaration",
    content: [
      "By registering for the trip, participants confirm that they are physically and mentally fit to undertake the journey and adventure activities included in the itinerary."
    ]
  },
  {
    title: "9. Damage Liability",
    content: [
      "Any damage caused by a participant to vehicles, hotel property, equipment, or any other element during the trip will be charged to the participant."
    ]
  },
  {
    title: "10. Bike + Fuel Package Policy",
    content: [
      "Participants who opt for the Bike + Fuel Package are required to pay a security deposit of ₹5,000. This amount is fully refundable once the bike is returned at the end of the trip in proper condition. Bikes will be provided on Day 1 in the evening after completing necessary paperwork and vehicle inspection. The security deposit is mandatory, and bikes will not be handed over without the deposit. If any damage occurs to the bike during the trip, the repair cost will be deducted from the security deposit, and additional charges (if applicable) must be paid by the participant."
    ]
  }
];

export function TermsClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden">
        <Image src="/images/trips/3.webp" alt="Terms and Conditions" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.div {...fadeUp}>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white">
              Terms & Conditions
            </h1>
            <p className="mt-6 max-w-xl text-white/70 text-sm md:text-base mx-auto">
              Please read our terms and conditions carefully before booking your expedition with K2K Adventurez.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Policy Sections ──────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-16">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-6">
                {s.title}
              </h2>
              <div className="space-y-4">
                {s.content.map((p, j) => (
                  <p key={j} className="text-sm text-charcoal/60 leading-relaxed">{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
