//Redux
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
//Components
import { ItemMiniature } from "./item-miniature";

export const CartItems = () => {
  const cartItems = useSelector(selectCartItems);
  return (
    <section className="w-full flex flex-col">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item: any) => (
            <ItemMiniature key={item.id} {...item} />
          ))}
        </>
      ) : (
        <span className="font-normal self-center"> Your cart is empty </span>
      )}
    </section>
  );
};
