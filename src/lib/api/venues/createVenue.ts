// src/lib/api/venues/createVenue.ts
import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

type MediaItem = { url: string; alt: string };

type Meta = {
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
};

type Location = {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};

export type CreateVenueData = {
  name: string;
  description: string;
  media?: MediaItem[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta?: Meta;
  location?: Location;
};

export async function createVenue(data: CreateVenueData) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;

  if (!token || !apiKey) {
    throw new Error("Missing auth credentials");
  }

  const response = await fetch(`${API_BASE}/holidaze/venues`, {
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
    throw new Error(error.errors?.[0]?.message || "Failed to create venue");
  }

  return response.json();
}
