'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function CTABanner() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', trip: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to database for admin enquiry page
      const { error: dbError } = await supabase.from('enquiries').insert([{
        name: form.name,
        email: form.email || 'not-provided@via-cta.com',
        phone: form.phone,
        trip_interest: form.trip,
        message: form.message || 'Quick enquiry from homepage CTA',
        status: 'new'
      }]);

      if (dbError) throw dbError;

      // 2. Open WhatsApp for immediate connection
      const msg = `Hi Adventures Wheel! I'm ${form.name}. ${form.trip ? `Interested in: ${form.trip}. ` : ''}${form.message || 'I want to know more about your trips.'}`;
      const url = `https://wa.me/917015760563?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', trip: '', message: '' });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-12 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-3xl bg-[#122822] shadow-[0_40px_100px_-20px_rgba(18,40,34,0.3)]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          {/* Form side */}
          <div className="flex items-center p-8 sm:p-12 lg:p-20 bg-white">
            <div className="w-full max-w-lg">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#122822] text-white rounded-full mb-8 shadow-xl shadow-[#122822]/20">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-[#122822] mb-4" style={{ fontFamily: '"vaccine", serif' }}>
                      Enquiry Received!
                    </h2>
                    <p className="text-[#122822]/60 text-lg mb-8" style={{ fontFamily: '"vaccine", serif' }}>
                      We've received your request and opened a WhatsApp chat for you. Our team will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[#122822] font-bold uppercase tracking-widest text-sm underline underline-offset-8 decoration-2 decoration-[#D4AF37]"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-6">
                      Bespoke Adventures
                    </div>
                    <h2 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-[#122822] mb-8" style={{ fontFamily: '"vaccine", serif' }}>
                      Plan your next <span className="font-bold">expedition</span> with us
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base text-[#122822] placeholder:text-[#122822]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          required
                          className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base text-[#122822] placeholder:text-[#122822]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address (Optional)"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base text-[#122822] placeholder:text-[#122822]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                      <select
                        value={form.trip}
                        onChange={(e) => setForm({ ...form, trip: e.target.value })}
                        className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base text-slate-600 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select interest</option>
                        <option>Leh Ladakh Expedition</option>
                        <option>Spiti Valley Circuit</option>
                        <option>Meghalaya Explorer</option>
                        <option>Tawang & Arunachal Circuit</option>
                        <option>Custom Itinerary</option>
                      </select>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your dream trip..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl border border-slate-100 bg-slate-50 px-5 py-4 text-base text-[#122822] placeholder:text-[#122822]/30 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#122822] px-8 py-5 text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#D4AF37] hover:text-[#122822] active:scale-95 disabled:opacity-70 shadow-lg shadow-[#122822]/10"
                      >
                        {loading ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <MessageCircle className="h-5 w-5" />
                            Connect via WhatsApp
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Video side */}
          <div className="relative min-h-[30rem] lg:min-h-full overflow-hidden flex items-center justify-center bg-[#0a1512]">
            <video
              src="https://pub-d188086126f842e88f76855b16e973b0.r2.dev/IMG_4061%20-%20Trim.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute w-auto h-[135%] max-w-none object-contain -rotate-90"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#122822] via-[#122822]/20 to-transparent" />
            
            {/* Top Right Logo (Fixed Path) */}
            <div className="absolute top-10 right-10 z-20 w-32 lg:w-44 opacity-100 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
              <div className="relative h-24 w-full">
                <Image
                  src="/logo/Artboard 1@3x-8.png"
                  alt="Adventures Wheel Logo"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>

            <div className="absolute bottom-12 left-12 right-12 z-20 hidden lg:block">
               <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-3 font-bold">Navigator by Soul</p>
               <h3 className="text-white text-4xl font-light leading-tight max-w-md" style={{ fontFamily: '"vaccine", serif' }}>
                 Crafting <span className="font-bold italic text-[#D4AF37]">authentic</span> stories across the globe.
               </h3>
               <div className="mt-8 flex gap-8 items-center">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-[#122822] bg-slate-200 overflow-hidden relative">
                       <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" />
                     </div>
                   ))}
                 </div>
                 <p className="text-white/60 text-sm font-medium">Join 500+ happy explorers</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
