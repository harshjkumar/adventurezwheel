"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Users, Calendar, ArrowLeft, Loader2, Minus, Plus, CreditCard, Shield, AlertCircle, IndianRupee, Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Trip } from "@/types/trip";

interface BookTripClientProps {
  trip: Trip;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const MINIMUM_PAYMENT = 1; // ₹1

export default function BookTripClient({ trip }: BookTripClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateId = searchParams.get("date");

  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Booking details
  const [occupancyRule, setOccupancyRule] = useState<"DBL" | "TPL">("DBL");
  const [packageQuantities, setPackageQuantities] = useState<Record<string, number>>({});
  
  // Rider Details
  const [riders, setRiders] = useState([{ name: "", phone: "", age: "", emergencyContact: "" }]);

  // Payment state
  const [paymentType, setPaymentType] = useState<"full" | "custom">("full");
  const [customAmount, setCustomAmount] = useState<string>("");
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
    if (paymentType === "full") return netPayable;
    const parsed = parseInt(customAmount) || 0;
    return Math.min(parsed, netPayable); // can't pay more than total
  }, [paymentType, customAmount, netPayable]);

  const remainingAmount = useMemo(() => {
    return Math.max(0, netPayable - payingAmount);
  }, [netPayable, payingAmount]);

  const isCustomAmountValid = useMemo(() => {
    if (paymentType === "full") return true;
    const parsed = parseInt(customAmount) || 0;
    return parsed >= MINIMUM_PAYMENT && parsed <= netPayable;
  }, [paymentType, customAmount, netPayable]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        setRiders([{ name: session.user.user_metadata?.full_name || "", phone: session.user.user_metadata?.phone || "", age: "", emergencyContact: "" }]);
      }
      setLoadingAuth(false);
    });
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Update riders array when totalPersons count changes
  useEffect(() => {
    if (totalPersons === 0) return;
    setRiders(prev => {
      if (prev.length === totalPersons) return prev;
      if (totalPersons > prev.length) {
        const extra = Array.from({ length: totalPersons - prev.length }, () => ({ name: "", phone: "", age: "", emergencyContact: "" }));
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
      setPaymentError(`Minimum payment amount is ₹${MINIMUM_PAYMENT.toLocaleString("en-IN")}`);
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: payingAmount,
          tripTitle: trip.title,
          tripSlug: trip.slug,
          customerName: riders[0]?.name || user?.user_metadata?.full_name || "",
          customerEmail: user?.email || "",
          customerPhone: riders[0]?.phone || "",
          totalPayable: netPayable,
          riders: riders.slice(0, totalPersons),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "K2K Adventurez",
        description: `${trip.title} — ${paymentType === "full" ? "Full Payment" : "Booking Amount"}`,
        order_id: orderData.orderId,
        prefill: {
          name: riders[0]?.name || user?.user_metadata?.full_name || "",
          email: user?.email || "",
          contact: riders[0]?.phone || "",
        },
        theme: {
          color: "#2A5C9A",
          backdrop_color: "rgba(0,0,0,0.7)",
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
        handler: async (response: any) => {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: {
                  tripTitle: trip.title,
                  tripSlug: trip.slug,
                  customerName: riders[0]?.name || "",
                  customerEmail: user?.email || "",
                  customerPhone: riders[0]?.phone || "",
                  userId: user?.id || null, // ADDED USER ID HERE
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
              setPaymentError("Payment verification failed. Please contact support.");
            }
          } catch {
            setPaymentError("Something went wrong verifying payment. Your payment may have been received. Please contact support.");
          }
          setIsProcessingPayment(false);
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setPaymentError(response.error.description || "Payment failed. Please try again.");
        setIsProcessingPayment(false);
      });
      razorpay.open();
    } catch (error: any) {
      setPaymentError(error.message || "Something went wrong. Please try again.");
      setIsProcessingPayment(false);
    }
  }, [isCustomAmountValid, payingAmount, trip, riders, user, netPayable, totalPersons, departure, occupancyRule, packageQuantities, pricingOptions, subtotal, gst, remainingAmount, paymentType]);

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center pt-[72px]"><Loader2 className="animate-spin text-accent" size={32} /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px] pb-24">
      <div className="bg-white border-b border-gray-100 py-6 sticky top-[72px] z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2" />
            
            {[
              { num: 1, label: "Review" },
              { num: 2, label: "Riders" },
              { num: 3, label: "Payment" },
              { num: 4, label: "Confirm" }
            ].map(step => (
              <div key={step.num} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep === step.num ? "bg-charcoal text-white" : 
                  currentStep > step.num ? "bg-accent text-white" : 
                  "bg-gray-100 text-charcoal/40"
                }`}>
                  {currentStep > step.num ? <Check size={14} /> : step.num}
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-nav hidden md:block ${
                  currentStep >= step.num ? "text-charcoal" : "text-charcoal/40"
                }`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-serif text-2xl text-charcoal mb-6">Review Booking</h2>
                
                <div className="flex items-center gap-3 text-charcoal border border-gray-200 rounded-lg p-4 mb-8 bg-gray-50">
                  <Calendar className="text-accent" size={20} />
                  {departure ? (
                    <span className="font-medium text-sm md:text-base">
                      {new Date(departure.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} 
                      &nbsp;—&nbsp; 
                      {new Date(departure.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  ) : (
                    <span className="font-medium text-amber-600 text-sm md:text-base">No date selected. Please go back.</span>
                  )}
                </div>

                <div className="mb-6 flex overflow-hidden rounded-lg border border-[#102a43] w-full max-w-sm">
                  <button 
                    onClick={() => setOccupancyRule("TPL")}
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${occupancyRule === "TPL" ? "bg-[#102a43] text-white" : "bg-white text-[#102a43] hover:bg-gray-50"}`}
                  >
                    TPL Share
                  </button>
                  <button 
                    onClick={() => setOccupancyRule("DBL")}
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${occupancyRule === "DBL" ? "bg-[#102a43] text-white" : "bg-white text-[#102a43] hover:bg-gray-50"}`}
                  >
                    DBL Share
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 p-3 md:p-4 text-[10px] md:text-xs font-bold text-gray-600 uppercase">
                    <div className="col-span-5 md:col-span-6">Package / Rider Type</div>
                    <div className="col-span-4 text-center">{occupancyRule} Share</div>
                    <div className="col-span-3 md:col-span-2 text-right">Total</div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {pricingOptions.map(pkg => {
                      const qty = packageQuantities[pkg.label] || 0;
                      const lineTotal = pkg.price * qty;
                      return (
                        <div key={pkg.label} className="grid grid-cols-12 items-center p-3 md:p-4 gap-x-2 md:gap-x-0">
                          <div className="col-span-5 md:col-span-6">
                            <span className="block font-medium text-[11px] md:text-sm text-[#102a43] mb-1">{pkg.label}</span>
                            <span className="block text-[9px] md:text-xs text-gray-500 leading-tight">Includes motorcycle &amp; gear</span>
                          </div>
                          <div className="col-span-4 flex flex-col items-center">
                            <span className="text-[9px] md:text-xs text-gray-500 mb-1 md:mb-2 text-center leading-tight">₹{pkg.price.toLocaleString("en-IN")} / pax</span>
                            <div className="flex items-center gap-1.5 md:gap-3 bg-white border border-gray-200 rounded">
                              <button onClick={() => updateQuantity(pkg.label, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white bg-[#2A5C9A] hover:bg-[#1a4a8a] rounded-l transition-colors"><Minus size={12} /></button>
                              <span className="font-medium text-xs md:text-sm w-3 md:w-4 text-center select-none">{qty}</span>
                              <button onClick={() => updateQuantity(pkg.label, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white bg-[#2A5C9A] hover:bg-[#1a4a8a] rounded-r transition-colors"><Plus size={12} /></button>
                            </div>
                          </div>
                          <div className="col-span-3 md:col-span-2 text-right font-medium text-charcoal text-[11px] md:text-sm font-serif">
                            ₹{lineTotal.toLocaleString("en-IN")}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-gray-50 border-t border-gray-200 divide-y divide-gray-200">
                    <div className="flex justify-between p-4 text-sm text-charcoal">
                      <span>Your Total</span>
                      <span className="font-medium font-serif w-24 text-right">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between p-4 text-sm text-charcoal">
                      <span>GST <span className="text-gray-500 text-xs ml-1">5%</span></span>
                      <span className="font-medium font-serif w-24 text-right">₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between p-4 text-charcoal font-bold">
                      <span>Net Payable</span>
                      <span className="font-serif w-24 text-right">₹{netPayable.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                  {!user ? (
                    <button 
                      onClick={() => router.push(`/login?redirect=${encodeURIComponent(`/trips/${trip.slug}/book?date=${dateId}`)}`)}
                      className="px-8 py-3 bg-[#2A5C9A] text-[#FAF9F6] font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-colors"
                    >
                      Log In to Continue
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!departure || totalPersons === 0}
                      className="px-8 py-3 bg-[#2A5C9A] text-[#FAF9F6] font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      Continue to Riders <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCurrentStep(1)} className="p-2 -ml-2 text-charcoal/40 hover:text-charcoal"><ArrowLeft size={20} /></button>
                  <h2 className="font-serif text-2xl text-charcoal">Rider Details</h2>
                </div>

                <div className="space-y-8">
                  {riders.slice(0, totalPersons).map((rider, index) => (
                    <div key={index} className="p-6 border border-gray-100 rounded-lg bg-gray-50/50">
                      <h3 className="text-sm font-nav uppercase tracking-widest text-charcoal/60 mb-4 flex items-center gap-2">
                        <Users size={16} /> Rider {index + 1} {index === 0 && "(Primary)"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-charcoal/60 block mb-1">Full Name</label>
                          <input type="text" value={rider.name} onChange={(e) => updateRider(index, 'name', e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-200 rounded text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="text-xs text-charcoal/60 block mb-1">Phone</label>
                          <input type="tel" value={rider.phone} onChange={(e) => updateRider(index, 'phone', e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-200 rounded text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="+91..." />
                        </div>
                        <div>
                          <label className="text-xs text-charcoal/60 block mb-1">Age</label>
                          <input type="number" value={rider.age} onChange={(e) => updateRider(index, 'age', e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-200 rounded text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="25" />
                        </div>
                        <div>
                          <label className="text-xs text-charcoal/60 block mb-1">Emergency Contact (Phone)</label>
                          <input type="tel" value={rider.emergencyContact} onChange={(e) => updateRider(index, 'emergencyContact', e.target.value)} className="w-full px-4 py-2 bg-white border border-gray-200 rounded text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="+91..." />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => setCurrentStep(3)}
                    disabled={riders.slice(0, totalPersons).some(r => !r.name || !r.phone || !r.age || !r.emergencyContact)}
                    className="px-8 py-3 bg-[#2A5C9A] text-[#FAF9F6] font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    Proceed to Payment <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCurrentStep(2)} className="p-2 -ml-2 text-charcoal/40 hover:text-charcoal"><ArrowLeft size={20} /></button>
                  <h2 className="font-serif text-2xl text-charcoal">Payment</h2>
                </div>

                {/* Payment Summary */}
                <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="text-sm font-bold text-charcoal mb-4">Payment Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal/70">Subtotal</span>
                      <span className="font-serif">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-charcoal/70">GST (5%)</span>
                      <span className="font-serif">₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-bold text-charcoal">Total Amount</span>
                      <span className="font-serif text-xl text-charcoal">₹{netPayable.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Option Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-charcoal mb-4 flex items-center gap-2">
                    <Wallet size={16} className="text-accent" />
                    Choose Payment Option
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Payment */}
                    <button
                      onClick={() => { setPaymentType("full"); setPaymentError(null); }}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all group ${
                        paymentType === "full" 
                          ? "border-[#2A5C9A] bg-[#2A5C9A]/5 shadow-md" 
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        paymentType === "full" ? "border-[#2A5C9A] bg-[#2A5C9A]" : "border-gray-300"
                      }`}>
                        {paymentType === "full" && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          paymentType === "full" ? "bg-[#2A5C9A] text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal text-sm">Full Payment</h4>
                          <p className="text-xs text-charcoal/50">Pay the entire amount now</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                        <span className="text-xl font-serif font-bold text-charcoal">₹{netPayable.toLocaleString("en-IN")}</span>
                      </div>
                      {paymentType === "full" && (
                        <div className="mt-2 flex items-center gap-1.5 text-emerald-600">
                          <Shield size={12} />
                          <span className="text-[10px] font-medium uppercase tracking-wider">Booking fully confirmed</span>
                        </div>
                      )}
                    </button>

                    {/* Custom / Partial Payment */}
                    <button
                      onClick={() => { setPaymentType("custom"); setPaymentError(null); }}
                      className={`relative p-5 rounded-xl border-2 text-left transition-all group ${
                        paymentType === "custom" 
                          ? "border-[#2A5C9A] bg-[#2A5C9A]/5 shadow-md" 
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        paymentType === "custom" ? "border-[#2A5C9A] bg-[#2A5C9A]" : "border-gray-300"
                      }`}>
                        {paymentType === "custom" && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          paymentType === "custom" ? "bg-[#2A5C9A] text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          <IndianRupee size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal text-sm">Booking Amount</h4>
                          <p className="text-xs text-charcoal/50">Pay min. ₹1 now</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                        <span className="text-sm text-charcoal/60">Min. <span className="font-serif font-bold text-charcoal">₹1</span></span>
                      </div>
                      {paymentType === "custom" && (
                        <div className="mt-2 flex items-center gap-1.5 text-amber-600">
                          <AlertCircle size={12} />
                          <span className="text-[10px] font-medium uppercase tracking-wider">Balance due on trip day</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Custom Amount Input */}
                <AnimatePresence>
                  {paymentType === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-8 overflow-hidden"
                    >
                      <div className="p-6 bg-gradient-to-br from-[#2A5C9A]/5 to-transparent border border-[#2A5C9A]/20 rounded-xl">
                        <label className="block text-sm font-medium text-charcoal mb-3">
                          Enter Payment Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-charcoal/40 font-serif">₹</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); setPaymentError(null); }}
                            placeholder={MINIMUM_PAYMENT.toLocaleString("en-IN")}
                            min={MINIMUM_PAYMENT}
                            max={netPayable}
                            className="w-full pl-10 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-serif focus:border-[#2A5C9A] focus:ring-2 focus:ring-[#2A5C9A]/20 outline-none transition-all"
                          />
                        </div>
                        
                        {/* Quick amount buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {[1, 5000, 10000, 25000].filter(a => a <= netPayable).map(amount => (
                            <button
                              key={amount}
                              onClick={() => { setCustomAmount(String(amount)); setPaymentError(null); }}
                              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                                customAmount === String(amount)
                                  ? "bg-[#2A5C9A] text-white"
                                  : "bg-white border border-gray-200 text-charcoal/70 hover:border-[#2A5C9A] hover:text-[#2A5C9A]"
                              }`}
                            >
                              ₹{amount.toLocaleString("en-IN")}
                            </button>
                          ))}
                          <button
                            onClick={() => { setCustomAmount(String(netPayable)); setPaymentError(null); }}
                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                              customAmount === String(netPayable)
                                ? "bg-[#2A5C9A] text-white"
                                : "bg-white border border-gray-200 text-charcoal/70 hover:border-[#2A5C9A] hover:text-[#2A5C9A]"
                            }`}
                          >
                            Full: ₹{netPayable.toLocaleString("en-IN")}
                          </button>
                        </div>

                        {/* Remaining display */}
                        {customAmount && parseInt(customAmount) >= MINIMUM_PAYMENT && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                          >
                            <div className="flex items-start gap-3">
                              <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              <div className="text-sm">
                                <p className="text-charcoal/80">
                                  Paying <strong className="text-charcoal">₹{payingAmount.toLocaleString("en-IN")}</strong> now.
                                  {remainingAmount > 0 && (
                                    <> Remaining <strong className="text-amber-700">₹{remainingAmount.toLocaleString("en-IN")}</strong> to be paid offline on the day of the trip.</>
                                  )}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {customAmount && parseInt(customAmount) < MINIMUM_PAYMENT && parseInt(customAmount) > 0 && (
                          <p className="mt-3 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle size={12} /> Minimum payment amount is ₹{MINIMUM_PAYMENT.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rider Summary */}
                <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="text-sm font-bold text-charcoal mb-3">Rider Summary</h4>
                  <div className="space-y-2">
                    {riders.slice(0, totalPersons).map((r, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-charcoal/70">
                        <Users size={14} className="text-accent flex-shrink-0" />
                        <span>{r.name} — {r.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Error */}
                <AnimatePresence>
                  {paymentError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-red-700">{paymentError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Payment Actions */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  {/* Secure Payment Banner */}
                  <div className="flex items-center gap-2 text-charcoal/40 mb-5 justify-center">
                    <Shield size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-nav">Secured by Razorpay • 256-bit SSL Encryption</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="text-center md:text-left">
                      <p className="text-xs text-charcoal/50 uppercase tracking-wider font-nav">You are paying</p>
                      <p className="text-3xl font-serif font-bold text-[#2A5C9A]">
                        ₹{payingAmount.toLocaleString("en-IN")}
                      </p>
                      {remainingAmount > 0 && paymentType === "custom" && isCustomAmountValid && (
                        <p className="text-xs text-amber-600 mt-1">
                          + ₹{remainingAmount.toLocaleString("en-IN")} to be paid offline on trip day
                        </p>
                      )}
                    </div>
                    <button 
                      onClick={handlePayment}
                      disabled={
                        isProcessingPayment || 
                        (paymentType === "custom" && !isCustomAmountValid) ||
                        payingAmount < MINIMUM_PAYMENT
                      }
                      className="px-10 py-4 w-full md:w-auto bg-[#2A5C9A] text-white font-nav text-sm uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-[#2A5C9A]/20 hover:shadow-xl hover:shadow-[#2A5C9A]/30"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} />
                          Pay ₹{payingAmount.toLocaleString("en-IN")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="font-serif text-3xl text-charcoal mb-2">
                  {paymentResult?.remainingAmount > 0 ? "Booking Reserved!" : "Booking Confirmed!"}
                </h2>
                <p className="text-charcoal/60 mb-4 max-w-md mx-auto">
                  Your adventure to {trip.title} is {paymentResult?.remainingAmount > 0 ? "reserved" : "confirmed"}.
                  We&apos;ve sent the details to your email.
                </p>

                {/* Payment receipt */}
                <div className="max-w-sm mx-auto bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h4 className="text-xs font-nav uppercase tracking-widest text-charcoal/40 mb-4 text-center">Payment Receipt</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal/60">Amount Paid</span>
                      <span className="font-serif font-bold text-green-600">₹{paymentResult?.amountPaid?.toLocaleString("en-IN")}</span>
                    </div>
                    {paymentResult?.remainingAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-charcoal/60">Balance Due</span>
                        <span className="font-serif font-bold text-amber-600">₹{paymentResult?.remainingAmount?.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="text-charcoal/60">Payment ID</span>
                      <span className="text-xs font-mono text-charcoal/50">{paymentResult?.paymentId}</span>
                    </div>
                  </div>
                </div>

                {paymentResult?.remainingAmount > 0 && (
                  <div className="max-w-md mx-auto mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800 text-left">
                        Please pay the remaining <strong>₹{paymentResult?.remainingAmount?.toLocaleString("en-IN")}</strong> offline on the day of the trip. Our team will contact you with further details.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="px-8 py-3 bg-[#2A5C9A] text-white font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button 
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-transparent border border-charcoal/20 text-charcoal font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32">
                <h3 className="font-nav text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/60">Trip</span>
                    <span className="font-serif text-charcoal text-right w-1/2 line-clamp-1">{trip.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/60">Total Persons</span>
                    <span className="font-medium text-charcoal">x{totalPersons}</span>
                  </div>
                </div>

                {totalPersons > 0 && (
                  <div className="pt-4 border-t border-gray-100 mb-6 space-y-2">
                    {Object.entries(packageQuantities).filter(([_, q]) => q > 0).map(([label, qty]) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-charcoal/60">{label} x{qty}</span>
                        <span className="font-medium text-charcoal">
                          ₹{((trip.pricing?.find(p => p.label === label)?.price || 0) * qty).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-charcoal">Subtotal</span>
                    <span className="text-charcoal">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-end mb-4 text-sm">
                    <span className="font-medium text-charcoal">GST (5%)</span>
                    <span className="text-charcoal">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-charcoal">Net Payable</span>
                    <span className="font-serif text-2xl text-accent">₹{netPayable.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Payment Mode in Sidebar */}
                {currentStep === 3 && payingAmount > 0 && (
                  <div className="pt-4 border-t border-gray-100 mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-medium text-charcoal/60">{paymentType === "full" ? "Full Payment" : "Booking Amount"}</span>
                      <span className="text-sm font-bold text-[#2A5C9A]">₹{payingAmount.toLocaleString("en-IN")}</span>
                    </div>
                    {remainingAmount > 0 && (
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-medium text-charcoal/60">Due on Trip Day</span>
                        <span className="text-sm font-bold text-amber-600">₹{remainingAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {currentStep === 1 && user ? (
                  <button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!departure || totalPersons === 0}
                    className="w-full py-3 bg-[#2A5C9A] text-white font-nav text-xs uppercase tracking-widest font-medium rounded-full hover:bg-[#1a4a8a] transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                ) : currentStep === 1 && !user ? (
                  <button 
                    onClick={() => router.push(`/login?redirect=${encodeURIComponent(`/trips/${trip.slug}/book?date=${dateId}`)}`)}
                    className="w-full text-center text-xs text-amber-600 bg-amber-50 p-3 rounded border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors"
                  >
                    Log in required to book
                  </button>
                ) : null}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
