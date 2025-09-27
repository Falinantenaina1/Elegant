import { Section } from "@/components/Section";
import { useCartStore, type productWithQuanity } from "@/stores/useCartStore";
import { Minus, Plus, X } from "lucide-react";

const CartPage = () => {
  const { carts, removeItem, increase, decrease } = useCartStore();

  const handleDecrease = (product: productWithQuanity) => {
    if (product.quantity === 1) {
      return removeItem(product);
    }
    decrease(product._id);
  };

  return (
    <>
      <Section className="section">
        <h2>cart</h2>
        <div>
          <table className="table-auto">
            <thead className="border-b border-black font-semibold">
              <tr className="text-center">
                <td className="text-left">Product</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {carts.map((product) => (
                /* Product */
                <tr key={product._id}>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-x-4">
                      <div className="flex size-20 items-center justify-center p-4">
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
                    <div className="flex w-max items-center justify-between gap-x-2 rounded-xs border border-black/50 px-2 py-0.5">
                      <button className="cursor-pointer">
                        <Minus
                          strokeWidth={1}
                          className="size-5 text-black"
                          onClick={() => handleDecrease(product)}
                        />
                      </button>
                      {product.quantity}
                      <button className="cursor-pointer">
                        <Plus
                          strokeWidth={1}
                          className="size-5 text-black"
                          onClick={() => increase(product._id)}
                        />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="px-4">${product.price}</div>
                  </td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <div>
        <h3>Cart summary</h3>
        <div>
          <label htmlFor="free">
            <input type="radio" name="free" />
            <div>
              <span>Free shipping</span>
              <span>$0.00</span>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="free">
            <input type="radio" name="free" />
            <div>
              <span>Free shipping</span>
              <span>$0.00</span>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="express">
            <input type="radio" name="express" />
            <div>
              <span>Express shipping</span>
              <span>+$15.00</span>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="pickup">
            <input type="radio" name="pickup" />
            <div>
              <span>Pick Up</span>
              <span>%21</span>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default CartPage;
