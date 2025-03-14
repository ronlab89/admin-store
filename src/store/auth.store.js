import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  logged: false,
  user: {
    id: null,
    name: null,
    surname: null,
    email: null,
    phone: null,
    address: null,
    role: null,
    events_history: {},
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
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            address: data.address,
            role: data.role,
            events_history: data.events_history,
          },
        })),
      handlereset: () =>
        set((state) => ({
          logged: false,
          user: {
            id: null,
            name: null,
            surname: null,
            email: null,
            phone: null,
            address: null,
            role: null,
            events_history: {},
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
