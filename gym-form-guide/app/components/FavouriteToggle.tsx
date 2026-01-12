"use client";

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

export default function FavouriteToggle({ item }: { item: Favourite }) {
  // Used only to force a re-render after we update localStorage
  const [tick, setTick] = useState(0);

  const items = loadFavourites();
  const isFavourite = items.some((f) => f.slug === item.slug);

  function toggle() {
    const exists = items.some((f) => f.slug === item.slug);

    const next = exists
      ? items.filter((f) => f.slug !== item.slug)
      : [...items, item];

    saveFavourites(next);
    setTick((t) => t + 1);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
      aria-pressed={isFavourite}
      // uses tick so React knows to re-render after toggle
      data-tick={tick}
    >
      {isFavourite ? "Saved" : "Save"}
    </button>
  );
}