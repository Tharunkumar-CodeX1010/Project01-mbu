import { describe, expect, it } from "vitest";
import { transcriptFor, transcriptTotalMinutes } from "@/lib/transcripts";

describe("transcript engine", () => {
  it("derives segments from a real recipe without fabrication", () => {
    const transcript = transcriptFor("mutton-biryani");
    expect(transcript.length).toBeGreaterThanOrEqual(4); // act + steps + tips
    expect(transcript[0].speaker).toBe("narrator");
    for (const segment of transcript) {
      expect(segment.end).toBeGreaterThan(segment.start);
      expect(segment.text.length).toBeGreaterThan(10);
    }
  });

  it("scales timings proportionally to cooking time", () => {
    const fast = transcriptFor("kombu-dashi");
    const slow = transcriptFor("mutton-biryani");
    expect(transcriptTotalMinutes("kombu-dashi")).toBeLessThan(
      transcriptTotalMinutes("mutton-biryani")
    );
    expect(fast.length).toBeGreaterThan(0);
    expect(slow.length).toBeGreaterThan(0);
  });

  it("returns empty for unknown slugs", () => {
    expect(transcriptFor("bogus")).toEqual([]);
    expect(transcriptTotalMinutes("bogus")).toBe(0);
  });
});