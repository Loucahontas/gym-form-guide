"use client";

import Link from "next/link";
import { useState } from "react";

type CreatedExercise = {
  id: string;
  name: string;
  slug: string;
};

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function AdminExercisesPage() {
  const [adminToken, setAdminToken] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [equipmentType, setEquipmentType] = useState("Machine");
  const [bodyParts, setBodyParts] = useState("chest");

  const [setupCuesText, setSetupCuesText] = useState("");
  const [formCuesText, setFormCuesText] = useState("");
  const [mistakesText, setMistakesText] = useState("");

  const [result, setResult] = useState<CreatedExercise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken,
        },
        body: JSON.stringify({
          name,
          slug,
          equipment_type: equipmentType,
          body_parts: bodyParts
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean),
          setup_cues: linesToArray(setupCuesText),
          form_cues: linesToArray(formCuesText),
          common_mistakes: linesToArray(mistakesText),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Request failed");
        return;
      }

      setResult(json.exercise);
      setName("");
      setSlug("");
      setSetupCuesText("");
      setFormCuesText("");
      setMistakesText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Admin exercises</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Local admin helper to create exercises.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="block text-sm text-neutral-600" htmlFor="token">
            Admin token
          </label>
          <input
            id="token"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Paste ADMIN_TOKEN here"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="name">
            Exercise name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chest Press"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. chest-press"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="equipment">
            Equipment type
          </label>
          <input
            id="equipment"
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="parts">
            Body parts (comma separated)
          </label>
          <input
            id="parts"
            value={bodyParts}
            onChange={(e) => setBodyParts(e.target.value)}
            placeholder="e.g. chest, shoulders, triceps"
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="setup">
            Setup cues (one per line)
          </label>
          <textarea
            id="setup"
            value={setupCuesText}
            onChange={(e) => setSetupCuesText(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            rows={4}
            placeholder={"Set seat height\nFeet flat on platform"}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="form">
            Form cues (one per line)
          </label>
          <textarea
            id="form"
            value={formCuesText}
            onChange={(e) => setFormCuesText(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            rows={4}
            placeholder={"Control the descent\nKeep ribs down"}
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-600" htmlFor="mistakes">
            Common mistakes (one per line)
          </label>
          <textarea
            id="mistakes"
            value={mistakesText}
            onChange={(e) => setMistakesText(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-transparent p-3 text-sm"
            rows={4}
            placeholder={"Knees caving in\nBouncing the weight"}
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg border px-4 py-3 text-sm hover:bg-neutral-50 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Add exercise"}
        </button>

        {error && (
          <div className="rounded-lg border p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="rounded-lg border p-4 text-sm">
            Created: {result.name} ({result.slug})
          </div>
        )}
      </form>

      <div className="mt-8">
        <Link className="underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}