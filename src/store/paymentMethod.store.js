import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  paymentMethodList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const usePaymentMethodStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handlePaymentMethodList: (data) =>
        set((state) => ({
          paymentMethodList: data,
        })),

      resetPaymentMethod: () => resetState(set),
    }),
    {
      name: "paymentMethod",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating paymentMethod state...", state);
      },
    }
  )
);
