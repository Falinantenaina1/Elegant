export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "customer";
};

export type Review = {
  user: string;
  rating: number;
  comment?: string;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  color?: string;
  averageRating: number;
  reviews: Review[];
  imageUrl: string;
  isFeatured: boolean;
  price: number;
  category: string;
};
