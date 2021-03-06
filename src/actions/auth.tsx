import Swal from "sweetalert2";
import employApi from "../api/employApi";
import { authAction } from "../reducers/authReducer";
import { LoginRQ } from "../request/loginRQ";

export const login = (credentials: LoginRQ) => {
  return async (dispatch: (value: authAction) => void) => {
    try {
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);
      params.append("grant_type", "password");

      const { data, status } = await employApi.post("/oauth/token", params, {
        withCredentials: true,
        auth: {
          username: process.env.REACT_APP_USERNAME_LOGIN ?? "",
          password: process.env.REACT_APP_PASSWORD_LOGIN ?? "",
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      if (status === 200 && data.access_token) {
        localStorage.setItem("token", data.access_token);
        dispatch({
          type: "save",
          payload: {
            isOnline: true,
            data: {
              access_token: data.access_token,
              role: data.role,
              credentialId: data.credentialId,
              userId: data.userId,
            },
          },
        });
      }
    } catch (error) {
      Swal.fire("Cuidado", "Credenciales inválidas", "warning");
    }
  };
};
