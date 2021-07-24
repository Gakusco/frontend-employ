import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import BackgroundTie from "../assets/images/tie-background.jpg";
import Logo from "../assets/logo/logo.png";
import { TextError } from "../component/TextError";
import { cyanLight, orangeLight } from "../helpers/Constants";
import { LoginRQ } from "../request/loginRQ";
import { loginValidation } from "../schema/schemas";
import { login } from "../actions/auth";

const initialValues: LoginRQ = { username: "", password: "" };

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (
    values: LoginRQ,
    { setSubmitting }: FormikHelpers<LoginRQ>
  ) => {
    dispatch(login(values));
    setSubmitting(false);
  };

  const navigateLogin = () => {
    history.push("/auth/register");
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
          style={{
            backgroundColor: "white",
            width: "90%",
            padding: "30px",
            WebkitBoxShadow: "0px 7px 11px -10px #000000",
            boxShadow: "0px 7px 11px -10px #000000",
          }}
        >
          <RegisterContainerSmall>
            <div style={{ fontSize: 25 }}>¿Buscas empleo?</div>
            <button
              type="button"
              className="btn btn-danger"
              style={{ width: "90%", height: "50px", fontSize: 25 }}
              onClick={navigateLogin}
            >
              ¡ÚNETE!
            </button>
          </RegisterContainerSmall>
          <div style={{ width: "100%" }}>
            <img
              src={Logo}
              alt="logo portal de empleo"
              style={{ width: "100%" }}
            />
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
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-user" />
                          </span>
                          <Field
                            className={
                              formik.errors.username
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            name="username"
                            type="text"
                          />
                        </div>

                        <ErrorMessage name="username" component={TextError} />
                      </div>
                      <div className="form-group col-12 mb-4">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterContainer>
          <h2>¿Buscas empleo?</h2>
          <button
            type="button"
            className="btn btn-danger"
            style={{ width: "290px", height: "90px", fontSize: 35 }}
            onClick={navigateLogin}
          >
            ¡ÚNETE!
          </button>
        </RegisterContainer>
      </div>
    </div>
  );
};

const transparentCyan = `rgba(77, 255, 234, 0.85)`;

const RegisterContainer = styled.div`
  background-color: ${transparentCyan};
  width: 60%;
  height: 300px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  -webkit-box-shadow: 0px 7px 11px -10px #000000;
  box-shadow: 0px 7px 11px -10px #000000;

  @media screen and (max-width: 836px) {
    display: none;
  }
`;

const RegisterContainerSmall = styled.div`
  background-color: ${cyanLight};
  width: 100%;
  height: 150px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 836px) {
    display: none;
  }
`;
