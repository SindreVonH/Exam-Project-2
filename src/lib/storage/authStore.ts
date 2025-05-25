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

  // 🔎 Derived state helpers
  isLoggedIn: boolean;
  isVenueManager: boolean;
  userName: string | null;
};

const initialState = {
  user: null,
  accessToken: null,
  apiKey: null,
  isLoggedIn: false,
  isVenueManager: false,
  userName: null,
};

// Auth actions
const authActions = (set: any, get: any) => ({
  async login(email: string, password: string) {
    const res = await loginUser({ email, password });
    let key = get().apiKey;

    if (!key) {
      const { data: keyData } = await createApiKey(res.data.accessToken);
      key = keyData.key;
    }

    const user = {
      name: res.data.name,
      email: res.data.email,
      avatar: res.data.avatar?.url || "",
      banner: res.data.banner?.url || "",
      venueManager: res.data.venueManager ?? false,
    };

    set({
      accessToken: res.data.accessToken,
      apiKey: key,
      user,
      isLoggedIn: true,
      isVenueManager: !!user.venueManager,
      userName: user.name,
    });
  },

  async register(name: string, email: string, password: string, venueManager: boolean) {
    await registerUser({ name, email, password, venueManager });
    // Naviger til /login etterpå i UI
  },

  logout() {
    set({
      ...initialState,
    });
  },
});

// Create Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      ...authActions(set, get),
    }),
    {
      name: "auth-storage",
    }
  )
);
