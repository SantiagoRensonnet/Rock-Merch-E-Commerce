import { createContext, useState, useEffect } from "react";
import { CartItem, Product } from "./types.context";

interface Props {
  children: JSX.Element | JSX.Element[];
}
//helper functions
const addCartItem = (
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
const removeCartItem = (
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
const clearCartItem = (cartItems: Array<CartItem>, carItemToCLear: CartItem) =>
  cartItems.filter((item) => item.id !== carItemToCLear.id);

//store (context)
export const CartContext = createContext({});
//provider (component)
export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const addItemToCart = (productorItemToAdd: Product | CartItem) => {
    setCartItems((currentItems) =>
      addCartItem(currentItems, productorItemToAdd)
    );
  };
  const removeItemFromCart = (cartItemToRemove: CartItem) => {
    setCartItems((currentItems) =>
      removeCartItem(currentItems, cartItemToRemove)
    );
  };
  const clearItemFromCart = (cartItemToClear: CartItem) => {
    setCartItems((currentItems) =>
      clearCartItem(currentItems, cartItemToClear)
    );
  };

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
    );
    setCartTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.qty,
        0
      )
    );
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
