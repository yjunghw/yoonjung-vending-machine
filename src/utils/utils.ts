import type { Beverage } from "../types/display";

export const getSumOfBeveragePrice = (beverages: Beverage[]) => {
  return beverages.reduce((partialSum, a) => partialSum + a.price, 0);
};
