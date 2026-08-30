"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation } from "../../navigation";

export default function PhotoGalleryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likedPhotoIds, setLikedPhotoIds] = useState(() => {
    if (typeof window === "undefined") return new Set();

    try {
      const savedLikes = JSON.parse(window.localStorage.getItem("liked-gallery-photos") || "[]");
      return Array.isArray(savedLikes) ? new Set(savedLikes.map(String)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [likingPhotoIds, setLikingPhotoIds] = useState(() => new Set());

  useEffect(() => {
    let active = true;

    fetch("/api/content?type=photogallery")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not load the gallery.");
        if (active) setEntries(result.data || []);
      })
      .catch((fetchError) => {
        if (active) setError(fetchError.message || "Could not load the gallery.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % entries.length));
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === null ? entries.length - 1 : (prev - 1 + entries.length) % entries.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [entries.length, selectedIndex]);

  const activeEntry = selectedIndex === null ? null : entries[selectedIndex];

  const showPrevious = () => {
    setSelectedIndex((prev) => (prev === null ? entries.length - 1 : (prev - 1 + entries.length) % entries.length));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % entries.length));
  };

  const likePhoto = async (event, photoId) => {
    event.stopPropagation();
    const id = String(photoId);
    if (likedPhotoIds.has(id) || likingPhotoIds.has(id)) return;

    setLikingPhotoIds((previous) => new Set(previous).add(id));
    try {
      const response = await fetch(`/api/photos/${encodeURIComponent(id)}/like`, { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save your like.");

      setEntries((previous) => previous.map((entry) => (
        String(entry.id) === id ? { ...entry, likes: result.likes } : entry
      )));
      setLikedPhotoIds((previous) => {
        const next = new Set(previous).add(id);
        window.localStorage.setItem("liked-gallery-photos", JSON.stringify([...next]));
        return next;
      });
    } catch (likeError) {
      setError(likeError.message || "Could not save your like.");
    } finally {
      setLikingPhotoIds((previous) => {
        const next = new Set(previous);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
          <div className="mb-4 inline-flex items-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-fuchsia-200">
            Photo gallery
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frames from everyday wonder
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
              A visual archive of travel, moods, and the quiet rituals of everyday life. I’m a photography hobbyist, and this is where I share some of my work and my journey of learning and improving through photography.
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

        {loading && <p className="text-slate-300">Loading photos…</p>}
        {error && <p className="text-rose-300">{error}</p>}
        {!loading && !error && entries.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-slate-300">
            No photos have been published yet.
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((entry, index) => (
            <article
              key={entry.id}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-300 hover:border-fuchsia-400/40 hover:bg-slate-900/80"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(event) => likePhoto(event, entry.id)}
                    disabled={likedPhotoIds.has(String(entry.id)) || likingPhotoIds.has(String(entry.id))}
                    aria-label={likedPhotoIds.has(String(entry.id)) ? "You liked this photo" : "Like this photo"}
                    className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1.5 text-sm text-fuchsia-100 transition hover:bg-fuchsia-500/20 disabled:cursor-default disabled:opacity-70"
                  >
                    <span aria-hidden="true">{likedPhotoIds.has(String(entry.id)) ? "♥" : "♡"}</span>
                    {entry.likes || 0}
                  </button>
                  {likingPhotoIds.has(String(entry.id)) && <span className="text-xs text-slate-400">Saving…</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fuchsia-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    {entry.location}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {entry.title}
                  </h2>
                </div>

                <p className="text-sm leading-7 text-slate-300">
                  {entry.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 px-2.5 py-1.5 text-sm font-medium leading-none text-white backdrop-blur-md transition hover:bg-black/60"
            >
              Close
            </button>

            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-sm text-slate-300">
              <span>{activeEntry.location}</span>
              <span>
                {selectedIndex + 1} / {entries.length}
              </span>
            </div>

            <div className="relative flex items-center justify-center bg-black/40 p-4 sm:p-6">
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xl text-white transition hover:bg-black/60"
                aria-label="Previous photo"
              >
                ←
              </button>

              <img
                src={activeEntry.image}
                alt={activeEntry.title}
                className="max-h-[72vh] w-full max-w-5xl rounded-lg object-contain"
              />

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xl text-white transition hover:bg-black/60"
                aria-label="Next photo"
              >
                →
              </button>
            </div>

            <div className="space-y-2 px-5 pb-6 pt-5 text-slate-200 sm:px-6">
              <h2 className="text-2xl font-semibold text-white">{activeEntry.title}</h2>
              <p className="text-sm leading-7 text-slate-300">{activeEntry.description}</p>
            </div>
          </div>
        </div>
      )}
      </main>
    </>
  );
}
