'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { ImagePreview } from '@/components/admin/ImagePreview';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => { if (!isNew) fetchBlog(); }, []);

  const fetchBlog = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/blogs/${id}`);
    const b = await res.json();
    setTitle(b.title || ''); setSlug(b.slug || ''); setExcerpt(b.excerpt || '');
    setContent(b.content || ''); setCoverImage(b.cover_image || '');
    setCategory(b.category || ''); setTagsStr((b.tags || []).join(', '));
    setReadTime(b.read_time || 5); setIsPublished(b.is_published || false);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        title, slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt, content, cover_image: coverImage, category,
        tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
        read_time: readTime, is_published: isPublished,
      };
      const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${id}`;
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('Save failed');
      const saved = await res.json();
      if (isNew) router.push(`/admin/blogs/${saved.id}`);
      else alert('Blog saved!');
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="py-20 text-center text-slate-400">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/blogs')} className="p-2 rounded hover:bg-gray-100 text-slate-400"><ArrowLeft size={20} /></button>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Slug</label><input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Auto-generated" className="admin-input" /></div>
        </div>
        <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Excerpt</label><textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="admin-input" /></div>
        <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Content (Markdown/HTML)</label><textarea value={content} onChange={(e) => setContent(e.target.value)} rows={15} className="admin-input font-mono text-xs" /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Cover Image URL</label><input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="admin-input" /><ImagePreview url={coverImage} /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Category</label><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input" /></div>
          <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Read Time (min)</label><input type="number" value={readTime} onChange={(e) => setReadTime(Number(e.target.value))} className="admin-input" /></div>
        </div>
        <div><label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Tags (comma separated)</label><input type="text" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className="admin-input" /></div>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 accent-emerald-600" /><span className="text-sm text-slate-700">Published</span></label>
      </div>
    </div>
  );
}
