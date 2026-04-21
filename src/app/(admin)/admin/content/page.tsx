'use client';

import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, RefreshCw, X } from 'lucide-react';

interface PageContent {
  id: string;
  page_key: string;
  section: string;
  content: Record<string, any>;
  updated_at: string;
}

export default function PageContentManager() {
  const [items, setItems] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, Record<string, any>>>({});
  const [newKey, setNewKey] = useState('');
  const [newSection, setNewSection] = useState('homepage');
  const [adding, setAdding] = useState(false);

  // Stats & Steps State
  const [stats, setStats] = useState<any[]>([]);
  const [howItWorks, setHowItWorks] = useState<any[]>([]);
  const [editingStat, setEditingStat] = useState<any>(null);
  const [editingStep, setEditingStep] = useState<any>(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resContent, resStats, resSteps] = await Promise.all([
        fetch('/api/admin/content'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/how-it-works'),
      ]);
      const data = await resContent.json();
      setItems(Array.isArray(data) ? data : []);
      
      const edited: Record<string, Record<string, any>> = {};
      (Array.isArray(data) ? data : []).forEach((item: PageContent) => {
        edited[item.id] = { ...item.content };
      });
      setEditedContent(edited);

      setStats(await resStats.json());
      setHowItWorks(await resSteps.json());
    } catch { }
    setLoading(false);
  };

  const saveItem = async (item: PageContent) => {
    setSaving(item.id);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, content: editedContent[item.id] || item.content }),
      });
      fetchAll();
    } catch { }
    setSaving(null);
  };

  const addItem = async () => {
    if (!newKey.trim()) return;
    setAdding(true);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_key: newKey, section: newSection, content: { value: '' } }),
      });
      setNewKey('');
      fetchAll();
    } catch { }
    setAdding(false);
  };

  const updateField = (itemId: string, key: string, value: string) => {
    setEditedContent(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [key]: value },
    }));
  };

  const addField = (itemId: string) => {
    const fieldName = prompt('Enter field name:');
    if (!fieldName) return;
    setEditedContent(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [fieldName]: '' },
    }));
  };

  const removeField = (itemId: string, key: string) => {
    if (!confirm(`Remove field "${key}"?`)) return;
    setEditedContent(prev => {
      const updated = { ...(prev[itemId] || {}) };
      delete updated[key];
      return { ...prev, [itemId]: updated };
    });
  };

  // Stats Handlers
  const saveStat = async () => {
    setSaving('stat');
    if (editingStat.id) {
      await fetch('/api/admin/stats', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingStat) });
    } else {
      await fetch('/api/admin/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingStat) });
    }
    setEditingStat(null); fetchAll(); setSaving(null);
  };

  const deleteStat = async (id: string) => {
    if (!confirm('Delete stat?')) return;
    await fetch('/api/admin/stats', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchAll();
  };

  // Steps Handlers
  const saveStep = async () => {
    setSaving('step');
    if (editingStep.id) {
      await fetch('/api/admin/how-it-works', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingStep) });
    } else {
      await fetch('/api/admin/how-it-works', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingStep) });
    }
    setEditingStep(null); fetchAll(); setSaving(null);
  };

  const deleteStep = async (id: string) => {
    if (!confirm('Delete step?')) return;
    await fetch('/api/admin/how-it-works', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchAll();
  };

  // Group by section
  const sections = items.reduce<Record<string, PageContent[]>>((acc, item) => {
    const s = item.section || 'other';
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Page Content</h1>
          <p className="text-sm text-slate-500 mt-1">Edit content displayed across the website. Changes reflect live immediately.</p>
        </div>
        <button onClick={fetchAll} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-sm rounded-lg hover:bg-gray-200 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading content...</div>
      ) : (
        <div className="space-y-16">
          {/* Static Content Blocks */}
          <div className="space-y-8">
            <h2 className="text-2xl font-[family-name:var(--font-heading)] text-slate-800 border-b pb-2">Static Text Blocks</h2>
            {Object.entries(sections).map(([section, sectionItems]) => (
              <div key={section} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 capitalize">
                  {section} Section
                </h3>
                
                {sectionItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">{item.page_key}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Last updated: {item.updated_at ? new Date(item.updated_at).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addField(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-slate-600 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Plus size={12} /> Add Field
                        </button>
                        <button
                          onClick={() => saveItem(item)}
                          disabled={saving === item.id}
                          className="flex items-center gap-1 px-4 py-1.5 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                          <Save size={12} /> {saving === item.id ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(editedContent[item.id] || item.content).map(([key, value]) => (
                        <div key={key} className="flex gap-3 items-start">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 w-32 pt-2.5 shrink-0">
                            {key.replace(/_/g, ' ')}
                          </label>
                          {String(value).length > 100 ? (
                            <textarea
                              value={String(value)}
                              onChange={(e) => updateField(item.id, key, e.target.value)}
                              rows={4}
                              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none resize-y"
                            />
                          ) : (
                            <input
                              type="text"
                              value={String(value)}
                              onChange={(e) => updateField(item.id, key, e.target.value)}
                              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                            />
                          )}
                          <button
                            onClick={() => removeField(item.id, key)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Add new content block */}
            <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6">
              <h3 className="text-sm font-medium text-slate-600 mb-3">Add New Content Block</h3>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Page Key</label>
                  <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="e.g., homepage_banner"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                  />
                </div>
                <div className="w-40">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Section</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 outline-none"
                  >
                    <option value="homepage">Homepage</option>
                    <option value="contact">Contact</option>
                    <option value="about">About</option>
                    <option value="footer">Footer</option>
                    <option value="trips">Trips</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  onClick={addItem}
                  disabled={adding || !newKey.trim()}
                  className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  <Plus size={14} /> {adding ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Stats Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-[family-name:var(--font-heading)] text-slate-800">Homepage Stats</h2>
              <button onClick={() => setEditingStat({ value: '', label: '', icon: 'mountain', order: 0, is_active: true })}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"><Plus size={14} /> Add Stat</button>
            </div>

            {editingStat && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 mb-4">
                <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">{editingStat.id ? 'Edit' : 'New'} Stat</h3><button onClick={() => setEditingStat(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Value</label><input type="text" value={editingStat.value} onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })} placeholder="100+" className="admin-input" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Label</label><input type="text" value={editingStat.label} onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })} placeholder="Destinations" className="admin-input" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Icon</label><input type="text" value={editingStat.icon} onChange={(e) => setEditingStat({ ...editingStat, icon: e.target.value })} className="admin-input" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Order</label><input type="number" value={editingStat.order} onChange={(e) => setEditingStat({ ...editingStat, order: Number(e.target.value) })} className="admin-input" /></div>
                </div>
                <button onClick={saveStat} disabled={saving === 'stat'} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50"><Save size={14} className="inline mr-1" /> Save</button>
              </div>
            )}

            <div className="space-y-2">
              {stats.map((s: any) => (
                <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-emerald-600">{s.value}</span>
                    <span className="text-sm text-slate-600">{s.label}</span>
                    <span className="text-[10px] text-slate-400">({s.icon})</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditingStat(s)} className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded">Edit</button>
                    <button onClick={() => deleteStat(s.id)} className="p-1.5 hover:bg-red-50 text-red-400 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* How It Works Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-[family-name:var(--font-heading)] text-slate-800">How It Works Steps</h2>
              <button onClick={() => setEditingStep({ step: '', title: '', description: '', icon: 'search', order: 0, is_active: true })}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"><Plus size={14} /> Add Step</button>
            </div>

            {editingStep && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 mb-4">
                <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">{editingStep.id ? 'Edit' : 'New'} Step</h3><button onClick={() => setEditingStep(null)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Step Label</label><input type="text" value={editingStep.step} onChange={(e) => setEditingStep({ ...editingStep, step: e.target.value })} placeholder="Step 1" className="admin-input" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Title</label><input type="text" value={editingStep.title} onChange={(e) => setEditingStep({ ...editingStep, title: e.target.value })} className="admin-input" /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Description</label><textarea value={editingStep.description} onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })} rows={2} className="admin-input" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Icon</label><input type="text" value={editingStep.icon} onChange={(e) => setEditingStep({ ...editingStep, icon: e.target.value })} className="admin-input" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 uppercase mb-1">Order</label><input type="number" value={editingStep.order} onChange={(e) => setEditingStep({ ...editingStep, order: Number(e.target.value) })} className="admin-input" /></div>
                </div>
                <button onClick={saveStep} disabled={saving === 'step'} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50"><Save size={14} className="inline mr-1" /> Save</button>
              </div>
            )}

            <div className="space-y-2">
              {howItWorks.map((s: any) => (
                <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-600 font-medium">{s.step}</span>
                    <h4 className="font-medium text-slate-800">{s.title}</h4>
                    <p className="text-xs text-slate-500">{s.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditingStep(s)} className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-50 rounded">Edit</button>
                    <button onClick={() => deleteStep(s.id)} className="p-1.5 hover:bg-red-50 text-red-400 rounded"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
