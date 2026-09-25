"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { HeroContentItem } from "@/config/hero";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { useReducedMotion } from "./use-reduced-motion";

export function CinematicHero({ item }: { item: HeroContentItem }) {
  const reducedMotion = useReducedMotion();
  const [videoBroken, setVideoBroken] = useState(false);

  const showVideo = item.video !== null && !reducedMotion && !videoBroken;
  const showFallback = !showVideo;

  return (
    <section
      aria-label={`Featured dish: ${item.title}`}
      className="relative isolate flex min-h-[68vh] items-end overflow-hidden"
    >
      {showVideo && item.video ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.video.poster}
          onError={() => setVideoBroken(true)}
          aria-hidden="true"
        >
          <source src={item.video.src} type="video/mp4" />
        </video>
      ) : null}

      {/* Procedural cinematic poster (produced in-house, SVG) */}
      <Parallax speed={0.08} className="absolute inset-0">
        <div
          role="img"
          aria-label={`Cinematic backdrop of ${item.title}`}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.poster})` }}
        />
      </Parallax>

      {showFallback ? (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="from-accent/25 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
          <div className="animate-tac-breath absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-canvas to-transparent" />
        </div>
      ) : null}

      {/* Readability gradient */}
      <div
        aria-hidden="true"
        className="from-canvas via-transparent to-transparent absolute inset-0 bg-gradient-to-t"
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-4 pb-12 sm:px-6 sm:pb-16">
        <Reveal>
          <p className="text-accent text-xs font-medium uppercase tracking-[0.3em] sm:text-sm">
            {item.overline}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-ink mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {item.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-ink-soft mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            {item.description}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={item.recipeHref}>{item.recipeLabel}</Button>
            <Button href={item.exploreHref} variant="glass">
              {item.exploreLabel}
            </Button>
          </div>
        </Reveal>
        <p className="text-ink-faint mt-8 text-xs">
          {siteConfig.project} · {siteConfig.title}
        </p>
      </div>
    </section>
  );
}