import shoppingIcon from "../../assets/images/shopping-bag.svg";
//Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartContextType } from "../../contexts/types.context";

export const CartIcon = () => {
  const { showCart, setShowCart, cartCount } = useContext(
    CartContext
  ) as CartContextType;
  return (
    <div
      className="nav-link relative top-1 flex justify-center items-end"
      onClick={() => setShowCart(!showCart)}
    >
      <img className="invert w-7 " src={shoppingIcon} alt="shopping-bag-icon" />
      <span className="absolute text-sm">{cartCount}</span>
    </div>
  );
};
