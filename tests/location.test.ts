// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import {
  distanceKm,
  isLocationChosen,
  locationLabel,
  locationShortLabel,
  LOCATION_KEY,
  nearestRegion,
  readLocation,
  writeLocation,
} from "@/lib/location";
import { REGIONS } from "@/config/regions";

describe("distanceKm", () => {
  it("is ~0 between identical points", () => {
    expect(distanceKm(40.8518, 14.2681, 40.8518, 14.2681)).toBeLessThan(0.01);
  });

  it("approximates a well-known great-circle distance", () => {
    // Naples -> Rome is roughly 190 km.
    const km = distanceKm(40.8518, 14.2681, 41.9028, 12.4964);
    expect(km).toBeGreaterThan(160);
    expect(km).toBeLessThan(210);
  });
});

describe("nearestRegion", () => {
  it("maps coordinates to the right atlas city", () => {
    expect(nearestRegion(40.61, 14.35)).toBe("naples"); // near Naples
    expect(nearestRegion(35.68, 139.69)).toBe("tokyo");
    expect(nearestRegion(-12.05, -77.04)).toBe("lima");
    expect(nearestRegion(1.35, 103.81)).toBe("singapore");
  });

  it("returns a valid region from REGIONS for any input", () => {
    const slug = nearestRegion(0, 0);
    expect(REGIONS.some((region) => region.slug === slug)).toBe(true);
  });
});

describe("location persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("reads back a manual choice", () => {
    writeLocation({
      mode: "manual",
      regionSlug: "naples",
      updatedAt: "2026-01-01T00:00:00Z",
    });
    const state = readLocation();
    expect(isLocationChosen(state)).toBe(true);
    if (state && state.mode !== "none") {
      expect(state.regionSlug).toBe("naples");
    }
  });

  it("stores a device choice with coordinates", () => {
    writeLocation({
      mode: "device",
      regionSlug: "tokyo",
      latitude: 35.6762,
      longitude: 139.6503,
      updatedAt: "2026-01-01T00:00:00Z",
    });
    expect(readLocation()?.mode === "device").toBe(true);
    expect(LOCATION_KEY).toBe("tac.location.v1");
  });

  it("returns null for missing or corrupt data", () => {
    expect(readLocation()).toBeNull();
    window.localStorage.setItem(LOCATION_KEY, "{broken json");
    expect(readLocation()).toBeNull();
  });

  it("clears the key when writing null", () => {
    writeLocation({
      mode: "manual",
      regionSlug: "lyon",
      updatedAt: "2026-01-01T00:00:00Z",
    });
    writeLocation(null);
    expect(window.localStorage.getItem(LOCATION_KEY)).toBeNull();
    expect(readLocation()).toBeNull();
  });
});

describe("labels", () => {
  it("labels a chosen place and a skipped visit", () => {
    expect(
      locationLabel({ mode: "manual", regionSlug: "bangkok", updatedAt: "" })
    ).toBe("Bangkok, Thailand");
    expect(locationShortLabel({ mode: "manual", regionSlug: "bangkok", updatedAt: "" })).toBe("Bangkok");
    expect(locationLabel(null)).toBe("Set location");
    expect(locationLabel({ mode: "none", regionSlug: null, updatedAt: "" })).toBe("Set location");
  });

  it("falls back to the slug for unknown regions", () => {
    expect(
      locationLabel({ mode: "manual", regionSlug: "atlantis", updatedAt: "" })
    ).toBe("atlantis");
  });
});