// src/hooks/useVenueSearch.ts
import { useEffect, useState } from "react";
import { getVenues } from "../lib/api/venues/getVenues";
import type { Venue } from "../types/Venue";

export type SortField = "price" | "beds" | "latest" | "";
export type SortOrder = "asc" | "desc";

export type VenueFilters = {
  query: string;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
};

export function useVenueSearch(initialFilters: VenueFilters) {
  const [filters, setFilters] = useState(initialFilters);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const sortParam =
          filters.sortField === "beds"
            ? "maxGuests"
            : filters.sortField === "latest"
              ? "created"
              : filters.sortField;

        const { data, meta } = await getVenues({
          query: filters.query,
          page: filters.page,
          limit: filters.limit,
          sort: sortParam,
          sortOrder: filters.sortOrder,
        });

        setVenues(data);
        setMeta(meta);
      } catch (error: any) {
        console.error("Venue fetch failed:", error);
        setIsError(true);
        setErrorMessage(error.message || "Unknown error occurred while fetching venues.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [filters]);

  return {
    venues,
    meta,
    isLoading,
    isError,
    errorMessage,
    filters,
    setFilters,
  };
}
