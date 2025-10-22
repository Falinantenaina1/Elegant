import type { Product, User } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";
import type { productWithQuanity } from "./useCartStore";

type OrderStoreType = {
  order: {
    _id: string;
    items: {
      product: Product;
      quantity: number;
      priceAtPurchase: number;
    }[];
    totalAmount: number;
    status: string;
    shippingType: "BASIC" | "EXPRESS" | "PICKUP";
    customer: User["id"];
    createdAt: Date;
    shippingAdress: User["address"];
  } | null;

  allOrders: {
    _id: string;
    items: {
      product: Product;
      quantity: number;
      priceAtPurchase: number;
    }[];
    status: string;
    totalAmount: number;
    shippingType: "BASIC" | "EXPRESS" | "PICKUP";
    customer: User["id"];
    createdAt: Date;
  }[];

  loading: boolean;

  createOrder: (
    carts: productWithQuanity[],
    totalAmount: number,
    shippingType: string,
    shippingAdress: User["address"],
  ) => void;

  getAllorder: () => void;

  getUserOrder: () => void;

  clearOrder: () => void;
};

export const useOrderStore = create<OrderStoreType>((set) => ({
  order: null,
  allOrders: [],
  isOrderCreated: false,
  loading: false,

  createOrder: async (carts, totalAmount, shippingType, shippingAdress) => {
    set({ loading: true, order: null });
    if (!shippingAdress) return toast.error("The shipping address is required");
    try {
      const res = await axios.post("/order", {
        carts,
        totalAmount,
        shippingType,
        shippingAdress,
      });

      set({ order: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    } finally {
      set({ loading: false });
    }
  },

  getAllorder: async () => {
    try {
      const res = await axios.get("/order");
      set({ order: res.data });
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

  clearOrder: () => set({ order: null }),
}));
