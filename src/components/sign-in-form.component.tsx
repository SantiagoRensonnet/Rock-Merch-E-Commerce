import { useState } from "react";
//Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
//Firebase Utils
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  //form state management
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  //show password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  //auxiliary functions
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  //Event Handlers
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    //client side data verification
    var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email) {
      console.log("Please enter email");
      return;
    }
    if (regexEmail.test(email) === false) {
      console.log("Invalid Email Address");
      return;
    }
    if (!password) {
      console.log("Please enter password");
      return;
    }

    try {
      //check if user is already authenticated
      //create user document from what createAuthUserWithEmailAndPassword returns
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
      console.log(response);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("auth/user-not-found")) {
        alert("user not found");
      } else if (message.includes("auth/wrong-password")) {
        alert("wrong password");
      } else {
        console.log("user login encountered an error", message);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <article className="form-container  md:w-[25rem] lg:w-auto">
      <div className="self-start md:self-auto text-center ">
        <h1 className="font-openSansCondensed font-semibold self-start text-center text-2xl xl:text-3xl">
          I already have an account
        </h1>
        <h2 className="mb-6 font-openSansCondensed text-lg xl:text-xl">
          Sign in with your email and password
        </h2>
      </div>
      <form className="sign-in-form " onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            placeholder=" "
            onChange={handleChange}
            value={email}
            className="form-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="flex items-center relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="off"
              placeholder=" "
              onChange={handleChange}
              value={password}
              className="form-input w-full"
            />
            {passwordVisible && (
              <AiOutlineEyeInvisible
                style={{ position: "absolute", right: "0", cursor: "pointer" }}
                size="20"
                onClick={() => setPasswordVisible(false)}
              />
            )}
            {!passwordVisible && (
              <AiOutlineEye
                style={{ position: "absolute", right: "0", cursor: "pointer" }}
                size="20"
                onClick={() => setPasswordVisible(true)}
              />
            )}
          </div>
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-purple">
            SIGN IN
          </button>
          <button
            type="reset"
            onClick={signInWithGoogle}
            className="btn btn-red "
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </form>
    </article>
  );
};

export default SignInForm;
