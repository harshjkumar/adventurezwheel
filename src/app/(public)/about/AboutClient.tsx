'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Users, Heart, Award, Globe, Compass, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const offers = [
  { icon: Mountain, title: 'Mountain Expeditions', desc: 'High-altitude adventures across Ladakh, Spiti, and the Himalayas.' },
  { icon: Compass, title: 'Bike Tours', desc: 'Ride the highest motorable roads in the world with expert riders.' },
  { icon: Globe, title: 'Cultural Immersions', desc: 'Experience local traditions, monasteries, and village life.' },
  { icon: Users, title: 'Small Groups', desc: 'Intimate groups of 8-20 for authentic, meaningful experiences.' },
];

const values = [
  { icon: Heart, title: 'Passion', description: 'We live and breathe adventure, putting our heart into every itinerary.' },
  { icon: Shield, title: 'Trust', description: 'Transparent pricing, vetted partners, and unwavering commitment to safety.' },
  { icon: Users, title: 'Community', description: 'We believe small groups create lasting connections and deeper experiences.' },
  { icon: Award, title: 'Excellence', description: 'Delivering world-class, handcrafted travel experiences across India.' },
];

export default function AboutClient({ heroSlide }: { heroSlide?: any }) {
  const slide = heroSlide || {
    image: "/c8adc763-a691-488d-ab1c-a2fdccda6380.jpg",
    title: "Navigator by Soul",
    subtitle: "About Us"
  };

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <Image src={slide.image} alt={slide.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/60 via-[#122822]/40 to-[#122822]/80" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-6 pt-32 lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeIn} className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">{slide.subtitle}</motion.p>
            <motion.h1 variants={fadeIn} className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
              {slide.title}
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-6 max-w-xl text-lg text-white/80">
              Adventures Wheel has been creating memorable travel experiences that inspire and transform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision (Our Story) */}
      <section className="relative w-full bg-white py-24 sm:py-32 overflow-visible">
        <div className="mx-auto flex max-w-[1440px] flex-col px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-12">
          
          {/* Left Side: Sticky Image */}
          <div className="relative w-full lg:sticky lg:top-32 lg:h-[75vh] lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[60vh] w-full overflow-hidden rounded-[2rem] shadow-2xl lg:h-full"
            >
              <Image 
                src="/IMG_2581.JPG" 
                alt="Adventures Wheel Journey" 
                fill 
                className="object-cover transition-transform duration-[10s] hover:scale-110" 
                sizes="(max-width: 1024px) 100vw, 50vw" 
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-sm font-normal uppercase tracking-[0.4em] opacity-80" style={{ fontFamily: '"vaccine", serif' }}>Established</p>
                <p className="mt-1 text-5xl font-normal" style={{ fontFamily: '"vaccine", serif' }}>2021</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Text */}
          <div className="flex w-full flex-col lg:w-1/2">
            <div className="max-w-xl lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">Our Story</p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-[#122822]">
                Born from wanderlust
              </h2>
              <div className="mt-10 space-y-8">
                <p className="text-xl leading-relaxed text-slate-600 font-light">
                  Started by Amit Rao in 2021, right after the world hit pause, this company was built on one honest thought: life is short, and waiting is overrated.
                  Post-COVID, everyone wanted to travel, and Amit was no different. Like many, he struggled to find the right people to explore with.
                </p>
                <p className="text-xl leading-relaxed text-slate-600 font-light">
                  Being a travel enthusiast at heart, he chose to leave his stable corporate career, chose the road over routine, and started building something that solved this very problem: a travel community where strangers become friends and every trip feels like it was meant to happen.
                  Amit is not just a founder. He is a rider, explorer, and someone who has personally chased roads across mountains, coastlines, and cultures.
                </p>
                <p className="text-xl leading-relaxed text-slate-600 font-light">
                  Every trip you see here is not researched, it is lived. Routes are handpicked, rides are tested, and experiences are built from real journeys, not brochures.
                  We focus on offbeat paths, scenic drives, and meaningful experiences, less traffic and more stories.
                </p>
                <p className="text-xl leading-relaxed text-slate-600 font-light">
                  This is not just about trips. It is about finding your people, turning strangers into a crew, and journeys into shared stories you carry back home.
                  At the same time, we believe in traveling responsibly: supporting local communities, promoting sustainable practices, and contributing to cleaner villages, sacred sites, and mountain landscapes wherever we go.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-2 gap-12 border-t border-slate-100 pt-12">
                <div>
                  <h4 className="text-5xl font-normal text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>5+</h4>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-5xl font-normal text-[#122822]" style={{ fontFamily: '"vaccine", serif' }}>5000+</h4>
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400">Happy Travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-[#f6f7f9] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">What We Offer</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] leading-none text-[#122822]">
              Crafted for adventure
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-slate-200 bg-white p-7 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#122822]/10"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#122822] text-[#D4AF37]">
                  <o.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#122822]">{o.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">Our Values</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] leading-none text-[#122822]">
              What drives us
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-100 bg-[#f8f9fa] p-7 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-white">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#122822]">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Tourism */}
      <section className="bg-[#122822] px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">Responsible Tourism</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] leading-none text-white">
              Travel with purpose
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60">
              We are committed to sustainable tourism practices. Our trips support local communities,
              minimize environmental impact, and preserve the cultural heritage of every destination we visit.
            </p>
            <ul className="mt-6 space-y-3">
              {['Support local businesses & homestays', 'Leave-no-trace camping policies', 'Carbon-conscious route planning', 'Community upliftment programs'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20">
                    <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/4713b9ed-a70e-4b71-a908-616b774b014a.JPG" alt="Responsible tourism" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D4AF37] px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-[#122822]">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] leading-tight">
            Ready to start your adventure?
          </h2>
          <p className="mt-4 text-lg text-[#122822]/80 font-medium">Browse our curated trips or contact us for a personalized itinerary.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/trips" className="inline-flex items-center gap-2 rounded-xl bg-[#122822] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-slate-900">
              Explore Trips <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#122822] px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#122822] transition-all hover:bg-[#122822] hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
