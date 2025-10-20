import { useOrderStore } from "@/stores/useOrderStore";
import { Section } from "../Section";
import { Separator } from "../ui/separator";

const OrderHistory = () => {
  const { allOrders } = useOrderStore();

  return (
    allOrders.length > 0 && (
      <Section>
        <h3 className="my-4 text-xl font-semibold">Orders History</h3>
        {/* Desktop */}
        <div className="max-md:hidden">
          <table className="border-spacing-8">
            <thead>
              <tr>
                <th className="text-left">Number ID</th>
                <th className="text-left">Dates</th>
                <th className="text-left">Status</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-300">
                  <td className="py-4 md:pr-4 lg:pr-16 xl:pr-32">
                    #{order._id.slice(0, 7)}
                  </td>
                  <td className="py-4 md:pr-4 lg:pr-16 xl:pr-32">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-4 md:pr-4 lg:pr-16 xl:pr-32">
                    {order.status}
                  </td>
                  <td className="py-4 md:pr-4 lg:pr-16 xl:pr-32">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile */}
        <div className="md:hidden">
          <div className="max-w-md space-y-6">
            {allOrders.map((order) => (
              <div key={order._id}>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Number ID</span>
                  <span className="font-sans text-black">
                    #{order._id.slice(0, 7)}
                    {}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Dates</span>
                  <span className="font-sans text-black">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Status</span>
                  <span className="font-sans text-black">{order.status}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-600">Price</span>
                  <span className="font-sans text-black">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </Section>
    )
  );
};

export default OrderHistory;
