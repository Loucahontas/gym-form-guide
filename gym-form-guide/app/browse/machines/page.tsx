import Link from "next/link";
import { sampleExercises } from "../../lib/sampleData";

export default function BrowseMachinesPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Browse by machine</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Sample exercises (temporary).
      </p>

      <ul className="mt-6 grid gap-3">
        {sampleExercises.map((ex) => (
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