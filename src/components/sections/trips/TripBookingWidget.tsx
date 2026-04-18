'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import type { TripData } from '@/data/trips';

export function TripBookingWidget({ trip }: { trip: TripData }) {
  const pricing = trip.pricing || [];
  const displayPrice = pricing.length > 0 ? Math.min(...pricing.map((p) => p.price)) : 0;

  const handleWhatsApp = () => {
    const msg = `Hi Adventures Wheel! I'm interested in the "${trip.title}" trip. Please share the details and upcoming departure dates.`;
    window.open(`https://wa.me/917015760563?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="rounded-sm border border-[#122822]/10 bg-[#faf7f2] p-6 shadow-xl shadow-[#122822]/5 md:p-8">
      <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[#122822]">Book Your Journey</h3>
      <p className="mb-6 border-b border-[#122822]/10 pb-6 text-sm text-[#122822]/60">
        Secure your spot for the adventure of a lifetime.
      </p>

      {/* Price */}
      <div className="mb-2">
        <span className="text-sm uppercase tracking-widest text-[#122822]/50">Starting from</span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-heading)] text-3xl text-[#122822]">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#122822]/50">/ person</span>
        </div>
      </div>

      {/* Quick info */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between rounded-sm bg-white px-4 py-3 text-sm">
          <span className="text-[#122822]/50">Duration</span>
          <span className="font-semibold text-[#122822]">{trip.durationDays}D / {trip.durationNights}N</span>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-white px-4 py-3 text-sm">
          <span className="text-[#122822]/50">Group Size</span>
          <span className="font-semibold text-[#122822]">{trip.groupSize} travelers</span>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-white px-4 py-3 text-sm">
          <span className="text-[#122822]/50">Difficulty</span>
          <span className="font-semibold text-[#122822]">{trip.difficulty}</span>
        </div>
        <div className="flex items-center justify-between rounded-sm bg-white px-4 py-3 text-sm">
          <span className="text-[#122822]/50">Max Altitude</span>
          <span className="font-semibold text-[#122822]">{trip.maxAltitudeFt.toLocaleString()} ft</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <Link
        href={`/trips/${trip.slug}/book`}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-[#122822] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#1d3d35]"
      >
        Book Now
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>

      <button
        onClick={handleWhatsApp}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1ebe5a]"
      >
        <MessageCircle size={16} />
        Chat on WhatsApp
      </button>

      {/* Contact info */}
      <div className="mt-6 space-y-2 border-t border-[#122822]/10 pt-4">
        <a href={`tel:${trip.contactPhone}`} className="flex items-center gap-2 text-sm text-[#122822]/60 transition-colors hover:text-[#122822]">
          <Phone size={14} /> {trip.contactPhone}
        </a>
        <a href={`mailto:${trip.contactEmail}`} className="flex items-center gap-2 text-sm text-[#122822]/60 transition-colors hover:text-[#122822]">
          <Mail size={14} /> {trip.contactEmail}
        </a>
      </div>
    </div>
  );
}
