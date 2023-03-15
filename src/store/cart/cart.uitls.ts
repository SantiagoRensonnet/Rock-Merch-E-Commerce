import { CartItem, Product } from "./cart.types";
export const addCartItem = (
  cartItems: Array<CartItem>,
  productorItemToAdd: Product | CartItem
) => {
  //find if cartItems contains productToAdd
  const selectedItem = cartItems.find(
    (cartItem) => cartItem.id === productorItemToAdd.id
  );
  //return new array with modified cartItems/new cart item
  if (selectedItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productorItemToAdd.id
        ? { ...cartItem, qty: selectedItem.qty + 1 }
        : cartItem;
    });
  } else {
    return [...cartItems, { ...productorItemToAdd, qty: 1 }];
  }
};

export const removeCartItem = (
  cartItems: Array<CartItem>,
  carItemToRemove: CartItem
) => {
  const itemToRemove = cartItems.find(
    (cartItem) => cartItem.id === carItemToRemove.id
  );
  if (itemToRemove) {
    if (itemToRemove.qty === 1) {
      return cartItems.filter((item) => item.id !== itemToRemove.id);
    } else if (itemToRemove.qty > 1) {
      return cartItems.map((item) =>
        item.id === itemToRemove.id ? { ...item, qty: item.qty - 1 } : item
      );
    } else {
      return cartItems;
    }
  } else {
    return cartItems;
  }
};

export const clearCartItem = (
  cartItems: Array<CartItem>,
  carItemToCLear: CartItem
) => cartItems.filter((item) => item.id !== carItemToCLear.id);
