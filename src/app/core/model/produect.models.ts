export interface GlobalRes {
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
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
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
export interface ProductRes extends GlobalRes {
  products: Product[];
}
export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number; // user id is 5
  totalProducts: number;
  totalQuantity: number;
}
export interface CartsRes extends GlobalRes {
  carts: Cart[];
}
