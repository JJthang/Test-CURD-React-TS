import axios, { AxiosError, type AxiosResponse } from "axios";
import { VITE_PUBLIC_API_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: VITE_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
