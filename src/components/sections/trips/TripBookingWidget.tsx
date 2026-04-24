'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, ArrowRight, Phone, Mail, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TripData } from '@/data/trips';

export function TripBookingWidget({ trip }: { trip: TripData }) {
  const pricing = trip.pricing || [];
  const displayPrice = pricing.length > 0 ? Math.min(...pricing.map((p) => p.price)) : 0;
  
  const activeDepartures = (trip.departures || []).filter(d => d.status === 'upcoming' || d.status === 'confirmed');
  const [selectedDateId, setSelectedDateId] = useState<string>(activeDepartures.length > 0 ? activeDepartures[0].id : '');

  const handleWhatsApp = () => {
    let dateStr = '';
    if (selectedDateId) {
      const d = activeDepartures.find(x => x.id === selectedDateId);
      if (d) {
        dateStr = ` for the batch ${new Date(d.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${new Date(d.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      }
    }
    const msg = `Hi Adventures Wheel! I'm interested in the "${trip.title}" trip${dateStr}. Please share more details.`;
    window.open(`https://wa.me/917015760563?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const bookingUrl = selectedDateId ? `/trips/${trip.slug}/book?date=${selectedDateId}` : `/trips/${trip.slug}/book`;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#122822]/10 bg-white p-5 shadow-2xl shadow-[#122822]/10 md:p-6">
      {/* Top Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
          <Zap size={12} fill="currentColor" />
          <span>Fast Filling</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#122822]/40">
          <ShieldCheck size={12} />
          <span>Secure Booking</span>
        </div>
      </div>

      <h3 className="font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight text-[#122822]">Plan Your Trip</h3>
      <p className="mt-1 mb-5 text-xs text-[#122822]/60">
        Flexible dates and premium inclusions for your comfort.
      </p>

      {/* Price Section */}
      <div className="mb-5 rounded-2xl bg-[#faf7f2] p-4 border border-[#122822]/5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#122822]/40">Starting from</span>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-[#122822]">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-medium text-[#122822]/50">/ person</span>
        </div>
      </div>

      {/* Batch Selection */}
      <div className="mb-5 space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#122822]/50 block px-1">
          Select Your Batch
        </label>
        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#122822]/40 group-focus-within:text-[#122822] transition-colors" size={18} />
          <select
            value={selectedDateId}
            onChange={(e) => setSelectedDateId(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-[#122822]/10 bg-white py-4 pl-12 pr-10 text-sm font-semibold text-[#122822] outline-none transition-all focus:border-[#122822] focus:ring-1 focus:ring-[#122822] cursor-pointer"
          >
            <option value="" disabled>Select departure date</option>
            {activeDepartures.map(d => (
              <option key={d.id} value={d.id}>
                {new Date(d.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {new Date(d.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </option>
            ))}
            {activeDepartures.length === 0 && <option disabled>No upcoming batches</option>}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#122822]/40">
            <ArrowRight className="rotate-90" size={16} />
          </div>
        </div>
      </div>

      {/* Quick Details Grid */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#122822]/5 bg-[#faf7f2]/50 p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#122822]/40">Duration</p>
          <p className="mt-1 text-sm font-bold text-[#122822]">{trip.durationDays}D / {trip.durationNights}N</p>
        </div>
        <div className="rounded-2xl border border-[#122822]/5 bg-[#faf7f2]/50 p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#122822]/40">Max Group</p>
          <p className="mt-1 text-sm font-bold text-[#122822]">{trip.groupSize}</p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-3">
        <Link
          href={bookingUrl}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#122822] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] transition-all hover:bg-[#1d3d35] hover:shadow-xl hover:shadow-[#122822]/20"
        >
          <span className="relative z-10">Instant Booking</span>
          <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
        </Link>

        <button
          onClick={handleWhatsApp}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#25D366]/30 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#25D366] transition-all hover:bg-[#25D366]/5"
        >
          <MessageCircle size={18} />
          <span>WhatsApp Concierge</span>
        </button>
      </div>

      {/* Assistance Footer */}
      <div className="mt-6 border-t border-[#122822]/10 pt-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#122822]/40 mb-2">Need help planning?</p>
        <div className="flex items-center justify-center gap-6">
          <a href={`tel:${trip.contactPhone}`} className="flex items-center gap-2 text-xs font-semibold text-[#122822] hover:opacity-70 transition-opacity">
            <Phone size={14} className="text-[#D4AF37]" /> Call
          </a>
          <a href={`mailto:${trip.contactEmail}`} className="flex items-center gap-2 text-xs font-semibold text-[#122822] hover:opacity-70 transition-opacity">
            <Mail size={14} className="text-[#D4AF37]" /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
