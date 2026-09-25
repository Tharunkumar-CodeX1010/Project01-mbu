import { getRecipe } from "@/config/recipes";

export interface ShoppingItem {
  ingredient: string;
  qty: string;
  recipe: string;
  checked: boolean;
  id: string;
}

const ITEM_KEY = "tac.shopping.items.v1";

/** Merge ingredients from one or more recipes into a flat shopping list. */
export function buildShoppingItems(recipeSlugs: string[]): ShoppingItem[] {
  const items: ShoppingItem[] = [];
  for (const slug of recipeSlugs) {
    const recipe = getRecipe(slug);
    if (!recipe) continue;
    for (const ingredient of recipe.ingredients) {
      items.push({
        id: `${slug}:${ingredient.item}:${ingredient.qty}`,
        ingredient: ingredient.item,
        qty: ingredient.qty,
        recipe: recipe.name,
        checked: false,
      });
    }
  }
  return items;
}

export function serialize(items: ShoppingItem[]): string {
  return JSON.stringify(items);
}

export function deserialize(raw: string): ShoppingItem[] {
  try {
    const parsed = JSON.parse(raw) as ShoppingItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function shoppingStorageKey(): string {
  return ITEM_KEY;
}