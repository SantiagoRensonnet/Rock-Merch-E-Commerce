import { CartItem } from "./cart.types";

export const CART_INITIAL_STATE = {
  cartItems: [] as CartItem[],
  showCart: false,
};
//reducer
export const cartReducer = (state: any = CART_INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "cart/UPDATE_CART_ITEMS":
      return {
        ...state,
        cartItems: payload,
      };
    case "cart/SET_SHOW_CART":
      return {
        ...state,
        showCart: payload,
      };
    default: {
      return state;
    }
  }
};
