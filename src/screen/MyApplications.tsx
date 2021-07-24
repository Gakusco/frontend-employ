import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myListJobOffer } from "../actions/joboffer";
import { JobOfferItem } from "../component/JobOfferItem";
import { RootState } from "../store/store";

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { myoffer } = useSelector((state: RootState) => state.joboffer);
  const { data: auth } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(myListJobOffer(auth?.userId ?? 0));
  }, []);

  useEffect(() => {
    dispatch({ type: "navigation-my-applications-false" });
  }, []);

  return (
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Mis postulaciones</h2>
        <hr />
      </div>
      <div className="card-group">
        {myoffer?.offerList?.map((jobOffer, index) => (
          <JobOfferItem key={index} jobOffer={jobOffer} />
        ))}
      </div>
    </div>
  );
};
