// src/lib/api/venues/deleteVenue.ts
import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

export async function deleteVenue(id: string) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!token || !apiKey) {
    throw new Error("Missing auth credentials");
  }

  const res = await fetch(`${API_BASE}/holidaze/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-noroff-api-key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete venue");
  }
}
