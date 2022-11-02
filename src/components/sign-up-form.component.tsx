import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  //Event Handlers
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    //client side data verification
    var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!username) {
      console.log("Please enter username");
      return;
    }
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
    if (!confirmPassword) {
      console.log("Please enter confirmation password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const userCredentials = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredentials?.user;

      if (user !== undefined) {
        const userDocRef = await createUserDocumentFromAuth(user, {
          displayName: username,
        });
        resetFormFields();
        alert("usuario creado");
      } else {
        console.log("user undefined");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("auth/email-already-in-use")) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", message);
      }
    }

    //check if user is already authenticated
    //create user document from what createAuthUserWithEmailAndPassword returns
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <article className="flex flex-col w-80  justify-between items-center border text-slate-100">
      <h1 className="m font-openSans font-semibold text-2xl">
        I do not have an account
      </h1>
      <h2 className="mb-6 font-openSans text-lg">
        Sign up with your email and password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="sign-up-form">
          <div className="input-group">
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder=" "
              onChange={handleChange}
              value={username}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder=" "
              onChange={handleChange}
              value={email}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder=" "
              autoComplete="off"
              onChange={handleChange}
              value={password}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder=" "
              autoComplete="off"
              onChange={handleChange}
              value={confirmPassword}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div className="input-group">
            <button
              type="submit"
              className="text-slate-100 bg-indigo-700 hover:bg-slate-100 hover:text-indigo-800
             border border-transparent hover:border-indigo-700
              focus:ring-1 focus:ring-indigo-300  
              font-jost italic font-normal text-sm text-center
             w-full sm:w-auto px-5 py-2.5 rounded-sm  "
            >
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </article>
  );
}
