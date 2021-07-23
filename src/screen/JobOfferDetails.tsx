import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { listJobOffer } from "../actions/joboffer";
import { JobOffer } from "../response/response";
import { useParams } from "react-router-dom";
import { SiCashapp } from "react-icons/all";
import dayjs from "dayjs";

export const JobOfferDetails = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.joboffer);
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch(listJobOffer());
    setJobOffer(data?.offerList.find((offer) => offer.id === parseInt(id, 10)));
  }, []);
  return (
    <div style={{ margin: "20px" }}>
      {jobOffer && (
        <div>
          <h2>{jobOffer.responsabilities}</h2>
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
          <p>{jobOffer.initWorkingDayTime} - {jobOffer.endWorkingDayTime}</p>
          <h6>Periodo contrato</h6>
          <p>{jobOffer.contractPeriod}</p>
          <div style={{marginTop: "10px"}}>
            <h3>
              Requerimientos
            </h3>
            <p>{jobOffer.requirements}</p>
          </div>
          <div style={{marginTop: "10px"}}>
            <h3>
              Descripción
            </h3>
            <p>{jobOffer.descriptionOffer}</p>
          </div>
          <div style={{marginTop: "10px"}}>
            <h3>
              Cargo
            </h3>
            <p>{jobOffer.position}</p>
          </div>
          <div style={{marginTop: "10px"}}>
            <h3>
              Sobre la empresa
            </h3>
            <h5>{jobOffer.business.name}</h5>
            <p>{jobOffer.business.aboutUs}</p>
          </div>
        </div>
      )}
    </div>
  );
};
