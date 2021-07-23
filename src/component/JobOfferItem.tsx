import React from "react";
import { JobOffer } from "../response/response";
import dayjs from "dayjs";
import { SiCashapp } from "react-icons/all";
import { useHistory } from 'react-router-dom';

interface Props {
  jobOffer: JobOffer;
}

export const JobOfferItem = ({ jobOffer }: Props) => {

  const history = useHistory();

  const navigateDetail = () => {
    history.push("/job-offers/"+jobOffer.id);
  }

  return (
    <div
      className="card"
      style={{ minWidth: "250px", maxWidth: "300px", margin: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{jobOffer.responsabilities}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Término oferta: {dayjs(jobOffer.validDate).format("DD-MM-YYYY")}
        </h6>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SiCashapp size={25} />
          <p className="card-text" style={{ marginLeft: "5px" }}>
            {jobOffer.salary}
          </p>
        </div>
        <button className="btn btn-success mt-2 w-100" onClick={navigateDetail}>
          Ver más
        </button>
      </div>
    </div>
  );
};
