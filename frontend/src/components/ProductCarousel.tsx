import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types";

export const ProductCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel className="w-full max-w-[90rem]">
      <CarouselContent className="py-1">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="3xl:basis-2/9 basis-4/5 min-[600px]:basis-1/2 md:basis-2/5 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
