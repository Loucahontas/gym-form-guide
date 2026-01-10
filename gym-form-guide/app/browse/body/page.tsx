import Link from "next/link";

const bodyParts = ["legs", "glutes", "back", "chest", "shoulders", "arms", "core"];

export default function BrowseBodyPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Browse by body part</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Pick a body part to jump into search.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {bodyParts.map((b) => (
          <li key={b}>
            <Link
              className="block rounded-lg border p-4 text-center capitalize hover:bg-neutral-50"
              href={`/search?q=${encodeURIComponent(b)}`}
            >
              {b}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}