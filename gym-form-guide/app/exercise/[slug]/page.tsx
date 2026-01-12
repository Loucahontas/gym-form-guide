// gym-form-guide/app/exercise/[slug]/page.tsx
import Link from "next/link";
import FavouriteToggle from "../../components/FavouriteToggle";
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

type ClipRow = {
  id: string;
  title: string;
  url: string;
  duration_seconds: number | null;
  demonstrator_preference: string;
  expertise: string | null;
  goals: string[];
};

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: exerciseData, error: exerciseError } = await supabase
    .from("exercises")
    .select(
      "id, name, slug, equipment_type, body_parts, setup_cues, form_cues, common_mistakes",
    )
    .eq("slug", slug)
    .single();

  const exercise = exerciseData as ExerciseRow | null;

  let clips: ClipRow[] = [];
  if (exercise) {
    const { data: clipData } = await supabase
      .from("clips")
      .select(
        "id, title, url, duration_seconds, demonstrator_preference, expertise, goals",
      )
      .eq("exercise_id", exercise.id)
      .order("created_at", { ascending: true });

    clips = (clipData ?? []) as ClipRow[];
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Exercise</h1>
      <p className="mt-2 text-sm text-neutral-600">Slug: {slug}</p>

      {exerciseError || !exercise ? (
        <p className="mt-6 text-sm text-neutral-600">
          Could not load this exercise.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            <p className="text-sm text-neutral-600">{exercise.equipment_type}</p>

            <div className="mt-3">
              <FavouriteToggle
                item={{
                  slug: exercise.slug,
                  name: exercise.name,
                  equipmentType: exercise.equipment_type,
                }}
              />
            </div>
          </div>

          <section>
            <h3 className="text-lg font-semibold">Videos</h3>
            {clips.length === 0 ? (
              <p className="mt-2 text-sm text-neutral-600">No videos yet.</p>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {clips.map((clip) => (
                  <li key={clip.id}>
                    <a
                      className="underline"
                      href={clip.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {clip.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>

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