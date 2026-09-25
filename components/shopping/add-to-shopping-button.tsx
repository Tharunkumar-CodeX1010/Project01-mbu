"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { getRecipe } from "@/config/recipes";
import {
  buildShoppingItems,
  deserialize,
  serialize,
  shoppingStorageKey,
} from "@/lib/shopping";

const KEY = shoppingStorageKey();

function currentItems() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? deserialize(raw) : [];
  } catch {
    return [];
  }
}

export function AddToShoppingButton({ slug }: { slug: string }) {
  const router = useRouter();
  const recipe = getRecipe(slug);

  const add = () => {
    try {
      const next = [...currentItems(), ...buildShoppingItems([slug])];
      window.localStorage.setItem(KEY, serialize(next));
    } catch {
      // private mode — fall through
    }
    router.push("/shopping");
  };

  return (
    <Button onClick={add} variant="glass">
      Add {recipe?.ingredients.length ?? ""} ingredients to shopping list
    </Button>
  );
}