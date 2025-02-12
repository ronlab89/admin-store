import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  customerList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useCustomerStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleCustomerList: (data) =>
        set((state) => ({
          customerList: data,
        })),
      resetCustomer: () => resetState(set),
    }),
    {
      name: "customer",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating customer state...", state);
      },
    }
  )
);
