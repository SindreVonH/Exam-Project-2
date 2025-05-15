// src/lib/api/profile/getProfile.ts
import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

export async function getProfile(name: string) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  const response = await fetch(
    `${API_BASE}/holidaze/profiles/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-noroff-api-key": apiKey || "",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch profile");
  }

  return response.json();
}
