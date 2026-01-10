"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sampleExercises } from "../lib/sampleData";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return sampleExercises.filter((ex) => {
      const haystack = [
        ex.name,
        ex.slug,
        ex.equipmentType,
        ...ex.aliases,
        ...ex.bodyParts,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Search</h1>

      <label className="mt-4 block text-sm text-neutral-600" htmlFor="q">
        Search by name or keywords
      </label>
      <input
        id="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. leg press, pull down, back"
        className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
      />

      {query.trim() && (
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
                    {ex.equipmentType}
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
