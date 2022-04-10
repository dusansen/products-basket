import { Nutrient } from "./Nutrient";

export interface Config {
  currency: string
  tolerableUpperLimits: Nutrient[]
}