"use client";

import { useMemo, useState } from "react";
import {
  convertMass,
  convertVolume,
  convertTemperature,
} from "@/lib/converter";
import { RECIPES } from "@/config/recipes";
import { scaleRecipe } from "@/lib/converter";
import { findSubstitutions } from "@/lib/substitutions";

export function ConverterPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <UnitConverter />
      <TemperatureConverter />
      <RecipeScaler />
      <SubstitutionLookup />
    </div>
  );
}

function UnitConverter() {
  const [amount, setAmount] = useState("2");
  const [from, setFrom] = useState("cup");
  const [to, setTo] = useState("ml");
  const [ingredient, setIngredient] = useState("flour");

  const result = useMemo(() => {
    const value = Number(amount) || 0;
    const volumeFrom = ["ml", "l", "tsp", "tbsp", "cup", "floz"].includes(from);
    const volumeTo = ["ml", "l", "tsp", "tbsp", "cup", "floz"].includes(to);
    if (volumeFrom && volumeTo) {
      return convertVolume(value, from as never, to as never).toFixed(1);
    }
    if (!volumeFrom && !volumeTo) {
      return convertMass(value, from as never, to as never).toFixed(1);
    }
    if (volumeFrom && !volumeTo) {
      const density = flourOrWater(ingredient);
      const grams = value * volumeTable(from) * density;
      return (grams / massToG(to)).toFixed(1);
    }
    const density = flourOrWater(ingredient);
    const ml = (value * massToG(from)) / density;
    return (ml / volumeTable(to)).toFixed(1);
  }, [amount, from, to, ingredient]);

  return (
    <section aria-label="Unit converter" className="border-edge bg-surface shadow-glass rounded-lg p-6">
      <h2 className="text-ink text-lg font-semibold tracking-tight">Unit converter</h2>
      <p className="text-ink-faint mt-1 text-xs">
        Volume ↔ mass uses approximate pantry densities (flour ≈ 0.52 g/ml,
        unknown ingredients assume water).
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-ink-soft text-sm">
          Amount
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </label>
        <label className="text-ink-soft text-sm">
          Ingredient (for volume↔mass)
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </label>
        <label className="text-ink-soft text-sm">
          From
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {["cup", "tbsp", "tsp", "ml", "l", "floz", "g", "kg", "oz", "lb"].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
        <label className="text-ink-soft text-sm">
          To
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {["cup", "tbsp", "tsp", "ml", "l", "floz", "g", "kg", "oz", "lb"].map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-accent mt-4 text-xl font-semibold">
        {amount} {from} ≈ {result} {to}
      </p>
    </section>
  );
}

const VOLUME_ML: Record<string, number> = { ml: 1, l: 1000, tsp: 5, tbsp: 15, cup: 240, floz: 30 };
const MASS_G: Record<string, number> = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };

function volumeTable(unit: string) {
  return VOLUME_ML[unit] ?? 1;
}
function massToG(unit: string) {
  return MASS_G[unit] ?? 1;
}
function flourOrWater(ingredient: string) {
  const lower = ingredient.toLowerCase();
  if (lower.includes("flour")) return 0.52;
  if (lower.includes("sugar")) return 0.83;
  if (lower.includes("salt")) return 1.2;
  if (lower.includes("butter")) return 0.95;
  if (lower.includes("oil")) return 0.92;
  return 1;
}

function TemperatureConverter() {
  const [value, setValue] = useState("180");
  const [from, setFrom] = useState<"C" | "F" | "K">("C");
  const [to, setTo] = useState<"C" | "F" | "K">("F");

  const result = useMemo(() => {
    const n = Number(value) || 0;
    return convertTemperature(n, from, to).toFixed(1);
  }, [value, from, to]);

  return (
    <section aria-label="Temperature converter" className="border-edge bg-surface shadow-glass rounded-lg p-6">
      <h2 className="text-ink text-lg font-semibold tracking-tight">
        Temperature converter
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-ink-soft text-sm">
          Value
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </label>
        <label className="text-ink-soft text-sm">
          From
          <select value={from} onChange={(e) => setFrom(e.target.value as "C")} className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent">
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
            <option value="K">Kelvin</option>
          </select>
        </label>
        <div />
        <label className="text-ink-soft text-sm">
          To
          <select value={to} onChange={(e) => setTo(e.target.value as "F")} className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent">
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
            <option value="K">Kelvin</option>
          </select>
        </label>
      </div>
      <p className="text-accent mt-4 text-xl font-semibold">
        {value}°{from} = {result}°{to}
      </p>
    </section>
  );
}

function RecipeScaler() {
  const [recipeSlug, setRecipeSlug] = useState(RECIPES[0].slug);
  const [target, setTarget] = useState(4);
  const recipe = RECIPES.find((r) => r.slug === recipeSlug)!;
  const scaled = useMemo(() => scaleRecipe(recipe, target), [recipe, target]);

  return (
    <section aria-label="Recipe scaler" className="border-edge bg-surface shadow-glass rounded-lg p-6">
      <h2 className="text-ink text-lg font-semibold tracking-tight">
        Serving scaler
      </h2>
      <p className="text-ink-faint mt-1 text-xs">
        Scales every numeric quantity. “handful”, “pinch” and counts stay
        judgment calls.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-ink-soft text-sm">
          Masterclass
          <select value={recipeSlug} onChange={(e) => setRecipeSlug(e.target.value)} className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent">
            {RECIPES.map((r) => (
              <option key={r.slug} value={r.slug}>{r.name}</option>
            ))}
          </select>
        </label>
        <label className="text-ink-soft text-sm">
          Servings ({recipe.servings} original)
          <input
            type="number"
            min={1}
            value={target}
            onChange={(e) => setTarget(Math.max(1, Number(e.target.value) || 1))}
            className="border-edge bg-elevated focus:border-accent text-ink mt-1 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </label>
      </div>
      <ul className="mt-4 space-y-1.5">
        {scaled.map((ingredient) => {
          const changed = ingredient.qty !== ingredient.original;
          return (
            <li key={ingredient.item + ingredient.original} className="flex justify-between gap-4 text-sm">
              <span className="text-ink-soft">{ingredient.item}</span>
              <span className={changed ? "text-accent font-medium" : "text-ink"}>
                {ingredient.qty}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SubstitutionLookup() {
  const [query, setQuery] = useState("");
  const hits = useMemo(() => findSubstitutions(query), [query]);

  return (
    <section aria-label="Substitution lookup" className="border-edge bg-surface shadow-glass rounded-lg p-6">
      <h2 className="text-ink text-lg font-semibold tracking-tight">
        Substitution lookup
      </h2>
      <p className="text-ink-faint mt-1 text-xs">
        Editorial confidence (not laboratory-measured). Use judgment.
      </p>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type an ingredient…"
        className="border-edge bg-elevated focus:border-accent text-ink placeholder:text-ink-faint mt-4 h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
      />
      {hits.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {hits.map((hit) => (
            <li key={hit.ingredient} className="border-edge rounded-lg border p-3">
              <p className="text-ink text-sm font-medium">{hit.ingredient}</p>
              <ul className="mt-2 space-y-1.5">
                {hit.alternatives.map((alt) => (
                  <li key={alt.name} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-ink-soft">
                      {alt.name}
                      {alt.note ? (
                        <span className="text-ink-faint block text-xs">{alt.note}</span>
                      ) : null}
                    </span>
                    <span className="text-accent shrink-0 text-xs font-semibold">
                      {Math.round(alt.confidence * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : query ? (
        <p className="text-ink-faint mt-4 text-sm">No known substitution for that ingredient.</p>
      ) : (
        <p className="text-ink-faint mt-4 text-sm">Try “buttermilk”, “palm sugar” or “guajillo”.</p>
      )}
    </section>
  );
}