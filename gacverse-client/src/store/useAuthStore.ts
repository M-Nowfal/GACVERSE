import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  toggleAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  toggleAuth: () => set((state) => ({ isAuth: !state.isAuth }))
}));
