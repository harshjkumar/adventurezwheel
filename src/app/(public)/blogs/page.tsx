'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { blogPosts } from '@/data/home';

const allTags = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogsPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter((post) => {
    const matchesTag = activeTag === 'All' || post.category === activeTag;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src="/6e4e45cd-760e-4122-8240-8d0ec2e5662b.JPG" alt="Blog" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122822]/40 to-[#122822]/70" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1440px] flex-col justify-center px-6 pt-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">Blog</p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white">
            Stories & Guides
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Travel tips, destination guides, and stories from the road.
          </p>
        </div>
      </section>

      {/* Search + Tags + Posts */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-[#f8f9fa] py-3.5 pl-12 pr-4 text-sm focus:border-[#122822] focus:outline-none focus:ring-1 focus:ring-[#122822]"
            />
          </div>

          {/* Tags */}
          <div className="mb-10 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                  tag === activeTag
                    ? 'border-[#122822] bg-[#122822] text-white'
                    : 'border-slate-300 bg-white text-[#122822] hover:border-[#122822]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-[#f8f9fa] p-12 text-center">
              <p className="text-slate-500">No articles found.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <Link
                    href={`/blogs/${featured.slug}`}
                    className="group grid overflow-hidden rounded-2xl border border-slate-100 bg-[#f8f9fa] shadow-sm transition-all hover:shadow-lg lg:grid-cols-2"
                  >
                    <div className="relative aspect-[16/10] lg:aspect-auto">
                      <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
                      <span className="absolute left-4 top-4 rounded-md bg-[#122822] px-3 py-1 text-xs font-semibold text-white">
                        {featured.category}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime} min read</span>
                      </div>
                      <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#122822]">
                        {featured.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{featured.excerpt}</p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#122822]">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-slate-100 bg-[#f8f9fa] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                        <span className="absolute left-3 top-3 rounded-md bg-[#122822] px-3 py-1 text-xs font-semibold text-white">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime} min</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold leading-tight text-[#122822]">{post.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
