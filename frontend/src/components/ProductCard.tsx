import type { Product } from "@/types";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({
  product,
}: {
  product: Product;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => (navigate(`/products/${product._id}`), scroll(0, 0))}
      className="w-full cursor-pointer rounded-xl py-4 ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-1"
    >
      <img
        src={product.imageUrl}
        alt={`${product.name} picture`}
        className="mx-auto block h-50 object-contain"
        loading="lazy"
      />
      <div className="mt-3 text-center">
        <h3>{product.name}</h3>
        <p className="font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
