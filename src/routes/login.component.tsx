//Firebase Utils
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
//Components
import SignUpForm from "../components/sign-up-form.component";

export default function Login() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <main className="main-container">
      <section className="my-auto">
        <button
          onClick={logGoogleUser}
          className="text-indigo-800 bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-indigo-300 font-medium rounded-sm 
          text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Sign In with Google Pop Up
        </button>
        <SignUpForm />
      </section>
    </main>
  );
}
