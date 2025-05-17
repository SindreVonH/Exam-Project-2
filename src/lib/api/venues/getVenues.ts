// src/lib/api/venues/getVenues.ts
import { API_BASE } from "../../constants";
import type { Venue } from "../../../types/Venue";

export async function getVenues(query?: string): Promise<{ data: Venue[] }> {
  const searchParam = query ? `?q=${encodeURIComponent(query)}` : "";
  const response = await fetch(`${API_BASE}/holidaze/venues${searchParam}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venues");
  }

  return response.json();
}
