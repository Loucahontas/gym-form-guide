import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      <p className="mt-2 text-sm text-neutral-600">Placeholder screen.</p>

      <div className="mt-6">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}