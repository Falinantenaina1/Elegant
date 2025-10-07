import { useCartStore } from "@/stores/useCartStore";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import ProductQuantity from "./ProductQuantity";

export const MobileCart = ({ className }: { className?: string }) => {
  const { carts, increase, decrease, removeItem } = useCartStore();
  return (
    <div className={`col-span-2 ${className || ""}`}>
      {carts.map((product) => (
        <div key={product._id}>
          <div className="flex justify-between gap-x-1.5 py-4">
            <div className="flex items-center">
              <div className="mr-4 w-15">
                <img
                  src={product.imageUrl}
                  alt={`${product.name} image`}
                  className="size-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">{product.name}</h3>
                {product.color && (
                  <p className="text-sm">Color: {product.color}</p>
                )}
                {/* Quantity */}
                <ProductQuantity
                  product={product}
                  increase={increase}
                  decrease={decrease}
                  removeItem={removeItem}
                />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <p className="text-sm font-medium">${product.price}</p>
              <button
                onClick={() => removeItem(product)}
                className="cursor-pointer"
              >
                <X className="size-5" strokeWidth={1} />
              </button>
            </div>
          </div>
          <Separator />
        </div>
      ))}
      <h3></h3>
    </div>
  );
};
