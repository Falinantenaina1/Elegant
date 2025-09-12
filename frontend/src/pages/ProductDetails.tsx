import { BreadCumbs } from "@/components/BreadCumbs";
import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";

import { ShowRating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const RelatedProduct = React.lazy(() => import("../components/RelatedProduct"));
const Reviews = React.lazy(() => import("../components/Reviews"));

const ProductDetails = () => {
  const { id } = useParams();
  const products = useProductStore((s) => s.products);
  const [tabs, setTabs] = useState<"related" | "review">("related");

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
          <ShowRating
            averageRating={product.averageRating}
            reviews={product.reviews}
            readOnly={true}
          />
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
          <div className="flex gap-x-2">
            <Input
              type="number"
              step={1}
              min={1}
              defaultValue={1}
              className="w-15"
            />
            <Button>Add to cart</Button>
          </div>
          <div className="text-black/25">
            <span>CATEGORY : </span>
            {product.category}
          </div>
        </div>
      </div>
      <div className="3xl:pl-20 my-4 flex gap-x-4">
        <h3
          className={`cursor-pointer hover:underline ${tabs === "related" ? "underline" : ""}`}
          onClick={() => setTabs("related")}
        >
          Related product
        </h3>
        <h3
          className={`cursor-pointer hover:underline ${tabs === "review" ? "underline" : ""}`}
          onClick={() => setTabs("review")}
        >
          Reviews
        </h3>
      </div>
      {tabs === "related" && (
        <RelatedProduct id={product._id} category={product.category} />
      )}
      {tabs === "review" && <Reviews product={product} />}
    </Section>
  ) : (
    <NotFound />
  );
};

export default ProductDetails;
