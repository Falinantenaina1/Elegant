import { useProductStore } from "@/stores/useProductStore";
import type { PriceRange } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductFilteredListProps = {
  selectedCategory: string;
  selectedRanges: PriceRange[];
};
const ProductFilteredList = (props: ProductFilteredListProps) => {
  const { selectedCategory, selectedRanges } = props;

  const products = useProductStore((s) => s.products);

  let filteredProduct = products;

  if (selectedCategory) {
    filteredProduct = filteredProduct.filter(
      (product) => product.category === selectedCategory,
    );
  }

  if (selectedRanges.length > 0) {
    filteredProduct = filteredProduct.filter((product) =>
      selectedRanges.some(
        (range) => product.price >= range.min && product.price <= range.max,
      ),
    );
  }

  if (filteredProduct.length === 0) {
    return (
      <div className="mt-4 text-center text-xl font-bold">
        There is no product to show
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProduct.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductFilteredList;
