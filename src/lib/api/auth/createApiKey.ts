import { API_ENDPOINTS } from "../../constants";

export async function createApiKey(accessToken: string) {
  const response = await fetch(API_ENDPOINTS.createApiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name: "Holidaze API Key" }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to create API key");
  }

  return response.json();
}
