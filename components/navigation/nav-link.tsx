"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  className?: string;
}

export function NavLink({ href, children, onNavigate, className }: NavLinkProps) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-accent/15 text-accent-strong"
          : "text-ink-soft hover:bg-surface hover:text-ink",
        className
      )}
    >
      {children}
    </Link>
  );
}