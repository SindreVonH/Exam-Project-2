import { useEffect, useState } from "react";
import { getVenues } from "../lib/api/venues/getVenues";
import type { Venue } from "../types/Venue";

export function useVenues(filterCountry?: string, searchQuery?: string) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setIsLoading(true);
        setIsError(false);

        const { data } = await getVenues(searchQuery);
        const filtered = filterCountry
          ? data.filter((venue) => venue.location?.country === filterCountry)
          : data;

        setVenues(filtered);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenues();
  }, [filterCountry, searchQuery]);

  return { venues, isLoading, isError };
}
