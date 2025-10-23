import { useProductStore } from "@/stores/useProductStore";
import { useMemo } from "react";
import { Section } from "../Section";
import { ProductCard } from "./ProductCard";

type RelatedProps = {
  category: string;
  id: string;
};

const RelatedProduct = ({ id, category }: RelatedProps) => {
  const products = useProductStore((s) => s.products);

  const relatedProducts = useMemo(
    () =>
      products.filter(
        (product) => product.category === category && product._id !== id,
      ),
    [category, id],
  );

  const productToShow = useMemo(
    () => relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 5),
    [relatedProducts],
  );

  return (
    <Section>
      <h2 className="3xl:pl-20 text-left text-2xl">Related product</h2>
      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-2 items-stretch gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-4 lg:grid-cols-5">
        {productToShow.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Section>
  );
};

export default RelatedProduct;
