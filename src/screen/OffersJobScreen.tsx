import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listJobOffer } from "../actions/joboffer";
import { JobOfferItem } from "../component/JobOfferItem";
import { RootState } from "../store/store";

export const OffersJobScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.joboffer);
  useEffect(() => {
    dispatch(listJobOffer());
  }, []);
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Ofertas de trabajo</h2>
        <hr />
      </div>
      <div className="card-group">
        {data?.offerList?.filter(jobOffer => jobOffer.enabled)?.map((jobOffer, index) => (
          <JobOfferItem key={index} jobOffer={jobOffer} />
        ))}
      </div>
    </div>
  );
};
