import { useState, useEffect } from "react";
//Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
//Firebase Utils
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase.utils";
//Formik
import { useFormik } from "formik";
import { signInFormSchema } from "./sign-in-form.schema";

const SignInForm = () => {
  //show password state
  const [passwordVisible, setPasswordVisible] = useState(false);
  //auxiliary functions
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  //Server error management
  const [serverError, setServerError] = useState({
    type: "",
    payload: "",
    isSolved: true,
  });
  //Event Handlers
  //Formik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    getFieldProps,
    values,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInFormSchema,
    onSubmit: async (values) => {
      try {
        //check if user is already authenticated
        //create user document from what createAuthUserWithEmailAndPassword returns
        await signInAuthUserWithEmailAndPassword(values.email, values.password);

        resetForm();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("auth/user-not-found")) {
          setServerError({
            type: "user not found",
            payload: getFieldProps("email").value,
            isSolved: false,
          });
        } else if (message.includes("auth/wrong-password")) {
          setServerError({
            type: "wrong password",
            payload: getFieldProps("password").value,
            isSolved: false,
          });
        } else {
          console.log("user login encountered an error", message);
        }
      }
    },
  });
  //Server errors update
  useEffect(() => {
    switch (serverError.type) {
      case "user not found":
        setServerError((prevState) => ({
          ...prevState,
          isSolved: values.email !== serverError.payload,
        }));
        break;
      case "wrong password":
        if (!serverError.isSolved) {
          if (values.password !== serverError.payload) {
            setServerError({
              type: "wrong password",
              payload: "",
              isSolved: true,
            });
          }
        }
        break;

      default:
        break;
    }
  }, [values]);
  return (
    <article className="form-container  md:w-[25rem] lg:w-auto">
      <div className="self-start md:self-auto md:text-center">
        <h1 className="font-openSansCondensed font-semibold  text-2xl xl:text-3xl">
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
            value={values.email}
            onBlur={handleBlur}
            className={
              (errors.email && touched.email) ||
              (serverError.type === "user not found" && !serverError.isSolved)
                ? "form-input border-red-700 text-red-400 focus:border-red-500"
                : "form-input"
            }
          />
          {errors.email && touched.email && (
            <span className="text-red-400">{errors.email}</span>
          )}
          {serverError.type === "user not found" && !serverError.isSolved && (
            <span className="text-red-400">User not found</span>
          )}
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
              value={values.password}
              onBlur={handleBlur}
              className={
                (errors.password && touched.password) ||
                (serverError.type === "wrong password" && !serverError.isSolved)
                  ? "form-input w-full border-red-700 text-red-400 focus:border-red-500"
                  : "form-input w-full"
              }
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
          {errors.password && touched.password && (
            <span className="text-red-400">{errors.password}</span>
          )}
          {serverError.type === "wrong password" && !serverError.isSolved && (
            <span className="text-red-400">Wrong password</span>
          )}
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
