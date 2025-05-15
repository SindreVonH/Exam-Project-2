// src/hooks/useProfile.ts
import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../lib/storage/authStore";
import { getProfile } from "../lib/api/profile/getProfile";
import type { Profile } from "../types/Profile";

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!user?.name) return;
    try {
      setIsLoading(true);
      setIsError(false);
      const { data } = await getProfile(user.name);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [user?.name]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, isError, refetch: fetchProfile };
}
