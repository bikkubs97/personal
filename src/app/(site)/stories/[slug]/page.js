import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "../../../navigation";
import { getStoryEntries } from "@/lib/content";

export const dynamic = 'force-dynamic';

export default async function StoryDetailPage({ params }) {
  const { slug } = await params;
  
  let stories = [];
  try {
    stories = await getStoryEntries();
  } catch (error) {
    console.warn("Failed to load stories:", error.message);
    notFound();
  }
  
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-hidden bg-[#050b16] px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.16),transparent_65%)]" />
        <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href="/stories"
          className="mb-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10"
        >
          ← Back to stories
        </Link>

        <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/75 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
          <header className="border-b border-white/10 px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-fuchsia-200/80">
            <span>{story.category}</span>
            <span>•</span>
            <span>{story.readTime}</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {story.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 italic sm:text-xl sm:leading-9">
            {story.excerpt}
          </p>
          </header>

          <div className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
            <RichText
              data={story.content}
              className="text-lg leading-9 text-slate-200 [&_a]:font-medium [&_a]:text-fuchsia-200 [&_a]:underline [&_a]:decoration-fuchsia-400/60 [&_a]:underline-offset-4 hover:[&_a]:text-fuchsia-100 [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-fuchsia-400/70 [&_blockquote]:pl-5 [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_h1]:mb-5 [&_h1]:mt-12 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:my-10 [&_hr]:border-white/10 [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6"
            />
          </div>
        </article>
        </div>
      </main>
    </>
  );
}
