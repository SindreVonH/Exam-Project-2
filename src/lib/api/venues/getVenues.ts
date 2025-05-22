import { API_BASE } from "../../constants";
import type { Venue } from "../../../types/Venue";

type Params = {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: "asc" | "desc";
};

export async function getVenues({
  query,
  page = 1,
  limit = 12,
  sort,
  sortOrder,
}: Params): Promise<{ data: Venue[]; meta: any }> {
  const isSearching = query && query.trim().length > 0;

  // Bruk `/search` hvis query finnes
  const url = new URL(`${API_BASE}/holidaze/venues${isSearching ? "/search" : ""}`);
  if (isSearching) url.searchParams.set("q", query!);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  if (sort) url.searchParams.set("sort", sort);
  if (sortOrder) url.searchParams.set("sortOrder", sortOrder);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to fetch venues");
  }

  return response.json();
}
