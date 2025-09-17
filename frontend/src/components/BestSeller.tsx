import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

export const BestSeller = () => {
  const products = useProductStore((s) => s.products);

  const bestSeller = products.filter((product) => product.isFeatured);

  return (
    <Section className="section py-6">
      <h2 className="h2">Best Seller</h2>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 lg:grid-cols-5">
        {bestSeller.slice(0, 10).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Section>
  );
};
