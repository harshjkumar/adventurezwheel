'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Mail, Phone, Trash2, Check, Clock, X } from 'lucide-react';

interface Enquiry {
  id: string; name: string; email: string; phone: string;
  trip_interest: string; group_size: string; message: string;
  status: string; created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-amber-50 text-amber-700',
  resolved: 'bg-emerald-50 text-emerald-700',
  closed: 'bg-slate-100 text-slate-500',
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/enquiries');
    setEnquiries(await res.json());
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/enquiries', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchEnquiries();
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    await fetch('/api/admin/enquiries', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchEnquiries();
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Enquiries</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MessageSquare size={16} /> {enquiries.length} total
        </div>
      </div>

      <div className="space-y-4">
        {enquiries.map((enq) => (
          <div key={enq.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-slate-800 text-lg">{enq.name}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Mail size={12} />{enq.email}</span>
                  {enq.phone && <span className="flex items-center gap-1"><Phone size={12} />{enq.phone}</span>}
                  <span className="flex items-center gap-1"><Clock size={12} />{new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[enq.status] || STATUS_COLORS.new}`}>
                {enq.status}
              </span>
            </div>
            {enq.trip_interest && <p className="text-sm text-emerald-600 mb-1">Trip: {enq.trip_interest}</p>}
            {enq.group_size && <p className="text-sm text-slate-500 mb-2">Group size: {enq.group_size}</p>}
            {enq.message && <p className="text-sm text-slate-600 bg-gray-50 rounded-lg p-3 mb-4">{enq.message}</p>}
            <div className="flex items-center gap-2">
              {enq.status !== 'contacted' && <button onClick={() => updateStatus(enq.id, 'contacted')} className="px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100">Mark Contacted</button>}
              {enq.status !== 'resolved' && <button onClick={() => updateStatus(enq.id, 'resolved')} className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100"><Check size={12} className="inline mr-1" />Resolve</button>}
              <button onClick={() => deleteEnquiry(enq.id)} className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-500 rounded-lg hover:bg-red-100 ml-auto"><Trash2 size={12} className="inline mr-1" />Delete</button>
            </div>
          </div>
        ))}
        {enquiries.length === 0 && <div className="py-20 text-center text-slate-400">No enquiries yet.</div>}
      </div>
    </div>
  );
}
