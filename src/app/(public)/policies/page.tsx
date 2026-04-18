'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PoliciesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[40vh] overflow-hidden">
        <Image src="/d64bcf8e-b8bb-406c-9121-5dc05c695a0f.JPG" alt="Policies" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Legal</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] text-white">
            Policies
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-16">
            <motion.section
              id="terms"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[#122822]">Terms & Conditions</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p>By accessing Adventures Wheel&apos;s website and services, you agree to these terms. All content, trademarks, and intellectual property are owned by Adventures Wheel.</p>
                <p>Users must be 18+ to make bookings. All prices are subject to change and availability. We reserve the right to modify itineraries due to weather, safety, or local conditions.</p>
                <p>User accounts are your responsibility. Do not share login credentials. We may suspend accounts that violate these terms.</p>
              </div>
            </motion.section>

            <motion.section
              id="privacy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[#122822]">Privacy Policy</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p>We collect personal information (name, email, phone) when you create an account or make a booking. This data is used solely to process your bookings and communicate trip updates.</p>
                <p>We use Supabase for secure data storage and Razorpay for payment processing. We never store your credit card details directly.</p>
                <p>We may use cookies for analytics and improving user experience. You can disable cookies in your browser settings.</p>
                <p>We do not sell or share your personal data with third parties, except as required by law or to fulfill your booking.</p>
              </div>
            </motion.section>

            <motion.section
              id="cancellation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[#122822]">Cancellation & Refund Policy</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p><strong>30+ days before departure:</strong> 75% refund (booking amount non-refundable).</p>
                <p><strong>15–29 days before departure:</strong> 40% refund.</p>
                <p><strong>Less than 15 days:</strong> No refund available.</p>
                <p>Refunds are processed within 7–10 business days to the original payment method. We strongly recommend purchasing travel insurance for unforeseen cancellations.</p>
                <p>If Adventures Wheel cancels a trip due to insufficient bookings or safety concerns, you will receive a 100% refund or the option to reschedule at no extra cost.</p>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
}