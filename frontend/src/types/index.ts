export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "customer";
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  price: number;
  category: string;
};
