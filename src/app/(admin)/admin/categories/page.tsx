'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface Category {
  id: string; name: string; slug: string; description: string; icon: string;
  region: string; cover_image: string; order: number; is_active: boolean;
  parent_type: 'domestic' | 'international';
  is_featured: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/categories');
    setCategories(await res.json() || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await fetch('/api/admin/categories', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      } else {
        await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
      }
      setEditing(null);
      fetchCategories();
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this subcategory?')) return;
    await fetch('/api/admin/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchCategories();
  };

  const domesticCats = categories.filter(c => c.parent_type === 'domestic');
  const internationalCats = categories.filter(c => c.parent_type === 'international');

  const renderTable = (cats: Category[]) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
          <th className="text-left p-4">Name</th><th className="text-left p-4">Region</th><th className="text-left p-4">Order</th><th className="text-left p-4">Status</th><th className="text-right p-4">Actions</th>
        </tr></thead>
        <tbody>
          {cats.map((c) => (
            <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="p-4 font-medium text-slate-800">
                {c.name}
                {c.is_featured && <span className="ml-2 inline-block px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] rounded-full font-bold">★ Featured</span>}
                <p className="text-[10px] text-slate-400">/{c.slug}</p>
              </td>
              <td className="p-4 text-slate-500">{c.region || '—'}</td>
              <td className="p-4 text-slate-500">{c.order}</td>
              <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-medium ${c.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{c.is_active ? 'Active' : 'Inactive'}</span></td>
              <td className="p-4 text-right">
                <button onClick={() => setEditing(c)} className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 mr-1">Edit</button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
          {cats.length === 0 && (
            <tr><td colSpan={5} className="p-8 text-center text-slate-400">No subcategories found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Trip Subcategories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage subcategories under Domestic and International.</p>
        </div>
        <button onClick={() => setEditing({ name: '', description: '', icon: 'mountain', region: '', order: 0, is_active: true, parent_type: 'domestic', is_featured: false })} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Add Subcategory
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-700">{editing.id ? 'Edit' : 'New'} Subcategory</h3>
            <button onClick={() => setEditing(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Parent Category</label>
              <select value={editing.parent_type || 'domestic'} onChange={(e) => setEditing({ ...editing, parent_type: e.target.value as any })} className="admin-input">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Name</label><input type="text" value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="admin-input" placeholder="e.g. Leh-Ladakh" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Region</label><input type="text" value={editing.region || ''} onChange={(e) => setEditing({ ...editing, region: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Cover Image URL</label><input type="text" value={editing.cover_image || ''} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} className="admin-input" /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Description</label><textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="admin-input" rows={2} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Icon</label><input type="text" value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Order</label><input type="number" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} className="admin-input" /></div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 font-medium">
                <input type="checkbox" checked={editing.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" />
                Featured in Navbar (Max 5)
              </label>
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Domestic Subcategories
            </h2>
            {renderTable(domesticCats)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> International Subcategories
            </h2>
            {renderTable(internationalCats)}
          </div>
        </div>
      )}
    </div>
  );
}
