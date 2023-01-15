import { useNavigate } from "react-router-dom";
//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";

//Components
import { CartItems } from "./cart-items";

export const CartDropdown = (props: { style: string }) => {
  const { cartTotal, cartItems } = useContext(CartContext) as CartContextType;
  const navigate = useNavigate();

  return (
    <div className={props.style}>
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
        <button
          className="btn btn-black w-full mb-2 disabled:bg-neutral-800 disabled:text-neutral-100 disabled:cursor-not-allowed"
          disabled={cartItems.length === 0}
          onClick={() => {
            navigate("/checkout");
          }}
        >
          GO TO CHECKOUT
        </button>
      </div>
    </div>
  );
};
