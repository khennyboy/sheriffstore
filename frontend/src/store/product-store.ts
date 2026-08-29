import { create } from "zustand";
import type { ProductStore } from "../utils/types";

export const useProductStore = create<ProductStore>((set) => ({
  open: false,
  setIsOpen: (open) =>
    set((state) => ({
      open,
      selectedProduct: open ? state.selectedProduct : null,
    })),

  products: [],
  setProducts: (products) => set({ products }),

  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // add fxn
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Something went wrong",
        };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to connect to server" };
    }
  },

  // delete fxn
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Something went wrong",
        };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to connect to server" };
    }
  },

  // update fxn
  updateProduct: async (id, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Something went wrong",
        };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Failed to connect to server" };
    }
  },
}));