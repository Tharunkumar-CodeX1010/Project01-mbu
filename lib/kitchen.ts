import type { Recipe } from "@/config/recipes";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "pro";

export interface SkillOption {
  id: SkillLevel;
  label: string;
  note: string;
}

export const SKILL_OPTIONS: SkillOption[] = [
  { id: "beginner", label: "Beginner", note: "First pots" },
  { id: "intermediate", label: "Intermediate", note: "Confident basics" },
  { id: "advanced", label: "Advanced", note: "Comfortable techniques" },
  { id: "pro", label: "Pro", note: "Runs programs" },
];

export interface EquipmentOption {
  id: string;
  label: string;
}

export const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { id: "oven", label: "Oven" },
  { id: "stovetop", label: "Stovetop" },
  { id: "grill", label: "Grill" },
  { id: "sous-vide", label: "Sous-vide" },
  { id: "stand-mixer", label: "Stand mixer" },
  { id: "food-processor", label: "Food processor" },
  { id: "pressure-cooker", label: "Pressure cooker" },
  { id: "steamer", label: "Steamer" },
  { id: "mandoline", label: "Mandoline" },
  { id: "thermometer", label: "Thermometer" },
  { id: "mortar", label: "Mortar & pestle" },
  { id: "wok", label: "Wok" },
  { id: "dutch-oven", label: "Dutch oven" },
  { id: "cast-iron", label: "Cast-iron pan" },
  { id: "pizza-stone", label: "Pizza stone" },
  { id: "smoker", label: "Smoker" },
];

export interface KitchenProfile {
  skill: SkillLevel;
  equipment: string[];
  pantry: string[];
  household: number;
  dietary: string;
}

export const DEFAULT_KITCHEN_PROFILE: KitchenProfile = {
  skill: "beginner",
  equipment: ["stovetop", "oven"],
  pantry: [],
  household: 2,
  dietary: "",
};

export type KitchenTier = "A" | "B" | "C";

export interface KitchenGrade {
  tier: KitchenTier;
  label: string;
  reasons: string[];
}

const SKILL_WEIGHT: Record<SkillLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  pro: 4,
};

export function gradeKitchen(profile: KitchenProfile): KitchenGrade {
  const weight = SKILL_WEIGHT[profile.skill] + Math.min(profile.equipment.length, 8);
  const tier: KitchenTier = weight >= 10 ? "A" : weight >= 6 ? "B" : "C";
  const label =
    tier === "A"
      ? "Grade A · Enabled kitchen"
      : tier === "B"
        ? "Grade B · Growing kitchen"
        : "Grade C · Essentials kitchen";

  return {
    tier,
    label,
    reasons: [
      `Skill: ${profile.skill}`,
      `Equipment: ${profile.equipment.length} of ${EQUIPMENT_OPTIONS.length} categories`,
      `Pantry: ${profile.pantry.length} tracked items`,
      `Household: ${profile.household}`,
    ],
  };
}

const STOP_WORDS = new Set([
  "water",
  "salt",
  "oil",
  "olive oil",
  "pepper",
  "black pepper",
  "butter",
]);

export interface Compatibility {
  score: number;
  matched: string[];
  missing: string[];
}

/** Heuristic preview — not a grocery-grade engine. */
export function compatibilityFor(
  recipe: Recipe,
  pantry: string[]
): Compatibility {
  const normalizedPantry = pantry.map((item) => item.trim().toLowerCase());

  const matched: string[] = [];
  const missing: string[] = [];

  for (const ingredient of recipe.ingredients) {
    const item = ingredient.item.toLowerCase();
    if (STOP_WORDS.has(item)) continue;
    const covered = normalizedPantry.some(
      (pantryItem) =>
        item.includes(pantryItem) || pantryItem.includes(item.split("(")[0].trim())
    );
    if (covered) matched.push(ingredient.item);
    else missing.push(ingredient.item);
  }

  const total = matched.length + missing.length;
  const score = total === 0 ? 0 : matched.length / total;
  return { score, matched, missing };
}

export interface Achievement {
  id: string;
  label: string;
  reached: boolean;
}

export function achievementsFor(profile: KitchenProfile): Achievement[] {
  return [
    {
      id: "first-profile",
      label: "First save",
      reached: profile.pantry.length > 0 || profile.dietary.trim().length > 0 || profile.household > 0,
    },
    {
      id: "pantry-10",
      label: "Pantry of ten",
      reached: profile.pantry.length >= 10,
    },
    {
      id: "well-equipped",
      label: "Well equipped",
      reached: profile.equipment.length >= 8,
    },
    {
      id: "pro-cook",
      label: "Pro cook",
      reached: profile.skill === "pro",
    },
  ];
}