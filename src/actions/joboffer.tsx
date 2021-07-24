import Swal from "sweetalert2";
import employApi from "../api/employApi";
import { jobOfferAction } from "../reducers/jobOfferReducer";
import { authAction } from '../reducers/authReducer';

export const listJobOffer = () => {
  return async (dispatch: (value: jobOfferAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get("/job-offer/list");
      if (status === 200) {
        dispatch({ type: "job-offer-save-list", payload: { data: data } });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 3));
      if (error.response.status === 401){ 
        Swal.fire("Sesión terminada");
        dispatch({type: "clear"});
      };
    }
  };
};

export const postulate = (postulantId: number, offerId: number) => {
  return async (dispatch: (value: jobOfferAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get(
        "/job-offer/postulate/" + postulantId + "/" + offerId
      );
      if (status === 201) {
        dispatch({ type: "my-job-offer-save-list", payload: { data: data } });
        Swal.fire("Éxito", "Has postulado a esta oferta de trabajo con éxito");
        dispatch({ type: "navigation-my-applications-true" });
      }
      if (status === 200) {
        Swal.fire("Alto!", "Ya has postulado a esta oferta de trabajo");
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 3));
      if (error.response.status === 401){ 
        Swal.fire("Sesión terminada");
        dispatch({type: "clear"});
      };
    }
  };
};

export const myListJobOffer = (postulantId: number) => {
  return async (dispatch: (value: jobOfferAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get(
        "/postulant/applications/" + postulantId
      );
      if (status === 200) {
        dispatch({ type: "my-job-offer-save-list", payload: { data: data } });
      }
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 3));
      if (error.response.status === 401){ 
        Swal.fire("Sesión terminada");
        dispatch({type: "clear"});
      };
    }
  };
};
