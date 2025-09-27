import { useCartStore } from "@/stores/useCartStore";
import { ShoppingBag } from "lucide-react";

export const Cart = () => {
  const { countItems } = useCartStore();

  return (
    <div className="flex items-center justify-center gap-x-1.25">
      <ShoppingBag className="size-6" />
      <div className="bg-primary text-yellow flex size-5 items-center justify-center rounded-full px-1.25 py-1.5">
        {countItems()}
      </div>
    </div>
  );
};
