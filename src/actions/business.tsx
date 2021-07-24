import { businessAction } from "../reducers/businessReducer";
import employApi from "../api/employApi";
import { Business } from "../response/response";
import Swal from "sweetalert2";
import { authAction } from "../reducers/authReducer";

export const listBusiness = () => {
  return async (dispatch: (value: businessAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get("/business/list");
      if (status === 200) {
        dispatch({ type: "business-list", payload: data.businessList });
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

export const saveBusiness = (business: Business) => {
  return async (dispatch: (value: businessAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.post("/business/add", {
        name: business.name,
        aboutUs: business.aboutUs,
        email: business.email,
      });
      if (status === 201) {
        dispatch({ type: "business-save", payload: data });
        dispatch({ type: "business-without-errors" });
        Swal.fire("Éxito", "La empresa ha sido agregada con éxito", "success");
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        dispatch({
          type: "business-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const updateBusiness = (business: Business) => {
  return async (dispatch: (value: businessAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put("/business/update", {
        id: business.id,
        name: business.name,
        aboutUs: business.aboutUs,
        email: business.email,
      });
      if (status === 202) {
        dispatch({ type: "business-update", payload: data });
        Swal.fire("Éxito", "La empresa ha sido actualizada con éxito", "success");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        dispatch({
          type: "business-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const toggleBusiness = (business: Business) => {
  return async (dispatch: (value: businessAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put(
        "/business/toggle-enable/" + business.id
      );
      if (status === 202) {
        dispatch({ type: "business-update", payload: data });
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
