import { API_BASE } from "../../constants";
import { useAuthStore } from "../../storage/authStore";

type UpdateProfileData = {
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager?: boolean;
};

export async function updateProfile(data: UpdateProfileData) {
  const token = useAuthStore.getState().accessToken;
  const apiKey = useAuthStore.getState().apiKey;
  const name = useAuthStore.getState().user?.name;

  if (!name || !token || !apiKey) {
    throw new Error("Missing auth credentials");
  }

  const response = await fetch(`${API_BASE}/holidaze/profiles/${name}`, {
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
    throw new Error(error.errors?.[0]?.message || "Failed to update profile");
  }

  return response.json();
}
