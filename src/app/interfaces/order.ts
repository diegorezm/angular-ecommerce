import {Product} from "./product";

export interface Order {
  id: number;
  userId: number;
  products: Product[];
  total: number;
}
