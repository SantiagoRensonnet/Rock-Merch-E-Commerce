import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import handLogo from "../assets/images/hand.png";
//Firebase app
import { singOutUser } from "../utils/firebase/firebase.utils";
//Context
import { UserContext } from "../contexts/user.context";
import { UserContextType } from "../contexts/types.context";

const Navigation = () => {
  //context init
  const { currentUser } = useContext(UserContext) as UserContextType;

  return (
    <>
      <header className="navigation">
        <Link to="">
          <img
            className="w-6 sm:w-7 opacity-70 transition-all ease-out duration-500
            hover:opacity-100 hover:duration-500"
            src={handLogo}
            alt="home-link-logo"
          />
        </Link>
        <nav className="text-md font-medium sm:text-lg  flex justify-between ">
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
        </nav>
      </header>

      <Outlet />
    </>
  );
};
export default Navigation;
