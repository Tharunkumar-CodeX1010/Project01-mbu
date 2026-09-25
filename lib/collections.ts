export interface SavedDish {
  slug: string;
  addedAt: string;
  note: string;
}

export interface ForkedDish {
  slug: string;
  forkOf: string;
  addedAt: string;
  note: string;
}

export interface CollectionState {
  favorites: SavedDish[];
  forks: ForkedDish[];
}

export const DEFAULT_COLLECTION: CollectionState = {
  favorites: [],
  forks: [],
};

export const COLLECTION_KEY = "tac.collections.v1";

export function readCollection(): CollectionState {
  if (typeof window === "undefined") return DEFAULT_COLLECTION;
  try {
    const raw = window.localStorage.getItem(COLLECTION_KEY);
    if (!raw) return DEFAULT_COLLECTION;
    const parsed = JSON.parse(raw) as Partial<CollectionState>;
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      forks: Array.isArray(parsed.forks) ? parsed.forks : [],
    };
  } catch {
    return DEFAULT_COLLECTION;
  }
}

export function writeCollection(state: CollectionState) {
  try {
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(state));
  } catch {
    // memory-only until refresh
  }
}

export function isSaved(state: CollectionState, slug: string): boolean {
  return state.favorites.some((item) => item.slug === slug);
}

export function addFavorite(
  state: CollectionState,
  slug: string
): CollectionState {
  if (isSaved(state, slug)) return state;
  return {
    ...state,
    favorites: [
      { slug, addedAt: new Date().toISOString(), note: "" },
      ...state.favorites,
    ],
  };
}

export function removeFavorite(
  state: CollectionState,
  slug: string
): CollectionState {
  return {
    ...state,
    favorites: state.favorites.filter((item) => item.slug !== slug),
  };
}

export function updateFavoriteNote(
  state: CollectionState,
  slug: string,
  note: string
): CollectionState {
  return {
    ...state,
    favorites: state.favorites.map((item) =>
      item.slug === slug ? { ...item, note } : item
    ),
  };
}

export function upsertFork(
  state: CollectionState,
  baseSlug: string
): { state: CollectionState; slug: string } {
  const existing = state.forks.find((fork) => fork.forkOf === baseSlug);
  if (existing) return { state, slug: existing.slug };
  const slug = `${baseSlug}-fork-${Date.now().toString(36).slice(-5)}`;
  return {
    state: {
      ...state,
      forks: [
        { slug, forkOf: baseSlug, addedAt: new Date().toISOString(), note: "" },
        ...state.forks,
      ],
    },
    slug,
  };
}

export function updateForkNote(
  state: CollectionState,
  slug: string,
  note: string
): CollectionState {
  return {
    ...state,
    forks: state.forks.map((fork) => (fork.slug === slug ? { ...fork, note } : fork)),
  };
}

export function removeFork(state: CollectionState, slug: string): CollectionState {
  return {
    ...state,
    forks: state.forks.filter((fork) => fork.slug !== slug),
  };
}