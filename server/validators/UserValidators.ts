import * as yup from "yup";

export const userRegisterSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("firstName_is_required")
    .max(50, "firstName_too_big"),
  lastName: yup
    .string()
    .required("lastName_is_required")
    .max(50, "lastName_too_big"),
  email: yup.string().required("email_is_required").email("invalid_email"),
  password: yup
    .string()
    .required("password_is_required")
    .min(5, "password_too_small"),
});
