import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/navigation/back-button";
import { Button, Badge } from "@/components/ui";
import { getRecipe, allRecipeSlugs } from "@/config/recipes";
import { getRegion } from "@/config/regions";
import { relatedRecipes } from "@/lib/ranking";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { EpisodeCard } from "@/components/media/episode-card";
import { TranscriptCard } from "@/components/media/transcript-card";
import { AddToShoppingButton } from "@/components/shopping/add-to-shopping-button";
import { FavoriteButton } from "@/components/collection/favorite-button";
import { posterForRecipe } from "@/lib/poster";
import { foodImageForRecipe } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";

interface RecipeSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RecipeSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  return { title: recipe ? recipe.name : "Recipe" };
}

export function generateStaticParams() {
  return allRecipeSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function RecipeSlugPage({ params }: RecipeSlugPageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) notFound();

  const region = getRegion(recipe.regionSlug);
  const related = relatedRecipes(recipe.slug, 3);

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/recipes" />

      <div className="relative mb-10 aspect-[21/8] w-full overflow-hidden rounded-2xl border border-edge shadow-card">
        <PosterImage
          src={foodImageForRecipe(recipe.slug) ?? posterForRecipe(recipe.slug)}
          fallback={posterForRecipe(recipe.slug)}
          alt={`Poster of ${recipe.name}`}
          priority
        />
        <div className="from-canvas/92 absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[var(--container-max)] px-6 pb-8 sm:px-6">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.25em]">
            {region ? `${region.name} · ${region.country}` : recipe.regionSlug}
          </p>
          <h1 className="text-ink mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {recipe.name}
          </h1>
          <p className="text-ink-soft mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
            {recipe.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="orange">{recipe.difficulty}</Badge>
            <Badge variant="neutral">{recipe.timeMin} min</Badge>
            <Badge variant="neutral">{recipe.servings} servings</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <section aria-label="Story" className="space-y-4">
            {recipe.story.map((item) => (
              <div key={item.act} className="border-edge bg-surface rounded-xl p-5">
                <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.25em]">
                  {item.act}
                </p>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </section>

          <section aria-label="Method" className="mt-10">
            <h2 className="text-ink text-xl font-semibold tracking-tight">
              Method
            </h2>
            <ol className="mt-4 space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="text-accent mt-0.5 text-sm font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Chef notes" className="mt-10">
            <h2 className="text-ink text-xl font-semibold tracking-tight">
              Chef&apos;s notes
            </h2>
            <ul className="mt-4 space-y-2">
              {recipe.tips.map((tip) => (
                <li key={tip} className="text-ink-soft flex gap-2 text-sm leading-relaxed">
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <TranscriptCard slug={recipe.slug} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <EpisodeCard recipeSlug={recipe.slug} cookMinutes={recipe.timeMin} />
          <div className="border-edge bg-surface shadow-card mt-6 rounded-xl p-5">
            <h2 className="text-ink text-lg font-semibold tracking-tight">
              Ingredients
            </h2>
            <p className="text-ink-faint mt-1 text-xs">
              Static dataset for now; conversions and substitutions arrive with
              the Assistant (P25).
            </p>
            <ul className="mt-4 divide-y divide-edge">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient.item + index} className="flex justify-between gap-4 py-2.5 text-sm">
                  <span className="text-ink-soft">{ingredient.item}</span>
                  <span className="text-ink font-medium">{ingredient.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-3">
              <FavoriteButton slug={recipe.slug} />
              <AddToShoppingButton slug={recipe.slug} />
              {region ? (
                <Button href={`/explore/${region.slug}`} variant="ghost" className="w-full">
                  From {region.name} — regional atlas
                </Button>
              ) : null}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section aria-label="Cooked alongside" className="mt-14">
          <h2 className="text-ink text-xl font-semibold tracking-tight">
            Pairs well
          </h2>
          <p className="text-ink-faint mt-1 text-sm">
            Recipes sharing ingredients with {recipe.name}.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RecipeCard key={item.slug} recipe={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}