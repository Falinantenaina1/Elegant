import { FilterIcon } from "lucide-react";

const categories = ["All", "Headbands", "Earbuds", "Accessories"];

const ProductFilter = () => {
  return (
    <div>
      <h2 className="flex gap-x-1">
        <FilterIcon />
        <span className="font-bold">Filter</span>
      </h2>
      <div>
        <div>
          <h3 className="font-semibold uppercase">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <label
                htmlFor={category}
                className="block cursor-pointer hover:font-semibold hover:underline"
              >
                <input
                  type="radio"
                  name="categories"
                  value={category}
                  id={category}
                  className="hidden"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold uppercase">Price</h3>
          <div className="space-y-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
