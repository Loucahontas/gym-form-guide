import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type ExerciseRow = {
  id: string;
  name: string;
  slug: string;
  equipment_type: string;
  body_parts: string[];
  setup_cues: string[];
  form_cues: string[];
  common_mistakes: string[];
};

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("exercises")
    .select(
      "id, name, slug, equipment_type, body_parts, setup_cues, form_cues, common_mistakes",
    )
    .eq("slug", slug)
    .single();

  const exercise = data as ExerciseRow | null;

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Exercise</h1>
      <p className="mt-2 text-sm text-neutral-600">Slug: {slug}</p>

      {error || !exercise ? (
        <p className="mt-6 text-sm text-neutral-600">
          Could not load this exercise.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            <p className="text-sm text-neutral-600">{exercise.equipment_type}</p>
          </div>

          <section>
            <h3 className="text-lg font-semibold">Setup</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
              {exercise.setup_cues.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Form cues</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
              {exercise.form_cues.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Common mistakes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-200">
              {exercise.common_mistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <div className="mt-8 flex gap-4">
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