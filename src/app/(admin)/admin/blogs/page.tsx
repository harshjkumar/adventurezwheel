'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/blogs');
    setBlogs(await res.json());
    setLoading(false);
  };

  const togglePublish = async (id: string, isPublished: boolean) => {
    await fetch(`/api/admin/blogs/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !isPublished, ...(!isPublished ? { published_at: new Date().toISOString() } : {}) }),
    });
    fetchBlogs();
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-[family-name:var(--font-heading)] text-slate-800">Blog Posts</h1>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
          <Plus size={16} /> New Post
        </Link>
      </div>

      {loading ? <div className="py-20 text-center text-slate-400">Loading...</div> : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-slate-400 uppercase tracking-[0.1em] text-[10px]">
              <th className="text-left p-4">Title</th><th className="text-left p-4">Category</th><th className="text-left p-4">Status</th><th className="text-left p-4">Date</th><th className="text-right p-4">Actions</th>
            </tr></thead>
            <tbody>
              {blogs.map((b: any) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4"><Link href={`/admin/blogs/${b.id}`} className="font-medium text-slate-800 hover:text-emerald-600">{b.title}</Link><p className="text-[10px] text-slate-400">/{b.slug}</p></td>
                  <td className="p-4 text-slate-500">{b.category || '—'}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-medium ${b.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{b.is_published ? 'Published' : 'Draft'}</span></td>
                  <td className="p-4 text-xs text-slate-400">{b.published_at ? new Date(b.published_at).toLocaleDateString('en-IN') : '—'}</td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/blogs/${b.id}`} className="p-1.5 rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 inline-flex"><Edit size={14} /></Link>
                    <button onClick={() => togglePublish(b.id, b.is_published)} className="p-1.5 rounded hover:bg-gray-100 text-slate-400 hover:text-slate-600">{b.is_published ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                    <button onClick={() => deleteBlog(b.id)} className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-slate-400">No blog posts yet</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
