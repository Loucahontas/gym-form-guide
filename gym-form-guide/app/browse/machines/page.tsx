import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type ExerciseRow = {
  id: string;
  name: string;
  slug: string;
  equipment_type: string;
  body_parts: string[];
};

type Category = {
  id: "all" | "legs" | "back";
  label: string;
};

const categories: Category[] = [
  { id: "all", label: "All" },
  { id: "legs", label: "Leg machines" },
  { id: "back", label: "Back machines" },
];

export default async function BrowseMachinesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat: catRaw } = await searchParams;
  const cat = (catRaw ?? "all") as Category["id"];

  const { data, error } = await supabase
    .from("exercises")
    .select("id, name, slug, equipment_type, body_parts")
    .order("name", { ascending: true });

  const exercises = (data ?? []) as ExerciseRow[];

  const filtered =
    cat === "legs"
      ? exercises.filter((ex) =>
          ex.body_parts.some((b) => b === "legs" || b === "glutes"),
        )
      : cat === "back"
        ? exercises.filter((ex) => ex.body_parts.includes("back"))
        : exercises;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Browse by machine</h1>
      <p className="mt-2 text-sm text-neutral-600">
        {error ? "Error loading exercises." : "Loaded from Supabase."}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c.id === cat;
          return (
            <Link
              key={c.id}
              href={`/browse/machines?cat=${c.id}`}
              className={`rounded-full border px-3 py-2 text-sm ${
                active ? "bg-neutral-50 text-neutral-900" : "hover:bg-neutral-50"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-3">
        {filtered.map((ex) => (
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

      <div className="mt-6">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}