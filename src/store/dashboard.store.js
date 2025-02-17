import moment from "moment";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  consultDate: moment().format("YYYY-MM"),
  totalPurchases: 0,
  totalSales: 0,
  revenue: 0,
  topSuppliers: null,
  topProductsQauntity: null,
  topCustomers: null,
  productvs: null,
  topProductsAmount: null,
  profileProducts: null,
  profilevs: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleConsultDate: (data) =>
        set((state) => ({
          consultDate: data,
        })),
      handleTotalPurchases: (data) =>
        set((state) => ({
          totalPurchases: data,
        })),
      handleTotalSales: (data) =>
        set((state) => ({
          totalSales: data,
        })),
      handleRevenue: (data) =>
        set((state) => ({
          revenue: data,
        })),
      handleTopSuppliers: (data) =>
        set((state) => ({
          topSuppliers: data,
        })),
      handleTopProductsQauntity: (data) =>
        set((state) => ({
          topProductsQauntity: data,
        })),
      handleTopCustomers: (data) =>
        set((state) => ({
          topCustomers: data,
        })),
      handleProductvs: (data) =>
        set((state) => ({
          productvs: data,
        })),
      handleTopProductsAmount: (data) =>
        set((state) => ({
          topProductsAmount: data,
        })),
      handleProfileProducts: (data) =>
        set((state) => ({
          profileProducts: data,
        })),
      handleProfilevs: (data) =>
        set((state) => ({
          profilevs: data,
        })),

      resetDashboard: () => resetState(set),
    }),
    {
      name: "dashboard",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating dashboard state...", state);
      },
    }
  )
);
