import { createContext, useReducer } from "react";
import { CartItem, Product } from "./types.context";
import { CartAction, CartState } from "./types.context";
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

//reducer
export const cartReducer = (state: CartState, action: CartAction) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    case "SET_IS_CART_OPEN":
      return {
        ...state,
        showCart: payload,
      };
    default: {
      console.log(`Unhandled type ${type} in userReducer`);
      return state;
    }
  }
};
const INITIAL_STATE = {
  cartItems: [] as CartItem[],
  cartCount: 0,
  cartTotal: 0,
  showCart: false,
};

//store (context)
export const CartContext = createContext({});
//provider (component)
export const CartProvider = ({ children }: Props) => {
  const [{ cartItems, cartCount, cartTotal, showCart }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );
  const updateCart = (newCart: CartItem[]) => {
    const payload = {
      cartItems: newCart,
      cartCount: newCart.reduce((total, cartItem) => total + cartItem.qty, 0),
      cartTotal: newCart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.qty,
        0
      ),
    };
    dispatch({
      type: "UPDATE_CART_ITEMS",
      payload,
    });
  };
  const addItemToCart = (itemToAdd: CartItem) => {
    const newCart = addCartItem(cartItems, itemToAdd);
    updateCart(newCart);
  };
  const removeItemFromCart = (cartItemToRemove: CartItem) => {
    const newCart = removeCartItem(cartItems, cartItemToRemove);
    updateCart(newCart);
  };
  const clearItemFromCart = (cartItemToClear: CartItem) => {
    const newCart = clearCartItem(cartItems, cartItemToClear);
    updateCart(newCart);
  };
  const setShowCart = (value: boolean) => {
    dispatch({
      type: "SET_IS_CART_OPEN",
      payload: value,
    });
  };

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
