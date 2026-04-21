'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newImage, setNewImage] = useState({ title: '', src: '', alt: '', category: '', caption: '' });

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/gallery');
    setImages(await res.json());
    setLoading(false);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const { url } = await res.json();
      setNewImage({ ...newImage, src: url });
    } catch (err: any) { alert(err.message); }
    finally { setUploading(false); }
  };

  const addImage = async () => {
    if (!newImage.src) return alert('Please provide an image URL or upload one');
    await fetch('/api/admin/gallery', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newImage),
    });
    setNewImage({ title: '', src: '', alt: '', category: '', caption: '' });
    setShowAdd(false);
    fetchImages();
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await fetch('/api/admin/gallery', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchImages();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Gallery</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> Add Image
        </button>
      </div>

      {showAdd && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between"><h3 className="font-medium text-slate-700">Add Image</h3><button onClick={() => setShowAdd(false)} className="p-1 hover:bg-gray-100 rounded"><X size={16} /></button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Title</label><input type="text" value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} className="admin-input" /></div>
            <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Category</label><input type="text" value={newImage.category} onChange={(e) => setNewImage({ ...newImage, category: e.target.value })} className="admin-input" /></div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Image URL</label>
            <div className="flex gap-2">
              <input type="text" value={newImage.src} onChange={(e) => setNewImage({ ...newImage, src: e.target.value })} className="admin-input flex-1" />
              <label className={`flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-100 cursor-pointer ${uploading ? 'opacity-50' : ''}`}>
                <Upload size={14} /> {uploading ? '...' : 'Upload'}<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])} />
              </label>
            </div>
          </div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Caption</label><input type="text" value={newImage.caption} onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })} className="admin-input" /></div>
          <button onClick={addImage} className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">Save Image</button>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img: any) => (
            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img.src})` }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between">
                  <div><p className="text-xs text-white font-medium">{img.title || 'Untitled'}</p>{img.category && <p className="text-[10px] text-white/70">{img.category}</p>}</div>
                  <button onClick={() => deleteImage(img.id)} className="p-1.5 bg-red-500/80 rounded text-white hover:bg-red-600"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && <div className="col-span-full py-20 text-center text-slate-400">No gallery images yet</div>}
        </div>
      )}
    </div>
  );
}
