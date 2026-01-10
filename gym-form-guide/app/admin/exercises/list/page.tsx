import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type ExerciseRow = {
  id: string;
  name: string;
  slug: string;
  equipment_type: string;
};

export default async function AdminExerciseListPage() {
  const { data, error } = await supabase
    .from("exercises")
    .select("id, name, slug, equipment_type")
    .order("name", { ascending: true });

  const exercises = (data ?? []) as ExerciseRow[];

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin exercise list</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {error ? "Error loading exercises." : `Total: ${exercises.length}`}
      </p>

      <ul className="mt-6 grid gap-3">
        {exercises.map((ex) => (
          <li key={ex.id} className="rounded-lg border p-4">
            <div className="font-semibold">{ex.name}</div>
            <div className="mt-1 text-sm text-neutral-600">
              {ex.slug} · {ex.equipment_type}
            </div>
            <div className="mt-2 flex gap-4 text-sm">
              <Link className="underline" href={`/exercise/${ex.slug}`}>
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex gap-4">
        <Link className="underline" href="/admin/exercises">
          Back to create
        </Link>
        <Link className="underline" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}