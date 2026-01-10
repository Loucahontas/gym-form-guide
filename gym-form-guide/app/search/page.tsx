// gym-form-guide/app/search/page.tsx
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type ExerciseRow = {
  id: string;
  name: string;
  slug: string;
  equipment_type: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let results: ExerciseRow[] = [];

  if (query) {
    const like = `%${query}%`;

    // 1) Direct matches on exercises
    const { data: direct } = await supabase
      .from("exercises")
      .select("id, name, slug, equipment_type")
      .or(`name.ilike.${like},slug.ilike.${like},body_parts.cs.{${query}}`)
      .order("name", { ascending: true });

    // 2) Matches on aliases -> map to exercises
    const { data: aliasRows } = await supabase
      .from("aliases")
      .select("exercise_id")
      .ilike("alias", like);

    const aliasIds = Array.from(
      new Set((aliasRows ?? []).map((r) => r.exercise_id).filter(Boolean)),
    );

    let aliasExercises: ExerciseRow[] = [];
    if (aliasIds.length > 0) {
      const { data: byAlias } = await supabase
        .from("exercises")
        .select("id, name, slug, equipment_type")
        .in("id", aliasIds)
        .order("name", { ascending: true });

      aliasExercises = (byAlias ?? []) as ExerciseRow[];
    }

    const merged = [...((direct ?? []) as ExerciseRow[]), ...aliasExercises];

    // Deduplicate by id
    const map = new Map<string, ExerciseRow>();
    for (const ex of merged) map.set(ex.id, ex);

    results = Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Search</h1>

      <form className="mt-4 grid gap-3" action="/search" method="get">
        <label className="block text-sm text-neutral-600" htmlFor="q">
          Search by name or keywords
        </label>
        <input
          id="q"
          name="q"
          defaultValue={query}
          placeholder="e.g. hip thrust, leg press, pull down"
          className="w-full rounded-lg border bg-transparent p-3 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg border px-4 py-3 text-sm hover:bg-neutral-50"
        >
          Search
        </button>
      </form>

      {query && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-neutral-200">
            Results ({results.length})
          </h2>

          {results.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">No matches.</p>
          ) : (
            <ul className="mt-3 grid gap-3">
              {results.map((ex) => (
                <li key={ex.id} className="rounded-lg border p-4">
                  <Link className="underline" href={`/exercise/${ex.slug}`}>
                    {ex.name}
                  </Link>
                  <div className="mt-1 text-sm text-neutral-600">
                    {ex.equipment_type}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
