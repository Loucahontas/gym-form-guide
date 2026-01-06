import Link from "next/link";

export default function AdminExercisesPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin exercises</h1>
      <p className="mt-2 text-sm text-neutral-600">Placeholder screen.</p>

      <div className="mt-6">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
