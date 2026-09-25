import Link from "next/link";
import { primaryNav, siteConfig } from "@/config/site";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-ink flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span aria-hidden="true" className="text-accent">
            ●
          </span>
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}