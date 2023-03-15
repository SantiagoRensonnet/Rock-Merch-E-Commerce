import { useNavigate } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
import {
  selectCartTotal,
  selectCartItems,
} from "../../store/cart/cart.selector";

//Components
import { CartItems } from "./cart-items";

export const CartDropdown = (props: { style: string }) => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

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
