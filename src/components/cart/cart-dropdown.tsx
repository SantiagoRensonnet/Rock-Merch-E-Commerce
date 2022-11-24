//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";
//Components
import { CartItems } from "./cart-items";

export const CartDropdown = () => {
  const { cartTotal } = useContext(CartContext) as CartContextType;
  return (
    <div className="cart-dropdown-container">
      <header className="mt-1">
        <h3 className="font-normal">SHOPPING LIST</h3>
      </header>
      <CartItems />
      <div className="w-full">
        {cartTotal > 0 && (
          <p>
            Total:$
            {cartTotal}
          </p>
        )}
        <button className="btn btn-black w-full mb-2">GO TO CHECKOUT</button>
      </div>
    </div>
  );
};
