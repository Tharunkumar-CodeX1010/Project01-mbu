// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import {
  DEFAULT_COLLECTION,
  isSaved,
  addFavorite,
  removeFavorite,
  updateFavoriteNote,
  upsertFork,
  updateForkNote,
  removeFork,
} from "@/lib/collections";

describe("collections", () => {
  it("adds and detects a favorite", () => {
    const next = addFavorite(DEFAULT_COLLECTION, "jollof-rice");
    expect(isSaved(next, "jollof-rice")).toBe(true);
    expect(addFavorite(next, "jollof-rice").favorites.length).toBe(1);
  });

  it("removes a favorite", () => {
    const saved = addFavorite(DEFAULT_COLLECTION, "pad-thai");
    expect(removeFavorite(saved, "pad-thai").favorites.length).toBe(0);
  });

  it("annotates a saved dish", () => {
    const saved = addFavorite(DEFAULT_COLLECTION, "kibbeh");
    const noted = updateFavoriteNote(saved, "kibbeh", "make for Sunday");
    expect(noted.favorites[0].note).toBe("make for Sunday");
  });

  it("forks a dish once and keeps the same fork", () => {
    const first = upsertFork(DEFAULT_COLLECTION, "kenkey");
    const second = upsertFork(first.state, "kenkey");
    expect(first.slug).toBe(second.slug);
    expect(second.state.forks.length).toBe(1);
  });

  it("removes a fork and updates its note", () => {
    const { state, slug } = upsertFork(DEFAULT_COLLECTION, "mutton-biryani");
    const noted = updateForkNote(state, slug, "less heat");
    expect(noted.forks[0].note).toBe("less heat");
    expect(removeFork(noted, slug).forks.length).toBe(0);
  });
});