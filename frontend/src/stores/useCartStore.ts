import type { Product } from "@/types";
import { create } from "zustand";

type productWithQuanity = Product & { quantity: number };

type CartStoreType = {
  carts: productWithQuanity[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
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
  },

  removeItem: (product) => {
    set((state) => ({
      carts: state.carts.filter((item) => item._id !== product._id),
    }));
  },
}));
