"use client";

import { useSyncExternalStore } from "react";
import { seedData, type PlannerData } from "./planner-data";

const STORAGE_KEY = "goi-ghem:planner:v1";
type Snapshot = { data: PlannerData; storageError: boolean };
const initialSnapshot: Snapshot = { data: seedData, storageError: false };
let snapshot = initialSnapshot;
let initialized = false;
const listeners = new Set<() => void>();

function isData(value: unknown): value is PlannerData {
  if (!value || typeof value !== "object") return false;
  const data = value as PlannerData;
  if (
    !Array.isArray(data.plans) ||
    !Array.isArray(data.items) ||
    !Array.isArray(data.planItems)
  )
    return false;
  return (
    data.plans.every(
      (p) =>
        p &&
        typeof p.id === "string" &&
        typeof p.name === "string" &&
        typeof p.destination === "string" &&
        typeof p.category === "string" &&
        typeof p.startDate === "string" &&
        typeof p.endDate === "string" &&
        Number.isFinite(p.fee),
    ) &&
    data.items.every(
      (i) => i && typeof i.id === "string" && typeof i.name === "string",
    ) &&
    data.planItems.every(
      (i) =>
        i &&
        typeof i.id === "string" &&
        typeof i.planId === "string" &&
        typeof i.itemId === "string" &&
        typeof i.group === "string" &&
        typeof i.note === "string" &&
        typeof i.isChecked === "boolean" &&
        Number.isInteger(i.quantity) &&
        i.quantity > 0 &&
        Number.isFinite(i.sortOrder),
    )
  );
}

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { data: seedData, storageError: false };
    const parsed: unknown = JSON.parse(raw);
    return isData(parsed)
      ? { data: parsed, storageError: false }
      : { data: seedData, storageError: true };
  } catch {
    return { data: snapshot.data, storageError: true };
  }
}

function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    snapshot = readStorage();
  }
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      snapshot = readStorage();
      listeners.forEach((fn) => fn());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Replace this adapter with Supabase reads and mutations when connecting the backend. */
export function usePlannerStore() {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialSnapshot,
  );
  const update = (mutate: (previous: PlannerData) => PlannerData) => {
    const data = mutate(getSnapshot().data);
    let storageError = false;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      storageError = true;
    }
    snapshot = { data, storageError };
    listeners.forEach((fn) => fn());
  };
  return { ...current, update };
}
