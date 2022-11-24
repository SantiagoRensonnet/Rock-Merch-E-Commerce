//Assets
import handLogo from "../assets/images/hand.png";
//Libraries
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
//Components
import { CartIcon } from "../components/cart/cart-icon.component";
import { CartDropdown } from "../components/cart/cart-dropdown";
//Context
import { UserContext } from "../contexts/user.context";
import { UserContextType } from "../contexts/types.context";
import { CartContext } from "../contexts/cart.context";
import { CartContextType } from "../contexts/types.context";
//Firebase app
import { singOutUser } from "../utils/firebase/firebase.utils";

const Navigation = () => {
  //context init
  const { currentUser } = useContext(UserContext) as UserContextType;
  const { showCart } = useContext(CartContext) as CartContextType;

  return (
    <>
      <header className="navigation">
        <Link to="">
          <img
            className="w-6 sm:w-7 opacity-70 transition-all ease-out duration-500
            hover:opacity-100 hover:duration-500"
            src={handLogo}
            alt="home-link-icon"
          />
        </Link>
        <nav className="relative  flex  items-baseline  justify-between text-base font-medium sm:text-lg">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={singOutUser}>
              LOG OUT
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              LOGIN
            </Link>
          )}
          <CartIcon />
          {showCart && <CartDropdown />}
        </nav>
      </header>

      <Outlet />
    </>
  );
};
export default Navigation;
