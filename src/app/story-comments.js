"use client";

import { useEffect, useState } from "react";

export function StoryComments({ storyId }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ authorName: "", message: "" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [commentsResponse, userResponse] = await Promise.all([
          fetch(`/api/stories/${encodeURIComponent(storyId)}/comments`),
          fetch("/api/auth/me"),
        ]);
        const commentsData = await commentsResponse.json();
        const userData = await userResponse.json();
        if (!commentsResponse.ok) throw new Error(commentsData.error || "Could not load comments.");
        if (!active) return;
        setComments(commentsData.comments || []);
        setIsAdmin(userData.user?.role === "admin");
      } catch (loadError) {
        if (active) setError(loadError.message || "Could not load comments.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [storyId]);

  const submitComment = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/stories/${encodeURIComponent(storyId)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not post your comment.");
      setComments((previous) => [data.comment, ...previous]);
      setForm({ authorName: "", message: "" });
    } catch (submitError) {
      setError(submitError.message || "Could not post your comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteComment = async (commentId) => {
    setError("");
    try {
      const response = await fetch(`/api/stories/${encodeURIComponent(storyId)}/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete this comment.");
      setComments((previous) => previous.filter((comment) => comment.id !== commentId));
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this comment.");
    }
  };

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:p-10">
      <h2 className="text-2xl font-semibold text-white">Comments</h2>
      <p className="mt-2 text-sm text-slate-400">Join the conversation about this story.</p>

      <form onSubmit={submitComment} className="mt-6 space-y-4">
        <input
          value={form.authorName}
          onChange={(event) => setForm((previous) => ({ ...previous, authorName: event.target.value }))}
          maxLength={80}
          required
          placeholder="Your name"
          className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-400"
        />
        <textarea
          value={form.message}
          onChange={(event) => setForm((previous) => ({ ...previous, message: event.target.value }))}
          maxLength={1000}
          required
          rows={4}
          placeholder="Write a comment…"
          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-fuchsia-400"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post comment"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}
      {loading && <p className="mt-8 text-sm text-slate-400">Loading comments…</p>}
      {!loading && comments.length === 0 && <p className="mt-8 text-sm text-slate-400">Be the first to comment.</p>}

      <div className="mt-8 space-y-4">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-white">{comment.authorName}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(comment.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => deleteComment(comment.id)}
                  className="rounded-full border border-rose-400/30 px-3 py-1.5 text-xs font-medium text-rose-200 transition hover:bg-rose-500/10"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">{comment.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
