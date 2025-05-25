import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";
import type { Venue } from "../../../types/Venue";

export type UpdateVenueData = Partial<
  Omit<Venue, "id" | "owner" | "bookings" | "created" | "updated">
>;

export async function updateVenue(venueId: string, data: UpdateVenueData) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!token || !apiKey) {
    throw new Error("Missing authentication credentials");
  }

  const response = await fetch(`${API_BASE}/holidaze/venues/${venueId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-noroff-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to update venue");
  }

  return response.json();
}
