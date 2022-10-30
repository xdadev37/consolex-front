import axios from 'axios'
import appSettings from 'AppSettings'
import type { AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'

const baseAxios = axios.create({
  baseURL: `${appSettings.baseUrl}`,
  timeout: 3000,
  timeoutErrorMessage: 'Network Error',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const axiosBaseQuery =
  (
    endpoint: string
  ): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  }> =>
  ({ url, method, data, params }) =>
    baseAxios({
      url: `${endpoint}/${url}`,
      method,
      data,
      params,
    })
      .then(res => ({ data: res.data, error: undefined }))
      .catch(err => ({ error: err.message, data: undefined }))

export default axiosBaseQuery
