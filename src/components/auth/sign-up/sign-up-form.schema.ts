import * as yup from "yup";
const requiredMessage = "This is a required field";
export const signUpFormSchema = yup.object().shape({
  username: yup.string().required(requiredMessage).min(4),
  email: yup.string().email().required(requiredMessage),
  password: yup
    .string()
    .required(requiredMessage)
    .matches(
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$)/,
      "Must contain at least 8 characters, one uppercase, one lowercase and one number"
    ),
  confirmPassword: yup
    .string()
    .required(requiredMessage)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
