import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsDashboard = React.lazy(
  () => import("../components/admin/ProductsDashboard"),
);
const CreateProduct = React.lazy(
  () => import("../components/admin/CreateProduct"),
);

const DashboardPage = () => {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const [tabs, setTabs] = useState("create");
  const { products } = useProductStore();

  console.log(products);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Section className="relative space-y-2 py-4 md:py-8 lg:px-10 xl:px-24 2xl:px-40">
      <h2 className="text-center text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-12 gap-x-8">
        <div className="col-span-2 flex flex-col gap-y-2">
          <span
            className={`cursor-pointer rounded-2xl px-6 py-1 ${tabs === "create" ? "bg-yellow/64 border-yellow/64" : "border-black-07/50"}`}
            onClick={() => setTabs("create")}
          >
            Create
          </span>
          <span
            className={`cursor-pointer rounded-2xl px-6 py-1 ${tabs === "products" ? "bg-yellow/64 border-yellow/64" : "border-black-07/50"}`}
            onClick={() => setTabs("products")}
          >
            Products
          </span>
        </div>
        <div className="col-span-9">
          {tabs === "create" && <CreateProduct />}
          {tabs === "products" && <ProductsDashboard products={products} />}
        </div>
      </div>
    </Section>
  );
};

export default DashboardPage;
