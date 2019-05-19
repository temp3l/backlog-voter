import axios from "axios";
import { readToken } from "./auth2";
import history from "./history";

const api = axios.create({
  baseURL: "/api",
  "Content-Type": "application/json"
});
api.interceptors.request.use(async config => {
  const session = readToken();
  if (session && session.id) {
    config.headers.Authorization = `${session.id}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      window.confirm("401 intercepted => /login") === true ?  history.push("/login") :  console.log(error)    }
    return error;
  }
);

export default api;
