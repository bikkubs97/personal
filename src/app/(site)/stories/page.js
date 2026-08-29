import Link from "next/link";
import { Navigation } from "../../navigation";
import { getStoryEntries } from "@/lib/content";

export const dynamic = 'force-dynamic';

export default async function StoriesPage() {
  let stories = [];
  
  try {
    stories = await getStoryEntries();
  } catch (error) {
    console.warn("Failed to load stories:", error.message);
    // Return empty stories array if database is not initialized
    // The CMS will populate this once the database is set up
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#070b17] text-white">
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-4 inline-flex items-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-200">
            Literature
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
               My Stories
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
                A space for literary work, personal essays, and short fiction—shaped by the life I’ve lived and the people I’ve met. I believe everyone has a story to tell. In the simplest terms, I am a storyteller.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:border-fuchsia-400/60 hover:bg-fuchsia-500/10"
            >
              Back to home
            </Link>
          </div>
        </div>

        {stories.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-8 text-center sm:p-12">
            <p className="text-slate-400">No stories published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stories.map((story) => (
            <article
              key={story.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-fuchsia-400/50 hover:bg-slate-900/80 sm:p-8"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>{story.category}</span>
                <span>•</span>
                <span>{story.readTime}</span>
              </div>

              <h2 className="text-3xl font-semibold text-white">{story.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                {story.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <p className="text-sm text-slate-400">Read the full piece</p>
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm font-medium text-fuchsia-100 transition hover:bg-fuchsia-500/20"
                >
                  Open story →
                </Link>
              </div>
            </article>
            ))}
          </div>
        )}
        </div>
      </main>
    </>
  );
}
