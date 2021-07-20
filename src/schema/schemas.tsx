import * as yup from 'yup';

export const loginValidation = yup.object({
  username: yup
    .string()
    .required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida')
});
