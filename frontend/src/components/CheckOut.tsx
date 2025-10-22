import { useCartStore } from "@/stores/useCartStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { useUserStore } from "@/stores/useUserStore";
import type { User } from "@/types";
import { useEffect } from "react";
import { MobileCart } from "./carts/MobileCart";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Address from "./users/Address";

const CheckOut = ({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user, isShowingAuth, isAuth } = useUserStore();
  const { createOrder } = useOrderStore();
  const { carts, selectedShippingId, subTotal, total, clearCart } =
    useCartStore();

  const handleOrder = async () => {
    createOrder(
      carts,
      total(),
      selectedShippingId.toUpperCase(),
      user?.address as User["address"],
    );
    clearCart();
    setTabs("Order complete");
  };

  useEffect(() => {
    if (!isAuth) {
      setTabs("Shopping cart");
    }
  }, [isShowingAuth, isAuth]);

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-10">
          {/* Information */}
          <div className="space-y-6 lg:col-span-6">
            {/* Contact Information */}
            <div className="rounded-sm px-4 py-6 ring-1 ring-gray-400 lg:px-6 lg:py-10">
              <h3 className="font-poppins font-semibold lg:text-xl lg:font-medium">
                Contact Information
              </h3>
              <form action="" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                    <FormInput
                      name="firstname"
                      label="FIRST NAME"
                      required
                      defaultValue={user?.firstname}
                      placeholder="First name"
                      disabled={true}
                    />
                    <FormInput
                      name="lastname"
                      label="LAST NAME"
                      defaultValue={user?.lastname}
                      required
                      placeholder="Last name"
                      disabled={true}
                    />
                  </div>
                  <FormInput
                    name="email"
                    type="email"
                    label="EMAIL ADDRESS"
                    defaultValue={user?.email}
                    placeholder="Your Email"
                    disabled={true}
                  />
                </div>
              </form>
            </div>
            {/* Shipping Address */}
            <Address />
          </div>
          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="rounded-sm px-4 py-6 ring-1 ring-gray-400 lg:px-6 lg:py-10">
              <h3 className="font-poppins font-semibold lg:text-xl lg:font-medium">
                Order summary
              </h3>
              <MobileCart />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">{selectedShippingId}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subTotal().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-semibold">${total().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button
              className="mx-auto mt-6 w-full cursor-pointer"
              onClick={handleOrder}
              disabled={
                !user?.address || Object.keys(user.address).length === 0
              }
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
