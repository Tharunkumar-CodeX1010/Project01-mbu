interface PageIntroProps {
  overline?: string;
  title: string;
  description?: string;
}

export function PageIntro({ overline, title, description }: PageIntroProps) {
  return (
    <header className="space-y-2">
      {overline ? (
        <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
          {overline}
        </p>
      ) : null}
      <h1 className="text-ink text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="text-ink-soft max-w-2xl text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}