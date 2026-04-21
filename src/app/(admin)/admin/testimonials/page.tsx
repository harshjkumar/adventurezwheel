'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/testimonials');
    setItems(await res.json());
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        await fetch('/api/admin/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      } else {
        await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      }
      setEditing(null); fetchItems();
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/admin/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Testimonials</h1>
        <button onClick={() => setEditing({ name: '', comment: '', rating: 5, trip_reference: '', avatar: '', order: 0, is_active: true })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"><Plus size={16} /> Add</button>
      </div>

      {editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">{editing.id ? 'Edit' : 'New'} Testimonial</h3><button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Name</label><input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Rating</label><input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="admin-input" /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Comment</label><textarea value={editing.comment} onChange={(e) => setEditing({ ...editing, comment: e.target.value })} rows={3} className="admin-input" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Trip Reference</label><input type="text" value={editing.trip_reference || ''} onChange={(e) => setEditing({ ...editing, trip_reference: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Order</label><input type="number" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} className="admin-input" /></div>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"><Save size={16} /> Save</button>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="space-y-3">
          {items.map((t: any) => (
            <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-800">{t.name}</h3>
                  <div className="flex">{[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}</div>
                </div>
                <p className="text-sm text-slate-600 mb-1">{t.comment}</p>
                {t.trip_reference && <p className="text-xs text-emerald-600">{t.trip_reference}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => setEditing(t)} className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded">Edit</button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="py-20 text-center text-slate-400">No testimonials yet</div>}
        </div>
      )}
    </div>
  );
}
