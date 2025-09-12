import type { Product } from "@/types";
import { Link } from "react-router-dom";

export const BreadCumbs = ({ product }: { product: Product }) => {
  return (
    <div className="3xl:pl-20 w-full">
      <p>
        <span>
          <Link className="hover:underline" to={"/"}>
            Home
          </Link>
        </span>{" "}
        /
        <span>
          {" "}
          <Link className="hover:underline" to={"/products"}>
            Products
          </Link>
        </span>{" "}
        /
        <span>
          {" "}
          <Link
            className="hover:underline"
            to={`/products/${product.category.toLowerCase()}`}
          >
            {product.category}
          </Link>
        </span>{" "}
        /<span className="text-yellow"> {product.name}</span>
      </p>
    </div>
  );
};
