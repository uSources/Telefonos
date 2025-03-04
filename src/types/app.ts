import { Product, ProductDetail as ProductDetailAPI } from "./api";

interface Spec {
  label: string;
  value: string;
}

export type Specs = Spec[];

export interface ProductDetail extends Omit<ProductDetailAPI, "specs"> {
  specs: Specs;
}

export interface CartItem extends Omit<Product, "basePrice" | "brand"> {
  price: number;
  storage: string;
  color: string;
}
