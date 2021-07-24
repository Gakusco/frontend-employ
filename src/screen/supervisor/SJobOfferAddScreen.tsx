import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router-dom";
import { OfferJobRQ } from "../../interface/request";
import { FormikHelpers, Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { TextError } from "../../component/TextError";
import { jobOfferValidation } from "../../schema/schemas";
import dayjs from "dayjs";
import { NoMatch } from '../../component/NoMatch';
import { EndTransaction } from '../../component/EndTransaction';
import {
  updateJobOfferSuper,
  saveJobOfferSuper,
} from "../../actions/jobOfferSuper";

export const SJobOfferAddScreen = () => {
  const { activeBusiness } = useSelector((state: RootState) => state.business);
  const { activeJobOffer, errors } = useSelector(
    (state: RootState) => state.jobOfferSuper
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState<OfferJobRQ>({
    contractPeriod: "",
    requirements: "",
    salary: 0,
    responsabilities: "",
    descriptionOffer: "",
    validDate: "",
    initWorkingDayTime: "",
    endWorkingDayTime: "",
    position: "",
    vacancyNumbers: 0,
  });

  const onSubmit = (
    values: OfferJobRQ,
    { setSubmitting }: FormikHelpers<OfferJobRQ>
  ) => {
    if (activeJobOffer) {
      dispatch(
        updateJobOfferSuper({
          contractPeriod: values.contractPeriod,
          requirements: values.requirements,
          salary: values.salary,
          responsabilities: values.responsabilities,
          descriptionOffer: values.descriptionOffer,
          validDate: values.validDate,
          initWorkingDayTime: values.initWorkingDayTime,
          endWorkingDayTime: values.endWorkingDayTime,
          position: values.position,
          vacancyNumbers: values.vacancyNumbers,
          id: activeJobOffer?.id ?? 0,
        })
      );
    } else {
      dispatch(
        saveJobOfferSuper(
          {
            contractPeriod: values.contractPeriod,
            requirements: values.requirements,
            salary: values.salary,
            responsabilities: values.responsabilities,
            descriptionOffer: values.descriptionOffer,
            validDate: values.validDate,
            initWorkingDayTime: values.initWorkingDayTime,
            endWorkingDayTime: values.endWorkingDayTime,
            position: values.position,
            vacancyNumbers: values.vacancyNumbers,
          },
          activeBusiness?.id ?? 0
        )
      );
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (activeJobOffer) {
      setInitialValues({
        contractPeriod: activeJobOffer.contractPeriod,
        requirements: activeJobOffer.requirements,
        salary: activeJobOffer.salary,
        responsabilities: activeJobOffer.responsabilities,
        descriptionOffer: activeJobOffer.descriptionOffer,
        validDate: activeJobOffer.validDate,
        initWorkingDayTime: activeJobOffer.initWorkingDayTime,
        endWorkingDayTime: activeJobOffer.endWorkingDayTime,
        position: activeJobOffer.position,
        vacancyNumbers: activeJobOffer.vacancyNumbers,
      });
    }
  }, [activeJobOffer]);

  if (!activeBusiness) {
    return <EndTransaction />
  }

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
          {activeJobOffer ? (
            <h2>Actualizar oferta de trabajo</h2>
          ) : (
            <h2>Agregar oferta de trabajo</h2>
          )}
          <button className="btn btn-success" onClick={() => history.goBack()}>
            Regresar
          </button>
        </div>
        <hr />
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={jobOfferValidation}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <div className="form-row">
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="responsabilities">Título oferta</label>
                    <Field
                      className="form-control"
                      name="responsabilities"
                      type="text"
                      placeholder="Profesor general básica"
                    />
                    <ErrorMessage name="responsabilities" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="contractPeriod">Periodo del contrato</label>
                    <Field
                      className="form-control"
                      name="contractPeriod"
                      type="text"
                      placeholder="2 años, indefinido"
                    />
                    <ErrorMessage name="contractPeriod" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="requirements">Requerimientos</label>
                    <Field
                      className="form-control"
                      name="requirements"
                      type="text"
                      placeholder="conocimientos en java y mysql"
                    />
                    <ErrorMessage name="requirements" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="descriptionOffer">Descripción</label>
                    <Field
                      name="descriptionOffer"
                      type="text"
                      className="form-control"
                      component="textarea"
                    />
                    <ErrorMessage
                      name="descriptionOffer"
                      component={TextError}
                    />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="salary">Salario</label>
                    <Field
                      className="form-control"
                      name="salary"
                      type="number"
                      placeholder="1000000"
                    />
                    <ErrorMessage name="salary" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="validDate">Validez de la oferta</label>
                    <Field
                      className="form-control"
                      name="validDate"
                      type="date"
                      min={dayjs().format("YYYY-MM-DD")}
                    />
                    <ErrorMessage name="validDate" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="initWorkingDayTime">Inicio horario laboral</label>
                    <Field
                      className="form-control"
                      name="initWorkingDayTime"
                      type="text"
                      placeholder="09:00"
                    />
                    <ErrorMessage name="initWorkingDayTime" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="endWorkingDayTime">Término horario laboral</label>
                    <Field
                      className="form-control"
                      name="endWorkingDayTime"
                      type="text"
                      placeholder="18:00"
                    />
                    <ErrorMessage name="endWorkingDayTime" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="position">Cargo</label>
                    <Field
                      className="form-control"
                      name="position"
                      type="text"
                      placeholder="Programador junior"
                    />
                    <ErrorMessage name="position" component={TextError} />
                  </div>
                  <div className="form-group col-12 mb-2">
                    <label htmlFor="vacancyNumbers">°N Vacantes</label>
                    <Field
                      className="form-control"
                      name="vacancyNumbers"
                      type="number"
                    />
                    <ErrorMessage name="vacancyNumbers" component={TextError} />
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
