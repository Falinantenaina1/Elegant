import type { ProductStore } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  isGettingProduct: true,
  getAllProduct: async () => {
    try {
      const res = await axios.get("/products");
      set({ products: res.data, isGettingProduct: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
          { id: "getProduct" },
        );
      }
    }
  },

  createProduct: async (formData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", formData);

      set((state) => ({ products: [res.data, ...state.products] }));
      toast.success("Product created");
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

  deleteProduct: async (id: string) => {
    try {
      const res = await axios.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    }
  },

  toggleFeatured: async (id: string) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/products/featured/${id}`);
      set((state) => ({
        products: state.products.map((product) =>
          product._id != id
            ? product
            : { ...product, isFeatured: !product.isFeatured },
        ),
      }));
      toast.success(
        res.data.Featured
          ? "The product is featured"
          : "The product is removed from featured",
        { id: "Featured" },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(
          error.response?.data?.message || error.message || "An error occurred",
        );
      }
    } finally {
      set({ loading: false });
    }
  },
}));
