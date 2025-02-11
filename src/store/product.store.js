import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  productList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useProductStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleProductList: (data) =>
        set((state) => ({
          productList: data,
        })),

      resetProduct: () => resetState(set),
    }),
    {
      name: "product",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating product state...", state);
      },
    }
  )
);
