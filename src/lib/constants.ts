// src/lib/constants.ts

export const BASE_URL = "https://v2.api.noroff.dev";
export const API_BASE = "https://v2.api.noroff.dev";

export const API_ENDPOINTS = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  createApiKey: `${BASE_URL}/auth/create-api-key`,
  venues: `${API_BASE}/holidaze/venues`,
  singleVenue: (id: string) => `${API_BASE}/holidaze/venues/${id}`,
};
