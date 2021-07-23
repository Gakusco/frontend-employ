import * as yup from "yup";

export const loginValidation = yup.object({
  username: yup.string().required("El usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export const registerValidation = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  run: yup
    .string()
    .required("El run es requerido")
    .matches(
      new RegExp("[\\d]{1,2}[.][\\d]{3}[.][\\d]{3}[-][\\d|k|K]"),
      "formato: 14.234.345-k"
    ),
  email: yup
    .string()
    .required("El correo es requerido")
    .matches(
      new RegExp(
        "[a-zA-Z0-9.!%#&$'*+/^_-]{1,20}[@][a-zA-Z0-9-]{1,20}[.][a-z]{1,4}"
      ),
      "formato: jmartin@gmail.com"
    ),
  dateOfBirth: yup.string().required("La fecha de nacimiento es requerida"),
  curriculumVitae: yup.string().required("El curriculum es requerido"),
  phoneNumber: yup
    .string()
    .required("El número de teléfono es requerido")
    .matches(new RegExp("[+][\\d]{11}"), "Formato: +56934231287"),
  web: yup.string(),
  username: yup.string().required("El usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  passwordTwo: yup.string().required("La contraseña es requerida"),
});
