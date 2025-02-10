import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  toggleSidebar: true,
  toggleDrop: false,
  toggleModal: false,
  toggleModalSide: { status: false, side: "right" },
  toggleSelect: { status: false, id: null },
  toggleAccordeon: { status: false, id: null },
  togglePop: { status: false, id: null },
  modalType: "",
  modalSideType: "",
  data: {},
};

// Función para resetear estado
const resetState = (set) => set({ ...initialState });

export const useToggleStore = create(
  persist(
    (set, get) => ({
      // Variables
      ...initialState,

      // Methods
      handleToggleSidebar: (bool) =>
        set((state) => ({
          toggleSidebar: bool,
        })),
      handleToggleDrop: (bool) =>
        set((state) => ({
          toggleDrop: bool,
        })),
      handleToggleModal: (bool) =>
        set((state) => ({
          toggleModal: bool,
        })),
      handleToggleModalSide: (bool, side) =>
        set((state) => ({
          toggleModalSide: { status: bool, side: "right" },
        })),
      handleToggleSelect: (bool, id) =>
        set((state) => ({
          toggleSelect: {
            status:
              id === state.toggleSelect.id ? !state.toggleSelect.status : bool,
            id: id === state.toggleSelect.id ? null : id,
          },
        })),
      handleToggleAccordeon: (bool, id) =>
        set((state) => ({
          toggleAccordeon: {
            status: bool,
            id: id,
          },
        })),
      handleTogglePop: (bool, id) =>
        set((state) => ({
          togglePop: {
            status: bool,
            id: id,
          },
        })),
      handleModalType: (type) =>
        set((state) => ({
          modalType: type,
        })),
      handleModalSideType: (type) =>
        set((state) => ({
          modalSideType: type,
        })),
      handleData: (info) =>
        set((state) => ({
          data: info,
        })),
      resetToggles: () => resetState(set),
    }),
    {
      name: "toggle",
      onRehydrateStorage: () => (state) => {
        // console.log("Rehydrating toggles state...", state);
      },
    }
  )
);
