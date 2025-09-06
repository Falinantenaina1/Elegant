import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";
import type { Product } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useProductStore((s) => s.products);

  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (id) {
      const findProduct = products.find((product) => product._id === id);
      setProduct(findProduct);
    }
  }, [product]);

  return product ? (
    <Section className="mx-auto px-6 py-6 md:px-10 lg:px-10 xl:px-24 2xl:px-40">
      <div className="w-full">
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
      <div className="mt-8 grid grid-cols-1 space-y-4 md:grid-cols-3">
        <div className="flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={`${product.name} picture`}
            className=""
          />
        </div>
        <div className="col-span-2 space-y-4 text-sm md:p-8">
          <h3 className="text-3xl font-medium">{product.name}</h3>
          <p>{product.description}</p>
          <div>
            <span className="text-xl">$</span>
            <span className="text-xl font-semibold">{product.price}</span>
          </div>
        </div>
      </div>
    </Section>
  ) : (
    <NotFound />
  );
};
