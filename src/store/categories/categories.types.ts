export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageXOffset?: string;
  imageYOffset?: string;
}
//Categories Types
interface Category {
  title: string;
  cover: string;
  items: Array<Product>;
  imageXOffset?: string;
  imageYOffset?: string;
}
export type Categories = Array<Category>;

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
};
