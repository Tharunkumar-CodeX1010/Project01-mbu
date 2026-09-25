/** Location & time intelligence.
 *
 * Default mode is a privacy-friendly heuristic: the device's local time +
 * IANA timezone, with no GPS contact.
 *
 * Device mode is optional and permission-gated: the user explicitly chooses
 * "use my device location", the browser shows the permission prompt, and only
 * after approval do we read coordinates and map them to the nearest region
 * in the atlas. Denied/timeout/unsupported all degrade back to manual or
 * timezone heuristics. Nothing is ever phone-home; coords (if granted) are
 * stored locally in the user's own browser only.
 */

import { REGIONS, getRegion } from "@/config/regions";

/** User's resolved place on the platform. */
export type LocationSelection =
  | {
      mode: "manual" | "device";
      regionSlug: string;
      latitude?: number;
      longitude?: number;
      updatedAt: string;
    }
  | {
      mode: "none";
      regionSlug: null;
      updatedAt: string;
    };

export type LocationState = LocationSelection | null;

export const LOCATION_KEY = "tac.location.v1";

/* ---- Geo matching (haversine over the 16 atlas cities) ---- */

const EARTH_RADIUS_KM = 6371;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function distanceKm(
  latA: number,
  lngA: number,
  latB: number,
  lngB: number
): number {
  const dLat = toRadians(latB - latA);
  const dLng = toRadians(lngB - lngA);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(latA)) *
      Math.cos(toRadians(latB)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/** Nearest atlas region slug for a lat/lng point (deterministic). */
export function nearestRegion(lat: number, lng: number): string {
  let best = REGIONS[0];
  let bestKm = Infinity;
  for (const region of REGIONS) {
    const km = distanceKm(lat, lng, region.geo.lat, region.geo.lng);
    if (km < bestKm) {
      bestKm = km;
      best = region;
    }
  }
  return best.slug;
}

/* ---- Persistence ---- */

export function readLocation(): LocationState {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocationSelection;
    if (parsed.mode !== "none") {
      if (typeof parsed.regionSlug !== "string") return null;
      if (parsed.mode !== "manual" && parsed.mode !== "device") return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeLocation(state: LocationState) {
  try {
    if (state === null) {
      window.localStorage.removeItem(LOCATION_KEY);
    } else {
      window.localStorage.setItem(LOCATION_KEY, JSON.stringify(state));
    }
  } catch {
    // memory-only until refresh
  }
}

export function locationLabel(state: LocationState): string {
  if (!state || state.regionSlug === null) return "Set location";
  const region = getRegion(state.regionSlug);
  return region ? `${region.name}, ${region.country}` : state.regionSlug;
}

export function locationShortLabel(state: LocationState): string {
  if (!state || state.regionSlug === null) return "Set location";
  return getRegion(state.regionSlug)?.name ?? state.regionSlug;
}

export function isLocationChosen(state: LocationState): state is Extract<
  LocationSelection,
  { regionSlug: string }
> {
  return state !== null && state.regionSlug !== null;
}

export interface MomentContext {
  timezone: string;
  localHour: number;
  moment: string;
  season: string;
  suggestion: string;
  pickReason: string;
}

export const CALENDAR_SEASONS = [
  "winter", "winter", "early-spring", "spring", "spring", "summer",
  "summer", "summer", "early-autumn", "autumn", "autumn", "winter",
] as const;

export function momentLabel(hour: number): string {
  if (hour >= 5 && hour < 11) return "Dawn kitchen";
  if (hour >= 11 && hour < 15) return "Midday table";
  if (hour >= 15 && hour < 18) return "Golden hour";
  if (hour >= 18 && hour < 23) return "Evening service";
  return "Late-night craving";
}

export function seasonForMonth(month: number): string {
  return CALENDAR_SEASONS[month] ?? "winter";
}

/** Deterministic (no randomness): far from phone-home. */
export function todayContext(now = new Date(), tz = "device"): MomentContext {
  const timezone = tz === "device" ? guessTimezone() : tz;
  const localHour = now.getHours();
  const month = now.getMonth();
  const season = seasonForMonth(month);
  const moment = momentLabel(localHour);

  const picks: Record<string, string> = {
    "Dawn kitchen": "light and steady — a broth or steamed rice dish",
    "Midday table": "a shared bowl — rice or grain forward",
    "Golden hour": "snappy and bright — acid, heat, fast cook",
    "Evening service": "the long cook, unwinding into the night",
    "Late-night craving": "something quick, warming, quietly brilliant",
  };

  return {
    timezone,
    localHour,
    moment,
    season,
    suggestion: picks[moment] ?? picks["Evening service"],
    pickReason: `${moment} · ${season}`,
  };
}

export function guessTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** Subscribe contract for useSyncExternalStore (fires at most once a minute). */
export function subscribeToMinute(cb: () => void): () => void {
  const timer = setInterval(cb, 60_000);
  cb();
  return () => clearInterval(timer);
}

export function minuteSnapshot(): number {
  return Date.now();
}

export function minuteServerSnapshot(): number {
  return new Date("2000-01-01T12:00:00Z").getTime();
}