import { MobileCart } from "@/components/carts/MobileCart";
import ProductQuantity from "@/components/carts/ProductQuantity";
import { Section } from "@/components/Section";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    carts,
    removeItem,
    increase,
    decrease,
    subTotal,
    shippingOptions,
    selectShipping,
    total,
    countItems,
  } = useCartStore();

  if (countItems() === 0)
    return (
      <Section className="section">
        <div className="text-center text-xl font-semibold">
          There is no product in the cart
        </div>
      </Section>
    );

  return (
    <Section className="section">
      <h2 className="h2">Cart</h2>
      <div className="grid grid-cols-1 space-y-4 space-x-4 md:grid-cols-3 lg:p-4">
        {/* Desktop */}
        <div className="min-w-full pr-4 max-lg:hidden md:col-span-2">
          <table className="w-full table-auto">
            <thead className="font-semibold">
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {carts.map((product) => (
                <tr key={product._id}>
                  {/* Product */}
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex size-15 items-center justify-center lg:size-20 lg:p-4">
                        <img
                          className=""
                          src={product.imageUrl}
                          alt={`${product.name} picture`}
                        />
                      </div>
                      <div className="col-span-2 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">
                            {product.name}
                          </h3>
                          {product.color && (
                            <p className="text-sm">
                              color: <span>{product.color}</span>
                            </p>
                          )}
                        </div>
                        <button
                          className="flex cursor-pointer text-xs hover:text-red-600"
                          onClick={() => removeItem(product)}
                        >
                          <X className="size-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </td>
                  {/* Quantity */}
                  <td>
                    <ProductQuantity
                      product={product}
                      increase={increase}
                      decrease={decrease}
                      removeItem={removeItem}
                    />
                  </td>
                  <td>
                    <div>${product.price}</div>
                  </td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile */}
        <div className="col-span-2 lg:hidden">
          <h2 className="font-bold">Product</h2>
          <Separator />
          <MobileCart />
          <h3></h3>
        </div>
        {/* Cart Summary */}
        <div>
          <div className="mx-auto max-w-[20rem] rounded-md border border-gray-500 p-4">
            <h3 className="mb-4 text-xl font-semibold">Cart summary</h3>
            <div className="space-y-3">
              {/* Listing shipping option */}
              {shippingOptions.map((shipping, index) => (
                <label
                  key={shipping.id}
                  htmlFor={shipping.id}
                  className="flex cursor-pointer gap-x-1 rounded-md border border-gray-500 px-4 py-3 has-checked:bg-gray-200"
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={shipping.id}
                    id={shipping.id}
                    defaultChecked={index === 0}
                    onChange={() => selectShipping(shipping.id)}
                  />
                  <div className="flex w-full items-center justify-between">
                    <span>{shipping.label}</span>
                    <span className="">
                      {shipping.costPercent
                        ? `${shipping.costPercent}%`
                        : `$${shipping.costFixed}`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <div>
              <div className="flex justify-between py-3">
                <span>Subtotal</span>
                <span className="font-medium">${subTotal().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-3 font-bold">
                <span>Total</span>
                <span>${total().toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className={cn(buttonVariants(), "w-full cursor-pointer py-6")}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CartPage;
