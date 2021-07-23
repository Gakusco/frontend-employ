import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listJobOffer } from "../actions/joboffer";
import { RootState } from "../store/store";
import { JobOfferItem } from '../component/JobOfferItem';

export const OffersJobScreen = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.joboffer);
  useEffect(() => {
    dispatch(listJobOffer());
  }, []);
  return (
    <div className="card-group">
      {data?.offerList.map((jobOffer) => (
        <JobOfferItem jobOffer={jobOffer} />
      ))}
    </div>
  );
};
