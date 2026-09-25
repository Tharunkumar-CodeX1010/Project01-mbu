export interface HeroVideo {
  /** Local video asset; EXTERNAL_DEPENDENCY until an encoded MP4 is added. */
  src: string;
  poster: string;
}

export interface HeroContentItem {
  overline: string;
  title: string;
  description: string;
  video: HeroVideo | null;
  poster: string;
  recipeHref: string;
  recipeLabel: string;
  exploreHref: string;
  exploreLabel: string;
}

export const heroFallback: HeroContentItem = {
  overline: "The Art of Cooking · Naples",
  title: "Pizza Napoletana",
  description:
    "Flour, tomatoes, mozzarella and patience. A masterclass in how one city's dish became the world's language of comfort — told step by step.",
  video: null,
  poster:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Margherita_pizza_on_plate.jpg/1920px-Margherita_pizza_on_plate.jpg",
  recipeHref: "/recipes/pizza-napoletana",
  recipeLabel: "View recipe",
  exploreHref: "/explore",
  exploreLabel: "Explore the regions",
};