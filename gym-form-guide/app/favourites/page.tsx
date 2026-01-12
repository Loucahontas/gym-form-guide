// gym-form-guide/app/favourites/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

type Favourite = {
  slug: string;
  name: string;
  equipmentType?: string;
};

const STORAGE_KEY = "gfg_favourites_v1";

function loadFavourites(): Favourite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Favourite[]) : [];
  } catch {
    return [];
  }
}

function saveFavourites(items: Favourite[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function FavouritesPage() {
  const [items, setItems] = useState<Favourite[]>(() => loadFavourites());

  function remove(slug: string) {
    const next = items.filter((f) => f.slug !== slug);
    saveFavourites(next);
    setItems(next);
  }

  function clearAll() {
    saveFavourites([]);
    setItems([]);
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Favourites</h1>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-600">No favourites yet.</p>
      ) : (
        <>
          <ul className="mt-6 grid gap-3">
            {items.map((f) => (
              <li key={f.slug} className="rounded-lg border p-4">
                <Link className="underline" href={`/exercise/${f.slug}`}>
                  {f.name}
                </Link>
                {f.equipmentType && (
                  <div className="mt-1 text-sm text-neutral-600">
                    {f.equipmentType}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => remove(f.slug)}
                  className="mt-3 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={clearAll}
            className="mt-6 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          >
            Clear all
          </button>
        </>
      )}

      <div className="mt-8">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}