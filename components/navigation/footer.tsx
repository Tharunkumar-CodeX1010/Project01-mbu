import Link from "next/link";
import { primaryNav, siteConfig, utilityNav } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-elevated/50">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="text-ink flex items-center gap-2 text-lg font-bold">
            <span aria-hidden="true" className="text-accent">
              ●
            </span>
            {siteConfig.name}
          </p>
          <p className="text-ink-soft text-sm">{siteConfig.title}</p>
          <p className="text-ink-faint text-sm">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft text-sm transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <span className="mt-2 block h-px bg-edge" />
          {utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft text-sm transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="text-ink-soft text-sm font-medium">Integration status</p>
          <p className="text-ink-faint text-xs leading-relaxed">
            Grocery pricing, delivery and county availability are MOCKED in this
            build. Live provider data and database-backed features are
            BLOCKED_EXTERNAL_DEPENDENCY until authorized integrations are
            configured.
          </p>
        </div>
      </div>
      <div className="border-t border-edge py-4">
        <p className="text-ink-faint mx-auto max-w-[var(--container-max)] px-4 text-xs sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.project} —{" "}
          {siteConfig.title}. Built as an evidence-reporting engineering project.
        </p>
      </div>
    </footer>
  );
}