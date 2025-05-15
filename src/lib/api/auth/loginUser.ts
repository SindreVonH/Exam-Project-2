import { API_ENDPOINTS } from "../../constants";

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_ENDPOINTS.login}?_holidaze=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to login user");
  }

  return response.json();
}
