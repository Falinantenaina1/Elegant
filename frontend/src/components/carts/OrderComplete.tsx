import { cn } from "@/lib/utils";
import { useOrderStore } from "@/stores/useOrderStore";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const OrderComplete = () => {
  const { order } = useOrderStore();

  if (!order) return null;

  const date = new Date(order.createdAt);

  return (
    <div className="mx-auto w-max max-w-full p-6 shadow-2xl ring-1 ring-gray-100">
      <div className="space-y-6 text-center">
        <p>Thank you! 🎉</p>
        <h3 className="text-2xl">Your order has been received</h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {order.items.map((item) => (
            <div
              key={item.product._id}
              className="relative flex h-24 w-20 items-center justify-center p-4 shadow-xl ring-1 ring-gray-100"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="object-contain"
              />
              <div className="absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-full bg-black p-1 text-white">
                {item.quantity}
              </div>
            </div>
          ))}
        </div>
        <table className="mx-auto text-left">
          <tr>
            <td className="px-4 py-1 font-semibold text-gray-700">
              Order code:
            </td>
            <td className="font-semibold">#{order._id.slice(0, 5)}</td>
          </tr>
          <tr>
            <td className="px-4 py-1 font-semibold text-gray-700">Date:</td>
            <td className="font-semibold">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-1 font-semibold text-gray-700">Total:</td>
            <td className="font-semibold">${order.totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-1 font-semibold text-gray-700">
              Shipping Method:
            </td>
            <td className="font-semibold">{order.shippingType}</td>
          </tr>
        </table>
        <Link className={cn(buttonVariants())} to={"/user"}>
          Purchase history
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
