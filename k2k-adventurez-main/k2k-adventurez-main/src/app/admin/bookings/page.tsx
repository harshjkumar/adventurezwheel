"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { 
  Search, Filter, Eye, Trash2, IndianRupee, Users, Calendar, 
  CheckCircle, Clock, AlertCircle, XCircle, CreditCard, 
  Download, RefreshCw, ChevronDown
} from "lucide-react";

interface Booking {
  id: string;
  trip_title: string;
  trip_slug: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  departure_date: string | null;
  occupancy_rule: string;
  total_persons: number;
  packages: any[];
  riders: any[];
  subtotal: number;
  gst: number;
  total_payable: number;
  amount_paid: number;
  remaining_amount: number;
  payment_type: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  payment_status: string;
  booking_status: string;
  created_at: string;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  confirmed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  partial_payment: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  pending: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  completed: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

const paymentStatusColors: Record<string, { bg: string; text: string; border: string }> = {
  paid: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  failed: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  refunded: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const statusIcons: Record<string, any> = {
  confirmed: CheckCircle,
  partial_payment: Clock,
  pending: AlertCircle,
  cancelled: XCircle,
  completed: CheckCircle,
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_status: status }),
      });
      fetchBookings();
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) return;
    try {
      await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
      if (selectedBooking?.id === id) setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      b.customer_phone?.includes(search) ||
      b.trip_title?.toLowerCase().includes(search.toLowerCase()) ||
      b.razorpay_payment_id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || b.booking_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.amount_paid) || 0), 0);
  const pendingAmount = bookings.reduce((sum, b) => sum + (Number(b.remaining_amount) || 0), 0);
  const confirmedCount = bookings.filter(b => b.booking_status === "confirmed").length;
  const partialCount = bookings.filter(b => b.booking_status === "partial_payment").length;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-charcoal">Bookings</h1>
          <p className="text-sm text-charcoal/50 mt-1">{bookings.length} total bookings</p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors text-charcoal/70"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Total Revenue</span>
            <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <IndianRupee className="text-emerald-600" size={14} />
            </div>
          </div>
          <p className="text-2xl font-serif text-charcoal">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Pending Dues</span>
            <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center">
              <Clock className="text-amber-600" size={14} />
            </div>
          </div>
          <p className="text-2xl font-serif text-amber-600">₹{pendingAmount.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Confirmed</span>
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={14} />
            </div>
          </div>
          <p className="text-2xl font-serif text-charcoal">{confirmedCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-nav font-medium text-charcoal/50 uppercase tracking-widest">Partial Payments</span>
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <CreditCard className="text-blue-600" size={14} />
            </div>
          </div>
          <p className="text-2xl font-serif text-charcoal">{partialCount}</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, trip, or payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={16} className="text-gray-400" />
          {["all", "confirmed", "partial_payment", "pending", "cancelled", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap ${
                filterStatus === s
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-charcoal/60 hover:bg-gray-200"
              }`}
            >
              {s === "partial_payment" ? "Partial" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table + Detail Split View */}
      <div className="flex gap-6">
        {/* Table */}
        <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden flex-1 transition-all ${selectedBooking ? "" : "w-full"}`}>
          {loading ? (
            <div className="p-12 text-center text-charcoal/40">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-charcoal/40">
              {bookings.length === 0 ? "No bookings yet. Bookings will appear here once customers make payments." : "No bookings match your search."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Customer</th>
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Trip</th>
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Paid</th>
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Due</th>
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Status</th>
                    <th className="px-4 py-3 text-left font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Date</th>
                    <th className="px-4 py-3 text-right font-nav text-[10px] uppercase tracking-widest text-charcoal/50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => {
                    const statusColor = statusColors[booking.booking_status] || statusColors.pending;
                    const StatusIcon = statusIcons[booking.booking_status] || AlertCircle;
                    return (
                      <tr 
                        key={booking.id} 
                        className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer ${
                          selectedBooking?.id === booking.id ? "bg-accent/5 border-l-2 border-l-accent" : ""
                        }`}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-charcoal text-sm">{booking.customer_name || "—"}</p>
                            <p className="text-xs text-charcoal/40 mt-0.5">{booking.customer_phone || booking.customer_email || "—"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-charcoal/80 text-sm max-w-[180px] truncate">{booking.trip_title}</p>
                          <p className="text-[10px] text-charcoal/40 mt-0.5">{booking.total_persons} pax • {booking.occupancy_rule}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-medium text-emerald-700 font-serif">₹{Number(booking.amount_paid).toLocaleString("en-IN")}</span>
                        </td>
                        <td className="px-4 py-4">
                          {Number(booking.remaining_amount) > 0 ? (
                            <span className="font-medium text-amber-600 font-serif">₹{Number(booking.remaining_amount).toLocaleString("en-IN")}</span>
                          ) : (
                            <span className="text-emerald-600 text-xs font-medium">PAID</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                            <StatusIcon size={10} />
                            {booking.booking_status === "partial_payment" ? "Partial" : booking.booking_status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-charcoal/60 text-xs whitespace-nowrap">
                          {formatDate(booking.created_at)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); }}
                              className="p-2 rounded hover:bg-gray-100 text-charcoal/40 hover:text-charcoal transition-colors"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteBooking(booking.id); }}
                              className="p-2 rounded hover:bg-red-50 text-charcoal/40 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedBooking && (
          <div className="w-[420px] shrink-0 bg-white border border-gray-200 rounded-lg overflow-y-auto max-h-[calc(100vh-280px)] sticky top-8">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg text-charcoal">{selectedBooking.customer_name || "Unknown"}</h3>
                  <p className="text-xs text-charcoal/50 mt-0.5">{selectedBooking.customer_email}</p>
                  <p className="text-xs text-charcoal/50">{selectedBooking.customer_phone}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="text-charcoal/30 hover:text-charcoal text-lg">&times;</button>
              </div>
              <div className="flex items-center gap-2">
                {(() => {
                  const color = statusColors[selectedBooking.booking_status] || statusColors.pending;
                  const Icon = statusIcons[selectedBooking.booking_status] || AlertCircle;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider border ${color.bg} ${color.text} ${color.border}`}>
                      <Icon size={12} />
                      {selectedBooking.booking_status === "partial_payment" ? "Booking Amount" : selectedBooking.booking_status}
                    </span>
                  );
                })()}
                {(() => {
                  const color = paymentStatusColors[selectedBooking.payment_status] || paymentStatusColors.pending;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider border ${color.bg} ${color.text} ${color.border}`}>
                      {selectedBooking.payment_status}
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* Trip Info */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Trip Details</h4>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Trip</span>
                  <Link href={`/trips/${selectedBooking.trip_slug}`} target="_blank" className="text-accent hover:underline text-right max-w-[200px] truncate">
                    {selectedBooking.trip_title}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Departure</span>
                  <span className="text-charcoal font-medium">{selectedBooking.departure_date ? formatDate(selectedBooking.departure_date) : "TBA"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Sharing</span>
                  <span className="text-charcoal font-medium">{selectedBooking.occupancy_rule} Share</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Persons</span>
                  <span className="text-charcoal font-medium">{selectedBooking.total_persons}</span>
                </div>
              </div>
            </div>

            {/* Packages */}
            {selectedBooking.packages && Array.isArray(selectedBooking.packages) && selectedBooking.packages.length > 0 && (
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Packages</h4>
                <div className="space-y-2 text-sm">
                  {selectedBooking.packages.map((pkg: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-charcoal/70">{pkg.label} x{pkg.qty}</span>
                      <span className="text-charcoal font-medium font-serif">₹{(pkg.price * pkg.qty).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Payment Details</h4>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-serif">₹{Number(selectedBooking.subtotal).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">GST (5%)</span>
                  <span className="font-serif">₹{Number(selectedBooking.gst).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-serif font-bold">₹{Number(selectedBooking.total_payable).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium text-emerald-700">Amount Paid</span>
                  <span className="font-serif font-bold text-emerald-700 text-lg">₹{Number(selectedBooking.amount_paid).toLocaleString("en-IN")}</span>
                </div>
                {Number(selectedBooking.remaining_amount) > 0 && (
                  <div className="flex justify-between items-center bg-amber-50 -mx-6 px-6 py-3">
                    <span className="font-medium text-amber-700">Remaining Due</span>
                    <span className="font-serif font-bold text-amber-700 text-lg">₹{Number(selectedBooking.remaining_amount).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs pt-2">
                  <span className="text-charcoal/40">Payment Type</span>
                  <span className="text-charcoal/60 uppercase font-medium">{selectedBooking.payment_type}</span>
                </div>
              </div>
            </div>

            {/* Razorpay IDs */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Razorpay Info</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Order ID</span>
                  <span className="font-mono text-charcoal/70 select-all">{selectedBooking.razorpay_order_id || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Payment ID</span>
                  <span className="font-mono text-charcoal/70 select-all">{selectedBooking.razorpay_payment_id || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Booked At</span>
                  <span className="text-charcoal/70">{formatDateTime(selectedBooking.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Riders */}
            {selectedBooking.riders && Array.isArray(selectedBooking.riders) && selectedBooking.riders.length > 0 && (
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Rider Details</h4>
                <div className="space-y-3">
                  {selectedBooking.riders.map((rider: any, i: number) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={12} className="text-accent" />
                        <span className="text-sm font-medium text-charcoal">{rider.name || "—"}</span>
                        {i === 0 && <span className="text-[8px] uppercase bg-accent/10 text-accent px-1.5 py-0.5 rounded font-medium">Primary</span>}
                      </div>
                      <div className="text-xs text-charcoal/50 space-y-0.5 ml-5">
                        <p>📞 {rider.phone || "—"}</p>
                        <p>🎂 Age: {rider.age || "—"}</p>
                        <p>🚨 Emergency: {rider.emergencyContact || "—"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6">
              <h4 className="text-[10px] font-nav uppercase tracking-widest text-charcoal/40 mb-3">Update Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {["confirmed", "partial_payment", "completed", "cancelled"].map((status) => {
                  const isCurrentStatus = selectedBooking.booking_status === status;
                  const color = statusColors[status] || statusColors.pending;
                  return (
                    <button
                      key={status}
                      disabled={isCurrentStatus || updatingStatus === selectedBooking.id}
                      onClick={() => updateBookingStatus(selectedBooking.id, status)}
                      className={`px-3 py-2 text-xs font-medium rounded-md capitalize transition-all border ${
                        isCurrentStatus
                          ? `${color.bg} ${color.text} ${color.border} cursor-default`
                          : "bg-white border-gray-200 text-charcoal/60 hover:bg-gray-50"
                      } disabled:opacity-50`}
                    >
                      {status === "partial_payment" ? "Partial" : status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
