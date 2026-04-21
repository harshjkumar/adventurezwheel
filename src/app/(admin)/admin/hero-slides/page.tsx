'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Upload } from 'lucide-react';

const PAGES = [
  { value: 'homepage', label: 'Home Page' },
  { value: 'domestic-trips', label: 'Domestic Trips' },
  { value: 'international-trips', label: 'International Trips' },
  { value: 'contact', label: 'Contact Page' },
];

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchSlides(); }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/hero-slides');
    setSlides(await res.json() || []);
    setLoading(false);
  };

  const uploadImage = async (file: File, setter: (url: string) => void) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      setter(url);
    } catch (err: any) { alert('Upload failed: ' + err.message); }
    finally { setUploading(false); }
  };

  const deleteImage = async (url: string) => {
    try {
      await fetch('/api/admin/r2-delete', { method: 'POST', body: JSON.stringify({ url }), headers: { 'Content-Type': 'application/json' }});
    } catch (e) { console.error('Failed to delete from storage', e); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing.id) {
        await fetch('/api/admin/hero-slides', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      } else {
        await fetch('/api/admin/hero-slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      }
      setEditing(null); fetchSlides();
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (s: any) => {
    if (!confirm('Delete this slide?')) return;
    if (s.image) await deleteImage(s.image);
    await fetch('/api/admin/hero-slides', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s.id }) });
    fetchSlides();
  };

  const groupedSlides = PAGES.map(page => ({
    ...page,
    items: slides.filter(s => (s.page || 'homepage') === page.value)
  })).filter(g => g.items.length > 0 || editing?.page === g.value);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Hero Slides</h1>
        <button onClick={() => setEditing({ title: '', subtitle: '', image: '', cta_text: 'Explore', cta_link: '/trips', order: 0, is_active: true, page: 'homepage' })}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"><Plus size={16} /> Add Slide</button>
      </div>

      {editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">{editing.id ? 'Edit' : 'New'} Slide</h3><button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Display Page</label>
              <select value={editing.page || 'homepage'} onChange={(e) => setEditing({ ...editing, page: e.target.value })} className="admin-input">
                {PAGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Title</label><input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="admin-input" /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Subtitle</label><input type="text" value={editing.subtitle || ''} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="admin-input" /></div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Image URL</label>
            <div className="flex gap-2">
              <input type="text" value={editing.image || ''} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="admin-input flex-1" />
              <label className={`flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 cursor-pointer transition-colors ${uploading ? 'opacity-50' : ''}`}>
                <Upload size={14} /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  e.target.files?.[0] && uploadImage(e.target.files[0], async (url) => {
                    if (editing.image) await deleteImage(editing.image);
                    setEditing({ ...editing, image: url });
                  })
                }} />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">CTA Text</label><input type="text" value={editing.cta_text || ''} onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">CTA Link</label><input type="text" value={editing.cta_link || ''} onChange={(e) => setEditing({ ...editing, cta_link: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Order</label><input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} className="admin-input" /></div>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"><Save size={16} /> Save</button>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="space-y-8">
          {groupedSlides.length === 0 && <div className="py-20 text-center text-slate-400">No hero slides yet</div>}
          {groupedSlides.map(group => (
            <div key={group.value}>
              <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b border-gray-200">{group.label}</h2>
              <div className="space-y-3">
                {group.items.map((s: any) => (
                  <div key={s.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex">
                    <div className="w-48 h-32 bg-gray-100 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${s.image})` }} />
                    <div className="p-5 flex-1 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-800 text-lg">{s.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{s.subtitle}</p>
                        <div className="flex gap-2 mt-3 items-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
                          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{group.label}</span>
                          <span className="text-xs text-slate-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">Order: {s.order}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setEditing(s)} className="px-4 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">Edit</button>
                        <button onClick={() => handleDelete(s)} className="px-4 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                {group.items.length === 0 && <p className="text-sm text-slate-400">No slides for this page.</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
