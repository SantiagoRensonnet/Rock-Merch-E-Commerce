import { CartAction, CartItem, Product } from "./cart.types";
import { addCartItem, removeCartItem, clearCartItem } from "./cart.uitls";

export const setShowCart = (value: boolean): CartAction => ({
  type: "cart/SET_SHOW_CART",
  payload: value,
});

export const addItemToCart = (
  cartItems: CartItem[],
  itemToAdd: CartItem | Product
): CartAction => ({
  type: "cart/UPDATE_CART_ITEMS",
  payload: addCartItem(cartItems, itemToAdd),
});

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartAction => ({
  type: "cart/UPDATE_CART_ITEMS",
  payload: removeCartItem(cartItems, itemToRemove),
});

export const clearItemFromCart = (
  cartItems: CartItem[],
  itemToClear: CartItem
): CartAction => ({
  type: "cart/UPDATE_CART_ITEMS",
  payload: clearCartItem(cartItems, itemToClear),
});
