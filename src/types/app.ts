import { Phone, PhoneDetail as PhoneDetailAPI } from "./api";

interface Spec {
  label: string;
  value: string;
}

export type Specs = Spec[];

export interface PhoneDetail extends Omit<PhoneDetailAPI, "specs"> {
  specs: Specs;
}

export interface CartItem extends Omit<Phone, "basePrice" | "brand"> {
  price: number;
  storage: string;
  color: string;
}
