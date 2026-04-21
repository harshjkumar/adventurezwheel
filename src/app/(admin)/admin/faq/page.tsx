'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export default function AdminFaqPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/faq');
    setItems(await res.json());
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        await fetch('/api/admin/faq', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      } else {
        await fetch('/api/admin/faq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      }
      setEditing(null); fetchItems();
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch('/api/admin/faq', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchItems();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">FAQ</h1>
        <button onClick={() => setEditing({ question: '', answer: '', order: 0, is_active: true })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"><Plus size={16} /> Add FAQ</button>
      </div>

      {editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">{editing.id ? 'Edit' : 'New'} FAQ</h3><button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Question</label><input type="text" value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Answer</label><textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={3} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Order</label><input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} className="admin-input w-24" /></div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"><Save size={16} /> Save</button>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="space-y-3">
          {items.map((f: any) => (
            <div key={f.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">{f.question}</h3>
                  <p className="text-sm text-slate-600">{f.answer}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditing(f)} className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded">Edit</button>
                  <button onClick={() => handleDelete(f.id)} className="p-1.5 rounded hover:bg-red-50 text-red-400"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="py-20 text-center text-slate-400">No FAQ items yet</div>}
        </div>
      )}
    </div>
  );
}
