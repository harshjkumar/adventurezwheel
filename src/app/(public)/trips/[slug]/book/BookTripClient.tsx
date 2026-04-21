'use client';

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Users, Calendar, ArrowLeft, Loader2, Minus, Plus, CreditCard, Shield, AlertCircle, IndianRupee, Wallet } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export interface TripData {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  pricing: Array<{ label: string; price: number; description?: string }>;
  departures: Array<{ id: string; startDate: string; endDate: string; availableSeats: number; bookedSeats: number; status: string }>;
}

interface BookTripClientProps {
  trip: TripData;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const MINIMUM_PAYMENT = 1;

function BookingContent({ trip }: BookTripClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateId = searchParams.get('date');

  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Booking details
  const [occupancyRule, setOccupancyRule] = useState<'DBL' | 'TPL'>('DBL');
  const [packageQuantities, setPackageQuantities] = useState<Record<string, number>>({});
  
  // Rider Details
  const [riders, setRiders] = useState([{ name: '', phone: '', age: '', emergencyContact: '' }]);

  // Payment state
  const [paymentType, setPaymentType] = useState<'full' | 'custom'>('full');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const departure = trip.departures?.find(d => d.id === dateId) || trip.departures?.[0];
  const pricingOptions = trip.pricing || [];

  const totalPersons = useMemo(() => {
    return Object.values(packageQuantities).reduce((a, b) => a + b, 0);
  }, [packageQuantities]);
  
  const subtotal = useMemo(() => {
    return pricingOptions.reduce((sum, pkg) => {
      return sum + (pkg.price * (packageQuantities[pkg.label] || 0));
    }, 0);
  }, [pricingOptions, packageQuantities]);

  const gst = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const netPayable = useMemo(() => subtotal + gst, [subtotal, gst]);

  const payingAmount = useMemo(() => {
    if (paymentType === 'full') return netPayable;
    const parsed = parseInt(customAmount) || 0;
    return Math.min(parsed, netPayable);
  }, [paymentType, customAmount, netPayable]);

  const remainingAmount = useMemo(() => {
    return Math.max(0, netPayable - payingAmount);
  }, [netPayable, payingAmount]);

  const isCustomAmountValid = useMemo(() => {
    if (paymentType === 'full') return true;
    const parsed = parseInt(customAmount) || 0;
    return parsed >= MINIMUM_PAYMENT && parsed <= netPayable;
  }, [paymentType, customAmount, netPayable]);

  useEffect(() => {
    // Login required for booking — redirect if not authenticated
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }
      setUser(session.user);
      setRiders([{ name: session.user.user_metadata?.full_name || '', phone: session.user.user_metadata?.phone || '', age: '', emergencyContact: '' }]);
      setLoadingAuth(false);
    }).catch(() => {
      window.location.href = '/login';
    });
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Update riders array when totalPersons count changes
  useEffect(() => {
    if (totalPersons === 0) return;
    setRiders(prev => {
      if (prev.length === totalPersons) return prev;
      if (totalPersons > prev.length) {
        const extra = Array.from({ length: totalPersons - prev.length }, () => ({ name: '', phone: '', age: '', emergencyContact: '' }));
        return [...prev, ...extra];
      }
      return prev.slice(0, totalPersons);
    });
  }, [totalPersons]);

  const updateRider = useCallback((index: number, field: string, value: string) => {
    setRiders(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((label: string, delta: number) => {
    setPackageQuantities(prev => {
      const current = prev[label] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [label]: next };
    });
  }, []);

  const handlePayment = useCallback(async () => {
    if (!isCustomAmountValid || payingAmount < MINIMUM_PAYMENT) {
      setPaymentError(`Minimum payment amount is ₹${MINIMUM_PAYMENT.toLocaleString('en-IN')}`);
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // 1. Create order on server
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payingAmount,
          tripTitle: trip.title,
          tripSlug: trip.slug,
          customerName: riders[0]?.name || user?.user_metadata?.full_name || '',
          customerEmail: user?.email || '',
          customerPhone: riders[0]?.phone || '',
          totalPayable: netPayable,
          riders: riders.slice(0, totalPersons),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Adventures Wheel',
        description: `${trip.title} — ${paymentType === 'full' ? 'Full Payment' : 'Booking Amount'}`,
        order_id: orderData.orderId,
        prefill: {
          name: riders[0]?.name || user?.user_metadata?.full_name || '',
          email: user?.email || '',
          contact: riders[0]?.phone || '',
        },
        theme: {
          color: '#122822',
          backdrop_color: 'rgba(0,0,0,0.7)',
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
        handler: async (response: any) => {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: {
                  tripTitle: trip.title,
                  tripSlug: trip.slug,
                  customerName: riders[0]?.name || '',
                  customerEmail: user?.email || '',
                  customerPhone: riders[0]?.phone || '',
                  userId: user?.id || null,
                  departureDate: departure?.startDate || null,
                  occupancyRule,
                  totalPersons,
                  packages: Object.entries(packageQuantities)
                    .filter(([_, qty]) => qty > 0)
                    .map(([label, qty]) => ({
                      label,
                      qty,
                      price: pricingOptions.find(p => p.label === label)?.price || 0,
                    })),
                  riders: riders.slice(0, totalPersons),
                  subtotal,
                  gst,
                  totalPayable: netPayable,
                  amountPaid: payingAmount,
                  remainingAmount,
                  paymentType,
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentResult({
                paymentId: verifyData.paymentId,
                orderId: verifyData.orderId,
                amountPaid: payingAmount,
                remainingAmount,
                paymentType,
              });
              setCurrentStep(4);
            } else {
              setPaymentError('Payment verification failed. Please contact support.');
            }
          } catch {
            setPaymentError('Something went wrong verifying payment. Your payment may have been received. Please contact support.');
          }
          setIsProcessingPayment(false);
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
        setIsProcessingPayment(false);
      });
      razorpay.open();
    } catch (error: any) {
      setPaymentError(error.message || 'Something went wrong. Please try again.');
      setIsProcessingPayment(false);
    }
  }, [isCustomAmountValid, payingAmount, trip, riders, user, netPayable, totalPersons, departure, occupancyRule, packageQuantities, pricingOptions, subtotal, gst, remainingAmount, paymentType]);

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center pt-[72px]"><Loader2 className="animate-spin text-[#122822]" size={32} /></div>;
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-[72px] pb-24">
      {/* ── Progress Bar ────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#122822]/10 py-6 sticky top-[72px] z-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between relative gap-4 gap-y-6">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-[#122822]/5 -z-10 -translate-y-1/2 hidden sm:block" />
            
            {[
              { num: 1, label: 'Review' },
              { num: 2, label: 'Riders' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Confirm' }
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep === step.num ? 'bg-[#122822] text-[#D4AF37]' : 
                  currentStep > step.num ? 'bg-[#122822] text-[#D4AF37]' : 
                  'bg-[#122822]/5 text-[#122822]/40'
                }`}>
                  {currentStep > step.num ? <Check size={14} /> : step.num}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-semibold hidden md:block ${
                  currentStep >= step.num ? 'text-[#122822]' : 'text-[#122822]/40'
                }`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          
          <div className="space-y-6">
            
            {/* Step 1: Review */}
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-xl shadow-[#122822]/5 border border-[#122822]/5 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#122822]/50 mb-2">Step 1</p>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl text-[#122822] mb-8">Review Booking</h2>
                
                {/* Date Selection Display */}
                <div className="flex items-center gap-3 text-[#122822] border border-[#122822]/10 rounded-2xl p-4 mb-8 bg-[#faf7f2]/50">
                  <Calendar className="text-[#122822]" size={20} />
                  {departure ? (
                    <span className="font-medium text-sm md:text-base">
                      {new Date(departure.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} 
                      &nbsp;—&nbsp; 
                      {new Date(departure.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  ) : (
                    <span className="font-medium text-amber-600 text-sm md:text-base">Please go back and select a valid date.</span>
                  )}
                </div>

                {/* Occupancy Toggle */}
                <div className="mb-6 flex overflow-hidden rounded-xl border border-[#122822]/20 w-full max-w-sm">
                  <button 
                    onClick={() => setOccupancyRule('TPL')}
                    className={`flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${occupancyRule === 'TPL' ? 'bg-[#122822] text-[#D4AF37]' : 'bg-white text-[#122822] hover:bg-slate-50'}`}
                  >
                    TPL Share
                  </button>
                  <button 
                    onClick={() => setOccupancyRule('DBL')}
                    className={`flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${occupancyRule === 'DBL' ? 'bg-[#122822] text-[#D4AF37]' : 'bg-white text-[#122822] hover:bg-slate-50'}`}
                  >
                    DBL Share
                  </button>
                </div>

                {/* Package Selection */}
                <div className="border border-[#122822]/10 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-12 bg-[#faf7f2] border-b border-[#122822]/10 p-3 md:p-4 text-[10px] md:text-xs font-bold text-[#122822]/70 uppercase tracking-widest">
                    <div className="col-span-5 md:col-span-6">Package Type</div>
                    <div className="col-span-4 text-center">{occupancyRule} Share</div>
                    <div className="col-span-3 md:col-span-2 text-right">Total</div>
                  </div>
                  
                  <div className="divide-y divide-[#122822]/5">
                    {pricingOptions.map(pkg => {
                      const qty = packageQuantities[pkg.label] || 0;
                      const lineTotal = pkg.price * qty;
                      return (
                        <div key={pkg.label} className="grid grid-cols-12 items-center p-3 md:p-4 gap-x-2 md:gap-x-0">
                          <div className="col-span-5 md:col-span-6">
                            <span className="block font-semibold text-xs md:text-sm text-[#122822] mb-1">{pkg.label}</span>
                            <span className="block text-[10px] md:text-xs text-[#122822]/50 leading-tight">Includes motorcycle & gear</span>
                          </div>
                          <div className="col-span-4 flex flex-col items-center">
                            <span className="text-[10px] md:text-xs text-[#122822]/60 mb-2 md:mb-3 text-center leading-tight">₹{pkg.price.toLocaleString('en-IN')} / pax</span>
                            <div className="flex items-center gap-1.5 md:gap-3 bg-white border border-[#122822]/20 rounded-lg p-1">
                              <button onClick={() => updateQuantity(pkg.label, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#122822] hover:bg-[#122822]/5 rounded-md transition-colors"><Minus size={14} /></button>
                              <span className="font-semibold text-xs md:text-sm w-4 md:w-6 text-center select-none text-[#122822]">{qty}</span>
                              <button onClick={() => updateQuantity(pkg.label, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[#122822] hover:bg-[#122822]/5 rounded-md transition-colors"><Plus size={14} /></button>
                            </div>
                          </div>
                          <div className="col-span-3 md:col-span-2 text-right font-medium text-[#122822] text-xs md:text-sm font-[family-name:var(--font-heading)] pt-4">
                            ₹{lineTotal.toLocaleString('en-IN')}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Order Totals */}
                  <div className="bg-[#faf7f2]/50 border-t border-[#122822]/10 divide-y divide-[#122822]/5">
                    <div className="flex justify-between p-4 text-sm text-[#122822]/80">
                      <span>Subtotal</span>
                      <span className="font-medium font-[family-name:var(--font-heading)] w-24 text-right">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between p-4 text-sm text-[#122822]/80">
                      <span>GST <span className="text-[#122822]/50 text-xs ml-1">5%</span></span>
                      <span className="font-medium font-[family-name:var(--font-heading)] w-24 text-right">₹{gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between p-4 text-[#122822] font-semibold">
                      <span>Net Payable</span>
                      <span className="font-[family-name:var(--font-heading)] text-lg w-28 text-right">₹{netPayable.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#122822]/10 flex justify-end">
                  {!user ? (
                    <button 
                      onClick={() => router.push(`/dashboard?redirect=${encodeURIComponent(`/trips/${trip.slug}/book?date=${dateId}`)}`)}
                      className="px-8 py-4 bg-[#122822] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#1d3d35] transition-colors"
                    >
                      Log In to Continue
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!departure || totalPersons === 0}
                      className="px-8 py-4 bg-[#122822] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#1d3d35] transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      Continue to Riders <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Riders */}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-xl shadow-[#122822]/5 border border-[#122822]/5 p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setCurrentStep(1)} className="p-2 -ml-2 text-[#122822]/40 hover:text-[#122822] rounded-full hover:bg-slate-50"><ArrowLeft size={20} /></button>
                  <div>
                     <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#122822]/50 mb-1">Step 2</p>
                     <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl text-[#122822]">Rider Details</h2>
                  </div>
                </div>

                <div className="space-y-8">
                  {riders.slice(0, totalPersons).map((rider, index) => (
                    <div key={index} className="p-6 sm:p-8 border border-[#122822]/10 rounded-2xl bg-[#faf7f2]/30">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-[#122822] mb-6 flex items-center gap-2">
                        <Users size={16} className="text-[#D4AF37]" /> Rider {index + 1} {index === 0 && '(Primary)'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-[#122822]/50 block mb-2">Full Name</label>
                          <input type="text" value={rider.name} onChange={(e) => updateRider(index, 'name', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#122822]/20 rounded-xl text-sm focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all placeholder:text-slate-400" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-[#122822]/50 block mb-2">Phone</label>
                          <input type="tel" value={rider.phone} onChange={(e) => updateRider(index, 'phone', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#122822]/20 rounded-xl text-sm focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all placeholder:text-slate-400" placeholder="+91 9999999999" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-[#122822]/50 block mb-2">Age</label>
                          <input type="number" value={rider.age} onChange={(e) => updateRider(index, 'age', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#122822]/20 rounded-xl text-sm focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all placeholder:text-slate-400" placeholder="25" />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-[#122822]/50 block mb-2">Emergency Contact (Phone)</label>
                          <input type="tel" value={rider.emergencyContact} onChange={(e) => updateRider(index, 'emergencyContact', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#122822]/20 rounded-xl text-sm focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all placeholder:text-slate-400" placeholder="+91 8888888888" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#122822]/10 flex justify-end">
                  <button 
                    onClick={() => setCurrentStep(3)}
                    disabled={riders.slice(0, totalPersons).some(r => !r.name || !r.phone || !r.age || !r.emergencyContact)}
                    className="px-8 py-4 bg-[#122822] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#1d3d35] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Proceed to Payment <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-xl shadow-[#122822]/5 border border-[#122822]/5 p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setCurrentStep(2)} className="p-2 -ml-2 text-[#122822]/40 hover:text-[#122822] rounded-full hover:bg-slate-50"><ArrowLeft size={20} /></button>
                  <div>
                     <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#122822]/50 mb-1">Step 3</p>
                     <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl text-[#122822]">Contact & Payment</h2>
                  </div>
                </div>

                {/* Payment Option Selection */}
                <div className="mb-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#122822]/60 mb-4 flex items-center gap-2">
                    <Wallet size={16} className="text-[#D4AF37]" /> Choose Payment Option
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Payment */}
                    <button
                      onClick={() => { setPaymentType('full'); setPaymentError(null); }}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all group ${
                        paymentType === 'full' 
                          ? 'border-[#122822] bg-[#faf7f2]/50 shadow-md' 
                          : 'border-[#122822]/10 bg-white hover:border-[#122822]/30 hover:shadow-sm'
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        paymentType === 'full' ? 'border-[#122822] bg-[#122822]' : 'border-slate-300'
                      }`}>
                        {paymentType === 'full' && <Check size={12} className="text-[#D4AF37]" />}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          paymentType === 'full' ? 'bg-[#122822] text-[#D4AF37]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#122822] text-sm">Full Payment</h4>
                          <p className="text-xs text-[#122822]/50">Pay the entire amount now</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#122822]/10">
                        <span className="text-xl font-[family-name:var(--font-heading)] font-semibold text-[#122822]">₹{netPayable.toLocaleString('en-IN')}</span>
                      </div>
                      {paymentType === 'full' && (
                        <div className="mt-2 flex items-center gap-1.5 text-emerald-700">
                          <Shield size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Booking fully confirmed</span>
                        </div>
                      )}
                    </button>

                    {/* Custom / Partial Payment */}
                    <button
                      onClick={() => { setPaymentType('custom'); setPaymentError(null); }}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all group ${
                        paymentType === 'custom' 
                          ? 'border-[#122822] bg-[#faf7f2]/50 shadow-md' 
                          : 'border-[#122822]/10 bg-white hover:border-[#122822]/30 hover:shadow-sm'
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        paymentType === 'custom' ? 'border-[#122822] bg-[#122822]' : 'border-slate-300'
                      }`}>
                        {paymentType === 'custom' && <Check size={12} className="text-[#D4AF37]" />}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          paymentType === 'custom' ? 'bg-[#122822] text-[#D4AF37]' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <IndianRupee size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#122822] text-sm">Booking Amount</h4>
                          <p className="text-xs text-[#122822]/50">Pay a partial amount now</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-[#122822]/10">
                        <span className="text-xs font-semibold text-[#122822]/60 uppercase tracking-widest">Min. <span className="font-[family-name:var(--font-heading)] text-lg text-[#122822]">₹1</span></span>
                      </div>
                      {paymentType === 'custom' && (
                        <div className="mt-2 flex items-center gap-1.5 text-amber-700">
                          <AlertCircle size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Balance due on trip day</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Custom Amount Input */}
                <AnimatePresence>
                  {paymentType === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8 overflow-hidden"
                    >
                      <div className="p-6 bg-[#faf7f2]/50 border border-[#122822]/10 rounded-2xl">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-[#122822]/60 mb-3">
                          Enter Payment Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#122822]/40 font-[family-name:var(--font-heading)]">₹</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); setPaymentError(null); }}
                            placeholder={MINIMUM_PAYMENT.toLocaleString('en-IN')}
                            min={MINIMUM_PAYMENT}
                            max={netPayable}
                            className="w-full pl-10 pr-4 py-4 bg-white border border-[#122822]/20 rounded-xl text-xl font-[family-name:var(--font-heading)] focus:border-[#122822] focus:ring-1 focus:ring-[#122822] outline-none transition-all placeholder:text-slate-300"
                          />
                        </div>
                        
                        {/* Quick amount buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {[1, 5000, 10000, 25000].filter(a => a <= netPayable).map(amount => (
                            <button
                              key={amount}
                              onClick={() => { setCustomAmount(String(amount)); setPaymentError(null); }}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                customAmount === String(amount)
                                  ? 'bg-[#122822] text-[#D4AF37]'
                                  : 'bg-white border border-[#122822]/20 text-[#122822]/70 hover:border-[#122822] hover:text-[#122822]'
                              }`}
                            >
                              ₹{amount.toLocaleString('en-IN')}
                            </button>
                          ))}
                          <button
                            onClick={() => { setCustomAmount(String(netPayable)); setPaymentError(null); }}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                              customAmount === String(netPayable)
                                ? 'bg-[#122822] text-[#D4AF37]'
                                : 'bg-white border border-[#122822]/20 text-[#122822]/70 hover:border-[#122822] hover:text-[#122822]'
                            }`}
                          >
                            Full: ₹{netPayable.toLocaleString('en-IN')}
                          </button>
                        </div>

                        {customAmount && parseInt(customAmount) >= MINIMUM_PAYMENT && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                          >
                            <div className="flex items-start gap-3">
                              <AlertCircle size={18} className="text-amber-600 flex-shrink-0" />
                              <div className="text-sm">
                                <p className="text-[#122822]/80">
                                  Paying <strong className="text-[#122822] font-[family-name:var(--font-heading)] text-base">₹{payingAmount.toLocaleString('en-IN')}</strong> now.
                                  {remainingAmount > 0 && (
                                    <> Remaining <strong className="text-amber-700 font-[family-name:var(--font-heading)] text-base">₹{remainingAmount.toLocaleString('en-IN')}</strong> to be paid offline on the day of the trip.</>
                                  )}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {customAmount && parseInt(customAmount) < MINIMUM_PAYMENT && parseInt(customAmount) > 0 && (
                          <p className="mt-3 text-xs text-red-500 font-semibold flex items-center gap-1.5">
                            <AlertCircle size={14} /> Minimum payment amount is ₹{MINIMUM_PAYMENT.toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Payment Error */}
                <AnimatePresence>
                  {paymentError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-red-700">{paymentError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Secure Payment Banner & Actions */}
                <div className="mt-8 pt-8 border-t border-[#122822]/10">
                  <div className="flex items-center gap-2 text-[#122822]/40 mb-6 justify-center bg-slate-50 py-2 rounded-lg border border-slate-100">
                    <Shield size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secured by Razorpay • 256-bit SSL Encryption</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-bold text-[#122822]/50 uppercase tracking-widest mb-1">Total to pay now</p>
                      <p className="text-4xl font-[family-name:var(--font-heading)] font-semibold text-[#122822]">
                        ₹{payingAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <button 
                      onClick={handlePayment}
                      disabled={
                        isProcessingPayment || 
                        (paymentType === 'custom' && !isCustomAmountValid) ||
                        payingAmount < MINIMUM_PAYMENT
                      }
                      className="w-full md:w-auto px-10 py-4 bg-[#122822] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#1d3d35] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-[#122822]/10 hover:shadow-2xl hover:shadow-[#122822]/20"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} />
                          Pay Securely
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[2rem] shadow-xl shadow-[#122822]/5 border border-[#122822]/5 p-8 md:p-12 text-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600 border-4 border-emerald-100">
                  <Check size={48} strokeWidth={3} />
                </div>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl text-[#122822] mb-4">
                  {paymentResult?.remainingAmount > 0 ? 'Booking Reserved!' : 'Booking Confirmed!'}
                </h2>
                <p className="text-[#122822]/60 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Your adventure to <span className="font-semibold text-[#122822]">{trip.displayTitle || trip.title}</span> is {paymentResult?.remainingAmount > 0 ? 'reserved' : 'confirmed'}.
                  We&apos;ve sent the details to your email.
                </p>

                {/* Payment receipt */}
                <div className="max-w-md mx-auto bg-[#faf7f2]/50 border border-[#122822]/10 rounded-2xl p-6 sm:p-8 mb-8 text-left">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#122822]/40 mb-5 text-center">Payment Receipt</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#122822]/60 font-medium">Amount Paid</span>
                      <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-emerald-700">₹{paymentResult?.amountPaid?.toLocaleString('en-IN')}</span>
                    </div>
                    {paymentResult?.remainingAmount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#122822]/60 font-medium">Balance Due</span>
                        <span className="font-[family-name:var(--font-heading)] text-xl font-semibold text-amber-600">₹{paymentResult?.remainingAmount?.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="pt-4 border-t border-[#122822]/10 flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#122822]/40">Payment ID</span>
                      <span className="text-xs font-mono text-[#122822]/60 bg-white px-2 py-1 rounded border border-[#122822]/5">{paymentResult?.paymentId}</span>
                    </div>
                  </div>
                </div>

                {paymentResult?.remainingAmount > 0 && (
                  <div className="max-w-xl mx-auto mb-10 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <AlertCircle size={24} className="text-amber-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-amber-900 text-left leading-relaxed">
                        Please pay the remaining <strong className="text-amber-700 font-[family-name:var(--font-heading)] text-lg">₹{paymentResult?.remainingAmount?.toLocaleString('en-IN')}</strong> offline on the day of the trip. Our team will contact you closely with further preparation details.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="px-8 py-4 bg-[#122822] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#1d3d35] transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={() => router.push('/')}
                    className="px-8 py-4 bg-transparent border-2 border-[#122822]/20 text-[#122822] text-xs uppercase tracking-widest font-semibold rounded-2xl hover:bg-[#faf7f2] hover:border-[#122822]/40 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* ── Sidebar Summary ─────────────────────────────────────────── */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-[#122822] text-white rounded-[2rem] shadow-2xl p-6 sm:p-8 sticky top-32">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Order Summary</h3>
                
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-white/60">Trip</span>
                    <span className="font-[family-name:var(--font-heading)] text-xl text-white text-right w-1/2 leading-tight">{trip.displayTitle || trip.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total Persons</span>
                    <span className="font-semibold text-white bg-white/10 px-3 py-1 rounded-lg">x{totalPersons}</span>
                  </div>
                </div>

                {totalPersons > 0 && (
                  <div className="pt-6 border-t border-white/10 mb-8 space-y-3">
                    {Object.entries(packageQuantities).filter(([_, q]) => q > 0).map(([label, qty]) => (
                      <div key={label} className="flex flex-col gap-1">
                         <div className="flex justify-between text-xs text-white/60">
                           <span>{label}</span>
                           <span>x{qty}</span>
                         </div>
                         <div className="flex justify-between items-center">
                           <span className="text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">₹{pricingOptions.find(p => p.label === label)?.price.toLocaleString('en-IN')} / pax</span>
                           <span className="font-[family-name:var(--font-heading)] text-lg text-white">
                             ₹{((pricingOptions.find(p => p.label === label)?.price || 0) * qty).toLocaleString('en-IN')}
                           </span>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Total display on idle */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Total Payable</span>
                     <span className="font-[family-name:var(--font-heading)] text-2xl text-[#D4AF37]">₹{netPayable.toLocaleString('en-IN')}</span>
                   </div>
                   {gst > 0 && (
                     <div className="flex justify-end mt-1">
                       <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Includes 5% GST</span>
                     </div>
                   )}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function BookTripClient(props: BookTripClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-[72px]"><Loader2 className="animate-spin text-[#122822]" size={32} /></div>}>
      <BookingContent {...props} />
    </Suspense>
  );
}
