import axios from "axios";
import { KEY_TOKEN } from "../helpers/Constants";

const baseURL = process.env.REACT_APP_API_EMPLOYMENT;

const employApi = axios.create({ baseURL });

employApi.interceptors.request.use((config) => {
  console.log(`URI CALL: ${baseURL}${config.url}`);
  const token = localStorage.getItem(KEY_TOKEN);
  console.log(token);
  if (
    token &&
    config.url !== "/auth/register" &&
    config.url !== "/oauth/token"
  ) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  if (config.url !== "/oauth/token") {
    config.headers["Content-Type"] = "application/json";
    // config.headers["Accept"] = "application/json";
  }
  return config;
});

export default employApi;
