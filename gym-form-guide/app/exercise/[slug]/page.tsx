import Link from "next/link";
import { sampleExercises } from "../../lib/sampleData";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const exercise = sampleExercises.find((ex) => ex.slug === slug);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Exercise</h1>
      <p className="mt-2 text-sm text-neutral-600">Slug: {slug}</p>

      {!exercise ? (
        <p className="mt-6">Not found.</p>
      ) : (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">{exercise.name}</h2>
          <p className="text-sm text-neutral-600">{exercise.equipmentType}</p>
        <div className="mt-6 space-y-6">
  <section>
    <h3 className="text-lg font-semibold">Setup</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
      {exercise.setupCues.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  </section>

  <section>
    <h3 className="text-lg font-semibold">Form cues</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
      {exercise.formCues.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  </section>

  <section>
    <h3 className="text-lg font-semibold">Common mistakes</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
      {exercise.commonMistakes.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  </section>
</div>
        
        </div>
      )}

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