import type { Product } from "@/types";
import { ShowRating } from "./Rating";
import { Section } from "./Section";

/* type ReviewType = {
  reviews: Review[];
  averageRating: number;
}; */

function Reviews({ product }: { product: Product }) {
  return (
    <Section className="3xl:pl-20">
      <h2 className="text-left text-2xl">Customer Reviews</h2>
      <div>
        <ShowRating
          reviews={product.reviews}
          averageRating={product.averageRating}
        />
      </div>
    </Section>
  );
}

export default Reviews;
