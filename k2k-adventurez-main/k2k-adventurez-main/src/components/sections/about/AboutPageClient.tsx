"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Mountain,
  Bike,
  Landmark,
  Package,
  Users,
  ShieldCheck,
  Map,
  Headphones,
  Clock,
  Heart,
  Leaf,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const offers = [
  { icon: Compass, title: "Adventure Tours", desc: "Push your limits with thrilling experiences." },
  { icon: Mountain, title: "High-Altitude Trips", desc: "Conquer the mighty Himalayas." },
  { icon: Bike, title: "Bike Expeditions", desc: "The ultimate freedom on two wheels." },
  { icon: Landmark, title: "Cultural Tours", desc: "Immerse in local heritage." },
  { icon: Package, title: "Custom Packages", desc: "Tailored to your perfect itinerary." },
  { icon: Users, title: "Group & Family", desc: "Shared memories that last a lifetime." },
];

const whyUs = [
  { icon: Map, title: "Expert Planners", desc: "Experienced professionals who design smooth and memorable journeys." },
  { icon: Compass, title: "Smart Itineraries", desc: "Well-planned travel routes that help you experience the best of every destination." },
  { icon: ShieldCheck, title: "Trusted Network", desc: "Reliable guides, partners, and service providers ensuring quality." },
  { icon: Heart, title: "Safety & Comfort", desc: "Your safety and comfort are our absolute highest priorities." },
  { icon: Headphones, title: "24/7 Support", desc: "Friendly assistance from the moment you plan until you return home." },
];

const globalPresence = [
  {
    country: "Delhi",
    address: "Head office - A-190, G Block, Phase 6, Arjan Garh, South Delhi – 110047",
    email: "info@k2kadventurez.com",
    contact: "+91 9899157292",
  },
  {
    country: "Leh Ladakh",
    address: "S.NO 2, G.H Road, Near Shanti Stupa, Leh, Ladakh - 194101",
    email: "info@k2kadventurez.com",
    contact: "+91 97188 00082",
  },
  {
    country: "Australia",
    address: "5, Patchouli Street, Truganina, Victoria, Australia - 3029",
    email: "reservation@k2kadventurez.com",
    contact: "+61 403053422",
  },
  {
    country: "Canada",
    address: "155, Eden Oak Trail, Kitchener, Ontario – N2A0H9",
    email: "reservation@k2kadventurez.com",
    contact: "+91 8595157292",
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export function AboutPageClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden pt-[88px] lg:pt-[96px]">
        <div className="absolute inset-0">
          <Image
            src="/images/trips/2.webp"
            alt="About K2K Adventurez"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-14 md:py-20 lg:py-24 min-h-[560px] md:min-h-[640px] flex items-center">
          <motion.div
            {...fadeUp}
            className="w-full max-w-3xl rounded-2xl border border-white/20 bg-black/25 backdrop-blur-[2px] p-7 sm:p-9 md:p-11"
          >
            <p className="font-nav text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-accent mb-5">
              About K2K Adventurez
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08]">
              Discover the Spirit
              <br className="hidden sm:block" />
              of Adventure
            </h1>

            <p className="mt-6 max-w-2xl text-white/85 text-base md:text-lg leading-relaxed font-serif italic">
              "We craft unforgettable journeys through Ladakh, Spiti, Kashmir, and beyond,
              blending raw adventure with thoughtful planning, safety, and local insight."
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3.5 py-1.5 text-[10px] md:text-xs font-nav uppercase tracking-[0.2em] rounded-full border border-white/30 text-white/90 bg-white/10">
                Himalayan Expeditions
              </span>
              <span className="px-3.5 py-1.5 text-[10px] md:text-xs font-nav uppercase tracking-[0.2em] rounded-full border border-white/30 text-white/90 bg-white/10">
                Curated Routes
              </span>
              <span className="px-3.5 py-1.5 text-[10px] md:text-xs font-nav uppercase tracking-[0.2em] rounded-full border border-white/30 text-white/90 bg-white/10">
                Rider-First Support
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Vision ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...fadeUp} className="relative">
              <div className="absolute -top-2 left-0 w-12 h-1 bg-accent" />
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6 pt-6">
                Our Mission
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed font-serif font-light">
                Our mission is to make every trip feel like an adventure worth
                remembering. With carefully crafted itineraries, reliable services,
                and a passion for exploration, we create travel experiences that stay
                with you long after the journey ends.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="relative">
              <div className="absolute -top-2 left-0 w-12 h-1 bg-accent" />
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6 pt-6">
                Our Vision
              </h2>
              <p className="text-charcoal/70 text-lg leading-relaxed font-serif font-light">
                Our vision is to inspire more people to pack their bags, chase new
                horizons, and experience the world beyond the ordinary. We aim to
                create travel experiences that spark adventure and leave lasting
                memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-nav text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">
              WHAT WE OFFER
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal">
              Experiences Crafted <br className="hidden sm:block" />
              for the Brave
            </h2>
            <p className="mt-4 text-charcoal/70 max-w-2xl mx-auto text-lg font-serif italic font-light">
              Our itineraries are carefully designed to ensure that travelers
              experience the best destinations, attractions, and local culture.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white p-8 border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-14 h-14 bg-accent/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <item.icon size={28} strokeWidth={1.5} className="text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-charcoal/70 leading-relaxed font-serif font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Travel With Us ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white font-serif">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-accent mb-4">
              WHY TRAVEL WITH US
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal">
              The K2K Difference
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-accent/5 rounded-full flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <item.icon size={28} strokeWidth={1.5} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-light text-charcoal mb-2">
                  {item.title}
                </h3>
                  <p className="font-serif text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Responsible Tourism ───────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image src="/images/trips/4.webp" alt="Responsible travel" fill className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp}>
            <Leaf size={36} strokeWidth={1.5} className="mx-auto text-accent mb-6" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
              Responsible Tourism
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-serif italic font-light leading-relaxed max-w-3xl mx-auto">
              We strongly believe in responsible and sustainable tourism. Our goal is
              to promote travel that benefits local communities, protects the
              environment, and preserves cultural heritage for future generations.
              <br/><br/>
              <span className="text-accent font-medium">Leave nothing but tire tracks, take nothing but stories.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Global Presence ──────────────────────────────────── */}
      <section className="py-24 bg-stone-50 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-nav text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">
              Worldwide Reach
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
              Our Global Presence
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {globalPresence.map((loc, i) => (
              <motion.div 
                key={loc.country}
                {...fadeUp}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow rounded-sm flex flex-col h-full"
              >
                <h3 className="font-serif text-2xl font-light text-charcoal mb-4 flex items-center gap-2">
                  <MapPin size={22} className="text-accent" />
                  {loc.country}
                </h3>
                <p className="text-base text-charcoal/70 leading-relaxed font-serif font-light mb-6 flex-1">
                  {loc.address}
                </p>
                <div className="space-y-3 text-sm font-medium mt-auto">
                  <p className="flex items-center gap-3 text-charcoal/80">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-accent" />
                    </span>
                    <a href={`mailto:${loc.email}`} className="hover:text-accent transition-colors truncate text-xs">{loc.email}</a>
                  </p>
                  <p className="flex items-center gap-3 text-charcoal/80">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-accent" />
                    </span>
                    <a href={`tel:${loc.contact.replace(/\s+/g, '')}`} className="hover:text-accent transition-colors truncate">{loc.contact}</a>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal mb-6">
              Start Your Journey With Us
            </h2>
            <p className="text-charcoal/70 text-lg md:text-xl font-serif font-light italic leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you are looking for an adventurous road trip, a peaceful
              mountain getaway, or a unique cultural experience — K2K Adventurez is
              here to help you plan the perfect journey.
            </p>
            <p className="font-serif text-2xl font-light text-accent mb-12">
              &ldquo;Let us turn your travel dreams into unforgettable memories.&rdquo;
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-nav text-xs uppercase tracking-[0.2em] font-medium px-12 py-5 bg-charcoal text-white hover:bg-accent hover:shadow-[0_0_30px_rgba(200,20,30,0.4)] transition-all duration-300 rounded-sm"
            >
              Plan Your Adventure <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
