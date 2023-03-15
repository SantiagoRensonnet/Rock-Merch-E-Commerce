//Redux
import { useDispatch } from "react-redux";
import { setShowCart } from "../store/cart/cart.action";
//Components
import SignUpForm from "../components/auth/sign-up/sign-up-form.component";
import SignInForm from "../components/auth/sign-in/sign-in-form.component";

export default function Authentication() {
  const dispatch = useDispatch();
  return (
    <main
      className="main-container"
      onClick={() => {
        dispatch(setShowCart(false));
      }}
    >
      <section className="md:flex md:justify-between max-w-sm md:max-w-none w-8/12   md:w-11/12 lg:w-10/12 xl:w-9/12  2xl:w-7/12">
        <SignInForm />
        <SignUpForm />
      </section>
    </main>
  );
}
