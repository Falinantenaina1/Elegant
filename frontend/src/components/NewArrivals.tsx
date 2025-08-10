import { ProductCarousel } from "@/pages/ProductCarousel";
import { useProductStore } from "@/stores/useProductStore";
import { Section } from "./Section";

export const NewArrivals = () => {
  const { products } = useProductStore();

  const newArrivals = products.slice(0, 10);

  return (
    <Section className="px-6 py-6 md:px-10 lg:px-10 xl:px-24 2xl:px-40">
      <h2>New Arrivals</h2>
      <ProductCarousel products={newArrivals} />
    </Section>
  );
};
