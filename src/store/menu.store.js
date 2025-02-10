import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  linkId: "insights",
  subLinkId: "overview",
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useMenuStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleLinkId: (id) => {
        // console.log(`Setting linkId to: ${id}`);
        set((state) => ({
          linkId: id,
        }));
      },
      handleSubLinkId: (id) =>
        set((state) => ({
          subLinkId: id,
        })),
      resetMenu: () => resetState(set),
    }),
    {
      name: "menu",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating menu state...", state);
      },
    }
  )
);
