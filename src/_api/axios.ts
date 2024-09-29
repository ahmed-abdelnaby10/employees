import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export const defaultAPI = axios.create({
  baseURL: BASE_URL,
});

defaultAPI.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `Bearer ${Cookies.get(ACCESS_TOKEN)}`;
    config.headers!.Accept = 'application/json'
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);