import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type ExerciseRow = { id: string; name: string; slug: string };
type ClipRow = { id: string; title: string; url: string; created_at: string };

export default async function AdminClipListPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const exerciseSlug = (slug ?? "").trim();

  let exercise: ExerciseRow | null = null;
  let clips: ClipRow[] = [];
  let message = "";

  if (!exerciseSlug) {
    message = "Enter an exercise slug to view clips.";
  } else {
    const { data: ex, error: exErr } = await supabase
      .from("exercises")
      .select("id, name, slug")
      .eq("slug", exerciseSlug)
      .single();

    if (exErr || !ex) {
      message = "Exercise not found for that slug.";
    } else {
      exercise = ex as ExerciseRow;

      const { data } = await supabase
        .from("clips")
        .select("id, title, url, created_at")
        .eq("exercise_id", exercise.id)
        .order("created_at", { ascending: true });

      clips = (data ?? []) as ClipRow[];
      message = `Found ${clips.length} clip(s).`;
    }
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin clip list</h1>

      <form className="mt-4 grid gap-3" action="/admin/clips/list" method="get">
        <label className="block text-sm text-neutral-600" htmlFor="slug">
          Exercise slug
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={exerciseSlug}
          placeholder="e.g. hip-thrust"
          className="w-full rounded-lg border bg-transparent p-3 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg border px-4 py-3 text-sm hover:bg-neutral-50"
        >
          View clips
        </button>
      </form>

      <p className="mt-4 text-sm text-neutral-600">{message}</p>

      {exercise && (
        <div className="mt-4 rounded-lg border p-4">
          <div className="font-semibold">{exercise.name}</div>
          <div className="text-sm text-neutral-600">{exercise.slug}</div>
        </div>
      )}

      {clips.length > 0 && (
        <ul className="mt-6 grid gap-3">
          {clips.map((c) => (
            <li key={c.id} className="rounded-lg border p-4">
              <div className="font-semibold">{c.title}</div>
              <a className="mt-1 block underline" href={c.url} target="_blank" rel="noreferrer">
                Open
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex gap-4">
        <Link className="underline" href="/admin/clips">
          Back to add clips
        </Link>
        <Link className="underline" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}