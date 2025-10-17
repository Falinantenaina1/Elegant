import type { Product, User } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";
import type { productWithQuanity } from "./useCartStore";

type OrderStoreType = {
  orders: {
    _id: string;
    items: {
      product: Product;
      quantity: number;
      priceAtPurchase: number;
    }[];
    totalAmount: number;
    shippingType: "BASIC" | "EXPRESS" | "PICKUP";
    customer: User["id"];
    createdAt: Date;
  }[];

  allOrders: {
    _id: string;
    items: {
      product: Product;
      quantity: number;
      priceAtPurchase: number;
    }[];
    totalAmount: number;
    shippingType: "BASIC" | "EXPRESS" | "PICKUP";
    customer: User["id"];
    createdAt: Date;
  }[];

  createOrder: (
    carts: productWithQuanity[],
    totalAmount: number,
    shippingType: string,
  ) => void;

  getAllorder: () => void;

  getUserOrder: () => void;
};

export const useOrderStore = create<OrderStoreType>((set) => ({
  orders: [],
  allOrders: [],

  createOrder: async (carts, totalAmount, shippingType) => {
    try {
      const res = await axios.post("/order", {
        carts,
        totalAmount,
        shippingType,
      });

      set((state) => ({ orders: [res.data, ...state.orders] }));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    }
  },

  getAllorder: async () => {
    try {
      const res = await axios.get("/order");
      set({ orders: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    }
  },

  getUserOrder: async () => {
    try {
      const res = await axios.get("/order/my-orders");
      set({ allOrders: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    }
  },
}));
