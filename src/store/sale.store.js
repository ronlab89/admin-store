import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  saleList: null,
  preticket: {
    customer: {
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

export const useSaleStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleSaleList: (data) =>
        set((state) => ({
          saleList: data,
        })),
      handlePreticket: (data) =>
        set((state) => ({
          preticket: data,
        })),
      resetPreticket: () =>
        set((state) => ({
          preticket: {
            customer: {
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
      resetSale: () => resetState(set),
    }),
    {
      name: "sale",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating sale state...", state);
      },
    }
  )
);
