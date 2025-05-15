// src/lib/api/venues/getSingleVenue.ts
import { API_BASE } from "../../constants";
import type { Venue } from "../../../types/Venue";

export async function getSingleVenue(id: string): Promise<{ data: Venue }> {
  const response = await fetch(`${API_BASE}/holidaze/venues/${id}?_owner=true&_bookings=true`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venue");
  }

  return response.json();
}
