import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  toggleAuth: (auth: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  toggleAuth: (auth) => set({ isAuth: auth })
}));
