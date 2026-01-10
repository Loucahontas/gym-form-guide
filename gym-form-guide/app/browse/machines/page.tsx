"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { sampleExercises } from "../../lib/sampleData";

type Category = {
  id: "all" | "legs" | "back";
  label: string;
};

const categories: Category[] = [
  { id: "all", label: "All" },
  { id: "legs", label: "Leg machines" },
  { id: "back", label: "Back machines" },
];

export default function BrowseMachinesPage() {
  const searchParams = useSearchParams();
  const cat = (searchParams.get("cat") ?? "all") as Category["id"];

  const filtered = useMemo(() => {
    if (cat === "legs") {
      return sampleExercises.filter((ex) =>
        ex.bodyParts.some((b) => b === "legs" || b === "glutes"),
      );
    }
    if (cat === "back") {
      return sampleExercises.filter((ex) => ex.bodyParts.includes("back"));
    }
    return sampleExercises;
  }, [cat]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Browse by machine</h1>
      <p className="mt-2 text-sm text-neutral-600">Sample data for now.</p>

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
              {ex.equipmentType}
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