import { CreateProduct } from "@/components/CreateProduct";
import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsDashboard } from "./ProductsDashboard";

const DashboardPage = () => {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("create");
  const { products, getAllProduct } = useProductStore();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    getAllProduct();
  }, [user]);

  return (
    <Section className="relative space-y-2 py-4 md:py-8 lg:px-10 xl:px-24 2xl:px-40">
      <h2 className="text-center text-2xl font-bold">Dashboard</h2>
      <div className="flex items-center justify-center gap-x-2">
        <span
          className={`cursor-pointer rounded-2xl border px-6 py-1 ${tabs === "create" ? "bg-yellow/64 border-yellow/64" : "border-black-07/50"}`}
          onClick={() => setTabs("create")}
        >
          Create
        </span>
        <span
          className={`cursor-pointer rounded-2xl border px-6 py-1 ${tabs === "products" ? "bg-yellow/64 border-yellow/64" : "border-black-07/50"}`}
          onClick={() => setTabs("products")}
        >
          Products
        </span>
      </div>
      {tabs === "create" && <CreateProduct />}
      {tabs === "products" && <ProductsDashboard products={products} />}
    </Section>
  );
};

export default DashboardPage;
