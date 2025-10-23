import { priceRanges } from "@/constants";
import { FilterIcon, X } from "lucide-react";
import React, { useState } from "react";

type ProductFilterProps = {
  toggleRange: (index: number) => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const categories = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Headbands",
    value: "Headbands",
  },
  {
    name: "Earbuds",
    value: "Earbuds",
  },
  {
    name: "Accessories",
    value: "Accessories",
  },
];

const ProductFilter: React.FC<ProductFilterProps> = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="sticky top-10 max-md:mb-4">
      <div className="flex justify-between">
        <h2 className="flex gap-x-1" onClick={() => setShowFilter(!showFilter)}>
          <FilterIcon />
          <span className="font-bold">Filter</span>
        </h2>
        <button
          className={`${showFilter ? "block" : "hidden"} md:hidden`}
          onClick={() => setShowFilter(false)}
        >
          <X />
        </button>
      </div>
      <div
        className={`mt-4 space-y-4 ${showFilter ? "block" : "max-md:hidden"} `}
      >
        <div>
          <h3 className="font-semibold uppercase">Categories</h3>
          <div className="space-y-1">
            {categories.map((category, index) => (
              <label
                htmlFor={category.name}
                key={category.name}
                className={`block cursor-pointer hover:font-semibold hover:underline has-checked:font-semibold has-checked:underline`}
              >
                <input
                  type="radio"
                  name="categories"
                  value={category.value}
                  defaultChecked={index === 0}
                  id={category.name}
                  className="hidden"
                  onChange={(e) => props.setSelectedCategory(e.target.value)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold uppercase">Price</h3>
          <div className="grid space-y-2">
            {priceRanges.map((range, index) => (
              <div key={index}>
                <label
                  htmlFor={range.label}
                  className="flex w-full justify-between text-[14px] max-md:w-40"
                >
                  {range.label}
                  <input
                    type="checkbox"
                    onChange={() => props.toggleRange(index)}
                    id={range.label}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
