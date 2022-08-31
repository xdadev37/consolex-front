import axios from "axios";
import store from "./store";
import appSettings from "AppSettings.json";
import { setAlertInfo } from "slicers/alertSnackbar";
import type { AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";

const baseAxios = axios.create({
  baseURL: appSettings.baseUrl,
  timeout: 3000,
  timeoutErrorMessage: "Network Error",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${appSettings.client_token}`,
  },
});

const axiosBaseQuery =
  (
    endpoint: string
  ): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
  }> =>
  ({ url, method, data, params }) =>
    baseAxios({
      url: `${endpoint}/${url}`,
      method,
      data,
      params,
    })
      .then((res) => res)
      .catch((err) => {
        const errMessage = "خطا در برقراری ارتباط با سرور";
        store.dispatch(
          setAlertInfo({ severity: "warning", message: errMessage })
        );

        return err;
      });

export default axiosBaseQuery;
