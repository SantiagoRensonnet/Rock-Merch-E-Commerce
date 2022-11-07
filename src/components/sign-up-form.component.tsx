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
  //form state management
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
      //check if user is already authenticated
      //create user document from what createAuthUserWithEmailAndPassword returns
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
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <article className="form-container md:w-[17rem] lg:w-96">
      <div className="self-start md:self-auto text-center">
        <h1 className="font-openSansCondensed font-semibold text-2xl xl:text-3xl">
          I do not have an account
        </h1>
        <h2 className="mb-6 font-openSansCondensed text-lg xl:text-xl">
          Sign up with your email and password
        </h2>
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="username"
            autoComplete="off"
            placeholder=" "
            onChange={handleChange}
            value={username}
            className="form-input"
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
            className="form-input"
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
            className="form-input"
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
            className="form-input"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="input-group">
          <button className="btn btn-purple">SIGN UP</button>
        </div>
      </form>
    </article>
  );
}
