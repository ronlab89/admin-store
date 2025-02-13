import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  expenseCategoryList: null,
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useExpenseCategoryStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleExpenseCategoryList: (data) =>
        set((state) => ({
          expenseCategoryList: data,
        })),

      resetExpenseCategory: () => resetState(set),
    }),
    {
      name: "expenseCategory",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating expenseCategory state...", state);
      },
    }
  )
);
