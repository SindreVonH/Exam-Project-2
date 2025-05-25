import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

type CreateBookingData = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export async function createBooking(data: CreateBookingData) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!token || !apiKey) {
    throw new Error("Missing auth credentials");
  }

  const response = await fetch(`${API_BASE}/holidaze/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-noroff-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to create booking");
  }

  return response.json();
}
