import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { useProductStore } from "@/stores/useProductStore";

import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  const { isCheckingAuth, checkAuth } = useUserStore();
  const getAllProduct = useProductStore((s) => s.getAllProduct);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getAllProduct();
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-[120rem] flex-col">
      {isCheckingAuth ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <LoaderCircleIcon className="size-25 animate-spin" />
        </div>
      ) : (
        <div className="flex min-h-screen flex-col justify-between">
          <Navbar />
          <main className="font-inter w-full flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default LayoutPage;
