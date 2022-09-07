import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export default function Login() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div className="my-auto">
      <h1 className="text-slate-100">Login Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Pop Up</button>
    </div>
  );
}
