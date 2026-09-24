import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="border-edge bg-surface shadow-glass max-w-lg rounded-lg p-8">
        <p className="text-ink-faint text-xs font-medium tracking-[0.35em] uppercase">
          {siteConfig.project} · {siteConfig.title}
        </p>
        <h1 className="text-ink text-6xl mt-3 font-bold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="text-ink-soft mt-4 text-lg">{siteConfig.tagline}</p>
        <p className="text-ink-faint mt-6 text-sm">
          TAC design system active — cinematic experience lands in Section 06.
        </p>
      </div>
    </main>
  );
}