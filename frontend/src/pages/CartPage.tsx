import { Section } from "@/components/Section";

const CartPage = () => {
  /*  const [tab, setTabs] = useState(""); */

  return (
    <>
      <Section className="section">
        <h2>cart</h2>
        <div></div>
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
