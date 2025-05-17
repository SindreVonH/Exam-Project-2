// src/hooks/useVenues.ts
import { useEffect, useState } from "react";
import { getVenues } from "../lib/api/venues/getVenues";
import type { Venue } from "../types/Venue";

export function useVenues(query: string = "") {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await getVenues(query);
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [query]);

  return { venues, isLoading, isError };
}
