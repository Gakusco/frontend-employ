import axios from "axios";
import { KEY_TOKEN } from "../helpers/Constants";

const baseURL = process.env.REACT_APP_API_EMPLOYMENT;

const employApi = axios.create({ baseURL });

employApi.interceptors.request.use((config) => {
  console.log(`URI CALL: ${baseURL}${config.url}`);
  const token = localStorage.getItem(KEY_TOKEN);

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default employApi;
