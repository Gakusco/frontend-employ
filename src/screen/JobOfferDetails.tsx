import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SiCashapp } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { listJobOffer, postulate } from "../actions/joboffer";
import { JobOffer } from "../response/response";
import { RootState } from "../store/store";

export const JobOfferDetails = () => {
  const dispatch = useDispatch();
  const { data, navigateMyApplications } = useSelector(
    (state: RootState) => state.joboffer
  );
  const { data: auth } = useSelector((state: RootState) => state.auth);
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  useEffect(() => {
    dispatch(listJobOffer());
  }, []);

  useEffect(() => {
    if (data) {
      setJobOffer(
        data?.offerList.find((offer) => offer.id === parseInt(id, 10))
      );
    }
  }, [data]);

  useEffect(() => {
    if (navigateMyApplications && navigateMyApplications === true) {
      history.push("/my-applications");
    }
  }, [navigateMyApplications]);

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
          width: "95%",
          minWidth: "240px",
          maxWidth: "900px",
        }}
      >
        {jobOffer && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h2>{jobOffer.responsabilities}</h2>
              <button
                className="btn btn-info"
                onClick={() => history.replace("/job-offers")}
              >
                Regresar
              </button>
            </div>
            <hr />
            <h6 className="mb-2 text-muted">
              Término oferta: {dayjs(jobOffer.validDate).format("DD-MM-YYYY")}
            </h6>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <SiCashapp size={25} />
              <p className="card-text" style={{ marginLeft: "5px" }}>
                {jobOffer.salary}
              </p>
            </div>
            <p>Vacantes: {jobOffer.vacancyNumbers}</p>
            <h6>Jornada laboral</h6>
            <p>
              {jobOffer.initWorkingDayTime} - {jobOffer.endWorkingDayTime}
            </p>
            <h6>Periodo contrato</h6>
            <p>{jobOffer.contractPeriod}</p>
            <div style={{ marginTop: "10px" }}>
              <h3>Requerimientos</h3>
              <p>{jobOffer.requirements}</p>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h3>Descripción</h3>
              <p>{jobOffer.descriptionOffer}</p>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h3>Cargo</h3>
              <p>{jobOffer.position}</p>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h3>Sobre la empresa</h3>
              <h5>{jobOffer.business.name}</h5>
              <p>{jobOffer.business.aboutUs}</p>
            </div>
            <button
              className="btn btn-success w-100"
              onClick={() => {
                dispatch(postulate(auth?.userId ?? 0, parseInt(id, 10)));
              }}
            >
              Postular
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
