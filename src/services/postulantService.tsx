import { RegisterRQ } from "../request/loginRQ";
import employApi from "../api/employApi";
import Swal from "sweetalert2";

export const registerPostulant = async (
  request: RegisterRQ
): Promise<number | string[] | undefined> => {
  try {
    const { status } = await employApi.post("/auth/register", request);
    if (status === 201) {
      return status;
    }
  } catch (error) {
    console.log(error.response.data.error);
    if (error?.response?.data?.error) {
      Swal.fire("Error en uno o más campos");
      return error.response.data.error;
    }
  }
};
