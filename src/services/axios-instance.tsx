import axios from "axios";
import { getNextPublicApiUrl } from "@/utils/get-env";

export const apiClient = axios.create({
  baseURL: getNextPublicApiUrl(),
  timeout: 10000
});

export const axiosInterceptorsRequest = () => {
  return apiClient?.interceptors?.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const axiosInterceptorsResponse = (() => {
  return apiClient?.interceptors?.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
});