import { create } from "zustand";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearToken: () => void;
  login: (
    id: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => {
    set({ user });
  },

  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  login: async (id, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      const token = data.data;
      localStorage.setItem("token", token);
      set({ token });

      const profileRes = await fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        set({ user: profileData.data }); // assumes response is { data: user }
      }

      return {
        success: true,
        message: "Login successful",
      };
    } catch (err) {
      return {
        success: false,
        message: "Server error during login",
      };
    }
  },
}));
