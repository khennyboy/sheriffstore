import { create } from "zustand";
import type { ProductStore } from "../utils/types";

export const useProductStore = create<ProductStore>((set) => ({
  updateDialog: false,
  setUpdateDialog: (open) =>
    set((state) => ({
      updateDialog: open,
      selectedProduct: open ? state.selectedProduct : null,
    })),

  products: [],
  setProducts: (products) => set({ products }),

  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  deleteDialog: false,
  setDeleteDialog: (open) =>
    set((state) => ({
      deleteDialog: open,
      selectedProduct: open ? state.selectedProduct : null,
    })),
}));