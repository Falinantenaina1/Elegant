import { useCartStore } from "@/stores/useCartStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { MobileCart } from "./carts/MobileCart";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

const CheckOut = ({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user, isShowingAuth, isAuth } = useUserStore();

  useEffect(() => {
    if (!isAuth) {
      setTabs("Shopping cart");
    }
  }, [isShowingAuth, isAuth]);

  const { selectedShippingId, subTotal, total } = useCartStore();
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
                    />
                    <FormInput
                      name="lastname"
                      label="LAST NAME"
                      defaultValue={user?.lastname}
                      required
                      placeholder="Last name"
                    />
                  </div>
                  <FormInput
                    name="phone"
                    type="phone"
                    label="PHONE NUMBER"
                    defaultValue=""
                    placeholder="Phone number"
                  />
                  <FormInput
                    name="email"
                    type="email"
                    label="EMAIL ADDRESS"
                    defaultValue={user?.email}
                    placeholder="Your Email"
                  />
                </div>
              </form>
            </div>
            {/* Shipping Address */}
            <div className="rounded-sm px-4 py-6 ring-1 ring-gray-400 lg:px-6 lg:py-10">
              <h3 className="font-poppins font-semibold lg:text-xl lg:font-medium">
                Shipping Address
              </h3>
              <form action="" className="mt-6">
                <div className="space-y-6">
                  <FormInput
                    name="street"
                    label="STREET ADDRESS*"
                    placeholder="Strett address"
                    required
                  />
                  <div>
                    <Label htmlFor="country">COUNTRY*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="United State">
                            United State
                          </SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="Madagascar">Madagascar</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormInput
                    name="city"
                    label="TOWN/CITY*"
                    placeholder="Town / City"
                    required
                  />
                  <div className="grid grid-cols-2 gap-x-6">
                    <FormInput name="state" label="STATE" placeholder="State" />
                    <FormInput
                      name="zipCode"
                      label="ZIP CODE"
                      placeholder="Zip code"
                    />
                  </div>
                </div>
              </form>
            </div>
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
          </div>
        </div>
        <Button
          className="mx-auto mt-6 w-full cursor-pointer lg:w-1/2"
          onClick={() => setTabs("Shopping cart")}
        >
          Place Order
        </Button>
      </div>
    </>
  );
};

export default CheckOut;
