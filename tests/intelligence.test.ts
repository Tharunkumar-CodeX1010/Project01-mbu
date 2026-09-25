import { describe, expect, it } from "vitest";
import { askTac } from "@/lib/assistant";
import { todayContext, momentLabel } from "@/lib/location";

describe("assistant mock adapter", () => {
  it("answers an evening recommendation with real recipe sources", () => {
    const answer = askTac("what should I cook tonight");
    expect(answer.intent).toBe("recommend-evening");
    expect(answer.sources.length).toBeGreaterThan(0);
    for (const source of answer.sources) {
      expect(source.href).toMatch(/^\/recipes\//);
    }
  });

  it("grounds pizza questions in the pizza masterclass", () => {
    const answer = askTac("tell me about pizza napoletana");
    expect(answer.intent).toBe("pizza");
    expect(answer.sources[0].href).toBe("/recipes/pizza-napoletana");
  });

  it("falls back honestly for unknown input", () => {
    const answer = askTac("quantum sushi clouds");
    expect(answer.intent).toBe("fallback");
    expect(answer.sources).toEqual([]);
  });
});

describe("location context", () => {
  it("labels moments by hour", () => {
    expect(momentLabel(7)).toBe("Dawn kitchen");
    expect(momentLabel(13)).toBe("Midday table");
    expect(momentLabel(20)).toBe("Evening service");
  });

  it("produces a deterministic context", () => {
    const context = todayContext(new Date("2026-09-25T12:00:00"), "device");
    expect(context.localHour).toBe(12);
    expect(context.moment).toBe("Midday table");
    expect(context.suggestion.length).toBeGreaterThan(10);
  });
});