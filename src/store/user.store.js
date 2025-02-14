import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  userList: null,
  dataProfile: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useUserStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleUserList: (data) =>
        set((state) => ({
          userList: data,
        })),
      handleDataProfile: (data) =>
        set((state) => ({
          dataProfile: data,
        })),

      resetUser: () => resetState(set),
    }),
    {
      name: "user",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating user state...", state);
      },
    }
  )
);
