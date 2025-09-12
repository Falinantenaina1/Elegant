import { cn } from "@/lib/utils";
import { useProductStore } from "@/stores/useProductStore";
import { LoaderCircle } from "lucide-react";
import { type FormEvent } from "react";
import { Section } from "./Section";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const categories = [
  { name: "Select a category", value: "" },
  {
    name: "Headband",
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

export const CreateProduct = () => {
  const { createProduct, loading } = useProductStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    createProduct(formData);
    e.currentTarget.reset();
  };

  return (
    <Section>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-3">
        <div className="space-y-1">
          <Label htmlFor="image">Product Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Product Desciption</Label>
          <Textarea
            placeholder="Type here"
            required
            name="description"
            id="description"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="color">Product Color</Label>
          <Input
            type="text"
            name="color"
            id="color"
            placeholder="Type here"
            required
          />
        </div>

        <div className="flex items-center gap-x-1">
          <Label htmlFor="category">Category : </Label>
          <select
            name="category"
            id="category"
            className={cn(
              "border-input flex h-9 w-max min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            )}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Product Price</Label>
          <Input
            className="w-max"
            type="number"
            name="price"
            id="price"
            placeholder="0"
            min={0}
            step={0.01}
            required
          />
        </div>

        <Button type="submit" size={"lg"} disabled={loading}>
          {loading ? (
            <div className="flex animate-pulse items-center gap-x-1">
              <LoaderCircle className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            "ADD"
          )}
        </Button>
      </form>
    </Section>
  );
};
