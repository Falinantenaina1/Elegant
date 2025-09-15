import { ProductCarousel } from "@/components/ProductCarousel";
import { useProductStore } from "@/stores/useProductStore";
import { Section } from "./Section";

export const NewArrivals = () => {
  const { products } = useProductStore();

  const newArrivals = products.slice(0, 10);

  return (
    <Section className="section mx-auto w-full max-w-[100rem]">
      <h2>New Arrivals</h2>
      <ProductCarousel products={newArrivals} />
    </Section>
  );
};
