import axios from "axios";
import { Translations } from "@/types/generic-types";
import { getNextPublicApiUrl } from "@/utils/get-env";

export const apiClient = axios.create({
  baseURL: getNextPublicApiUrl(),
  timeout: 10000
});

export const axiosInterceptorsRequest = (t: Translations) => {
  return apiClient?.interceptors?.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const axiosInterceptorsResponse = ((t: Translations) => {
  return apiClient?.interceptors?.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
});