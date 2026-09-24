export const siteConfig = {
  name: "YUMMYGO",
  project: "TAC",
  title: "The Art of Cooking",
  tagline: "Discover food. Understand its story. Learn to cook it.",
  description:
    "YUMMYGO is a cinematic, AI-native culinary intelligence platform — regional cuisines, food history, masterclass recipes, kitchen adaptation, and intelligent shopping.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Recipes", href: "/recipes" },
  { label: "Food History", href: "/history" },
  { label: "Culinary Art", href: "/culinary-art" },
  { label: "Market", href: "/market" },
  { label: "AI Assistant", href: "/assistant" },
  { label: "Kitchen", href: "/kitchen" },
] as const;