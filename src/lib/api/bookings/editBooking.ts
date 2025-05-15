// src/lib/api/bookings/updateBooking.ts
import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

type UpdateBookingData = {
  dateFrom?: string;
  dateTo?: string;
  guests?: number;
};

export async function updateBooking(bookingId: string, data: UpdateBookingData) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!bookingId || !token || !apiKey) {
    throw new Error("Missing booking ID or auth credentials");
  }

  const response = await fetch(`${API_BASE}/holidaze/bookings/${bookingId}`, {
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
    throw new Error(error.errors?.[0]?.message || "Failed to update booking");
  }

  return response.json();
}
