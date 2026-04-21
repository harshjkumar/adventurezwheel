'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local state for settings
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      setSettings(data);
      const contact = data.contact || {};
      setContactPhone(contact.phone || '+91-7015760563');
      setContactEmail(contact.email || 'explore@adventureswheel.com');
      setContactAddress(contact.address || '');
      const social = data.social || {};
      setInstagram(social.instagram || 'adventures_wheel_travel');
      setFacebook(social.facebook || '');
      setYoutube(social.youtube || '');
      setWhatsapp(social.whatsapp || '');
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Save contact settings
      await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'contact', value: { phone: contactPhone, email: contactEmail, address: contactAddress } }),
      });
      // Save social settings
      await fetch('/api/admin/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'social', value: { instagram, facebook, youtube, whatsapp } }),
      });
      alert('Settings saved!');
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading...</div>;

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Site Settings</h1>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Phone</label><input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Email</label><input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="admin-input" /></div>
        </div>
        <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Address</label><textarea value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} rows={2} className="admin-input" /></div>
      </div>

      {/* Social Media */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-[family-name:var(--font-heading)] text-slate-800">Social Media</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Instagram Handle</label><input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Facebook</label><input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">YouTube</label><input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Number</label><input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="admin-input" /></div>
        </div>
      </div>

      <button onClick={saveSettings} disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
        <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
      </button>
    </div>
  );
}
