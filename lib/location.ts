/** Location & time intelligence.
 *
 * No GPS / geocoding (BLOCKED_EXTERNAL_DEPENDENCY). We use only the device's
 * local time + IANA timezone — an honest, privacy-friendly heuristic. */
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