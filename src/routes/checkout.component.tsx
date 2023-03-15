import { BuyList } from "../components/buy-list/buy-list.component";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../store/cart/cart.selector";
import { setShowCart } from "../store/cart/cart.action";
export default function CheckOut() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <main
      className="main-container justify-start text-xl text-neutral-100"
      onClick={() => {
        dispatch(setShowCart(false));
      }}
    >
      <h3>{cartItems.length > 0 ? "Review your bag" : "Your cart is empty"}</h3>
      <BuyList cartItems={cartItems} />
      <section className="checkout-section">
        {cartItems.length > 0 && (
          <h3 className="text-lg">TOTAL: ${cartTotal}</h3>
        )}
      </section>
    </main>
  );
}
