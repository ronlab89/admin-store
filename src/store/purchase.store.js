import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  purchaseList: null,
  preticket: {
    supplier: {
      name: null,
      surname: null,
      email: null,
      phone: null,
      addressline: null,
      city: null,
      province: null,
      country: null,
      id: null,
    },
    paymentMethod: null,
    total: null,
    products: [
      {
        id: 1,
        name: "",
        category: "",
        price: 0,
        quantity: 1,
        total: 0,
        _id: null,
      },
    ],
  },
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const usePurchaseStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handlePurchaseList: (data) =>
        set((state) => ({
          purchaseList: data,
        })),
      handlePreticket: (data) =>
        set((state) => ({
          preticket: data,
        })),
      resetPreticket: () =>
        set((state) => ({
          preticket: {
            supplier: {
              name: null,
              surname: null,
              email: null,
              phone: null,
              addressline: null,
              city: null,
              province: null,
              country: null,
              id: null,
            },
            paymentMethod: null,
            total: null,
            products: [
              {
                id: 1,
                name: "",
                category: "",
                price: 0,
                quantity: 1,
                total: 0,
                _id: null,
              },
            ],
          },
        })),
      resetPurchase: () => resetState(set),
    }),
    {
      name: "purchase",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating purchase state...", state);
      },
    }
  )
);
