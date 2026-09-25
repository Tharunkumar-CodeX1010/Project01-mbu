"use client";

import { useState } from "react";
import { primaryNav } from "@/config/site";
import { Drawer } from "@/components/ui";
import { NavLink } from "./nav-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-edge bg-surface text-ink md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Menu"
        id="mobile-nav"
      >
        <nav aria-label="Primary" className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href} onNavigate={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </>
  );
}