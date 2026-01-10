import Link from "next/link";

export default function Home() {
  const links = [
    { href: "/browse/machines", label: "Browse by machine" },
    { href: "/browse/body", label: "Browse by body part" },
    { href: "/search", label: "Search" },
    { href: "/favourites", label: "Favourites" },
    { href: "/recent", label: "Recently viewed" },
    { href: "/admin/login", label: "Admin login" },
    { href: "/admin", label: "Admin dashboard" },
    { href: "/admin/exercises", label: "Admin exercises" },
    { href: "/admin/clips", label: "Admin clips" },
  ];

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Gym Form Guide</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Screen skeleton, navigation only.
      </p>

      <div className="mt-6 grid gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg border p-4 hover:bg-neutral-50"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
