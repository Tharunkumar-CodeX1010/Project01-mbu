"use client";

import { useSyncExternalStore, useState } from "react";
import { Badge } from "@/components/ui";
import {
  EQUIPMENT_OPTIONS,
  SKILL_OPTIONS,
  DEFAULT_KITCHEN_PROFILE,
  gradeKitchen,
  compatibilityFor,
  achievementsFor,
} from "@/lib/kitchen";
import type { KitchenProfile, SkillLevel } from "@/lib/kitchen";
import { RECIPES } from "@/config/recipes";

const STORAGE_KEY = "tac.kitchen.v1";
const MAX_COMPATIBILITY = 12;

let cached: KitchenProfile | null = null;

function readStore(): KitchenProfile {
  if (typeof window === "undefined") return DEFAULT_KITCHEN_PROFILE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_KITCHEN_PROFILE;
    const parsed = JSON.parse(raw) as Partial<KitchenProfile>;
    return { ...DEFAULT_KITCHEN_PROFILE, ...parsed };
  } catch {
    return DEFAULT_KITCHEN_PROFILE;
  }
}

function subscribeStore(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): KitchenProfile {
  if (!cached) cached = readStore();
  return cached;
}

function getServerSnapshot(): KitchenProfile {
  return DEFAULT_KITCHEN_PROFILE;
}

function persist(next: KitchenProfile) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // private mode — memory-only until refresh
  }
}

export function KitchenProfilePanel() {
  const profile = useSyncExternalStore(subscribeStore, getSnapshot, getServerSnapshot);
  const [pantryDraft, setPantryDraft] = useState("");

  const update = (patch: Partial<KitchenProfile>) =>
    persist({ ...profile, ...patch });

  const grade = gradeKitchen(profile);
  const achievements = achievementsFor(profile);

  const addPantryItem = () => {
    const item = pantryDraft.trim();
    if (!item) return;
    if (profile.pantry.some((p) => p.toLowerCase() === item.toLowerCase())) {
      setPantryDraft("");
      return;
    }
    persist({ ...profile, pantry: [...profile.pantry, item] });
    setPantryDraft("");
  };

  const removePantryItem = (item: string) =>
    persist({
      ...profile,
      pantry: profile.pantry.filter((p) => p !== item),
    });

  const toggleEquipment = (id: string) =>
    persist({
      ...profile,
      equipment: profile.equipment.includes(id)
        ? profile.equipment.filter((e) => e !== id)
        : [...profile.equipment, id],
    });

  const compatibility = RECIPES.map((recipe) => ({
    recipe,
    compat: compatibilityFor(recipe, profile.pantry),
  }))
    .filter((entry) => entry.compat.missing.length > 0 || entry.compat.matched.length > 0)
    .sort((a, b) => b.compat.score - a.compat.score)
    .slice(0, MAX_COMPATIBILITY);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <section
        aria-label="Kitchen grade and profile"
        className="border-edge bg-surface shadow-glass rounded-lg p-6"
      >
        <div className="flex items-center gap-4">
          <span className="bg-accent text-accent-ink flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
            {grade.tier}
          </span>
          <div>
            <h2 className="text-ink text-xl font-semibold tracking-tight">
              {grade.label}
            </h2>
            <ul className="text-ink-soft mt-1 space-y-0.5 text-sm">
              {grade.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <fieldset>
            <legend className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]">
              Skill level
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SKILL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={profile.skill === option.id}
                  onClick={() => update({ skill: option.id as SkillLevel })}
                  className={
                    profile.skill === option.id
                      ? "bg-accent text-accent-ink rounded-lg px-3 py-2 text-sm font-medium"
                      : "border-edge text-ink-soft hover:text-ink rounded-lg border px-3 py-2 text-sm transition-colors"
                  }
                >
                  {option.label}
                  <span className={profile.skill === option.id ? "block text-accent-ink/80 text-xs" : "block text-ink-faint text-xs"}>
                    {option.note}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6">
          <fieldset>
            <legend className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]">
              Equipment
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map((option) => {
                const active = profile.equipment.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleEquipment(option.id)}
                    className={
                      active
                        ? "bg-accent text-accent-ink rounded-full px-3 py-1.5 text-xs font-medium"
                        : "border-edge text-ink-soft hover:text-ink rounded-full border px-3 py-1.5 text-xs transition-colors"
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="mt-6">
          <label
            htmlFor="household"
            className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]"
          >
            Household size
          </label>
          <input
            id="household"
            type="number"
            min={1}
            max={20}
            value={profile.household}
            onChange={(e) =>
              update({ household: Math.max(1, Math.min(20, Number(e.target.value) || 1)) })
            }
            className="border-edge bg-elevated text-ink focus:border-accent mt-2 h-10 w-24 rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="dietary"
            className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]"
          >
            Dietary notes
          </label>
          <textarea
            id="dietary"
            rows={2}
            value={profile.dietary}
            onChange={(e) => update({ dietary: e.target.value })}
            placeholder="e.g. nut allergy, vegetarian household…"
            className="border-edge bg-elevated text-ink focus:border-accent placeholder:text-ink-faint mt-2 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <p className="text-ink-faint mt-6 text-xs">
          Changes save instantly to this browser (localStorage). Not synced;
          cloud sync is future-work.
        </p>
        <button
          type="button"
          onClick={() => persist(DEFAULT_KITCHEN_PROFILE)}
          className="text-ink-faint hover:text-ink mt-2 text-xs underline"
        >
          Reset kitchen profile
        </button>
      </section>

      <div className="space-y-6">
        <section
          aria-label="Pantry"
          className="border-edge bg-surface shadow-glass rounded-lg p-6"
        >
          <h2 className="text-ink text-lg font-semibold tracking-tight">Pantry</h2>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              addPantryItem();
            }}
            className="mt-3 flex gap-2"
          >
            <label htmlFor="pantry-add" className="sr-only">
              Add pantry item
            </label>
            <input
              id="pantry-add"
              type="text"
              value={pantryDraft}
              onChange={(e) => setPantryDraft(e.target.value)}
              placeholder="tomatoes, basmati rice…"
              className="border-edge bg-elevated text-ink focus:border-accent placeholder:text-ink-faint h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent text-accent-ink shadow-glow-orange h-10 shrink-0 rounded-lg px-4 text-sm font-medium transition-colors hover:bg-accent-strong"
            >
              Add
            </button>
          </form>
          {profile.pantry.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.pantry.map((item) => (
                <li key={item}>
                  <Badge variant="outline" className="gap-1.5">
                    {item}
                    <button
                      type="button"
                      aria-label={`Remove ${item}`}
                      onClick={() => removePantryItem(item)}
                      className="text-ink-faint hover:text-ink"
                    >
                      ✕
                    </button>
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-ink-faint mt-4 text-sm">
              Pantry is empty — add ingredients to unlock the compatibility preview.
            </p>
          )}
        </section>

        <section
          aria-label="Recipe compatibility preview"
          className="border-edge bg-surface shadow-glass rounded-lg p-6"
        >
          <h2 className="text-ink text-lg font-semibold tracking-tight">
            Compatibility preview
          </h2>
          <p className="text-ink-faint mt-1 text-xs">
            Heuristic overlap of pantry vs recipe ingredients — not a grocery-grade engine.
          </p>
          {compatibility.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {compatibility.map(({ recipe, compat }) => {
                const pct = Math.round(compat.score * 100);
                return (
                  <li key={recipe.slug} className="flex items-center justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <a
                        href={`/recipes/${recipe.slug}`}
                        className="text-ink hover:text-accent truncate hover:underline"
                      >
                        {recipe.name}
                      </a>
                      <p className="text-ink-faint mt-0.5 truncate text-xs">
                        missing {Math.min(compat.missing.length, 4) > 0 ? (
                          compat.missing.slice(0, 4).join(", ") +
                          (compat.missing.length > 4 ? ` +${compat.missing.length - 4}` : "")
                        ) : "nothing"}
                      </p>
                    </div>
                    <span className="text-accent font-semibold">{pct}%</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-ink-faint mt-4 text-sm">
              Add pantry items to see which masterclasses you could cook tonight.
            </p>
          )}
        </section>

        <section
          aria-label="Achievements"
          className="border-edge bg-surface shadow-glass rounded-lg p-6"
        >
          <h2 className="text-ink text-lg font-semibold tracking-tight">
            Achievements
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <Badge
                  variant={achievement.reached ? "orange" : "neutral"}
                  className={achievement.reached ? "" : "opacity-60"}
                >
                  {achievement.reached ? "✓ " : "· "}
                  {achievement.label}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}