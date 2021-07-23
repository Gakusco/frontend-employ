import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/logo/logo.png";
import { TextError } from "../component/TextError";
import { orangeLight } from "../helpers/Constants";
import { RegisterRQ } from "../request/loginRQ";
import { registerValidation } from "../schema/schemas";
import { registerPostulant } from "../services/postulantService";

interface registerForm {
  name: string;
  lastName: string;
  run: string;
  dateOfBirth: string;
  email: string;
  curriculumVitae: string;
  phoneNumber: string;
  web: string;
  username: string;
  password: string;
  passwordTwo: string;
}

const initialValues: registerForm = {
  name: "",
  lastName: "",
  run: "",
  dateOfBirth: "",
  email: "",
  curriculumVitae: "",
  phoneNumber: "",
  web: "",
  username: "",
  password: "",
  passwordTwo: "",
};

export const RegisterScreen = () => {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>();

  const mayorOfAge = dayjs().subtract(18, "year").format("YYYY-MM-DD");

  const onSubmit = async (
    values: registerForm,
    { setSubmitting }: FormikHelpers<registerForm>
  ) => {
    const request: RegisterRQ = {
      curriculumVitae: values.curriculumVitae,
      dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
      lastName: values.lastName,
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      run: values.run,
      web: values.web,
      credential: { username: values.username, password: values.password },
    };
    const resp = await registerPostulant(request);
    setSubmitting(false);
    if (resp && resp === 201) {
      Swal.fire("Éxito", "Registro completado con éxito");
      setErrors(undefined);
      history.goBack();
    } else if (resp && typeof resp !== "number") {
      setErrors(resp);
    }
  };

  return (
    <div
      style={{
        backgroundColor: orangeLight,
        display: "flex",
        height: "100%",
        width: "100%",
        maxHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: orangeLight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          margin: "20px",
          minWidth: "300px",
          maxWidth: "400px",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            padding: "20px",
            WebkitBoxShadow: "0px 7px 11px -10px #000000",
            boxShadow: "0px 7px 11px -10px #000000",
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              src={Logo}
              alt="logo portal de empleo"
              style={{ width: "20%" }}
            />
          </div>
          <div>
            {errors && (
              <div className="alert alert-danger" role="alert">
                <ul>
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={registerValidation}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="name">Nombre</label>
                        <Field
                          className="form-control"
                          name="name"
                          type="text"
                        />
                        <ErrorMessage name="name" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="lastName">Apellidos</label>
                        <Field
                          className="form-control"
                          name="lastName"
                          type="text"
                        />
                        <ErrorMessage name="lastName" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="run">R.U.N</label>
                        <Field
                          className="form-control"
                          name="run"
                          type="text"
                        />
                        <ErrorMessage name="run" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                        <Field
                          className="form-control"
                          name="dateOfBirth"
                          type="date"
                          max={mayorOfAge}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component={TextError}
                        />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="email">Correo</label>
                        <Field
                          className="form-control"
                          name="email"
                          type="text"
                        />
                        <ErrorMessage name="email" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="curriculumVitae">
                          Curriculum vitae
                        </label>
                        <Field
                          className="form-control"
                          name="curriculumVitae"
                          type="text"
                        />
                        <ErrorMessage
                          name="curriculumVitae"
                          component={TextError}
                        />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="phoneNumber">Número de teléfono</label>
                        <Field
                          className="form-control"
                          name="phoneNumber"
                          type="text"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component={TextError}
                        />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="web">web</label>
                        <Field
                          className="form-control"
                          name="web"
                          type="text"
                        />
                        <ErrorMessage name="web" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="username">Usuario</label>
                        <Field
                          className="form-control"
                          name="username"
                          type="text"
                        />
                        <ErrorMessage name="username" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="password">Contraseña</label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        <ErrorMessage name="password" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="passwordTwo">Repetir contraseña</label>
                        <Field
                          className="form-control"
                          name="passwordTwo"
                          type="password"
                        />
                        <ErrorMessage
                          name="passwordTwo"
                          component={TextError}
                        />
                      </div>
                      <div className="form-group col-12 mb-4">
                        <button
                          type="submit"
                          className="btn btn-outline-primary w-100"
                          disabled={
                            !(formik.dirty && formik.isValid) ||
                            formik.isSubmitting
                          }
                        >
                          Registrar
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
