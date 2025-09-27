import type { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type productWithQuanity = Product & { quantity: number };

type CartStoreType = {
  carts: productWithQuanity[];
  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  increase: (id: Product["_id"]) => void;
  decrease: (product: Product["_id"]) => void;
  clearCart: () => void;
  total: () => number;
  countItems: () => number;
};

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      carts: [],
      /* Add Cart */
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
      /* Remove Cart */
      removeItem: (product) => {
        console.log("remove item");
        set((state) => ({
          carts: state.carts.filter((item) => item._id !== product._id),
        }));
      },
      /* Increate item count */
      increase: (id) => {
        set((state) => ({
          carts: state.carts.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },
      /*Decrease item count */
      decrease: (id) => {
        set((state) => ({
          carts: state.carts.map((item) => {
            if (item._id === id) {
              const newQuantity = item.quantity - 1;

              return { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ carts: [] }),
      total: () =>
        get().carts.reduce((s, item) => s + item.price * item.quantity, 0),
      countItems: () => get().carts.length,
    }),
    {
      name: "elegant-cart",
      /* storage: createJSONStorage(() => sessionStorage), */
    },
  ),
);
