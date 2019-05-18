import axios from "axios";
import { readToken } from "./auth2";

const api = axios.create({
  baseURL: "/api",
  "Content-Type": "application/json"
});



axios.interceptors.response.use(response => response.data)

api.interceptors.request.use(async config => {
  const session = readToken();
  if (session && session.id) {
    //config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${session.id}`;
  }
  return config;
});

export default api;
