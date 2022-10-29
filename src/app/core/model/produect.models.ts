export interface GlobalRes {
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: number;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface ProductRes extends GlobalRes {
  products: Product[];
}
export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number; // user id is 5
  totalProducts: number;
  totalQuantity: number;
}
export interface CartsRes extends GlobalRes {
  carts: Cart[];
}
