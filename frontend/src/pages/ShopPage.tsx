import ProductFilter from "@/components/products/ProductFilter";
import ProductFilteredList from "@/components/products/ProductFilteredList";
import { Section } from "@/components/Section";
import { priceRanges } from "@/constants";
import type { PriceRange } from "@/types";
import { useState } from "react";

const ShopPage = () => {
  const [selectedRanges, setSelectedRanges] = useState<PriceRange[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleRange = (rangeIndex: number) => {
    setSelectedRanges((prev) => {
      if (prev?.includes(priceRanges[rangeIndex]))
        return prev.filter((i) => i !== priceRanges[rangeIndex]);
      else return [...prev, priceRanges[rangeIndex]];
    });
  };

  return (
    <Section className="section">
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-12">
        {/* Product Filter */}
        <div className="relative md:col-span-3 lg:col-span-2">
          <ProductFilter
            toggleRange={toggleRange}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        {/* Product List */}
        <div className="md:col-span-9 lg:col-span-10">
          <ProductFilteredList
            selectedCategory={selectedCategory}
            selectedRanges={selectedRanges}
          />
        </div>
      </div>
    </Section>
  );
};

export default ShopPage;
