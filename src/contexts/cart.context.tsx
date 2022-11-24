import { createContext, useState, useEffect } from "react";
import { CartItem, Product } from "./types.context";

interface Props {
  children: JSX.Element | JSX.Element[];
}
//helper functions
const addCartItem = (cartItems: Array<CartItem>, productToAdd: Product) => {
  //find if cartItems contains productToAdd
  const selectedItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //return new array with modified cartItems/new cart item
  if (selectedItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, qty: selectedItem.qty + 1 }
        : cartItem;
    });
  } else {
    return [...cartItems, { ...productToAdd, qty: 1 }];
  }
};

//store (context)
export const CartContext = createContext({});
//provider (component)
export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const addItemToCart = (productToAdd: Product) => {
    setCartItems((currentItems) => addCartItem(currentItems, productToAdd));
  };

  useEffect(() => {
    setCartCount(
      cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.qty,
        0
      )
    );
    setCartTotal(
      cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.qty,
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
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
