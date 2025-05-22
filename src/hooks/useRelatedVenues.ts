import { useEffect, useState } from "react";
import { getVenues } from "../lib/api/venues/getVenues";
import type { Venue } from "../types/Venue";

export function useRelatedVenues(city: string, excludeId: string) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchRelated() {
      if (!city) {
        setIsError(true);
        setErrorMessage("No location data available to find related venues.");
        return;
      }

      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
        const { data } = await getVenues({ query: city, limit: 6 });
        const filtered = data.filter((v) => v.id !== excludeId);
        setVenues(filtered);
      } catch (error: any) {
        console.error("Failed to fetch related venues:", error);
        setIsError(true);
        setErrorMessage(error.message || "Unknown error loading related venues");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelated();
  }, [city, excludeId]);

  return { venues, isLoading, isError, errorMessage };
}
