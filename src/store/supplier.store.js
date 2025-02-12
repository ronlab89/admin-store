import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  supplierList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useSupplierStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleSupplierList: (data) =>
        set((state) => ({
          supplierList: data,
        })),
      resetSupplier: () => resetState(set),
    }),
    {
      name: "supplier",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating supplier state...", state);
      },
    }
  )
);
