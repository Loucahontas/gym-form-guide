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
    name?: string;
    slug?: string;
    equipment_type?: string;
    body_parts?: string[];
    setup_cues?: string[];
    form_cues?: string[];
    common_mistakes?: string[];
  };

  if (!body.name || !body.slug) {
    return NextResponse.json(
      { error: "Missing required fields: name, slug" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseServer
    .from("exercises")
    .insert([
      {
        name: body.name,
        slug: body.slug,
        equipment_type: body.equipment_type ?? "Machine",
        body_parts: body.body_parts ?? [],
        setup_cues: body.setup_cues ?? [],
        form_cues: body.form_cues ?? [],
        common_mistakes: body.common_mistakes ?? [],
      },
    ])
    .select("id, name, slug")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ exercise: data }, { status: 201 });
}