import { ProductCarousel } from "@/components/products/ProductCarousel";
import { useProductStore } from "@/stores/useProductStore";
import { Section } from "./Section";

export const NewArrivals = () => {
  const { products } = useProductStore();

  const newArrivals = products.slice(0, 10);

  return (
    <Section className="section mx-auto max-w-[90rem]">
      <h2 className="h2">New Arrivals</h2>
      <ProductCarousel products={newArrivals} />
    </Section>
  );
};
