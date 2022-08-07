import axios, { AxiosPromise } from 'axios';
import Response from 'interfaces/response';

const baseHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const axiosActions = (axiosInstance = axios.create()) => ({
  get: <
    R = Record<string, any>, 
    Q = Record<string, any>
  >(url: string, query?: Q): AxiosPromise<Response<R>> => axiosInstance({
    url,
    baseURL,
    method: 'GET',
    headers: baseHeaders,
    params: query
  }),
  post: <
    B = Record<string, any>, 
    R = Record<string, any>
  >(url: string, body: B): AxiosPromise<Response<R>> => axiosInstance({
    url,
    baseURL,
    method: 'POST',
    headers: baseHeaders,
    data: body
  }),
  put: <
    B = Record<string, any>, 
    R = Record<string, any>
  >(url: string, body: B): AxiosPromise<Response<R>> => axiosInstance({
    url,
    baseURL,
    method: 'PUT',
    headers: baseHeaders,
    data: body
  }),
  patch: <
    B = Record<string, any>, 
    R = Record<string, any>
  >(url: string, body: B): AxiosPromise<Response<R>> => axiosInstance({
    url,
    baseURL,
    method: 'PATCH',
    headers: baseHeaders,
    data: body
  }),
  del: <R = Record<string, any>>(url: string): AxiosPromise<Response<R>> => axiosInstance({
    url,
    baseURL,
    method: 'DELETE',
    headers: baseHeaders
  })
});

export default axiosActions;
