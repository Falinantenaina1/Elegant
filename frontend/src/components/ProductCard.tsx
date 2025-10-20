import { useCartStore } from "@/stores/useCartStore";
import type { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  return (
    <div
      onClick={() => (navigate(`/products/${product._id}`), scroll(0, 0))}
      className={`w-full cursor-pointer py-4 shadow-md ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-0.5 ${className || ""}`}
    >
      <div className="group w-full px-4">
        <img
          src={product.imageUrl}
          alt={`${product.name} picture`}
          className="mx-auto block h-50 object-contain"
          loading="lazy"
        />
        <div className="mx-auto px-4 max-lg:hidden">
          <Button
            className="invisible mt-2 mb-1 w-full cursor-pointer group-hover:visible"
            onClick={(e) => handleAddItem(e)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="text-center max-lg:mt-4">
        <h3>{product.name}</h3>
        <p className="font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
