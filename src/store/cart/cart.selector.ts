import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);
export const selectShowCart = createSelector(
  [selectCartReducer],
  (cart) => cart.showCart
);
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems?.reduce((total: any, cartItem: any) => total + cartItem.qty, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems?.reduce(
    (total: any, cartItem: any) => total + cartItem.price * cartItem.qty,
    0
  )
);
