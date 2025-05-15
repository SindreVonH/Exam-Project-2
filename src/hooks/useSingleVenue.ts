// src/hooks/useSingleVenue.ts
import { useEffect, useState } from "react";
import { getSingleVenue } from "../lib/api/venues/getSingleVenue";
import type { Venue } from "../types/Venue";

export function useSingleVenue(id: string) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchVenue() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await getSingleVenue(id);
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  return { venue, isLoading, isError };
}
