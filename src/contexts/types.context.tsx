import { User } from "@firebase/auth";
import { Dispatch, SetStateAction } from "react";
//Object Types
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageYOffset?: string;
}
export interface CartItem extends Product {
  qty: number;
}
//Categories Types
export interface Category {
  title: string;
  cover: string;
  items: Array<Product>;
}

//Context Types
export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: (value: User | null) => void;
};
export type CategoriesContextType = {
  categories: Array<Category>;
  setCategories: (value: Array<Category>) => void;
};
export type CartContextType = {
  cartItems: Array<CartItem>;
  addItemToCart: (value: Product | CartItem) => void;
  removeItemFromCart: (value: CartItem) => void;
  clearItemFromCart: (value: CartItem) => void;
  cartCount: number;
  cartTotal: number;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
};
