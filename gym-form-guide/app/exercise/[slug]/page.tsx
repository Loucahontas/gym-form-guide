import Link from "next/link";

type PageProps = {
  params: { slug: string };
};

export default function ExercisePage({ params }: PageProps) {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Exercise</h1>
      <p className="mt-2 text-sm text-neutral-600">Slug: {params.slug}</p>

      <div className="mt-6 flex gap-4">
        <Link className="underline" href="/">
          Back to Home
        </Link>
        <Link className="underline" href="/browse/machines">
          Browse machines
        </Link>
      </div>
    </main>
  );
}
