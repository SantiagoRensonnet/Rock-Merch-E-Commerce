//Object Types
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageXOffset?: string;
  imageYOffset?: string;
}
export interface CartItem extends Product {
  qty: number;
}
//Actions and Reducers
export type CartAction =
  | {
      type: "cart/UPDATE_CART_ITEMS";
      payload: CartItem[];
    }
  | { type: "cart/SET_SHOW_CART"; payload: boolean };

export type CartState = {
  cartItems: Array<CartItem>;
  showCart: boolean;
};
