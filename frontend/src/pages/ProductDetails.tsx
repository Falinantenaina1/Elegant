import { BreadCumbs } from "@/components/BreadCumbs";
import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const RelatedProduct = React.lazy(
  () => import("../components/products/RelatedProduct"),
);

const ProductDetails = () => {
  const { id } = useParams();
  const products = useProductStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);

  const product = useMemo(() => products.find((p) => p._id === id), [id]);

  return product ? (
    <Section className="mx-auto w-full max-w-[100rem] px-6 py-6 md:px-10 lg:px-10 xl:px-24 2xl:px-40">
      <BreadCumbs product={product} />
      <div className="mt-8 grid grid-cols-1 space-y-4 md:grid-cols-3">
        <div className="flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={`${product.name} picture`}
            className="size-[15rem] object-contain md:size-[20rem]"
          />
        </div>
        <div className="col-span-2 space-y-4 text-sm md:p-8">
          <h3 className="text-3xl font-medium">{product.name}</h3>
          <p>{product.description}</p>
          <div>
            <span className="text-xl">$</span>
            <span className="text-xl font-semibold">{product.price}</span>
          </div>
          {product.color && (
            <div>
              <span className="font-bold">Color : </span> {product.color}
            </div>
          )}
          <Button className="cursor-pointer" onClick={() => addItem(product)}>
            Add to cart
          </Button>
          <div className="text-black/25">
            <span>CATEGORY : </span>
            {product.category}
          </div>
        </div>
      </div>
      <RelatedProduct id={product._id} category={product.category} />
    </Section>
  ) : (
    <NotFound />
  );
};

export default ProductDetails;
