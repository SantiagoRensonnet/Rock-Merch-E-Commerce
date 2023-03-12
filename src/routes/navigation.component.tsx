//Assets
import handLogo from "../assets/icons/hand.png";
//Libraries
import { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
//Components
import { CartIcon } from "../components/cart/cart-icon.component";
import { CartDropdown } from "../components/cart/cart-dropdown";
import ChoiceModal from "../components/modals/ChoiceModal";
//Context
import { UserContextType } from "../contexts/types.context";
import { CartContext } from "../contexts/cart.context";
import { CartContextType } from "../contexts/types.context";
//Hooks
import { useResize } from "../hooks/useResize";
//Firebase app
import { singOutUser, getUserData } from "../utils/firebase/firebase.utils";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  //modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //context init
  const { showCart } = useContext(CartContext) as CartContextType;

  const [retrigger, setRetrigger] = useState(false);
  const [userName, setUserName] = useState("");
  const isMobile = useResize();

  //Modal Handlers
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => await getUserData(currentUser);
    fetchUserData().then((response) => {
      if (
        response.state === "error" &&
        response.errorCode === "No such document!"
      ) {
        setRetrigger(true);
      } else {
        setRetrigger(false);
      }
      setUserName(response?.displayName);
    });
  }, [currentUser, retrigger]);
  return (
    <>
      <ChoiceModal
        description={"Do you want to logout?"}
        chooseYes={() => {
          singOutUser();
          closeModal();
        }}
        chooseNo={closeModal}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      {showCart && isMobile && (
        <CartDropdown style={"cart-dropdown-container--mobile"} />
      )}
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
            <span className="nav-link" onClick={() => openModal()}>
              LOG OUT
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              LOGIN
            </Link>
          )}
          <CartIcon />
          {showCart && !isMobile && (
            <CartDropdown style={"cart-dropdown-container--desktop"} />
          )}
        </nav>
        {userName && (
          <div
            className=" bg-neutral-300  w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => openModal()}
          >
            <span className="text-neutral-800 font-light font-jost text-xl">
              {userName.toUpperCase().slice(0, 1)}
            </span>
          </div>
        )}
      </header>

      <Outlet />
    </>
  );
};
export default Navigation;
