// src/lib/storage/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "../api/auth/loginUser";
import { registerUser } from "../api/auth/registerUser";
import { createApiKey } from "../api/auth/createApiKey";
import type { User } from "../../types/User";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  apiKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, venueManager: boolean) => Promise<void>;
  logout: () => void;
};

// Initial state values
const initialState = {
  user: null as User | null,
  accessToken: null as string | null,
  apiKey: null as string | null,
};

// Auth action implementations
const authActions = (set: any, get: any) => ({
  async login(email: string, password: string) {
    const res = await loginUser({ email, password });
    let key = get().apiKey;

    if (!key) {
      const { data: keyData } = await createApiKey(res.data.accessToken);
      key = keyData.key;
    }

    set({
      accessToken: res.data.accessToken,
      apiKey: key,
      user: {
        name: res.data.name,
        email: res.data.email,
        avatar: res.data.avatar?.url || "",
        banner: res.data.banner?.url || "",
        venueManager: res.data.venueManager ?? false,
      },
    });
  },

  async register(name: string, email: string, password: string, venueManager: boolean) {
    await registerUser({ name, email, password, venueManager });
    // UI kan navigere til /login etterpå
  },

  logout() {
    set({ user: null, accessToken: null, apiKey: null });
  },
});

// Create the Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      ...authActions(set, get),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
