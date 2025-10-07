import OrderComplete from "@/components/carts/OrderComplete";
import ShoppingCart from "@/components/carts/ShoppingCart";
import CheckOut from "@/components/CheckOut";
import { useState } from "react";

const tabsName = ["Shopping cart", "Checkout details", "Order complete"];

const CartPage = () => {
  const [tabs, setTabs] = useState(tabsName[0]);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-6 py-6">
        <h2 className="h2">Cart</h2>
        <div className="flex items-center justify-center gap-x-8 overflow-hidden">
          {tabsName.map((tabName, index) => (
            <button
              key={tabName}
              className={`flex items-center gap-x-2 border-b-2 pb-4 ${tabs === tabName ? "border-black text-black" : index < tabsName.indexOf(tabs) ? "cursor-pointer border-green-400 text-green-400" : "border-transparent text-gray-300"}`}
              onClick={() => (scroll(0, 0), setTabs(tabName))}
              disabled={index >= tabsName.indexOf(tabs)}
            >
              <div
                className={`flex size-8 items-center justify-center rounded-full text-white ${tabs === tabName ? "bg-black" : index < tabsName.indexOf(tabs) ? "bg-green-400" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>
              <div>{tabName}</div>
            </button>
          ))}
        </div>
        <div className="py-6">
          {tabs === "Shopping cart" && <ShoppingCart setTabs={setTabs} />}
          {tabs === "Checkout details" && <CheckOut />}
          {tabs === "Order complete" && <OrderComplete />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
