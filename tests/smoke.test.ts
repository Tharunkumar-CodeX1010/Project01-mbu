import { describe, expect, it } from "vitest";

describe("TAC repository smoke test", () => {
  it("bootstraps a working test environment", () => {
    expect(1 + 1).toBe(2);
  });
});