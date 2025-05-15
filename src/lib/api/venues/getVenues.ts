// src/lib/api/venues/getVenues.ts
import { API_BASE } from "../../constants";
import type { Venue } from "../../../types/Venue";

export async function getVenues(): Promise<{ data: Venue[] }> {
  const response = await fetch(`${API_BASE}/holidaze/venues`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venues");
  }

  return response.json();
}
