import * as yup from "yup";

const SUPPORTED_FORMATS = ["pdf"];

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
  phoneNumber: yup
    .string()
    .required("El número de teléfono es requerido")
    .matches(new RegExp("[+][\\d]{11}"), "Formato: +56934231287"),
  web: yup.string(),
  username: yup.string().required("El usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
  passwordTwo: yup.string().required("La contraseña es requerida"),
});

export const businessValidation = yup.object({
  name: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  email: yup
    .string()
    .required("El correo es requerido")
    .matches(
      new RegExp(
        "[a-zA-Z0-9.!%#&$'*+/^_-]{1,20}[@][a-zA-Z0-9-]{1,20}[.][a-z]{1,4}"
      ),
      "formato: jmartin@gmail.com"
    ),
});

export const jobOfferValidation = yup.object({
  contractPeriod: yup.string().required("El periodo del contrato es requerido"),
  requirements: yup.string().required("Los requerimientos son requeridos"),
  salary: yup.number().required("El salario es requerido"),
  responsabilities: yup
    .string()
    .required("Las responsabilidades son requeridas"),
  descriptionOffer: yup
    .string()
    .required("La descripción de la oferta es requerida"),
  validDate: yup.string().required("Se requiere una fecha"),
  initWorkingDayTime: yup
    .string()
    .required("La hora de inicio laboral es obligatoria")
    .matches(new RegExp("^([01]\\d|2[0-3]):?([0-5]\\d)$"), "formato: HH:MM"),
  endWorkingDayTime: yup
    .string()
    .required("La hora de término laboral es obligatoria")
    .matches(new RegExp("^([01]\\d|2[0-3]):?([0-5]\\d)$"), "formato: HH:MM"),
  position: yup.string().required("El cargo es requerido"),
  vacancyNumbers: yup.number().required("El número de vacantes es requerido"),
});
