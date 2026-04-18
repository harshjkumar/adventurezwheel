import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from '@/data/home';

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122822]/80 via-[#122822]/30 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-4xl flex-col justify-end px-4 pb-12 pt-20 sm:px-6">
          <span className="inline-block w-fit rounded-md bg-emerald-700 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
            {post.category}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] text-white">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <Image src={post.authorAvatar} alt={post.author} width={40} height={40} className="rounded-full border-2 border-white" />
            <div className="text-white">
              <div className="text-sm font-semibold">{post.author}</div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Clock className="h-3 w-3" /> {post.readTime} min read · {post.date}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4" /> Back to all stories
          </Link>

          <article className="prose prose-lg prose-slate mt-8 max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-[#122822] prose-a:text-emerald-700">
            <p className="text-xl leading-9 text-slate-600">{post.excerpt}</p>
            <p>Travel has a way of transforming us — opening our eyes to new cultures, landscapes, and ways of living. At Adventures Wheel, we believe that the best journeys combine comfort with authentic discovery.</p>
            <h2>Why This Destination Stands Out</h2>
            <p>Every destination we curate has been personally vetted by our team. We prioritize routes that offer a blend of iconic landmarks and hidden gems, ensuring you see both the famous highlights and the local secrets that make a place truly special.</p>
            <blockquote>&ldquo;The best trips are the ones that change your perspective. That&apos;s what we strive to create with every itinerary.&rdquo;</blockquote>
            <h2>Planning Your Visit</h2>
            <p>Whether you&apos;re a first-time traveler or a seasoned explorer, preparation is key. Our expert guides will handle the logistics while you focus on soaking in every moment. From visa arrangements to local customs, we&apos;ve got you covered.</p>
            <p>Ready to explore? Browse our full collection of curated trips and find the journey that speaks to your soul.</p>
          </article>
        </div>
      </section>

      {/* Related posts */}
      <section className="bg-[#f6f7f9] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-center font-[family-name:var(--font-heading)] text-4xl text-[#122822]">Related Stories</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blogs/${p.slug}`} className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
                <div className="p-5">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-emerald-700">{p.category}</span>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-[#122822]">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}