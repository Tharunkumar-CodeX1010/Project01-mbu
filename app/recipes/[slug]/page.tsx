import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/navigation/back-button";
import { Button, Badge } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { getRecipe, allRecipeSlugs } from "@/config/recipes";
import { getRegion } from "@/config/regions";
import { AddToShoppingButton } from "@/components/shopping/add-to-shopping-button";
import { FavoriteButton } from "@/components/collection/favorite-button";
import { EpisodeCard } from "@/components/media/episode-card";

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

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/recipes" />
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Reveal>
            <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
              {region ? `${region.name} · ${region.country}` : recipe.regionSlug}
            </p>
            <h1 className="text-ink mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {recipe.name}
            </h1>
            <p className="text-ink-soft mt-3 max-w-xl text-base leading-relaxed">
              {recipe.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{recipe.difficulty}</Badge>
              <Badge variant="neutral">{recipe.timeMin} min</Badge>
              <Badge variant="neutral">{recipe.servings} servings</Badge>
            </div>
          </Reveal>

          <section aria-label="Story" className="mt-10 space-y-4">
            {recipe.story.map((item, index) => (
              <Reveal key={item.act} delay={index * 0.05}>
                <div className="border-edge bg-surface rounded-lg p-5">
                  <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.25em]">
                    {item.act}
                  </p>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </section>

          <section aria-label="Method" className="mt-10">
            <Reveal>
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                Method
              </h2>
            </Reveal>
            <ol className="mt-4 space-y-3">
              {recipe.steps.map((step, index) => (
                <Reveal key={step} delay={index * 0.03}>
                  <li className="flex gap-3">
                    <span className="text-accent mt-0.5 text-sm font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-ink-soft text-sm leading-relaxed">
                      {step}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-label="Chef notes" className="mt-10">
            <Reveal>
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                Chef&apos;s notes
              </h2>
            </Reveal>
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
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <aside
            aria-label="Ingredients"
            className="border-edge bg-surface shadow-card rounded-lg p-5"
          >
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
            <div className="mt-5">
              <EpisodeCard recipeSlug={recipe.slug} cookMinutes={recipe.timeMin} />
            </div>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}