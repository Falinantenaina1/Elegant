import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

export const BestSeller = () => {
  const products = useProductStore((s) => s.products);

  const bestSeller = products.filter((product) => product.isFeatured);

  return (
    <Section className="px-6 py-6 md:px-10 lg:px-10 xl:px-24 2xl:px-40">
      <h2>Best Seller</h2>
      <div className="mx-auto grid w-max justify-center gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {bestSeller.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Section>
  );
};
