import { useProductStore } from "@/stores/useProductStore";
import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Section } from "./Section";

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
    () => relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4),
    [relatedProducts],
  );

  return (
    <Section>
      <h2 className="3xl:pl-20 text-left text-2xl">Related product</h2>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 xl:gap-x-4 2xl:gap-x-2">
        {productToShow.map((product) => (
          <div
            key={product._id}
            className="max-w-[15rem] basis-4/5 min-[600px]:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4 2xl:max-w-[17rem]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default RelatedProduct;
