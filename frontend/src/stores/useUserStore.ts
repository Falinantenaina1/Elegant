import type { User } from "@/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

type UserStore = {
  user: User | null;
  loading: boolean;
  isCheckingAuth: boolean;
  signup: (signupData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordVerification: string;
  }) => void;
  login: (loginData: { email: string; password: string }) => void;
  logout: () => void;
  checkAuth: () => void;
  updateUser: (
    userId: string | undefined,
    firstname: string | undefined,
    lastname: string | undefined,
    oldPassword: string,
    newPassword: string,
    newConfirmation: string,
  ) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  isCheckingAuth: true,

  signup: async (signupData) => {
    set({ loading: true });
    try {
      if (signupData.password !== signupData.passwordVerification) {
        return toast.error("The password doesn't match");
      }

      const res = await axios.post("/auth/signup", signupData);
      set({ user: res.data });
      toast.success("User connected");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(
          error.response?.data?.message || error.message || "An error occured",
          { id: "signup" },
        );
      }
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", loginData);
      set({ user: res.data });
      toast.success("User connected");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(
          error.response?.data?.message || error.message || "An error occured",
          { id: "login" },
        );
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("auth/logout");
      set({ user: null });
      toast.success("User deconnected");
    } catch {
      toast.error("An error occured");
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/auth/me");
      set({ user: res.data, isCheckingAuth: false });
    } catch {
      set({ isCheckingAuth: false });
    }
  },

  updateUser: async (
    userId,
    firstname,
    lastname,
    oldPassword,
    newPassword,
    newConfirmation,
  ) => {
    set({ loading: true });
    try {
      if (newPassword !== newConfirmation)
        return toast.error("The new Password doesn't match");
      const res = await axios.put(`/user/${userId}`, {
        firstname,
        lastname,
        oldPassword,
        newPassword,
      });

      set({ user: res.data });
      set({ loading: false });
      toast.success("Information Updated");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error", {
          id: "Edit error",
        });
      }
      set({ loading: false });
    }
  },
}));
