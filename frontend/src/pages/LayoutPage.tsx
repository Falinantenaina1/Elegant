import { Footer } from "@/components/Footer";
import { useProductStore } from "@/stores/useProductStore";

import { Navbar } from "@/components/Navbar";
import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Auth } from "./Auth";

const LayoutPage = () => {
  const { isCheckingAuth, checkAuth } = useUserStore();
  const [showAuth, setShowAuth] = useState(false);
  const getAllProduct = useProductStore((s) => s.getAllProduct);
  const isGettingProduct = useProductStore((s) => s.isGettingProduct);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getAllProduct();
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-[120rem] flex-col">
      {isCheckingAuth || isGettingProduct ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <LoaderCircleIcon className="size-25 animate-spin" />
        </div>
      ) : (
        <div className="flex min-h-screen flex-col justify-between">
          {showAuth && <Auth setShowAuth={setShowAuth} />}
          <Navbar setShowAuth={setShowAuth} />
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
