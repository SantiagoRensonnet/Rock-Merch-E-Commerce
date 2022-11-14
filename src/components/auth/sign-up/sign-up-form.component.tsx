import { useState, useEffect } from "react";
//Firebase
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";
//Formik
import { useFormik } from "formik";
import { signUpFormSchema } from "./sign-up-form.schema";

export default function SignUpForm() {
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
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpFormSchema,
    onSubmit: async (values) => {
      try {
        //check if user is already authenticated
        //create user document from what createAuthUserWithEmailAndPassword returns
        const userCredentials = await createAuthUserWithEmailAndPassword(
          values.email,
          values.password
        );
        const user = userCredentials?.user;

        if (user !== undefined) {
          await createUserDocumentFromAuth(user, {
            displayName: values.username,
          });
          resetForm();
        } else {
          console.log("user undefined");
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("auth/email-already-in-use")) {
          setServerError({
            type: "email in use",
            payload: getFieldProps("email").value,
            isSolved: false,
          });
        } else {
          console.log("user creation encountered an error", message);
        }
      }
    },
  });
  //Server errors update
  useEffect(() => {
    switch (serverError.type) {
      case "email in use":
        setServerError((prevState) => ({
          ...prevState,
          isSolved: values.email !== serverError.payload,
        }));
        break;

      default:
        break;
    }
  }, [values]);

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
            value={values.username}
            onBlur={handleBlur}
            className={
              errors.username && touched.username
                ? "form-input  border-red-700 text-red-400 focus:border-red-500"
                : "form-input"
            }
          />
          {errors.username && touched.username && (
            <span className="text-red-400">{errors.username}</span>
          )}

          <label htmlFor="username">Username</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder=" "
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            className={
              (errors.email && touched.email) ||
              (serverError.type === "email in use" && !serverError.isSolved)
                ? "form-input border-red-700 text-red-400 focus:border-red-500"
                : "form-input"
            }
          />
          {errors.email && touched.email && (
            <span className="text-red-400">{errors.email}</span>
          )}
          {!serverError.isSolved && (
            <span className="text-red-400">
              Cannot create user, email already in use
            </span>
          )}
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder=" "
            autoComplete="off"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? "form-input border-red-700 text-red-400 focus:border-red-500"
                : "form-input"
            }
          />
          {errors.password && touched.password && (
            <span className="text-red-400">{errors.password}</span>
          )}
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder=" "
            autoComplete="off"
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "form-input border-red-700 text-red-400 focus:border-red-500"
                : "form-input"
            }
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span className="text-red-400">{errors.confirmPassword}</span>
          )}
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className="input-group">
          <button type="submit" className="btn btn-purple">
            SIGN UP
          </button>
        </div>
      </form>
    </article>
  );
}
