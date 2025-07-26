import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  login: (id: string, password: string) => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
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
        return { success: false, message: data.message || "Login failed" };
      }

      localStorage.setItem("token", data.data); 
      set({ token: data.data });

      return { success: true, message: "Login successful" };
    } catch (err) {
      return { success: false, message: "Server error during login" };
    }
  },
}));
