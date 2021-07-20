import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { TextError } from "../component/TextError";
import { loginValidation } from "../schema/schemas";
import { LoginRQ } from "../request/loginRQ";
import BackgroundTie from "../assets/images/tie-background.jpg";
import { constants } from "buffer";
import { orangeLight } from "../helpers/Constants";
import Logo from "../assets/logo/logo.png";
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

const initialValues: LoginRQ = { username: "", password: "" };

export const HomeScreen = () => {

  const dispatch = useDispatch();

  const onSubmit = (
    values: LoginRQ,
    { setSubmitting }: FormikHelpers<LoginRQ>
  ) => {
    dispatch(login(values));
    setSubmitting(false);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundTie})`,
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          backgroundColor: orangeLight,
          opacity: 0.9,
          display: "flex",
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "300px",
          maxWidth: "400px",
        }}
      >
        <div
          style={{ backgroundColor: "white", width: "90%", padding: "30px" }}
        >
          <div style={{width: '100%'}}>
            <img src={Logo} alt="logo portal de empleo" style={{width: '100%'}}/>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidation}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form onSubmit={formik.handleSubmit} className="form-login">
                    <div className="form-row">
                      <div className="form-group col-12 mb-2">
                        <label htmlFor="name">Usuario</label>
                        <Field
                          className="form-control"
                          name="username"
                          type="text"
                        />
                        <ErrorMessage name="username" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-4">
                        <label htmlFor="password">Contraseña</label>
                        <Field
                          className="form-control"
                          name="password"
                          type="password"
                        />
                        <ErrorMessage name="password" component={TextError} />
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
                          Iniciar sesión
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
