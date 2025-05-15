import { API_ENDPOINTS } from "../../constants";

export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}) {
  const response = await fetch(API_ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to register user");
  }

  return response.json();
}
