import { Section } from "@/components/Section";
import { useCartStore } from "@/stores/useCartStore";

const CartPage = () => {
  const { carts } = useCartStore();
  /*  const [tab, setTabs] = useState(""); */
  console.log(carts);

  return (
    <>
      <Section className="section">
        <h2>cart</h2>
        <div>
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart._id}>
                  <td>{cart.name}</td>
                  <td>{cart.quantity}</td>
                  <td>${cart.price}</td>
                  <td>${cart.price * cart.quantity}</td>
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
