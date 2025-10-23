import { ProductCard } from "@/components/products/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types";

export const ProductCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="py-1">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            className="mr-4 min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
