import { useAuthStore } from "../lib/storage/authStore";

export function useAuth() {
  const {
    user,
    accessToken,
    apiKey,
    login,
    register,
    logout,
    isLoggedIn,
    isVenueManager,
    userName,
  } = useAuthStore();

  return {
    user,
    accessToken,
    apiKey,
    login,
    register,
    logout,
    isLoggedIn,
    isVenueManager,
    userName,
  };
}
