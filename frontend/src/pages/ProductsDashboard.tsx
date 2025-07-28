import { Section } from "@/components/Section";
import { useProductStore } from "@/stores/useProductStore";
import type { Product } from "@/types";
import { Edit3, Star, Trash2 } from "lucide-react";

export const ProductsDashboard = ({ products }: { products: Product[] }) => {
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const toggleFeatured = useProductStore((s) => s.toggleFeatured);

  const handleDelete = (id: string) => {
    const isConfirm = confirm("Do you want to delete this product?");
    if (isConfirm) {
      deleteProduct(id);
    }
  };

  return (
    <Section>
      {products.length != 0 ? (
        <>
          <p className="text-center">
            There are {products.length} product in the dashboard
          </p>
          <table className="mx-auto mt-2 table max-w-full table-fixed">
            <thead className="border">
              <tr className="">
                <th className="border">Product</th>
                <th className="border">Price</th>
                <th className="border">Featured</th>
                <th className="border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="gap-x-2px-2 border px-2 py-0.5">
                    <div className="flex items-center gap-x-2">
                      <img src={product.imageUrl} className="block size-10" />
                      <div className="flex flex-col justify-between">
                        <span>{product.name}</span>
                        <span className="text-black/40">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border px-2 py-0.5">${product.price}</td>
                  <td className="border px-2 py-0.5">
                    <div className="mx-auto flex size-6 items-center justify-center rounded-full">
                      <Star
                        className={`size-6 cursor-pointer ${product.isFeatured ? "fill-yellow hover:fill-white hover:stroke-1" : "hover:fill-yellow hover:stroke-0"}`}
                        strokeWidth={product.isFeatured ? 0 : 1}
                        onClick={() => toggleFeatured(product._id)}
                      />
                    </div>
                  </td>
                  <td className="border px-2 py-0.5">
                    <div className="mx-auto flex size-6 w-full items-center gap-x-1">
                      <Edit3
                        className="size-5.5 cursor-pointer hover:fill-yellow-500"
                        onClick={() => handleDelete(product._id)}
                        strokeWidth={1}
                      />
                      <Trash2
                        className="size-5.5 cursor-pointer hover:fill-red-500"
                        onClick={() => handleDelete(product._id)}
                        strokeWidth={1}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-center">There is no products</div>
      )}
    </Section>
  );
};
