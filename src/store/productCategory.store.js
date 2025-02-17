import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  productCategoryList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useProductCategoryStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleProductCategoryList: (data) =>
        set((state) => ({
          productCategoryList: data,
        })),

      resetProductCategory: () => resetState(set),
    }),
    {
      name: "productCategory",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating productCategory state...", state);
      },
    }
  )
);
