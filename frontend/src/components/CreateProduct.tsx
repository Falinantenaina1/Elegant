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
    <Section className="px-6 py-6 lg:px-10 xl:px-24 2xl:px-40">
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Product name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Description"
            required
            name="description"
            id="description"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            min={0}
            step={0.01}
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
          <Label htmlFor="image">Picture</Label>
          <Input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
          />
        </div>

        <Button type="submit" size={"lg"} className="w-full" disabled={loading}>
          {loading ? (
            <div className="flex animate-pulse items-center gap-x-1">
              <LoaderCircle className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Section>
  );
};
