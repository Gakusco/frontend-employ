import { postulantAction } from '../reducers/postulantReducer';
import employApi from '../api/employApi';
import Swal from 'sweetalert2';
import { authAction } from '../reducers/authReducer';
import { Postulant } from '../response/response';


export const listPostulant = () => {
  return async (dispatch: (value: postulantAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.get("/postulant/list");
      if (status === 200) {
        dispatch({ type: "postulant-list", payload: data.applicants });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      console.log(error.response);
    }
  };
};

export const savePostulant = (postulant: Postulant) => {
  return async (dispatch: (value: postulantAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.post("/auth/register", postulant);
      if (status === 201) {
        dispatch({ type: "postulant-save", payload: data });
        dispatch({ type: "postulant-without-errors" });
        Swal.fire("Éxito", "La empresa ha sido agregada con éxito");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
      if (error?.response?.data?.error) {
        console.log(error.response.data.error);
        dispatch({
          type: "postulant-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const updatePostulant = (postulant: Postulant) => {
  return async (dispatch: (value: postulantAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put("/auth/update", postulant);
      if (status === 202) {
        dispatch({ type: "postulant-update", payload: data });
        Swal.fire("Éxito", "La empresa ha sido actualizada con éxito");
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
          type: "postulant-with-errors",
          payload: error.response.data.error,
        });
      }
    }
  };
};

export const togglePostulant = (postulant: Postulant) => {
  return async (dispatch: (value: postulantAction | authAction) => void) => {
    try {
      const { data, status } = await employApi.put(
        "/auth/toggle-enable/" + postulant.id
      );
      if (status === 202) {
        dispatch({ type: "postulant-update", payload: data });
      }
    } catch (error) {
      console.log(error.response);
      if (error?.response?.status === 401) {
        Swal.fire("Sesión terminada");
        dispatch({ type: "clear" });
      }
    }
  };
};