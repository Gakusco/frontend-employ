import Swal from "sweetalert2";
import employApi from "../api/employApi";
import { authAction } from "../reducers/authReducer";
import { jobOfferSuperAction } from "../reducers/jobOfferSuperReducer";
import { OfferJobRQ, OfferJobUpdateRQ } from '../interface/request';

export const listJobOfferByBusinessId = (businessId: number) => {
  return async (
    dispatch: (value: jobOfferSuperAction | authAction) => void
  ) => {
    try {
      const { data, status } = await employApi.get(
        "/business/job-offers/" + businessId
      );
      if (status === 200) {
        dispatch({ type: "job-offer-list", payload: data.jobOfferList });
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      console.log(error.response);
    }
  };
};

export const saveJobOfferSuper = (jobOffer: OfferJobRQ, businessId: number) => {
  return async (dispatch: (value: jobOfferSuperAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.post("/job-offer/create/" + businessId, jobOffer);
      if (status === 201) {
        dispatch({ type: "job-offer-save", payload: data });
        dispatch({ type: "job-offer-without-errors" });
        Swal.fire("Éxito", "La oferta de trabajo ha sido agregada con éxito", "success");
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        dispatch({
          type: "job-offer-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const updateJobOfferSuper = (jobOffer: OfferJobUpdateRQ) => {
  return async (dispatch: (value: jobOfferSuperAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put("/job-offer/update", jobOffer);
      if (status === 202) {
        dispatch({ type: "job-offer-update", payload: data });
        Swal.fire("Éxito", "La oferta de trabajo ha sido actualizada con éxito", "success");
      }
    } catch (error) {
      console.log(error.response);
      if (error?.response?.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        dispatch({
          type: "job-offer-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const toggleJobOfferSuper = (jobOfferId: number) => {
  return async (dispatch: (value: jobOfferSuperAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put(
        "/job-offer/toggle-enable/" + jobOfferId
      );
      if (status === 202) {
        dispatch({ type: "job-offer-update", payload: data });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
    }
  };
};

export const jobOfferListPostulant = (jobOfferId: number) => {
  return async (dispatch: (value: jobOfferSuperAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get(
        "/job-offer/applicants/list/" + jobOfferId
      );
      if (status === 200) {
        dispatch({ type: "job-offer-postulant-active", payload: data.applicants });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
    }
  };
};