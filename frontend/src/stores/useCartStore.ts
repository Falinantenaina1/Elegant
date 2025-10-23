import type { CartStoreType } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      carts: [],
      shippingOptions: [
        { id: "basic", label: "Basic shipping", costFixed: 0 },
        { id: "express", label: "Express shipping", costFixed: 15 },
        { id: "pickup", label: "Pick Up", costPercent: -15 },
      ],
      selectedShippingId: "basic",
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
      /* Clear Cart */
      clearCart: () => set({ carts: [] }),

      /*Total price of items*/
      subTotal: () =>
        get().carts.reduce((s, item) => s + item.price * item.quantity, 0),

      /*Number of product in the cart*/
      countItems: () => get().carts.length,
      /*Type of shipping*/
      selectShipping: (shippingId) => set({ selectedShippingId: shippingId }),
      /*Price of shipping*/
      shippingCost: () => {
        const selectedId = get().selectedShippingId;
        const option = get().shippingOptions.find(
          (opt) => opt.id === selectedId,
        );
        const base = get().subTotal();

        if (!option) return 0;

        if (option.costFixed != null) {
          return option.costFixed;
        } else if (option.costPercent != null) {
          return base * (option.costPercent / 100);
        } else {
          return 0;
        }
      },

      /*Total to pay*/
      total: () => {
        const base = get().subTotal();
        const ship = get().shippingCost();
        return base + ship;
      },
    }),
    {
      name: "elegant-cart",
      /* storage: createJSONStorage(() => sessionStorage), */
    },
  ),
);
