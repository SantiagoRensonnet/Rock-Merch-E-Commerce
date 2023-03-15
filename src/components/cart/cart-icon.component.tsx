import shoppingIcon from "../../assets/icons/shopping-bag.svg";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartCount,
  selectShowCart,
} from "../../store/cart/cart.selector";
import { setShowCart } from "../../store/cart/cart.action";

export const CartIcon = () => {
  const dispatch = useDispatch();
  const showCart = useSelector(selectShowCart);
  const cartCount = useSelector(selectCartCount);
  return (
    <div
      className="nav-link relative top-1 flex justify-center items-end"
      onClick={() => {
        dispatch(setShowCart(!showCart));
      }}
    >
      <img className="invert w-7 " src={shoppingIcon} alt="shopping-bag-icon" />
      <span className="absolute text-sm">{cartCount}</span>
    </div>
  );
};
