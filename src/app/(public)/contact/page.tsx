'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone, Send, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91-7015760563', href: 'tel:+917015760563' },
  { icon: Mail, label: 'Email', value: 'explore@adventureswheel.com', href: 'mailto:explore@adventureswheel.com' },
  { icon: MapPin, label: 'Headquarters', value: 'Haryana, India' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10AM–7PM IST' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trip_interest: '',
    group_size: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.from('enquiries').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        trip_interest: formData.trip_interest,
        group_size: formData.group_size,
        message: formData.message,
        status: 'new'
      }]);

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError('Failed to send message. Please try again or contact us directly via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#faf7f2] min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Contact Adventures Wheel" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/90 via-[#122822]/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/80 text-[11px] uppercase tracking-[0.4em] font-medium mb-6 block" style={{ fontFamily: '"vaccine", serif' }}>
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl text-white mb-6" style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}>
              Let's Plan Your Journey
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg sm:text-xl font-light" style={{ fontFamily: '"vaccine", serif' }}>
              Whether you're looking for a bespoke itinerary or have questions about our existing expeditions, our team of experts is here to craft your perfect escape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 -mt-12 mx-auto max-w-[1440px] px-6 lg:px-12 pb-32">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Contact Form */}
          <div className="flex-1 p-8 lg:p-16 xl:p-20 order-2 lg:order-1">
            <h2 className="text-3xl lg:text-4xl text-[#122822] mb-2" style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}>
              Send an Enquiry
            </h2>
            <p className="text-[#122822]/60 mb-10 text-sm lg:text-base" style={{ fontFamily: '"vaccine", serif' }}>
              Fill out the form below and an adventure specialist will get back to you within 24 hours.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#122822]/5 border border-[#122822]/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-[400px]"
                >
                  <div className="w-16 h-16 bg-[#122822] text-white rounded-full flex items-center justify-center mb-6">
                    <Send size={24} className="ml-1" />
                  </div>
                  <h3 className="text-2xl text-[#122822] mb-3" style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}>Thank you!</h3>
                  <p className="text-[#122822]/70 max-w-sm" style={{ fontFamily: '"vaccine", serif' }}>
                    Your enquiry has been received. Our travel experts will review your request and reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm uppercase tracking-widest font-bold text-[#D4AF37] hover:text-[#122822] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Full Name *</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] placeholder:text-[#122822]/30 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] placeholder:text-[#122822]/30 transition-all" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Phone Number *</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] placeholder:text-[#122822]/30 transition-all" placeholder="+91 99999 99999" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Group Size</label>
                      <select name="group_size" value={formData.group_size} onChange={handleChange} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] transition-all appearance-none cursor-pointer">
                        <option value="">Select size</option>
                        <option value="1">Just Me (Solo)</option>
                        <option value="2">Couple (2)</option>
                        <option value="3-5">Small Group (3-5)</option>
                        <option value="6-10">Medium Group (6-10)</option>
                        <option value="10+">Large Group (10+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Trip Interest / Destination</label>
                    <input type="text" name="trip_interest" value={formData.trip_interest} onChange={handleChange} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] placeholder:text-[#122822]/30 transition-all" placeholder="e.g. Spiti Valley, Custom International Tour..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122822]/60">Message / Special Requests *</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-[#faf7f2] border-none focus:ring-1 focus:ring-[#122822] rounded-xl px-5 py-4 text-[#122822] placeholder:text-[#122822]/30 transition-all resize-none" placeholder="Tell us about your dream adventure..." />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 bg-[#122822] text-white rounded-xl font-bold uppercase tracking-widest text-[13px] hover:bg-[#D4AF37] hover:text-[#122822] transition-all duration-300 disabled:opacity-70 mt-4 shadow-xl shadow-[#122822]/10"
                  >
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Contact Details & Visuals */}
          <div className="lg:w-[400px] xl:w-[480px] bg-[#122822] text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden order-1 lg:order-2">
            {/* Background Map Element */}
            <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <Globe size={400} strokeWidth={0.5} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl text-white mb-10" style={{ fontFamily: '"vaccine", serif', fontWeight: 600 }}>
                Direct Contact
              </h3>
              
              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-5 items-start group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#122822] transition-colors">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-lg text-white hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"vaccine", serif' }}>
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg text-white/90" style={{ fontFamily: '"vaccine", serif' }}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-12 border-t border-white/10">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/50 mb-4">Follow Our Adventures</h4>
              <div className="flex gap-6 text-white/80">
                <a href="https://instagram.com/adventureswheel" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"vaccine", serif' }}>Instagram</a>
                <a href="https://facebook.com/AdventuresWheel" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors" style={{ fontFamily: '"vaccine", serif' }}>Facebook</a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}