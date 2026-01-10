"use client";

import Link from "next/link";
import { useState } from "react";

type CreatedClip = {
  id: string;
  title: string;
  url: string;
};

export default function AdminClipsPage() {
  const [adminToken, setAdminToken] = useState("");
  const [exerciseSlug, setExerciseSlug] = useState("hip-thrust");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<CreatedClip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/clips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken,
        },
        body: JSON.stringify({
          exercise_slug: exerciseSlug,
          title,
          url,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Request failed");
        return;
      }

      setResult(json.clip);
      setTitle("");
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin clips</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Add video links to an exercise by slug.
      </p>

      <Link className="mt-2 inline-block underline" href="/admin/clips/list">
  View clip list
</Link>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm text-neutral-600" htmlFor="token">
            Admin token
          </label>
          <input
            id="token"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Paste ADMIN_TOKEN here"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="slug">
            Exercise slug
          </label>
          <input
            id="slug"
            value={exerciseSlug}
            onChange={(e) => setExerciseSlug(e.target.value)}
            placeholder="e.g. hip-thrust"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="title">
            Clip title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Hip thrust setup and form"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="url">
            Clip URL
          </label>
          <input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg border px-4 py-3 text-sm hover:bg-neutral-50 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Add clip"}
        </button>

        {error && (
          <div className="rounded-lg border p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="rounded-lg border p-4 text-sm">
            Created: {result.title}
          </div>
        )}
      </form>

      <div className="mt-8">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}