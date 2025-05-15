// src/hooks/useVenues.ts
import { useEffect, useState } from "react";
import { getVenues } from "../lib/api/venues/getVenues";
import type { Venue } from "../types/Venue";

export function useVenues(filterCountry?: string) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await getVenues();
        const filtered = filterCountry
          ? data.filter((venue) => venue.location?.country === filterCountry)
          : data;

        setVenues(filtered);
        console.log("Fetched venues:", filtered);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [filterCountry]);

  return { venues, isLoading, isError };
}
