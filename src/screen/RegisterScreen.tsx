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
import { uploadFile } from "../services/uploadFile";

interface registerForm {
  name: string;
  lastName: string;
  run: string;
  dateOfBirth: string;
  email: string;
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
  const [curriculumVitae, setCurriculumVitae] = useState<File>();

  const onSubmit = async (
    values: registerForm,
    { setSubmitting }: FormikHelpers<registerForm>
  ) => {
    if (curriculumVitae) {
      const request: RegisterRQ = {
        curriculumVitae: curriculumVitae.name ?? "",
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
      if (resp) {
        const respUpload = await uploadFile(curriculumVitae);
        if (respUpload) {
          console.log("curriculum se subio con éxito");
        } else {
          Swal.fire("Cuidado", "Debe ser PDF", "error");
        }
      }
      setSubmitting(false);
      if (resp && resp === 201) {
        Swal.fire("Éxito", "Registro completado con éxito");
        setErrors(undefined);
        history.goBack();
      } else if (resp && typeof resp !== "number") {
        setErrors(resp);
      }
    } else {
      Swal.fire("Cuidado", "debe adjuntar un pdf");
    }
  };

  return (
    <div
      style={{
        backgroundColor: orangeLight,
        display: "flex",
        height: "100vh",
        width: "100vw",
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={Logo}
              alt="logo portal de empleo"
              style={{ width: "20%" }}
            />
            <button className="btn btn-info" onClick={() => history.goBack()}>
              Regresar
            </button>
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
            <div className="form-group col-12 mb-2">
              <label htmlFor="curriculumVitae">Curriculum vitae</label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="curriculumVitae"
                  onChange={(value) =>
                    setCurriculumVitae(
                      value.currentTarget.files?.item(0) ?? undefined
                    )
                  }
                  type="file"
                  placeholder="adjuntar currículum"
                />
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-file-pdf-o" />
                </span>
              </div>
            </div>
            {curriculumVitae && (
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
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-user" />
                            </span>
                            <Field
                              className={
                                formik.errors.name
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="name"
                              type="text"
                              placeholder="Danixa Estel"
                            />
                          </div>
                          <ErrorMessage name="name" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="lastName">Apellidos</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-user" />
                            </span>
                            <Field
                              className={
                                formik.errors.lastName
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="lastName"
                              type="text"
                              placeholder="Gutierrez Estel"
                            />
                          </div>
                          <ErrorMessage name="lastName" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="run">R.U.N</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-user" />
                            </span>
                            <Field
                              className={
                                formik.errors.run
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="run"
                              type="text"
                              placeholder="19.342.212-2"
                            />
                          </div>
                          <ErrorMessage name="run" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="dateOfBirth">
                            Fecha de nacimiento
                          </label>

                          <Field
                            className={
                              formik.errors.dateOfBirth
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name="dateOfBirth"
                            type="date"
                            max={mayorOfAge}
                            placeholder="22-09-2000"
                          />
                          <ErrorMessage
                            name="dateOfBirth"
                            component={TextError}
                          />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="email">Correo</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              @
                            </span>
                            <Field
                              className={
                                formik.errors.email
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="email"
                              type="text"
                              placeholder="correo@dominio.com"
                            />
                          </div>
                          <ErrorMessage name="email" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="phoneNumber">
                            Número de teléfono
                          </label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-mobile" />
                            </span>
                            <Field
                              className={
                                formik.errors.phoneNumber
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="phoneNumber"
                              type="text"
                              placeholder="+56934231234"
                            />
                          </div>
                          <ErrorMessage
                            name="phoneNumber"
                            component={TextError}
                          />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="web">web</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              www
                            </span>
                            <Field
                              className={
                                formik.errors.web
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="web"
                              type="text"
                              placeholder="www.misitioweb.com"
                            />
                          </div>
                          <ErrorMessage name="web" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="username">Usuario</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-user" />
                            </span>
                            <Field
                              className="form-control"
                              name="username"
                              type="text"
                            />
                          </div>
                          <ErrorMessage name="username" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="password">Contraseña</label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-shield" />
                            </span>
                            <Field
                              className={
                                formik.errors.password
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="password"
                              type="password"
                            />
                          </div>
                          <ErrorMessage name="password" component={TextError} />
                        </div>
                        <div className="form-group col-12 mb-2">
                          <label htmlFor="passwordTwo">
                            Repetir contraseña
                          </label>
                          <div className="input-group">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i className="fa fa-shield" />
                            </span>
                            <Field
                              className={
                                formik.errors.passwordTwo ||
                                (formik.values.password !==
                                  formik.values.passwordTwo &&
                                  formik.values.password !== "")
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              name="passwordTwo"
                              type="password"
                            />
                          </div>
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
                              formik.isSubmitting ||
                              formik.values.password !==
                                formik.values.passwordTwo
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
