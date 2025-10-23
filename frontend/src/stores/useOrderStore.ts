import type { OrderStoreType } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useOrderStore = create<OrderStoreType>((set) => ({
  order: null,
  allOrders: [],
  isOrderCreated: false,
  loading: false,

  createOrder: async (createOrderData) => {
    set({ loading: true, order: null });
    if (!createOrderData.shippingAdress)
      return toast.error("The shipping address is required");
    try {
      const res = await axios.post("/order", createOrderData);

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
