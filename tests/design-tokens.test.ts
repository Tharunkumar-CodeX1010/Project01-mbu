import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "..", "styles", "tokens.css"), "utf8");

const requiredTokens = [
  "--bg-dark",
  "--surface-glass",
  "--surface-elevated",
  "--accent-orange",
  "--accent-green",
  "--text-primary",
  "--text-secondary",
  "--border-glass",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--shadow-glass",
];

describe("design token availability", () => {
  it("defines every required TAC token name", () => {
    for (const token of requiredTokens) {
      expect(css, `missing token ${token}`).toContain(token);
    }
  });

  it("defines the motion scale", () => {
    for (const token of ["--motion-duration-fast", "--motion-duration-normal"]) {
      expect(css, `missing motion token ${token}`).toContain(token);
    }
  });

  it("defines the spacing scale", () => {
    for (const token of ["--space-xs", "--space-md", "--space-xl"]) {
      expect(css, `missing spacing token ${token}`).toContain(token);
    }
  });

  it("defines the breakpoints", () => {
    for (const token of ["--breakpoint-sm", "--breakpoint-lg"]) {
      expect(css, `missing breakpoint token ${token}`).toContain(token);
    }
  });
});