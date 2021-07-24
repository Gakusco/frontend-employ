import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TextError } from "../../component/TextError";
import { businessValidation } from "../../schema/schemas";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { saveBusiness, updateBusiness } from "../../actions/business";
import { useEffect, useState } from "react";
import { EndTransaction } from '../../component/EndTransaction';

interface FormBusiness {
  name: string;
  description: string;
  email: string;
}

export const SAddBusinessScreen = () => {
  const { activeBusiness, errors } = useSelector(
    (state: RootState) => state.business
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    email: "",
  });

  const onSubmit = (
    values: FormBusiness,
    { setSubmitting }: FormikHelpers<FormBusiness>
  ) => {
    if (activeBusiness) {
      dispatch(
        updateBusiness({
          aboutUs: values.description,
          name: values.name,
          email: values.email,
          jobOfferList: [],
          id: activeBusiness.id,
          enable: true,
        })
      );
    } else {
      dispatch(
        saveBusiness({
          aboutUs: values.description,
          name: values.name,
          email: values.email,
          jobOfferList: [],
          enable: true,
          id: 0,
        })
      );
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (activeBusiness) {
      setInitialValues({
        name: activeBusiness.name,
        description: activeBusiness.aboutUs,
        email: activeBusiness.email,
      });
    }
  }, [activeBusiness]);

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "95%",
          minWidth: "240px",
          maxWidth: "900px",
        }}
      >
        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <ul>
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {activeBusiness ? (
            <h2>Actualizar empresa</h2>
          ) : (
            <h2>Agregar empresa</h2>
          )}
          <button
            className="btn btn-success"
            onClick={() => history.push("/business")}
          >
            Regresar
          </button>
        </div>
        <hr />
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={businessValidation}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <div className="form-row">
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="name">Nombre</label>
                    <Field className="form-control" name="name" type="text" />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="description">Descripción</label>
                    <Field
                      name="description"
                      type="text"
                      className="form-control"
                      component="textarea"
                    />
                    <ErrorMessage name="description" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="email">Correo</label>
                    <Field className="form-control" name="email" type="text" />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-4">
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100"
                      disabled={
                        !(formik.dirty && formik.isValid) || formik.isSubmitting
                      }
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
