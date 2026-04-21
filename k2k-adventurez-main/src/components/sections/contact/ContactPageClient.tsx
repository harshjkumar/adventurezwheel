"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Instagram,
  Youtube,
  Facebook,
  ShieldCheck,
  Bike,
  Users,
  CalendarDays,
} from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Call Us", value: "+91 98991 57292", sub: "Available 9 AM - 9 PM IST" },
  { icon: Mail, label: "Email Us", value: "info@k2kadventurez.com", sub: "" },
  { icon: MapPin, label: "Head Office", value: "Arjan Garh, South Delhi", sub: "Visit by appointment" },
  { icon: Clock, label: "Hours", value: "Mon - Sat, 9 AM - 9 PM", sub: "" },
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

const badges = [
  { icon: ShieldCheck, label: "Certified & Insured", sub: "MSME + ISO 9001" },
  { icon: Bike, label: "Premium Fleet", sub: "50+ Royal Enfields" },
  { icon: Users, label: "10,000+ Happy Riders", sub: "98% return rate" },
  { icon: CalendarDays, label: "365 Days Active", sub: "Year-round departures" },
];

const faqs = [
  { q: "What's included in the trip price?", a: "Every trip includes a well-maintained Royal Enfield motorcycle, riding gear (helmet, jacket, gloves), all accommodations, meals as specified, backup vehicle with mechanic, first-aid kit, ride captain, and a photography package." },
  { q: "Do I need my own motorcycle?", a: "No! We provide fully serviced Royal Enfield motorcycles. However, if you prefer riding your own bike, we offer 'Bring Your Own Bike' packages at a reduced price." },
  { q: "What's the fitness level required?", a: "It requires moderate to high fitness with strong stamina for long rides at high altitude." },
  { q: "Is it safe for solo travelers?", a: "Absolutely! Over 40% of our riders are solo travelers. You'll be part of a group of 6-15 riders with experienced ride captains, a backup vehicle, and 24/7 support." },
  { q: "What happens if my bike breaks down?", a: "In the unlikely event of a bike breakdown during the trip, we ensure a smooth and hassle-free experience for all riders. Our backup vehicle accompanies the group at all times, equipped with a certified mechanic and essential spare parts to handle most on-road issues immediately." },
  { q: "Can I get a refund?", a: "Full refund if cancelled 30+ days before departure. 50% refund for 15-29 days. No refund within 14 days. Trip date transfers are free up to 15 days before departure. The booking amount is non refundable." },
  { q: "Do you offer customized/private trips?", a: "Yes! We offer private group packages with customizable routes, dates, and accommodation preferences. Corporate team -building expeditions are also available." },
];

const tripOptions = [
  "Leh Ladakh Expedition",
  "Spiti Valley Circuit",
  "Rajasthan Golden Sands",
  "Manali-Rohtang Express",
  "Meghalaya Cloud Kingdom",
  "Custom / Private Trip",
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.7 },
};

export function ContactPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    trip: "",
    groupSize: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    const text = `Hi K2K Adventurez!
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Trip: ${formData.trip || "Not specified"}
Group Size: ${formData.groupSize || "Not specified"}
Message: ${formData.message || "No message"}`;

    const whatsappUrl = `https://wa.me/919899157292?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    setSending(false);
    setSent(true);
    setFormData({ name: "", phone: "", email: "", trip: "", groupSize: "", message: "" });
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <Image src="/images/trips/3.webp" alt="Contact K2K" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.div {...fadeUp}>
            <p className="font-nav text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/80 mb-6">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-tight">
              Let&apos;s Plan Your <br className="hidden sm:block" /> Adventure
            </h1>
            <p className="mt-6 max-w-xl text-white/70 text-sm md:text-base mx-auto">
              Have questions? Want a custom trip? Just want to chat about bikes?
              We&apos;re here for all of it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-stone-50 p-8 border border-gray-100 group hover:border-accent/20 hover:shadow-md transition-all duration-500"
              >
                <item.icon size={28} strokeWidth={1.5} className="text-accent mb-5" />
                <p className="font-nav text-[10px] uppercase tracking-widest text-warm-gray mb-2">
                  {item.label}
                </p>
                <p className="font-sans font-medium text-lg text-charcoal mb-1 tracking-tight">{item.value}</p>
                <p className="text-xs text-charcoal/50">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info ───────────────────────────── */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div {...fadeUp}>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-2">
                  Send Us a Message
                </h2>
                <p className="text-charcoal/50 text-sm mb-10">
                  Fill out the form below and our ride advisors will get back to you shortly.
                </p>

                {sent ? (
                  <div className="bg-green-50 border border-green-200 p-8 text-center">
                    <p className="font-serif text-2xl text-green-800 mb-2">
                      Message Sent!
                    </p>
                    <p className="text-sm text-green-700">
                      We&apos;ll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <input
                        required
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm placeholder:text-gray-400 focus:border-accent focus:outline-none transition-colors"
                      />
                      <input
                        required
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm placeholder:text-gray-400 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm placeholder:text-gray-400 focus:border-accent focus:outline-none transition-colors"
                    />
                    <div className="grid sm:grid-cols-2 gap-6">
                      <select
                        value={formData.trip}
                        onChange={(e) => setFormData({ ...formData, trip: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Interested Trip</option>
                        {tripOptions.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <select
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm focus:border-accent focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Group Size</option>
                        <option value="solo">Solo — Just Me</option>
                        <option value="2-4">2-4 Riders</option>
                        <option value="5-10">5-10 Riders</option>
                        <option value="10+">10+ Riders (Corporate/Group)</option>
                      </select>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 bg-white border border-gray-200 text-charcoal text-sm placeholder:text-gray-400 focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-3 font-nav text-xs uppercase tracking-[0.2em] font-medium px-10 py-4 bg-accent text-white hover:bg-accent/90 disabled:opacity-50 transition-all"
                    >
                      {sending ? "Sending..." : "Send Message"} <Send size={14} />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div {...fadeUp}>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-6">
                  Why Riders Choose Us
                </h3>
                <div className="space-y-5">
                  {badges.map((b) => (
                    <div key={b.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/5 flex items-center justify-center shrink-0">
                        <b.icon size={20} strokeWidth={1.5} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-serif text-base text-charcoal">{b.label}</p>
                        <p className="text-xs text-charcoal/50">{b.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp}>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-4">
                  Prefer to Talk?
                </h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  Our ride advisors are just a call away. No bots, no waiting —
                  real riders picking up the phone.
                </p>
                <a
                  href="tel:+919899157292"
                  className="inline-flex items-center gap-2 font-nav text-xs uppercase tracking-widest font-medium text-accent hover:underline"
                >
                  <Phone size={14} /> +91 98991 57292
                </a>
              </motion.div>

              <motion.div {...fadeUp}>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: "https://instagram.com/k2kadventurez" },
                    { icon: Youtube, href: "https://youtube.com/k2kadventurez" },
                    { icon: Facebook, href: "https://facebook.com/k2kadventurez" },
                  ].map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-gray-200 flex items-center justify-center text-charcoal/40 hover:text-accent hover:border-accent transition-all"
                    >
                      <s.icon size={18} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
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
                <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-1">
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

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="font-nav text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">
              FREQUENTLY ASKED
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-serif text-lg text-charcoal pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-accent shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm text-charcoal/60 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
