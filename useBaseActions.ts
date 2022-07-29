import { AxiosPromise, AxiosError } from 'axios';
import Response from 'interfaces/response';
import { useState } from "react";

interface ResponseStatus {
  isLoading: boolean
  isError: boolean
}

interface BaseActionParams<P, T> {
  action: (params: P) => AxiosPromise<Response<T>>
  cb?: (data: T) => void
  errCb?: (err: AxiosError<T>) => void
}

interface BaseActionReturn<P = any, T = any> extends ResponseStatus {
  data?: T
  error?: AxiosError<T>
  executeRequest: (params: P) => void
}

const useBaseActions = <P = any, T = any>({ action, cb, errCb }: BaseActionParams<P, T>): BaseActionReturn<P, T>  => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError<T>>();
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>({
    isLoading: false,
    isError: false
  });

  const executeRequest = (params: P) => {
    setData(undefined);
    setError(undefined);
    setResponseStatus({
      isLoading: true,
      isError: false
    });
    action(params).then(res => {
      setData(res.data.data);
      setError(undefined);
      setResponseStatus({
        isLoading: false,
        isError: false
      });
      if (cb) cb(res.data.data)
    }).catch((err: AxiosError<T>) => {
      console.log(err);
      setData(undefined);
      setError(err);
      setResponseStatus({
        isLoading: false,
        isError: true
      });
      if (errCb) errCb(err);
    })
  }

  return { 
    data,
    error,
    executeRequest,
    ...responseStatus
  };
}

export default useBaseActions;