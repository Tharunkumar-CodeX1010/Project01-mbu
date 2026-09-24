import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium tracking-[0.35em] text-zinc-500 uppercase">
        {siteConfig.project} · {siteConfig.title}
      </p>
      <h1 className="text-6xl font-bold tracking-tight text-foreground">
        {siteConfig.name}
      </h1>
      <p className="max-w-md text-lg text-zinc-500">{siteConfig.tagline}</p>
      <p className="text-sm text-zinc-600">
        Section 01 complete — cinematic experience lands in Section 06.
      </p>
    </main>
  );
}