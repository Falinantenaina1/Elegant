export type UserAddress = {
  street: string;
  city: string;
  postalCode: number;
  country: string;
};
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "customer";
  address: UserAddress;
}

export type Review = {
  user: string;
  rating: number;
  comment?: string;
};

export interface Product {
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
}

export type PriceRange = {
  label: string;
  min: number;
  max: number;
};

type SignUpDataType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordVerification: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type UpdateUserDataType = {
  firstname: string | undefined;
  lastname: string | undefined;
  oldPassword: string;
  newPassword: string;
  newConfirmation: string;
};

export interface UserStore {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  isCheckingAuth: boolean;
  isShowingAuth: boolean;
  setShowAuth: (bool: boolean) => void;
  signup: (signupData: SignUpDataType) => void;
  login: (loginData: LoginDataType) => void;
  logout: () => void;
  checkAuth: () => void;
  updateUser: (updateUserData: UpdateUserDataType) => void;
  updateAddress: (updateAddressData: UserAddress) => void;
}

export interface ProductStore {
  products: Product[];
  loading: boolean;
  isGettingProduct: boolean;
  getAllProduct: () => void;
  createProduct: (formData: FormData) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
}

export type productWithQuanity = Product & { quantity: number };

type ShippingOption = {
  id: string;
  label: string;
  costFixed?: number;
  costPercent?: number;
};

export type CartStoreType = {
  carts: productWithQuanity[];
  shippingOptions: ShippingOption[];
  selectedShippingId: string;

  addItem: (product: Product) => void;
  removeItem: (product: Product) => void;
  increase: (id: Product["_id"]) => void;
  decrease: (product: Product["_id"]) => void;
  clearCart: () => void;
  selectShipping: (shippingId: ShippingOption["id"]) => void;

  subTotal: () => number;
  countItems: () => number;
  shippingCost: () => number;
  total: () => number;
};

type item = {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
};

type Order = {
  _id: string;
  items: item[];
  totalAmount: number;
  status: string;
  shippingType: "BASIC" | "EXPRESS" | "PICKUP";
  customer: User["id"];
  createdAt: Date;
  shippingAdress: User["address"];
};

type CreateOrderDataType = {
  carts: productWithQuanity[];
  totalAmount: number;
  shippingType: string;
  shippingAdress: UserAddress;
};

export interface OrderStoreType {
  order: Order | null;

  allOrders: Order[];

  loading: boolean;

  createOrder: (CreateOrderData: CreateOrderDataType) => void;

  getAllorder: () => void;

  getUserOrder: () => void;

  clearOrder: () => void;
}
