import { Outlet, Link } from "react-router-dom";
import handLogo from "../assets/images/hand.png";
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link to="">
          <img
            className="w-7 opacity-70 transition-all ease-out duration-500
            hover:opacity-100 hover:duration-500"
            src={handLogo}
            alt="home-link-logo"
          />
        </Link>
        <div className="text-lg font-medium flex justify-between w-28 md:w-32">
          <Link
            className="opacity-70 transition-all ease-out duration-500 hover:opacity-100 hover:duration-500"
            to="/shop"
          >
            SHOP
          </Link>
          <Link
            className="opacity-70 transition-all ease-out duration-500 hover:opacity-100 hover:duration-500"
            to="/login"
          >
            LOGIN
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
};
export default Navigation;
