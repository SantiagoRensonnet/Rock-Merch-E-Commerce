//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";
//Components
import { ItemMiniature } from "./item-miniature";

export const CartItems = () => {
  const { cartItems } = useContext(CartContext) as CartContextType;
  return (
    <section className="w-full flex flex-col">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <ItemMiniature key={item.id} {...item} />
          ))}
        </>
      ) : (
        <span className="font-normal self-center"> Your cart is empty </span>
      )}
    </section>
  );
};
