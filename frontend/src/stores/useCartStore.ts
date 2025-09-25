import type { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

type productWithQuanity = Product & { quantity: number };

type CartStoreType = {
  carts: productWithQuanity[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  increase: (id: Product["_id"]) => void;
  decrease: (product: Product["_id"]) => void;
};

export const useCartStore = create<CartStoreType>((set) => ({
  carts: [],

  addItem: (product) => {
    set((state) => {
      const existing = state.carts.find((item) => item._id === product._id);

      if (existing) {
        return {
          carts: state.carts.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return { carts: [...state.carts, { ...product, quantity: 1 }] };
    });

    toast.success("Product added to cart");
  },

  removeItem: (product) => {
    set((state) => ({
      carts: state.carts.filter((item) => item._id !== product._id),
    }));
  },

  increase: (id) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  },

  decrease: (id) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    }));
  },
}));
