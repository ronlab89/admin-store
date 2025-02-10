import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  logged: false,
  user: {
    id: "",
    name: "",
    note: "",
    email: "",
  },
  token: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handlelogin: (bool, data) =>
        set((state) => ({
          logged: bool,
          token: data.token,
        })),
      handleuser: (data) =>
        set(() => ({
          user: {
            id: data.id,
            name: data.name,
            note: data.note,
            email: data.email,
          },
        })),
      handlereset: () =>
        set((state) => ({
          logged: false,
          user: {
            id: "",
            name: "",
            note: "",
            email: "",
          },
          token: null,
        })),
      resetAuth: () => resetState(set),
    }),
    {
      name: "auth",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating auth state...", state);
      },
    }
  )
);
