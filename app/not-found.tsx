import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
          404
        </p>
        <h1 className="text-ink text-3xl font-bold tracking-tight">
          This dish is not on the menu
        </h1>
        <p className="text-ink-soft text-sm leading-relaxed">
          The page you are looking for does not exist or has moved. Explore the
          regions, recipes and history that do.
        </p>
        <Link
          href="/"
          className="bg-accent text-accent-ink shadow-glow-orange mt-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent-strong"
        >
          Back to YUMMYGO
        </Link>
      </div>
    </main>
  );
}