import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

export async function deleteBooking(id: string) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!id || !token || !apiKey) {
    throw new Error("Missing booking ID or authentication");
  }

  const response = await fetch(`${API_BASE}/holidaze/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-noroff-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to delete booking");
  }

  return true; // No body expected, so just confirm success
}
