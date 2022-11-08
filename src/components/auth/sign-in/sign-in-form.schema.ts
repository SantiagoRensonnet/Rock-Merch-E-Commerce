import * as yup from "yup";
const requiredMessage = "This is a required field";
export const signInFormSchema = yup.object().shape({
  email: yup.string().email().required(requiredMessage),
  password: yup.string().required(requiredMessage),
});
