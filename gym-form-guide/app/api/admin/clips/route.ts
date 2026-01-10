import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

function isAuthorised(req: Request): boolean {
  const token = req.headers.get("x-admin-token");
  return Boolean(
    token && process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN,
  );
}

export async function POST(req: Request) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = (await req.json()) as {
    exercise_slug?: string;
    title?: string;
    url?: string;
    duration_seconds?: number;
    demonstrator_preference?: string;
    expertise?: string;
    goals?: string[];
  };

  if (!body.exercise_slug || !body.title || !body.url) {
    return NextResponse.json(
      { error: "Missing required fields: exercise_slug, title, url" },
      { status: 400 },
    );
  }

  // Find exercise id from slug
  const { data: ex, error: exErr } = await supabaseServer
    .from("exercises")
    .select("id")
    .eq("slug", body.exercise_slug)
    .single();

  if (exErr || !ex) {
    return NextResponse.json(
      { error: "Exercise not found for that slug" },
      { status: 404 },
    );
  }

  const { data, error } = await supabaseServer
    .from("clips")
    .insert([
      {
        exercise_id: ex.id,
        title: body.title,
        url: body.url,
        duration_seconds: body.duration_seconds ?? null,
        demonstrator_preference: body.demonstrator_preference ?? "any",
        expertise: body.expertise ?? null,
        goals: body.goals ?? [],
      },
    ])
    .select("id, title, url")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clip: data }, { status: 201 });
}