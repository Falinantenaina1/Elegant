import type { CartStoreType, productWithQuanity } from "@/stores/useCartStore";
import { Minus, Plus, Trash } from "lucide-react";

type ProductQuantityProps = {
  product: productWithQuanity;
  decrease: CartStoreType["decrease"];
  increase: CartStoreType["increase"];
  removeItem: CartStoreType["removeItem"];
};

const ProductQuantity = ({
  product,
  decrease,
  removeItem,
  increase,
}: ProductQuantityProps) => {
  return (
    <div className="flex w-max items-center justify-between gap-x-0.5 rounded-xs border border-black/50 py-0.5 lg:gap-x-2 lg:px-2">
      <button className="cursor-pointer">
        {product.quantity >= 2 ? (
          <Minus
            strokeWidth={1}
            className="hover:scale-125 lg:size-5"
            onClick={() => decrease(product._id)}
          />
        ) : (
          <Trash
            strokeWidth={1}
            className="size-5 hover:scale-125"
            onClick={() => removeItem(product)}
          />
        )}
      </button>
      {product.quantity}
      <button
        className="cursor-pointer disabled:cursor-not-allowed"
        disabled={product.quantity >= 10}
      >
        <Plus
          strokeWidth={1}
          className="size-5 hover:scale-125"
          onClick={() => increase(product._id)}
        />
      </button>
    </div>
  );
};

export default ProductQuantity;
