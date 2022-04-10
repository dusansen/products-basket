import { Nutrient } from "./Nutrient";

export interface Product {
  name: string
  nutrients: [Nutrient]
  price: number
  qty?: number
}
