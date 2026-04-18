"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag, Share2, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  tags: string[];
  category: string;
  published_at: string;
}

const SPITI_BLOG_IMAGES = [
  "/images/trips/spiti/spiti-key-monastery.jpeg",
  "/images/trips/spiti/spiti-chandratal-cover.jpeg",
  "/images/trips/spiti/spiti-shimla-cover.jpeg",
  "/images/trips/spiti/spiti-pic-1.jpeg",
  "/images/trips/spiti/spiti-wa-2.jpeg",
];

function splitArticle(content: string, excerpt: string) {
  const raw = (content && content.trim().length > 0 ? content : excerpt || "").trim();
  if (!raw) return [];
  return raw
    .split(/\n\n+/)
    .map((p) => p.replace(/\n+/g, " ").trim())
    .filter(Boolean);
}

export function BlogArticleClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const readMinutes = Math.max(1, Math.ceil((post.content?.length || post.excerpt?.length || 0) / 1200));
  const articleParts = useMemo(() => splitArticle(post.content, post.excerpt), [post.content, post.excerpt]);
  const heroImage = post.cover_image || SPITI_BLOG_IMAGES[0];
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url: shareUrl });
      } catch {}
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Editorial Hero */}
      <section className="relative overflow-hidden pt-[88px] lg:pt-[96px] bg-[#F6F3EE]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 right-0 h-[340px] w-[340px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-[280px] w-[280px] rounded-full bg-charcoal/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-charcoal/10 bg-white p-7 md:p-10"
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-charcoal/50 text-xs font-nav uppercase tracking-[0.18em] hover:text-accent transition-colors mb-6"
              >
                <ArrowLeft size={14} /> Back to Blog
              </Link>

              <p className="text-[10px] md:text-xs text-accent font-nav font-semibold uppercase tracking-[0.22em] mb-3">
                {post.category || "Article"}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-charcoal/60 text-base leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-7 text-sm text-charcoal/50">
                <span className="inline-flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {readMinutes} min read</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden min-h-[340px] lg:min-h-[420px] border border-charcoal/10 shadow-sm"
            >
              <Image src={heroImage} alt={post.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/80 text-[10px] font-nav uppercase tracking-[0.2em] mb-1">K2K Editorial</p>
                <p className="text-white font-serif text-xl leading-tight">On-road stories from the Himalayas</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-6">
            {SPITI_BLOG_IMAGES.map((img, i) => (
              <div key={img} className={`relative rounded-lg overflow-hidden border border-charcoal/10 ${i > 2 ? "hidden md:block" : ""} aspect-[4/3]`}>
                <Image src={img} alt={`Spiti visual ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Article Body */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-none rounded-2xl border border-charcoal/10 bg-white p-7 md:p-10"
            >
              {articleParts.length > 0 ? (
                <div className="space-y-6 text-charcoal/75 leading-[1.95] text-[15px] md:text-base font-sans">
                  {articleParts.map((para, idx) => {
                    const looksLikeHeading = para.length < 70 && para.endsWith(":");
                    if (looksLikeHeading) {
                      return (
                        <h2 key={`h-${idx}`} className="font-serif text-2xl text-charcoal pt-3">
                          {para.replace(/:$/, "")}
                        </h2>
                      );
                    }

                    return (
                      <div key={`p-${idx}`}>
                        <p className={idx === 0 ? "text-lg md:text-xl text-charcoal/85 leading-[1.8]" : ""}>{para}</p>

                        {idx === 1 && (
                          <div className="relative mt-7 rounded-xl overflow-hidden border border-charcoal/10 aspect-[16/7]">
                            <Image src={SPITI_BLOG_IMAGES[2]} alt="Spiti valley route" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                            <p className="absolute bottom-3 left-4 text-white text-xs font-nav tracking-[0.12em] uppercase">Field Note • Spiti Valley</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-charcoal/70 leading-[1.9] text-[15px]">No content available for this article yet.</p>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-xs text-charcoal/60 rounded-full">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8">
                <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal/20 rounded-md text-sm text-charcoal/70 hover:text-accent hover:border-accent transition-colors">
                  <Share2 size={16} /> Share this article
                </button>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28 h-fit">
              {/* Author Card */}
              <div className="bg-white rounded-xl p-6 border border-charcoal/10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm uppercase">
                    {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-charcoal text-sm">{post.author}</p>
                    <p className="text-xs text-charcoal/40">Adventure Specialist</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal/50 leading-relaxed">
                  Sharing stories and guides from the roads less traveled across the Indian Himalayas.
                </p>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rp, idx) => (
                      <Link key={rp.id} href={`/blogs/${rp.slug}`} className="group flex gap-3">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                          <Image src={rp.cover_image || SPITI_BLOG_IMAGES[idx % SPITI_BLOG_IMAGES.length]} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-charcoal leading-snug group-hover:text-accent transition-colors line-clamp-2">{rp.title}</h4>
                          <p className="text-[10px] text-charcoal/40 mt-1">
                            {new Date(rp.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-xl overflow-hidden border border-charcoal/10 bg-white">
                <div className="relative h-36">
                  <Image src={SPITI_BLOG_IMAGES[1]} alt="Spiti inspiration" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/35" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl text-charcoal mb-2">Plan Your Next Expedition</h3>
                  <p className="text-xs text-charcoal/60 mb-4">Explore curated rides across Ladakh, Spiti, and Kashmir.</p>
                  <Link href="/trips" className="inline-block px-6 py-2.5 bg-accent text-white text-xs font-medium uppercase tracking-wider rounded-md hover:bg-accent/90 transition-colors">
                  View Trips
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
