import { RECIPES, getRecipe, Recipe } from "@/config/recipes";
import { getRegion } from "@/config/regions";
import { getFilm } from "@/lib/history";
import { todayContext } from "@/lib/location";

export interface TacAnswer {
  answer: string;
  intent: string;
  sources: { label: string; href: string }[];
}

const INTENTS: Array<{
  match: RegExp;
  intent: string;
  respond: () => TacAnswer;
}> = [
  {
    match: /tonight|what.*eat|lunch|dinner|supper|menu/i,
    intent: "recommend-evening",
    respond: () => {
      const context = todayContext(new Date());
      const pick = rankQuickest(4);
      return {
        answer: `${context.suggestion}. Tonight's quick set: ${pick
          .map((recipe) => recipe.name)
          .join(", ")}. Each shares a full masterclass page.`,
        intent: "recommend-evening",
        sources: pick.map((recipe) => ({ label: recipe.name, href: `/recipes/${recipe.slug}` })),
      };
    },
  },
  {
    match: /pizza|napoli|naples|margherita/i,
    intent: "pizza",
    respond: () => {
      const recipe = getRecipe("pizza-napoletana")!;
      return {
        answer: `Pizza Napoletana is a 48-72h cold ferment: hand-stretched, never pinned; moment in a very hot home oven is fine. I'll point you to the masterclass.`,
        intent: "pizza",
        sources: [{ label: "Pizza Napoletana", href: `/recipes/${recipe.slug}` }],
      };
    },
  },
  {
    match: /biryani|lucknow|hyderabadi/i,
    intent: "biryani",
    respond: () => {
      const recipe = getRecipe("mutton-biryani")!;
      const film = getFilm("biryani-long-march");
      return {
        answer: `Dum is the sealed-lid low-steam finish; the flavor rides the vessel. Our version takes ${recipe.timeMin} minutes. The film traces its long march.`,
        intent: "biryani",
        sources: [
          { label: recipe.name, href: `/recipes/${recipe.slug}` },
          ...(film ? [{ label: film.title, href: `/history/${film.slug}` }] : []),
        ],
      };
    },
  },
  {
    match: /fast|quick|time|busy/i,
    intent: "quick-cook",
    respond: () => {
      const pick = rankQuickest(3);
      return {
        answer: `${pick.map((recipe) => `${recipe.name} (${recipe.timeMin} min)`).join(", ")} — all well within a weekday window.`,
        intent: "quick-cook",
        sources: pick.map((recipe) => ({ label: recipe.name, href: `/recipes/${recipe.slug}` })),
      };
    },
  },
  {
    match: /dashi|kombu|bonito|japan|miso/i,
    intent: "japan-dashi",
    respond: () => {
      const recipe = getRecipe("kombu-dashi")!;
      const region = getRegion(recipe.regionSlug);
      return {
        answer: `Dashi starts with kombu steeping just under a boil; bonito flashes in for seconds. Two ingredients, one clean bowl — from ${region?.name ?? "Japan"}.`,
        intent: "japan-dashi",
        sources: [{ label: recipe.name, href: `/recipes/${recipe.slug}` }],
      };
    },
  },
  {
    match: /vein|veins|tradition|lineage/i,
    intent: "veins",
    respond: () => {
      return {
        answer: `Eight culinary veins structure the atlas: European Ember (pizza), Indo-Arab Silk (biryani), Pacific Lime (ceviche), Japanese Umami (dashi), West African One-Pot (jollof), Lowlands Dairy (quenelles), Anatolian Bazaar (pide), Latin Fire (tacos). Explore each from the atlas page.`,
        intent: "veins",
        sources: [{ label: "Explore the atlas", href: "/explore" }],
      };
    },
  },
];

function rankQuickest(limit: number): Recipe[] {
  return RECIPES.filter((recipe) => recipe.timeMin <= 30).slice(0, limit);
}

export function askTac(question: string): TacAnswer {
  const matched = INTENTS.find((entry) => entry.match.test(question));
  if (!matched) {
    return {
      answer:
        "I'm a deterministic answer card over this build's own datasets (recipes, regions, films) — MOCKED adapter, no generative model and no internet probe. Try: “what should I cook tonight”, “pizza”, “biryani”, “something fast”, “dashi”, or “veins”.",
      intent: "fallback",
      sources: [],
    };
  }
  return matched.respond();
}

export const ASSISTANT_STATUS =
  "MOCKED_ADAPTER — rule-based over live config; a hosted model is BLOCKED_EXTERNAL_DEPENDENCY until S28 governance approves a provider.";