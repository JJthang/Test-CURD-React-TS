import * as yup from "yup";

export const schema = yup.object({
  id: yup
    .number()
    .min(0, "ID must be greater than or equal to 0")
    .required("ID is required"),

  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  address: yup.string().trim().required("Address is required"),

  dateOfBirth: yup
    .date()
    .typeError("Invalid date of birth")
    .required("Date of birth is required"),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
});
