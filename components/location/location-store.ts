"use client";

import { useSyncExternalStore } from "react";
import {
  LOCATION_KEY,
  nearestRegion,
  readLocation,
  writeLocation,
  type LocationState,
} from "@/lib/location";

const listeners = new Set<() => void>();

let cache: LocationState = null;
let localStorageHydrated = false;

function hydrate() {
  if (!localStorageHydrated) {
    cache = readLocation();
    localStorageHydrated = true;
  }
}

/** Reload from storage (cross-tab sync). */
function onStorage(event: StorageEvent) {
  if (event.key !== LOCATION_KEY) return;
  cache = readLocation();
  notify();
}

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): LocationState {
  hydrate();
  return cache;
}

function getServerSnapshot(): LocationState {
  return null;
}

function commit(state: LocationState) {
  cache = state;
  localStorageHydrated = true;
  writeLocation(state);
  notify();
}

export function useLocation() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setManualLocation(regionSlug: string) {
  commit({
    mode: "manual",
    regionSlug,
    updatedAt: new Date().toISOString(),
  });
}

export function skipLocation() {
  commit({ mode: "none", regionSlug: null, updatedAt: new Date().toISOString() });
}

export function clearLocation() {
  commit(null);
}

export interface DeviceLocationResult {
  ok: boolean;
  regionSlug?: string;
  error?: string;
}

/** Ask the browser for device location (permission prompt) and map it to the
 * nearest atlas region. Never runs until the user clicks the button. */
export function resolveDeviceLocation(timeoutMs = 10_000): Promise<DeviceLocationResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      resolve({ ok: false, error: "This browser does not expose device location." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const regionSlug = nearestRegion(latitude, longitude);
        commit({
          mode: "device",
          regionSlug,
          latitude,
          longitude,
          updatedAt: new Date().toISOString(),
        });
        resolve({ ok: true, regionSlug });
      },
      () => resolve({ ok: false, error: "Permission denied or unavailable." }),
      { enableHighAccuracy: false, timeout: timeoutMs, maximumAge: 0 }
    );
  });
}