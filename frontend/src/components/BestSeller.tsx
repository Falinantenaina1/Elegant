import { useProductStore } from "@/stores/useProductStore";
import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

export const BestSeller = () => {
  const products = useProductStore((s) => s.products);

  const bestSeller = products.filter((product) => product.isFeatured);

  return (
    <Section className="section">
      <h2>Best Seller</h2>
      <div className="3xl:gap-x-8 mx-auto flex w-full max-w-[100rem] flex-wrap justify-center gap-x-4 gap-y-4 xl:gap-x-6 2xl:gap-x-2">
        {bestSeller.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="max-w-[15rem] basis-4/5 min-[600px]:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:max-w-[15.5rem] xl:basis-1/4 2xl:max-w-[19rem]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
};
