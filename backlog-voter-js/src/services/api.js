import axios from "axios";
import { getSession, removeSession } from "./auth2";

const api = axios.create({
  baseURL: "/api",
  "Content-Type": "application/json"
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const errorHandler = error => {
  if (isHandlerEnabled(error.config)) {
    if(error.config.url === '/api/users/me'){
      removeSession();
    }
    console.info("error handler action");
  }
  return Promise.reject({ ...error });
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    //console.info("success handler action");
  }
  return response;
};

api.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

api.interceptors.request.use(async config => {
  const session = getSession();
  if (session && session.id) {
    //config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${session.id}`;
  }
  return config;
});

export default api;
