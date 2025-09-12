import type { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

export const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => (navigate(`/products/${product._id}`), scroll(0, 0))}
      className="cursor-pointer"
    >
      <Card
        className={`w-full ${className || ""} transition-all duration-200 hover:-translate-y-1`}
      >
        <CardContent className="text-center font-medium">
          <div className="flex h-[262px] flex-col items-center justify-center overflow-hidden">
            <img
              src={product.imageUrl}
              alt={`${product.name} picture`}
              className="mx-auto block max-h-60 object-contain"
              loading="lazy"
            />
          </div>
          <h3>{product.name}</h3>
          <p className="font-semibold">${product.price}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="h-full w-full max-w-[349px] space-y-4 overflow-hidden rounded-md px-6 py-4 shadow-md">
      <div className="h-[280px] animate-pulse rounded-2xl bg-gray-900/20"></div>
      <div className="h-10 animate-pulse rounded-2xl bg-gray-900/20"></div>
    </div>
  );
};
