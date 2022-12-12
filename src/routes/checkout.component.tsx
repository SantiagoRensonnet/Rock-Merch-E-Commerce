import { BuyList } from "../components/buy-list/buy-list.component";
//Context
import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";
import { CartContextType } from "../contexts/types.context";

export default function CheckOut() {
  const { cartItems, cartTotal, setShowCart } = useContext(
    CartContext
  ) as CartContextType;
  return (
    <main
      className="main-container justify-start text-xl text-neutral-100"
      onClick={() => {
        setShowCart(false);
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
